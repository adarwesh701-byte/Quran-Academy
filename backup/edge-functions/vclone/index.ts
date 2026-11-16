// Itqan — owner's cloned speaking voice (XTTS-v2 via a free Hugging Face Space). Never used for Quran.
import { createClient } from "jsr:@supabase/supabase-js@2";
const SPACE = "https://hasanbasbunar-voice-cloning-xtts-v2.hf.space";
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
// Read the token on every request so a newly added secret is picked up without a redeploy.
function hfToken() { const raw = (Deno.env.get("HF_TOKEN") || "").trim(); const m = raw.match(/hf_[A-Za-z0-9]{20,}/); return m ? m[0] : raw; }
function auth(): Record<string, string> { const t = hfToken(); return t ? { Authorization: `Bearer ${t}` } : {}; }
function vh84(s: string) { s = String(s || "").trim(); let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
async function hfUpload(wav: Uint8Array): Promise<string> {
  const fd = new FormData(); fd.append("files", new Blob([wav], { type: "audio/wav" }), "ref.wav");
  const r = await fetch(`${SPACE}/gradio_api/upload`, { method: "POST", body: fd, headers: auth() }); if (!r.ok) throw new Error("upload " + r.status);
  return (await r.json())[0];
}
async function synth(text: string, path: string): Promise<string> {
  const sh = crypto.randomUUID().replace(/-/g, "").slice(0, 11);
  const data = [text, "Arabic", 0.7, 1, { path, meta: { _type: "gradio.FileData" }, orig_name: "ref.wav" }, "audio_1.wav", true, true, 5, 1, 30, 50, 0.85, true, -45, 300, 100, "Native XTTS splitting", 250, false];
  const j = await fetch(`${SPACE}/gradio_api/queue/join`, { method: "POST", headers: { "Content-Type": "application/json", ...auth() }, body: JSON.stringify({ data, fn_index: 8, trigger_id: null, session_hash: sh, event_data: null }) });
  if (!j.ok) throw new Error("join " + j.status + " " + (await j.text()).slice(0, 200));
  const t = await (await fetch(`${SPACE}/gradio_api/queue/data?session_hash=${sh}`, { headers: auth() })).text();
  const msgs = [...t.matchAll(/data: (\{.*\})/g)].map((x) => { try { return JSON.parse(x[1]); } catch { return {}; } });
  const m = msgs.find((x: any) => x.msg === "process_completed");
  if (!m || !m.success || !m.output || !m.output.data || !m.output.data[0]) throw new Error("gen: " + JSON.stringify(m ? m.output : msgs.slice(-1)).slice(0, 300));
  const f = m.output.data[0]; return f.url || `${SPACE}/gradio_api/file=${f.path}`;
}
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  let body: any = {}; try { body = await req.json(); } catch { /* */ }
  if (body.mode === "saveref") {
    const { data: c } = await db.from("vclone_cfg").select("token,at").eq("id", 1).maybeSingle();
    if (!c || !c.token || !String(c.token).startsWith("ref-") || body.token !== c.token || Date.now() - new Date(c.at).getTime() > 3600000) return new Response("forbidden", { status: 403, headers: CORS });
    const bin = Uint8Array.from(atob(body.wav), (ch) => ch.charCodeAt(0));
    if (bin.length > 6_000_000) return new Response("too big", { status: 400, headers: CORS });
    const up = await db.storage.from("academy_materials").upload("clone/speech_ref.wav", bin, { contentType: "audio/wav", upsert: true });
    await db.from("vclone_cfg").update({ token: null, ref_url: null }).eq("id", 1);
    return new Response(JSON.stringify({ ok: !up.error, err: up.error?.message }), { headers: { ...CORS, "Content-Type": "application/json" } });
  }
  const { data: cfg } = await db.from("art_cfg").select("key").eq("id", 1).maybeSingle();
  if (!cfg || req.headers.get("x-art-key") !== cfg.key) return new Response("forbidden", { status: 403, headers: CORS });
  if (body.mode === "diag") {
    // Reports whether the token exists and whom Hugging Face says it belongs to. Never returns the token.
    const t = hfToken(); let who: any = null;
    if (t) { try { const r = await fetch("https://huggingface.co/api/whoami-v2", { headers: { Authorization: `Bearer ${t}` } }); who = { status: r.status, name: r.ok ? (await r.json()).name : null }; } catch (e) { who = { err: String(e) }; } }
    return new Response(JSON.stringify({ hasToken: !!t, startsHf: t.startsWith("hf_"), len: t.length, rawLen: (Deno.env.get("HF_TOKEN") || "").length, rawHasHf: /hf_/.test(Deno.env.get("HF_TOKEN") || ""), who }), { headers: { "Content-Type": "application/json" } });
  }
  const t0 = Date.now(); const out: any[] = [];
  const { data: refBlob, error: re } = await db.storage.from("academy_materials").download("clone/speech_ref.wav");
  if (re || !refBlob) return new Response(JSON.stringify({ err: "no speech_ref.wav" }));
  const refBytes = new Uint8Array(await refBlob.arrayBuffer());
  await db.from("vclone_jobs").update({ status: "pending" }).eq("status", "working").lt("updated_at", new Date(Date.now() - 10 * 60000).toISOString());
  let path = "";
  while (Date.now() - t0 < 100000) {
    const { data: js } = await db.from("vclone_jobs").select("text,tries").eq("status", "pending").lt("tries", 3).order("created_at").limit(1);
    const j = js && js[0]; if (!j) break;
    await db.from("vclone_jobs").update({ status: "working", tries: j.tries + 1, updated_at: new Date().toISOString() }).eq("text", j.text);
    try {
      if (!path) path = await hfUpload(refBytes);
      const url = await synth(j.text, path);
      const a = await fetch(url, { headers: auth() }); if (!a.ok) throw new Error("dl " + a.status);
      const ext = /\.mp3/.test(url) ? "mp3" : "wav";
      const name = `c_${vh84("t:" + j.text)}.${ext}`;
      const up = await db.storage.from("academy_public").upload("voices/" + name, new Uint8Array(await a.arrayBuffer()), { contentType: ext === "mp3" ? "audio/mpeg" : "audio/wav", upsert: true });
      if (up.error) throw new Error("up " + up.error.message);
      await db.from("vclone_jobs").update({ status: "done", file: name, err: null, updated_at: new Date().toISOString() }).eq("text", j.text);
      out.push({ ok: name });
    } catch (e) {
      const msg = String((e as Error).message || e).slice(0, 500);
      const quota = /quota|ZeroGPU|exceeded|429/i.test(msg);
      await db.from("vclone_jobs").update({ status: quota ? "pending" : (j.tries + 1 >= 3 ? "failed" : "pending"), tries: quota ? j.tries : j.tries + 1, err: msg, updated_at: new Date().toISOString() }).eq("text", j.text);
      out.push({ err: msg }); path = "";
      if (quota) { await db.from("vclone_cfg").update({ ref_url: "quota:" + new Date().toISOString() }).eq("id", 1); break; }
      if (/503|502|upload/.test(msg)) break;
    }
  }
  return new Response(JSON.stringify(out), { headers: { "Content-Type": "application/json" } });
});
