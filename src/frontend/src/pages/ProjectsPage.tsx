import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
type GameType = "snake" | "memory" | "catch" | "whack" | null;

// ─── Snake Game ─────────────────────────────────────────────────────────────
type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 10, y: 10 }] as Point[],
    food: { x: 15, y: 15 } as Point,
    dir: "RIGHT" as Direction,
    nextDir: "RIGHT" as Direction,
    score: 0,
    gameOver: false,
    started: false,
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const COLS = 20;
  const ROWS = 20;
  const CELL = 20;

  const spawnFood = useCallback((snake: Point[]): Point => {
    let p: Point;
    do {
      p = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
      };
    } while (snake.some((s) => s.x === p.x && s.y === p.y));
    return p;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = stateRef.current;

    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // grid
    ctx.strokeStyle = "rgba(0,255,255,0.06)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= COLS; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j <= ROWS; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * CELL);
      ctx.lineTo(canvas.width, j * CELL);
      ctx.stroke();
    }

    // food with glow
    ctx.shadowColor = "#ff0040";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "#ff0040";
    ctx.beginPath();
    ctx.arc(
      s.food.x * CELL + CELL / 2,
      s.food.y * CELL + CELL / 2,
      CELL / 2 - 2,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // snake
    s.snake.forEach((seg, i) => {
      const ratio = 1 - i / s.snake.length;
      ctx.shadowColor = "#00ff80";
      ctx.shadowBlur = i === 0 ? 20 : 8;
      ctx.fillStyle =
        i === 0
          ? "#00ff80"
          : `rgba(0,${Math.floor(200 * ratio + 55)},${Math.floor(80 * ratio)},${0.7 + 0.3 * ratio})`;
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
    ctx.shadowBlur = 0;

    if (s.gameOver) {
      ctx.fillStyle = "rgba(5,5,16,0.78)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 22px 'Space Grotesk', sans-serif";
      ctx.shadowColor = "#ff0080";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "#ff0080";
      ctx.textAlign = "center";
      ctx.fillText("O'YIN TUGADI!", canvas.width / 2, canvas.height / 2 - 20);
      ctx.shadowBlur = 0;
      ctx.font = "16px 'DM Sans', sans-serif";
      ctx.fillStyle = "#00ffff";
      ctx.fillText(
        `Ball: ${s.score}`,
        canvas.width / 2,
        canvas.height / 2 + 15,
      );
    }

    if (!s.started && !s.gameOver) {
      ctx.fillStyle = "rgba(5,5,16,0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "15px 'DM Sans', sans-serif";
      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "#00ffff";
      ctx.textAlign = "center";
      ctx.fillText(
        "Boshlash uchun tugmani bos",
        canvas.width / 2,
        canvas.height / 2,
      );
      ctx.shadowBlur = 0;
    }
  }, []);

  const tick = useCallback(() => {
    const s = stateRef.current;
    if (s.gameOver || !s.started) return;
    s.dir = s.nextDir;
    const head = { ...s.snake[0] };
    if (s.dir === "UP") head.y--;
    else if (s.dir === "DOWN") head.y++;
    else if (s.dir === "LEFT") head.x--;
    else head.x++;

    if (
      head.x < 0 ||
      head.x >= COLS ||
      head.y < 0 ||
      head.y >= ROWS ||
      s.snake.some((seg) => seg.x === head.x && seg.y === head.y)
    ) {
      s.gameOver = true;
      setGameOver(true);
      draw();
      return;
    }

    s.snake.unshift(head);
    if (head.x === s.food.x && head.y === s.food.y) {
      s.score++;
      setScore(s.score);
      s.food = spawnFood(s.snake);
    } else {
      s.snake.pop();
    }
    draw();
  }, [draw, spawnFood]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      const map: Record<string, Direction> = {
        ArrowUp: "UP",
        w: "UP",
        W: "UP",
        ArrowDown: "DOWN",
        s: "DOWN",
        S: "DOWN",
        ArrowLeft: "LEFT",
        a: "LEFT",
        A: "LEFT",
        ArrowRight: "RIGHT",
        d: "RIGHT",
        D: "RIGHT",
      };
      const newDir = map[e.key];
      if (!newDir) return;
      const opp: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };
      if (s.dir !== opp[newDir]) s.nextDir = newDir;
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const startGame = () => {
    const s = stateRef.current;
    s.snake = [{ x: 10, y: 10 }];
    s.food = spawnFood(s.snake);
    s.dir = "RIGHT";
    s.nextDir = "RIGHT";
    s.score = 0;
    s.gameOver = false;
    s.started = true;
    setScore(0);
    setGameOver(false);
    setStarted(true);
    if (loopRef.current) clearInterval(loopRef.current);
    loopRef.current = setInterval(tick, 120);
    draw();
  };

  useEffect(() => {
    return () => {
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6 text-sm font-mono">
        <span className="neon-text-cyan">
          Ball: <b>{score}</b>
        </span>
        {started && !gameOver && (
          <span className="text-muted-foreground">Arrow / WASD boshqaruv</span>
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        role="img"
        aria-label="Snake o'yini maydoni"
        className="rounded-lg border border-[rgba(0,255,255,0.25)] bg-[#050510]"
        style={{ maxWidth: "100%", imageRendering: "pixelated" }}
      />
      <div className="flex gap-3">
        <button
          type="button"
          data-ocid="snake.start_button"
          onClick={startGame}
          className="px-5 py-2 rounded-lg font-semibold text-sm transition-smooth neon-border-cyan neon-text-cyan hover:bg-[rgba(0,255,255,0.1)]"
        >
          {gameOver || !started ? "Boshlash" : "Qayta o'ynash"}
        </button>
      </div>
      {/* Mobile D-pad */}
      <div className="grid grid-cols-3 gap-1 mt-2 sm:hidden">
        {(["up", "left", "right", "down"] as const).map((dir) => {
          const labels: Record<string, string> = {
            up: "↑",
            down: "↓",
            left: "←",
            right: "→",
          };
          const positions: Record<string, string> = {
            up: "col-start-2 row-start-1",
            left: "col-start-1 row-start-2",
            right: "col-start-3 row-start-2",
            down: "col-start-2 row-start-3",
          };
          const dirMap: Record<string, Direction> = {
            up: "UP",
            down: "DOWN",
            left: "LEFT",
            right: "RIGHT",
          };
          const opp: Record<Direction, Direction> = {
            UP: "DOWN",
            DOWN: "UP",
            LEFT: "RIGHT",
            RIGHT: "LEFT",
          };
          return (
            <button
              key={dir}
              type="button"
              onClick={() => {
                const s = stateRef.current;
                const nd = dirMap[dir];
                if (nd && s.dir !== opp[nd]) s.nextDir = nd;
              }}
              className={`w-10 h-10 rounded glass-card neon-text-cyan text-lg flex items-center justify-center ${positions[dir]}`}
            >
              {labels[dir]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Memory Game ─────────────────────────────────────────────────────────────
const EMOJIS = ["🌟", "⚡", "🔥", "💎", "🎯", "🚀", "💡", "🌊"];

type MemCard = {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
};

function MemoryGame() {
  const makeCards = (): MemCard[] => {
    const pairs = [...EMOJIS, ...EMOJIS];
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return pairs.map((e, i) => ({
      id: i,
      emoji: e,
      flipped: false,
      matched: false,
    }));
  };

  const [cards, setCards] = useState<MemCard[]>(makeCards);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [secs, setSecs] = useState(0);
  const [won, setWon] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockRef = useRef(false);

  useEffect(() => {
    timerRef.current = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (won && timerRef.current) clearInterval(timerRef.current);
  }, [won]);

  const flip = (id: number) => {
    if (lockRef.current) return;
    const card = cards[id];
    if (card.flipped || card.matched) return;
    if (selected.length === 1 && selected[0] === id) return;

    const next = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(next);

    if (selected.length === 0) {
      setSelected([id]);
    } else {
      lockRef.current = true;
      setMoves((m) => m + 1);
      const firstId = selected[0];
      if (next[firstId].emoji === next[id].emoji) {
        const matched = next.map((c) =>
          c.id === firstId || c.id === id ? { ...c, matched: true } : c,
        );
        setCards(matched);
        setSelected([]);
        lockRef.current = false;
        if (matched.every((c) => c.matched)) setWon(true);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === id ? { ...c, flipped: false } : c,
            ),
          );
          setSelected([]);
          lockRef.current = false;
        }, 900);
      }
    }
  };

  const restart = () => {
    setCards(makeCards());
    setSelected([]);
    setMoves(0);
    setSecs(0);
    setWon(false);
    lockRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setSecs((s) => s + 1), 1000);
  };

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex gap-6 text-sm font-mono">
        <span className="neon-text-cyan">
          Vaqt: <b>{fmt(secs)}</b>
        </span>
        <span className="neon-text-purple">
          Harakatlar: <b>{moves}</b>
        </span>
      </div>

      {won ? (
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="text-4xl">🎉</div>
          <p className="gradient-text text-2xl font-bold">Tabriklaymiz!</p>
          <p className="text-muted-foreground text-sm">
            {moves} harakat · {fmt(secs)}
          </p>
          <button
            type="button"
            data-ocid="memory.restart_button"
            onClick={restart}
            className="px-5 py-2 rounded-lg font-semibold text-sm neon-border-cyan neon-text-cyan hover:bg-[rgba(0,255,255,0.1)] transition-smooth"
          >
            Qayta o'ynash
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-[340px]">
            {cards.map((card) => (
              <button
                key={card.id}
                type="button"
                data-ocid={`memory.card.${card.id}`}
                onClick={() => flip(card.id)}
                className={`aspect-square rounded-lg text-2xl flex items-center justify-center transition-all duration-300 select-none font-mono
                  ${
                    card.matched
                      ? "neon-border-lime bg-[rgba(0,255,0,0.08)] shadow-[0_0_14px_#00ff00]"
                      : card.flipped
                        ? "neon-border-cyan glass-card"
                        : "glass-card border border-[rgba(0,255,255,0.15)] hover:border-[rgba(0,255,255,0.5)] cursor-pointer hover:scale-105"
                  }`}
              >
                {card.flipped || card.matched ? card.emoji : "?"}
              </button>
            ))}
          </div>
          <button
            type="button"
            data-ocid="memory.restart_button"
            onClick={restart}
            className="px-5 py-2 rounded-lg font-semibold text-sm neon-border-pink neon-text-pink hover:bg-[rgba(255,0,128,0.08)] transition-smooth"
          >
            Qayta boshlash
          </button>
        </>
      )}
    </div>
  );
}

// ─── Catch the Ball ───────────────────────────────────────────────────────────
const NEON_COLORS = ["#00ffff", "#ff00ff", "#00ff00", "#ff0080", "#ffff00"];

type Ball = {
  id: number;
  x: number;
  y: number;
  r: number;
  speed: number;
  color: string;
};

function CatchBallGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    balls: [] as Ball[],
    score: 0,
    timeLeft: 30,
    running: false,
    nextId: 0,
  });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const W = 380;
  const H = 300;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = stateRef.current;

    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(0,255,255,0.04)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < W; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, H);
      ctx.stroke();
    }
    for (let j = 0; j < H; j += 30) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(W, j);
      ctx.stroke();
    }

    for (const b of s.balls) {
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 18;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (!s.running && !gameOver) {
      ctx.fillStyle = "rgba(5,5,16,0.7)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "15px 'DM Sans', sans-serif";
      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#00ffff";
      ctx.textAlign = "center";
      ctx.fillText("Boshlash uchun tugmani bos", W / 2, H / 2);
      ctx.shadowBlur = 0;
    }
  }, [gameOver]);

  const loop = useCallback(() => {
    const s = stateRef.current;
    if (!s.running) return;
    for (const b of s.balls) {
      b.y += b.speed;
    }
    s.balls = s.balls.filter((b) => b.y - b.r < H);
    draw();
    rafRef.current = requestAnimationFrame(loop);
  }, [draw]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (W / rect.width);
    const my = (e.clientY - rect.top) * (H / rect.height);
    const s = stateRef.current;
    const hit = s.balls.findIndex(
      (b) => Math.hypot(b.x - mx, b.y - my) <= b.r + 6,
    );
    if (hit !== -1) {
      s.balls.splice(hit, 1);
      s.score++;
      setScore(s.score);
    }
  }, []);

  const handleTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const t = e.touches[0];
    const mx = (t.clientX - rect.left) * (W / rect.width);
    const my = (t.clientY - rect.top) * (H / rect.height);
    const s = stateRef.current;
    const hit = s.balls.findIndex(
      (b) => Math.hypot(b.x - mx, b.y - my) <= b.r + 8,
    );
    if (hit !== -1) {
      s.balls.splice(hit, 1);
      s.score++;
      setScore(s.score);
    }
  }, []);

  const startGame = () => {
    const s = stateRef.current;
    s.balls = [];
    s.score = 0;
    s.timeLeft = 30;
    s.running = true;
    s.nextId = 0;
    setScore(0);
    setTimeLeft(30);
    setRunning(true);
    setGameOver(false);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);

    spawnRef.current = setInterval(() => {
      s.balls.push({
        id: s.nextId++,
        x: Math.random() * (W - 40) + 20,
        y: -20,
        r: Math.random() * 10 + 12,
        speed: Math.random() * 2 + 1.5,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
      });
    }, 600);

    timerRef.current = setInterval(() => {
      s.timeLeft--;
      setTimeLeft(s.timeLeft);
      if (s.timeLeft <= 0) {
        s.running = false;
        setRunning(false);
        setGameOver(true);
        if (spawnRef.current) clearInterval(spawnRef.current);
        if (timerRef.current) clearInterval(timerRef.current);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        draw();
      }
    }, 1000);

    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    draw();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, [draw]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6 text-sm font-mono">
        <span className="neon-text-cyan">
          Ball: <b>{score}</b>
        </span>
        <span className="neon-text-lime">
          Vaqt: <b>{timeLeft}s</b>
        </span>
      </div>
      {gameOver && (
        <div className="text-center">
          <p className="neon-text-pink font-bold text-lg">O'yin tugadi!</p>
          <p className="text-muted-foreground text-sm">
            Yakuniy ball: <b className="neon-text-cyan">{score}</b>
          </p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        role="img"
        aria-label="To'p ushlash o'yini"
        className="rounded-lg border border-[rgba(0,255,255,0.2)] cursor-crosshair"
        style={{ maxWidth: "100%", touchAction: "none" }}
        onClick={handleClick}
        onKeyDown={() => {}}
        onTouchStart={handleTouch}
      />
      <button
        type="button"
        data-ocid="catch.start_button"
        onClick={startGame}
        className="px-5 py-2 rounded-lg font-semibold text-sm neon-border-cyan neon-text-cyan hover:bg-[rgba(0,255,255,0.1)] transition-smooth"
      >
        {gameOver || !running ? "Boshlash" : "Qayta o'ynash"}
      </button>
    </div>
  );
}

