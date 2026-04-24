import { useState } from "react";

const htmlCode = `&lt;!DOCTYPE html&gt;
&lt;<span class="token-tag">html</span> <span class="token-attribute">lang</span>=<span class="token-string">"uz"</span>&gt;
&lt;<span class="token-tag">head</span>&gt;
  &lt;<span class="token-tag">meta</span> <span class="token-attribute">charset</span>=<span class="token-string">"UTF-8"</span>&gt;
  &lt;<span class="token-tag">title</span>&gt;Mening Saytim&lt;/<span class="token-tag">title</span>&gt;
  &lt;<span class="token-tag">style</span>&gt;
    <span class="token-tag">body</span> {
      <span class="token-attribute">background</span>: <span class="token-string">#0a0a1e</span>;
      <span class="token-attribute">color</span>: <span class="token-string">#00ffff</span>;
      <span class="token-attribute">font-family</span>: <span class="token-string">'Space Grotesk'</span>, sans-serif;
    }
    <span class="token-tag">h1</span> {
      <span class="token-attribute">text-shadow</span>: <span class="token-string">0 0 20px #00ffff</span>;
    }
  &lt;/<span class="token-tag">style</span>&gt;
&lt;/<span class="token-tag">head</span>&gt;
&lt;<span class="token-tag">body</span>&gt;
  &lt;<span class="token-tag">h1</span>&gt;Salom, Dunyo!&lt;/<span class="token-tag">h1</span>&gt;
  &lt;<span class="token-tag">p</span>&gt;Men Doniyor, frontend dasturchiman!&lt;/<span class="token-tag">p</span>&gt;
&lt;/<span class="token-tag">body</span>&gt;
&lt;/<span class="token-tag">html</span>&gt;`;

const htmlCodeRaw = `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <title>Mening Saytim</title>
  <style>
    body {
      background: #0a0a1e;
      color: #00ffff;
      font-family: 'Space Grotesk', sans-serif;
    }
    h1 {
      text-shadow: 0 0 20px #00ffff;
    }
  </style>
</head>
<body>
  <h1>Salom, Dunyo!</h1>
  <p>Men Doniyor, frontend dasturchiman!</p>
</body>
</html>`;

const jsCode = `<span class="token-comment">// Snake O'yini - Asosiy mantig'i</span>
<span class="token-keyword">const</span> canvas = document.<span class="token-function">getElementById</span>(<span class="token-string">'game'</span>);
<span class="token-keyword">const</span> ctx = canvas.<span class="token-function">getContext</span>(<span class="token-string">'2d'</span>);

<span class="token-keyword">let</span> snake = [{x: <span class="token-string">200</span>, y: <span class="token-string">200</span>}];
<span class="token-keyword">let</span> food = {x: <span class="token-string">100</span>, y: <span class="token-string">100</span>};
<span class="token-keyword">let</span> direction = {x: <span class="token-string">20</span>, y: <span class="token-string">0</span>};
<span class="token-keyword">let</span> score = <span class="token-string">0</span>;

<span class="token-keyword">function</span> <span class="token-function">draw</span>() {
  <span class="token-comment">// Fon</span>
  ctx.<span class="token-attribute">fillStyle</span> = <span class="token-string">'#080812'</span>;
  ctx.<span class="token-function">fillRect</span>(<span class="token-string">0</span>, <span class="token-string">0</span>, <span class="token-string">400</span>, <span class="token-string">400</span>);

  <span class="token-comment">// Ilon</span>
  ctx.<span class="token-attribute">fillStyle</span> = <span class="token-string">'#00ff00'</span>;
  snake.<span class="token-function">forEach</span>(seg =&gt; {
    ctx.<span class="token-function">fillRect</span>(seg.x, seg.y, <span class="token-string">18</span>, <span class="token-string">18</span>);
  });

  <span class="token-comment">// Ovqat</span>
  ctx.<span class="token-attribute">fillStyle</span> = <span class="token-string">'#ff0080'</span>;
  ctx.<span class="token-function">fillRect</span>(food.x, food.y, <span class="token-string">18</span>, <span class="token-string">18</span>);
}

<span class="token-function">setInterval</span>(draw, <span class="token-string">100</span>);`;

