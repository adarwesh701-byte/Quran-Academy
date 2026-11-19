import json, os
new = os.environ.get("NEW", "quran-itqan.com")
p = "vercel.json"
v = json.load(open(p, encoding="utf-8"))
olds = ["itqan-maqamat-academy.vercel.app", "quran-academy-nine-dusky.vercel.app", "www." + new]
r = [x for x in v.get("redirects", []) if not any(h.get("value") in olds for h in x.get("has", []))]
for old in olds:
    r.append({"source": "/:path*", "has": [{"type": "host", "value": old}], "destination": f"https://{new}/:path*", "permanent": True})
v["redirects"] = r
json.dump(v, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
