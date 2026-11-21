// Extract every Arabic-bearing string literal / template chunk from the inline <script> blocks of index.html
const fs = require('fs'), ts = require('typescript');
const html = fs.readFileSync(process.argv[2], 'utf8');
const out = [];
// UTF-16 offset -> code point offset (Python indexing)
const ast = new Int32Array(html.length + 1); for (let i = 0, c = 0; i < html.length; i++) { ast[i] = c; const x = html.charCodeAt(i); if (x >= 0xDC00 && x <= 0xDFFF) c++; ast[i + 1] = c; }
const cp = i => i - ast[i];
const re = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi; let m;
while ((m = re.exec(html))) {
  if (/\bsrc\s*=|ld\+json/i.test(m[1]) || !m[2].trim()) continue;
  const base = m.index + m[0].indexOf('>') + 1, src = m[2];
  const sc = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, src);
  let tk, prevSig = null; const braceStack = [];
  while ((tk = sc.scan()) !== ts.SyntaxKind.EndOfFileToken) {
    const K = ts.SyntaxKind;
    if (tk === K.SlashToken || tk === K.SlashEqualsToken) {
      // regex vs divide heuristic
      if (prevSig === null || [K.OpenParenToken, K.CommaToken, K.EqualsToken, K.ColonToken, K.OpenBracketToken, K.ExclamationToken, K.AmpersandAmpersandToken, K.BarBarToken, K.QuestionToken, K.OpenBraceToken, K.CloseBraceToken, K.SemicolonToken, K.ReturnKeyword, K.EqualsEqualsEqualsToken, K.ExclamationEqualsEqualsToken, K.PlusToken, K.MinusToken, K.QuestionQuestionToken, K.TypeOfKeyword].includes(prevSig)) { tk = sc.reScanSlashToken(); }
    }
    if (tk === K.OpenBraceToken) braceStack.push('{');
    else if (tk === K.TemplateHead) braceStack.push('T');
    else if (tk === K.CloseBraceToken) {
      if (braceStack[braceStack.length - 1] === 'T') { tk = sc.reScanTemplateToken(false); if (tk === K.TemplateTail) braceStack.pop(); }
      else braceStack.pop();
    }
    const kinds = [K.StringLiteral, K.NoSubstitutionTemplateLiteral, K.TemplateHead, K.TemplateMiddle, K.TemplateTail];
    if (kinds.includes(tk)) {
      const s = sc.getTokenStart ? sc.getTokenStart() : sc.getTokenPos(), e = sc.getTextPos();
      const raw = src.slice(s, e);
      if (/[؀-ۿ]/.test(raw)) out.push({ s: cp(base + s), e: cp(base + e), raw });
    }
    if (tk !== K.WhitespaceTrivia && tk !== K.NewLineTrivia && tk !== K.SingleLineCommentTrivia && tk !== K.MultiLineCommentTrivia) prevSig = tk;
  }
}
fs.writeFileSync(process.argv[3], JSON.stringify(out));
console.log('tokens', out.length);