const jsCodeRaw = `// Snake O'yini - Asosiy mantig'i
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let snake = [{x: 200, y: 200}];
let food = {x: 100, y: 100};
let direction = {x: 20, y: 0};
let score = 0;

function draw() {
  // Fon
  ctx.fillStyle = '#080812';
  ctx.fillRect(0, 0, 400, 400);

  // Ilon
  ctx.fillStyle = '#00ff00';
  snake.forEach(seg => {
    ctx.fillRect(seg.x, seg.y, 18, 18);
  });

  // Ovqat
  ctx.fillStyle = '#ff0080';
  ctx.fillRect(food.x, food.y, 18, 18);
}

setInterval(draw, 100);`;

const tips = [
  {
    icon: "💡",
    title: "HTML ni birinchi o'rganing",
    desc: "Web sahifalarning asosi HTML. Tuzilmani birinchi o'zlashtiring.",
    accent: "#00ffff",
  },
  {
    icon: "🎨",
    title: "CSS bilan amaliyot qiling",
    desc: "Dizayn va animatsiya uchun CSS muhim. Ko'p mashq qiling!",
    accent: "#ff00ff",
  },
  {
    icon: "⚡",
    title: "JavaScript mantiqini tushunib oling",
    desc: "Interaktivlik va dinamik kontent JS bilan yaratiladi.",
    accent: "#00ff00",
  },
  {
    icon: "🚀",
    title: "Kichik loyihalar yarating",
    desc: "Amaliy tajriba eng yaxshi o'qituvchi. Bugun boshlang!",
    accent: "#ff0080",
  },
];

interface CodeBlockProps {
  title: string;
  badgeText: string;
  badgeAccent: string;
  code: string;
  rawCode: string;
  copyId: string;
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
}