// ─── Whack a Mole ─────────────────────────────────────────────────────────────
function WhackMoleGame() {
  const [holes, setHoles] = useState<boolean[]>(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [whacked, setWhacked] = useState<number | null>(null);

  const speedRef = useRef(900);
  const moleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeLeftRef = useRef(30);
  const runningRef = useRef(false);

  const showMole = useCallback(() => {
    if (!runningRef.current) return;
    const idx = Math.floor(Math.random() * 9);
    setHoles((_prev) => {
      const next = Array(9).fill(false) as boolean[];
      next[idx] = true;
      return next;
    });
    moleTimerRef.current = setTimeout(() => {
      setHoles(Array(9).fill(false));
      const elapsed = 30 - timeLeftRef.current;
      speedRef.current = Math.max(350, 900 - elapsed * 18);
      moleTimerRef.current = setTimeout(showMole, 200);
    }, speedRef.current);
  }, []);

  const startGame = () => {
    setHoles(Array(9).fill(false));
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setRunning(true);
    speedRef.current = 900;
    timeLeftRef.current = 30;
    runningRef.current = true;

    if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    // Start mole spawning
    moleTimerRef.current = setTimeout(showMole, 300);

    countdownRef.current = setInterval(() => {
      timeLeftRef.current--;
      setTimeLeft(timeLeftRef.current);
      if (timeLeftRef.current <= 0) {
        runningRef.current = false;
        setRunning(false);
        setGameOver(true);
        setHoles(Array(9).fill(false));
        if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
        if (countdownRef.current) clearInterval(countdownRef.current);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const whack = (idx: number) => {
    if (!runningRef.current || !holes[idx]) return;
    setScore((s) => s + 1);
    setWhacked(idx);
    setHoles((prev) => {
      const n = [...prev];
      n[idx] = false;
      return n;
    });
    setTimeout(() => setWhacked(null), 300);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-6 text-sm font-mono">
        <span className="neon-text-lime">
          Ball: <b>{score}</b>
        </span>
        <span className="neon-text-cyan">
          Vaqt: <b>{timeLeft}s</b>
        </span>
      </div>

      {gameOver && (
        <div className="text-center">
          <p className="neon-text-pink font-bold text-lg">O'yin tugadi!</p>
          <p className="text-muted-foreground text-sm">
            Natija: <b className="neon-text-lime">{score}</b> mole
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {holes.map((hasMole, i) => (
          <button
            key={`hole-${i + 1}`}
            type="button"
            data-ocid={`whack.hole.${i + 1}`}
            onClick={() => whack(i)}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl transition-all duration-200 select-none
              ${
                hasMole
                  ? "glass-card neon-border-lime scale-110 cursor-pointer hover:scale-125 active:scale-95"
                  : "glass-card border border-[rgba(0,255,0,0.1)] cursor-default opacity-60"
              }
              ${whacked === i ? "brightness-150" : ""}`}
          >
            {hasMole ? "🐭" : "🕳️"}
          </button>
        ))}
      </div>

      <button
        type="button"
        data-ocid="whack.start_button"
        onClick={startGame}
        className="px-5 py-2 rounded-lg font-semibold text-sm neon-border-lime neon-text-lime hover:bg-[rgba(0,255,0,0.08)] transition-smooth"
      >
        {gameOver || !running ? "Boshlash" : "Qayta o'ynash"}
      </button>
    </div>
  );
}

// ─── Game Modal ───────────────────────────────────────────────────────────────
const GAME_META: Record<
  Exclude<GameType, null>,
  { title: string; color: string; borderClass: string }
> = {
  snake: {
    title: "Snake O'yini",
    color: "#00ff80",
    borderClass: "neon-border-cyan",
  },
  memory: {
    title: "Xotira Kartalar",
    color: "#ff00ff",
    borderClass: "neon-border-purple",
  },
  catch: {
    title: "To'p Ushlash",
    color: "#00ffff",
    borderClass: "neon-border-cyan",
  },
  whack: {
    title: "Ko'rtakning Boshi",
    color: "#00ff00",
    borderClass: "neon-border-lime",
  },
};

function GameModal({
  game,
  onClose,
}: {
  game: Exclude<GameType, null>;
  onClose: () => void;
}) {
  const meta = GAME_META[game];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backdropFilter: "blur(12px)",
        background: "rgba(5,5,16,0.85)",
      }}
      data-ocid={`${game}.dialog`}
    >
      <div
        className={`relative glass-card ${meta.borderClass} rounded-2xl p-6 w-full max-w-[500px] max-h-[90vh] overflow-y-auto`}
        style={{ animation: "slide-up 0.3s ease" }}
      >
        {/* Close */}
        <button
          type="button"
          data-ocid={`${game}.close_button`}
          onClick={onClose}
          aria-label="Yopish"
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass-card border border-[rgba(255,0,128,0.4)] flex items-center justify-center neon-text-pink hover:bg-[rgba(255,0,128,0.12)] transition-smooth text-lg font-bold"
        >
          ✕
        </button>

        {/* Title */}
        <h2
          className="font-display text-xl font-bold mb-5 text-center"
          style={{
            color: meta.color,
            textShadow: `0 0 14px ${meta.color}`,
          }}
        >
          {meta.title}
        </h2>

        {game === "snake" && <SnakeGame />}
        {game === "memory" && <MemoryGame />}
        {game === "catch" && <CatchBallGame />}
        {game === "whack" && <WhackMoleGame />}
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
type CardColor = "cyan" | "purple" | "lime" | "pink";

const colorMeta: Record<
  CardColor,
  { border: string; badge: string; btn: string }
> = {
  cyan: {
    border: "neon-border-cyan",
    badge:
      "bg-[rgba(0,255,255,0.12)] neon-text-cyan border border-[rgba(0,255,255,0.4)]",
    btn: "neon-border-cyan neon-text-cyan hover:bg-[rgba(0,255,255,0.1)]",
  },
  purple: {
    border: "neon-border-purple",
    badge:
      "bg-[rgba(255,0,255,0.12)] neon-text-purple border border-[rgba(255,0,255,0.4)]",
    btn: "neon-border-purple neon-text-purple hover:bg-[rgba(255,0,255,0.1)]",
  },
  lime: {
    border: "neon-border-lime",
    badge:
      "bg-[rgba(0,255,0,0.12)] neon-text-lime border border-[rgba(0,255,0,0.4)]",
    btn: "neon-border-lime neon-text-lime hover:bg-[rgba(0,255,0,0.1)]",
  },
  pink: {
    border: "neon-border-pink",
    badge:
      "bg-[rgba(255,0,128,0.12)] neon-text-pink border border-[rgba(255,0,128,0.4)]",
    btn: "neon-border-pink neon-text-pink hover:bg-[rgba(255,0,128,0.1)]",
  },
};

interface ProjectCardProps {
  color: CardColor;
  category: string;
  title: string;
  description: string;
  tags: string[];
  btnLabel: string;
  ocid: string;
  disabled?: boolean;
  disabledBadge?: string;
  onClick?: () => void;
  href?: string;
}

function ProjectCard({
  color,
  category,
  title,
  description,
  tags,
  btnLabel,
  ocid,
  disabled,
  disabledBadge,
  onClick,
  href,
}: ProjectCardProps) {
  const cm = colorMeta[color];

  return (
    <article
      data-ocid={ocid}
      className={`glass-card ${cm.border} rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] group`}
      style={{ animation: "slide-up 0.4s ease both" }}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${cm.badge}`}
        >
          {category}
        </span>
        {disabledBadge && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.07)] text-muted-foreground border border-[rgba(255,255,255,0.1)]">
            {disabledBadge}
          </span>
        )}
      </div>

      <h3 className="font-display font-bold text-lg leading-snug text-foreground group-hover:text-white transition-colors">
        {title}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-muted-foreground border border-[rgba(255,255,255,0.08)] font-mono"
          >
            {tag}
          </span>
        ))}
      </div>

      {!disabled && href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`${ocid}.link`}
          className={`mt-1 px-4 py-2 rounded-lg text-sm font-semibold text-center transition-smooth ${cm.btn}`}
        >
          {btnLabel}
        </a>
      )}
      {!disabled && !href && onClick && (
        <button
          type="button"
          data-ocid={`${ocid}.open_modal_button`}
          onClick={onClick}
          className={`mt-1 px-4 py-2 rounded-lg text-sm font-semibold transition-smooth ${cm.btn}`}
        >
          {btnLabel}
        </button>
      )}
      {disabled && (
        <div className="mt-1 px-4 py-2 rounded-lg text-sm font-semibold text-center opacity-40 cursor-not-allowed glass-card border border-[rgba(255,255,255,0.1)] text-muted-foreground">
          {btnLabel}
        </div>
      )}
    </article>
  );
}