function CodeBlock({
  title,
  badgeText,
  badgeAccent,
  code,
  rawCode,
  copyId,
  copiedId,
  onCopy,
}: CodeBlockProps) {
  const lineCount = rawCode.split("\n").length;
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);
  const isCopied = copiedId === copyId;

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden"
      style={{
        border: `1px solid ${badgeAccent}55`,
        boxShadow: `0 0 20px ${badgeAccent}33, 0 0 40px ${badgeAccent}11`,
      }}
      data-ocid={`${copyId}.card`}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: `linear-gradient(90deg, rgba(0,0,0,0.6) 0%, ${badgeAccent}11 100%)`,
          borderBottom: `1px solid ${badgeAccent}33`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: "#ff5f56" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: "#ffbd2e" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: "#27c93f" }}
            />
          </div>
          <span
            className="font-display font-semibold text-sm"
            style={{
              color: badgeAccent,
              textShadow: `0 0 8px ${badgeAccent}88`,
            }}
          >
            {title}
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-xs font-mono font-bold"
            style={{
              background: `${badgeAccent}22`,
              color: badgeAccent,
              border: `1px solid ${badgeAccent}55`,
              textShadow: `0 0 8px ${badgeAccent}`,
            }}
          >
            {badgeText}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onCopy(copyId, rawCode)}
          data-ocid={`${copyId}.copy_button`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold"
          style={{
            background: isCopied
              ? `${badgeAccent}22`
              : "rgba(255,255,255,0.05)",
            color: isCopied ? badgeAccent : "#888",
            border: `1px solid ${isCopied ? `${badgeAccent}88` : "rgba(255,255,255,0.1)"}`,
            boxShadow: isCopied ? `0 0 10px ${badgeAccent}44` : "none",
            transition: "all 0.25s ease",
          }}
        >
          {isCopied ? <>✓ Nusxalandi!</> : <>⧉ Nusxa</>}
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto" style={{ background: "#0a0a1c" }}>
        <div className="flex min-w-0">
          {/* Line numbers */}
          <div
            className="select-none flex flex-col items-end pr-4 pl-4 pt-4 pb-4 text-xs font-mono leading-6 shrink-0"
            style={{
              color: "#3a3a5c",
              borderRight: "1px solid rgba(255,255,255,0.04)",
              minWidth: "2.8rem",
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            {lines.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>

          {/* Highlighted code */}
          <pre
            className="text-xs font-mono leading-6 p-4 overflow-x-auto flex-1 m-0"
            style={{ color: "#cdd6f4" }}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled syntax-highlighted HTML with no user input
            dangerouslySetInnerHTML={{ __html: code }}
          />
        </div>
      </div>
    </div>
  );
}

export default function CodingJourneyPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    });
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <style>{`
        .cj-token-tag       { color: #00ffff; text-shadow: 0 0 8px #00ffff88; }
        .token-tag          { color: #00ffff; text-shadow: 0 0 8px #00ffff88; }
        .token-attribute    { color: #a6e3a1; text-shadow: 0 0 6px #00ff0066; }
        .token-string       { color: #f9e2af; text-shadow: 0 0 6px #f9e2af66; }
        .token-keyword      { color: #cba6f7; text-shadow: 0 0 8px #ff00ff66; }
        .token-comment      { color: #585b70; font-style: italic; }
        .token-function     { color: #89dceb; text-shadow: 0 0 6px #89dceb55; }

        @keyframes cj-underline-grow {
          from { width: 0; opacity: 0; }
          to   { width: 100%; opacity: 1; }
        }
        .cj-heading-underline {
          position: relative;
          display: inline-block;
          padding-bottom: 6px;
        }
        .cj-heading-underline::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #00ffff, #ff00ff, #00ff00);
          box-shadow: 0 0 12px #00ffff88;
          animation: cj-underline-grow 1s ease forwards 0.4s;
          width: 0;
        }

        .cj-tip-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .cj-tip-card:hover {
          transform: translateY(-5px) scale(1.02);
        }
      `}</style>

      <section
        className="min-h-screen cyber-grid"
        style={{ background: "#080812" }}
        data-ocid="coding_journey.page"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-14">
          {/* PAGE HEADER */}
          <header
            className="text-center space-y-4"
            data-ocid="coding_journey.header"
          >
            <h1
              className="text-4xl md:text-5xl font-display font-bold cj-heading-underline"
              style={{
                background:
                  "linear-gradient(135deg, #00ffff, #ff00ff 50%, #00ff00)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-shift 4s ease infinite",
              }}
            >
              Kodlash Jarayonim
            </h1>
            <p
              className="text-base md:text-lg font-body"
              style={{ color: "rgba(205,214,244,0.65)" }}
            >
              Mening dasturlash sayohatim va kod namunalarim
            </p>
          </header>

          {/* MY STORY */}
          <div
            className="glass-card neon-border-cyan rounded-2xl p-6 md:p-8"
            data-ocid="coding_journey.story.card"
            style={{ animation: "slide-up 0.6s ease both" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl select-none" aria-hidden="true">
                📖
              </span>
              <h2 className="text-xl font-display font-semibold neon-text-cyan">
                Mening Hikoyam
              </h2>
            </div>
            <p
              className="font-body leading-8 text-base"
              style={{ color: "rgba(205,214,244,0.85)" }}
            >
              Men 2024-yilda dasturlashni o'rganishni boshladim. Birinchi HTML
              sahifamni yaratganimda juda xursand bo'ldim. Har kuni yangi
              narsalar o'rganib, kichik loyihalar yaratyapman. Mening maqsadim —
              professional dasturchi bo'lish!
            </p>
            <div
              className="my-4 h-px"
              style={{
                background:
                  "linear-gradient(90deg, #00ffff33, #ff00ff33, #00ff0033)",
              }}
            />
            <div className="flex flex-wrap gap-3">
              {[
                { label: "HTML & CSS", accent: "#00ffff" },
                { label: "JavaScript", accent: "#f9e2af" },
                { label: "Frontend", accent: "#ff00ff" },
                { label: "2024-yildan", accent: "#00ff00" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className="px-3 py-1 rounded-full text-xs font-mono"
                  style={{
                    background: `${tag.accent}15`,
                    color: tag.accent,
                    border: `1px solid ${tag.accent}44`,
                    textShadow: `0 0 8px ${tag.accent}66`,
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* CODE SNIPPET 1 — HTML */}
          <div data-ocid="coding_journey.html_snippet.section">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: "#00ffff", boxShadow: "0 0 8px #00ffff" }}
                aria-hidden="true"
              />
              <h2
                className="text-lg font-display font-semibold"
                style={{ color: "#cdd6f4" }}
              >
                Kod Namunasi <span className="neon-text-cyan">#1</span>
              </h2>
            </div>
            <CodeBlock
              title="Birinchi HTML Sahifam"
              badgeText="HTML / CSS"
              badgeAccent="#00ffff"
              code={htmlCode}
              rawCode={htmlCodeRaw}
              copyId="html_snippet"
              copiedId={copiedId}
              onCopy={handleCopy}
            />
          </div>

          {/* CODE SNIPPET 2 — JavaScript */}
          <div data-ocid="coding_journey.js_snippet.section">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: "#ff00ff", boxShadow: "0 0 8px #ff00ff" }}
                aria-hidden="true"
              />
              <h2
                className="text-lg font-display font-semibold"
                style={{ color: "#cdd6f4" }}
              >
                Kod Namunasi <span className="neon-text-purple">#2</span>
              </h2>
            </div>
            <CodeBlock
              title="Snake O'yini Kodi"
              badgeText="JavaScript"
              badgeAccent="#ff00ff"
              code={jsCode}
              rawCode={jsCodeRaw}
              copyId="js_snippet"
              copiedId={copiedId}
              onCopy={handleCopy}
            />
          </div>

          {/* LEARNING TIPS */}
          <div data-ocid="coding_journey.tips.section">
            <div className="text-center mb-8 space-y-2">
              <h2
                className="text-2xl md:text-3xl font-display font-bold"
                style={{
                  background: "linear-gradient(135deg, #00ffff, #ff00ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Yangi boshlovchilar uchun maslahatlar
              </h2>
              <p
                className="text-sm font-body"
                style={{ color: "rgba(205,214,244,0.45)" }}
              >
                Dasturlashni o'rganishda foydali yo'llar
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {tips.map((tip, i) => (
                <div
                  key={tip.title}
                  className="cj-tip-card glass-card rounded-2xl p-5"
                  style={{
                    border: `1px solid ${tip.accent}44`,
                    boxShadow: `0 0 15px ${tip.accent}1a`,
                  }}
                  data-ocid={`coding_journey.tip.item.${i + 1}`}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = `0 0 30px ${tip.accent}44, 0 0 60px ${tip.accent}1a`;
                    el.style.borderColor = `${tip.accent}88`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = `0 0 15px ${tip.accent}1a`;
                    el.style.borderColor = `${tip.accent}44`;
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 select-none"
                      style={{
                        background: `${tip.accent}15`,
                        border: `1px solid ${tip.accent}33`,
                      }}
                      aria-hidden="true"
                    >
                      {tip.icon}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className="font-display font-semibold text-sm mb-1 leading-5"
                        style={{
                          color: tip.accent,
                          textShadow: `0 0 10px ${tip.accent}88`,
                        }}
                      >
                        {tip.title}
                      </h3>
                      <p
                        className="text-xs font-body leading-5"
                        style={{ color: "rgba(205,214,244,0.6)" }}
                      >
                        {tip.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER NOTE */}
          <div
            className="text-center py-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p
              className="text-xs font-mono"
              style={{ color: "rgba(205,214,244,0.3)" }}
            >
              Made with{" "}
              <span style={{ color: "#ff0080", textShadow: "0 0 8px #ff0080" }}>
                ♥
              </span>{" "}
              by{" "}
              <span style={{ color: "#00ffff", textShadow: "0 0 8px #00ffff" }}>
                Doniyor Kamolov
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