// ─── Projects Page ────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeGame, setActiveGame] = useState<GameType>(null);

  return (
    <section
      data-ocid="projects.page"
      className="min-h-screen py-16 px-4 sm:px-6 cyber-grid"
    >
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold mb-4 gradient-text">
          Loyihalar
        </h1>
        <p className="text-muted-foreground text-lg">
          Mening kichik loyihalarim va o'yinlarim
        </p>
        <div
          className="mt-6 mx-auto w-32 h-0.5"
          style={{
            background:
              "linear-gradient(90deg,transparent,#00ffff,#ff00ff,transparent)",
            boxShadow: "0 0 12px #00ffff",
          }}
        />
      </div>

      {/* Cards Grid */}
      <div
        data-ocid="projects.list"
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProjectCard
          color="cyan"
          category="Asosiy Loyiha"
          title="AURA Smart-Manager"
          description="Aqlli vazifa va vaqt boshqaruv tizimi. AI yordamida samaradorlikni oshirish."
          tags={["React", "TypeScript", "AI"]}
          btnLabel="Ko'rish →"
          ocid="projects.item.1"
          disabled
          disabledBadge="Tez kunda"
        />
        <ProjectCard
          color="lime"
          category="Jonli Loyiha"
          title="Typing Speed Test"
          description="Terish tezligini o'lchash vositasi. O'z yozish tezligingizni sinab ko'ring!"
          tags={["HTML", "CSS", "JavaScript"]}
          btnLabel="Ko'rish →"
          ocid="projects.item.2"
          href="https://doniyor-typing09.netlify.app"
        />
        <ProjectCard
          color="purple"
          category="Mini O'yin"
          title="Snake O'yini"
          description="Klassik iloncha o'yini. Ovqat ye, o'sib bor, devorlarga tegma!"
          tags={["Canvas", "JavaScript"]}
          btnLabel="O'ynash →"
          ocid="projects.item.3"
          onClick={() => setActiveGame("snake")}
        />
        <ProjectCard
          color="pink"
          category="Mini O'yin"
          title="Xotira Kartalar"
          description="Juftliklar topish o'yini. Xotirangizni mashq qildiring!"
          tags={["React", "CSS"]}
          btnLabel="O'ynash →"
          ocid="projects.item.4"
          onClick={() => setActiveGame("memory")}
        />
        <ProjectCard
          color="cyan"
          category="Mini O'yin"
          title="To'p Ushlash"
          description="Tushayotgan to'plarni ushlang! 30 soniyada maksimal ball to'plang."
          tags={["Canvas", "JavaScript"]}
          btnLabel="O'ynash →"
          ocid="projects.item.5"
          onClick={() => setActiveGame("catch")}
        />
        <ProjectCard
          color="lime"
          category="Mini O'yin"
          title="Ko'rtakning Boshi"
          description="Ko'rshapalakni urib ko'ring! 30 soniyada ko'proq ball to'plang."
          tags={["React", "CSS"]}
          btnLabel="O'ynash →"
          ocid="projects.item.6"
          onClick={() => setActiveGame("whack")}
        />
      </div>

      {/* Game Modal */}
      {activeGame && (
        <GameModal game={activeGame} onClose={() => setActiveGame(null)} />
      )}
    </section>
  );
}
