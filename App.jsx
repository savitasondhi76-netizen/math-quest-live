
import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy, Coins, Sparkles, LockKeyhole, Shuffle, Star,
  Volume2, Crown, Play, UserPlus, Monitor, Wifi, Copy, Settings
} from "lucide-react";

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || "";
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const messages = [
  "Brilliant thinking — your maths brain is glowing!",
  "Fantastic! You solved that like a champion.",
  "Amazing accuracy — keep that confidence rising!",
  "Superb work! You are building real mastery.",
  "Excellent answer — your effort is paying off.",
  "Wonderful! That was smart and focused.",
  "Great job! You just levelled up your learning.",
  "Outstanding! You tackled that beautifully.",
  "Impressive! Your problem-solving skills are shining.",
  "Yes! You are turning practice into power.",
  "Terrific! Keep going — success loves persistence.",
  "Magnificent! That answer deserves applause.",
  "You nailed it! Your reasoning is getting stronger.",
  "Fabulous! Every correct answer builds confidence.",
  "Champion move! Keep aiming high.",
  "Sharp thinking! Maths is becoming your superpower.",
  "Excellent focus — that was a winning answer.",
  "Well done! You made that question look easy.",
  "Inspired answer! Keep the momentum going.",
  "Spectacular! You are on a learning streak.",
  "Gold-star thinking! Keep shining bright."
];

const questions = [
  { q: "A is 4 units right and 3 units up from the origin. What are its coordinates?", choices: ["(4, 3)", "(-4, 3)", "(3, 4)", "(4, -3)"], answer: 0 },
  { q: "B is 5 units left and 2 units down from the origin. What are its coordinates?", choices: ["(5, 2)", "(-5, -2)", "(-2, -5)", "(5, -2)"], answer: 1 },
  { q: "C lies on the y-axis and is 6 units above the origin. What are its coordinates?", choices: ["(6, 0)", "(0, -6)", "(0, 6)", "(6, 6)"], answer: 2 },
  { q: "Which quadrant contains the point (6, 3)?", choices: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], answer: 0 },
  { q: "Which quadrant contains the point (-4, 7)?", choices: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], answer: 1 },
  { q: "Which quadrant contains the point (-5, -8)?", choices: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], answer: 2 },
  { q: "Find the midpoint of P(1, 2) and Q(7, 2).", choices: ["(3, 2)", "(4, 2)", "(8, 4)", "(4, 4)"], answer: 1 },
  { q: "Find the midpoint of (4, 6) and (10, 2).", choices: ["(7, 4)", "(6, 8)", "(14, 8)", "(3, 2)"], answer: 0 },
  { q: "Find the midpoint of (-5, -3) and (7, 5).", choices: ["(1, 1)", "(2, 2)", "(-1, -1)", "(6, 4)"], answer: 0 },
  { q: "Find the distance between (2, 1) and (2, 9).", choices: ["6 units", "7 units", "8 units", "10 units"], answer: 2 },
  { q: "Find the distance between (-4, 5) and (3, 5).", choices: ["5 units", "6 units", "7 units", "9 units"], answer: 2 },
  { q: "Find the distance between (1, 2) and (5, 5).", choices: ["3 units", "4 units", "5 units", "6 units"], answer: 2 },
  { q: "Solve: x + y = 14 and x - y = 6. What is x?", choices: ["4", "6", "8", "10"], answer: 3 },
  { q: "Solve: x + y = 14 and x - y = 6. What is y?", choices: ["2", "4", "6", "8"], answer: 1 },
  { q: "Solve: 2x + y = 15 and x + y = 9. What is x?", choices: ["3", "4", "5", "6"], answer: 3 },
  { q: "Solve: 3x + y = 17 and x + y = 9. What is x?", choices: ["3", "4", "5", "6"], answer: 1 },
  { q: "The sum of two numbers is 20 and their difference is 4. What are the numbers?", choices: ["10 and 10", "12 and 8", "14 and 6", "16 and 4"], answer: 1 },
  { q: "A burger and juice cost $12. Two burgers and one juice cost $19. What is one burger?", choices: ["$5", "$6", "$7", "$8"], answer: 2 },
  { q: "A burger and juice cost $12. Two burgers and one juice cost $19. What is one juice?", choices: ["$4", "$5", "$6", "$7"], answer: 1 },
  { q: "Angles in a triangle are 55°, 48°, and x°. Find x.", choices: ["67°", "77°", "87°", "97°"], answer: 1 },
  { q: "Angles in a quadrilateral are 75°, 110°, 95°, and x°. Find x.", choices: ["70°", "80°", "90°", "100°"], answer: 1 },
  { q: "What is the sum of interior angles of a pentagon?", choices: ["360°", "540°", "720°", "900°"], answer: 1 },
  { q: "What is the sum of interior angles of a hexagon?", choices: ["540°", "720°", "900°", "1080°"], answer: 1 },
  { q: "What is each interior angle of a regular hexagon?", choices: ["90°", "108°", "120°", "135°"], answer: 2 },
  { q: "What is the exterior angle of a regular octagon?", choices: ["30°", "36°", "40°", "45°"], answer: 3 },
  { q: "Angles opposite each other when two lines cross are called...", choices: ["Corresponding angles", "Vertically opposite angles", "Co-interior angles", "Alternate angles"], answer: 1 },
  { q: "Angles in matching positions on parallel lines are called...", choices: ["Corresponding angles", "Vertically opposite angles", "Supplementary angles", "Reflex angles"], answer: 0 },
  { q: "Angles inside parallel lines forming a Z shape are called...", choices: ["Alternate angles", "Corresponding angles", "Co-interior angles", "Vertically opposite angles"], answer: 0 },
  { q: "If one angle is 135° on parallel lines, what is a co-interior angle?", choices: ["35°", "45°", "135°", "180°"], answer: 1 },
  { q: "Complete: 6, 12, 18, 24, __", choices: ["28", "30", "32", "36"], answer: 1 },
  { q: "Complete: 90, 80, 70, 60, __", choices: ["40", "45", "50", "55"], answer: 2 },
  { q: "Complete: 3, 9, 27, 81, __", choices: ["108", "162", "216", "243"], answer: 3 },
  { q: "Find the nth term: 2, 6, 10, 14, ...", choices: ["2n", "4n - 2", "4n + 2", "n + 4"], answer: 1 },
  { q: "Find the nth term: 7, 12, 17, 22, ...", choices: ["5n + 2", "5n - 2", "7n - 5", "n + 5"], answer: 0 },
  { q: "Find the 10th term: 5, 10, 15, 20, ...", choices: ["45", "50", "55", "60"], answer: 1 },
  { q: "Find the 10th term: 4, 7, 10, 13, ...", choices: ["28", "29", "30", "31"], answer: 3 },
  { q: "Triangle, Quadrilateral, Pentagon, Hexagon... What comes next?", choices: ["Heptagon", "Octagon", "Nonagon", "Decagon"], answer: 0 },
  { q: "The interior angles of a pentagon are x, x+15, x+30, x+45, x+60. What is x?", choices: ["78°", "84°", "90°", "96°"], answer: 3 },
  { q: "Distance between (3, 5) and (3, y) is 12. What are possible y values?", choices: ["12 and -12", "17 and -7", "15 and -9", "7 and -17"], answer: 1 },
  { q: "Solve: 2x + y = 16 and 3x - y = 14. What is x?", choices: ["4", "5", "6", "7"], answer: 2 }
];

function makeCode() { return Math.random().toString(36).slice(2, 8).toUpperCase(); }
function makeId() { return crypto?.randomUUID?.() || Math.random().toString(36).slice(2); }
function makeSecretCode() { return String(Math.floor(100 + Math.random() * 900)); }

function playDrumRoll() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const now = ctx.currentTime;
  for (let i = 0; i < 18; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = i % 2 ? "triangle" : "square";
    osc.frequency.setValueAtTime(95 + i * 8, now + i * 0.045);
    gain.gain.setValueAtTime(0.001, now + i * 0.045);
    gain.gain.exponentialRampToValueAtTime(0.08, now + i * 0.045 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.045 + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.045);
    osc.stop(now + i * 0.045 + 0.05);
  }
  const finalOsc = ctx.createOscillator();
  const finalGain = ctx.createGain();
  finalOsc.type = "sine";
  finalOsc.frequency.setValueAtTime(523, now + 0.9);
  finalOsc.frequency.exponentialRampToValueAtTime(784, now + 1.15);
  finalGain.gain.setValueAtTime(0.001, now + 0.9);
  finalGain.gain.exponentialRampToValueAtTime(0.12, now + 0.95);
  finalGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);
  finalOsc.connect(finalGain);
  finalGain.connect(ctx.destination);
  finalOsc.start(now + 0.9);
  finalOsc.stop(now + 1.25);
}

const defaultRoomState = code => ({
  roomCode: code,
  status: "lobby",
  questionIndex: 0,
  round: 1,
  showAnswer: false,
  players: [],
  answered: {},
  activity: [],
  settings: { maxPlayers: 21, correctCredits: 10, stealCredits: 15, wrongGuessFee: 5 }
});

async function saveRoom(roomCode, state) {
  if (!supabase) throw new Error("Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.");
  const { error } = await supabase.from("math_rooms").upsert({ room_code: roomCode, state, updated_at: new Date().toISOString() });
  if (error) throw error;
}

async function getRoom(roomCode) {
  if (!supabase) throw new Error("Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.");
  const { data, error } = await supabase.from("math_rooms").select("state").eq("room_code", roomCode).single();
  if (error) throw error;
  return data.state;
}

function Button({ children, onClick, kind = "", disabled = false }) {
  return <button className={`btn ${kind}`} onClick={onClick} disabled={disabled}>{children}</button>;
}

export default function App() {
  const [mode, setMode] = useState("home");
  const [roomCode, setRoomCode] = useState("");
  const [room, setRoom] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentId] = useState(localStorage.getItem("mq_student_id") || makeId());
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [selected, setSelected] = useState(null);
  const [stealTarget, setStealTarget] = useState("");
  const [secretGuess, setSecretGuess] = useState("");

  useEffect(() => { localStorage.setItem("mq_student_id", studentId); }, [studentId]);

  useEffect(() => {
    if (!supabase || !roomCode) return;
    const channel = supabase
      .channel(`math-room-${roomCode}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "math_rooms", filter: `room_code=eq.${roomCode}` }, payload => {
        if (payload.new?.state) setRoom(payload.new.state);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [roomCode]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("room");
    if (code && !roomCode) {
      setJoinCode(code.toUpperCase());
      setMode("join");
    }
  }, []);

  const currentQuestion = room ? questions[room.questionIndex % questions.length] : questions[0];
  const me = room?.players?.find(p => p.id === studentId);
  const sortedPlayers = useMemo(() => [...(room?.players || [])].sort((a, b) => b.credits - a.credits), [room]);
  const hasAnswered = !!room?.answered?.[studentId];
  const joinUrl = roomCode ? `${window.location.origin}${window.location.pathname}?room=${roomCode}` : "";

  async function createRoom() {
    setError("");
    try {
      const code = makeCode();
      const newRoom = defaultRoomState(code);
      await saveRoom(code, newRoom);
      setRoomCode(code);
      setRoom(newRoom);
      setMode("host");
    } catch (e) { setError(e.message); }
  }

  async function joinRoom() {
    setError("");
    try {
      const code = joinCode.trim().toUpperCase();
      if (!code || !studentName.trim()) throw new Error("Please enter your name and room code.");
      const existing = await getRoom(code);
      if ((existing.players || []).length >= existing.settings.maxPlayers && !existing.players.some(p => p.id === studentId)) {
        throw new Error("This room already has 21 students.");
      }
      const next = {
        ...existing,
        players: existing.players.some(p => p.id === studentId)
          ? existing.players.map(p => p.id === studentId ? { ...p, name: studentName.trim() } : p)
          : [...existing.players, { id: studentId, name: studentName.trim(), credits: 0, streak: 0, secretCode: makeSecretCode(), joinedAt: Date.now() }],
        activity: [`${studentName.trim()} joined the room.`, ...(existing.activity || [])].slice(0, 8)
      };
      await saveRoom(code, next);
      setRoomCode(code);
      setRoom(next);
      setMode("student");
    } catch (e) { setError(e.message); }
  }

  async function updateRoom(mutator) {
    const latest = await getRoom(roomCode);
    const next = mutator(latest);
    await saveRoom(roomCode, next);
    setRoom(next);
  }

  async function startGame() {
    await updateRoom(r => ({ ...r, status: "playing", showAnswer: false, answered: {}, activity: [`Host started Round ${r.round}.`, ...(r.activity || [])].slice(0, 8) }));
  }

  async function nextQuestion() {
    await updateRoom(r => ({
      ...r,
      questionIndex: (r.questionIndex + 1) % questions.length,
      round: r.round + 1,
      showAnswer: false,
      answered: {},
      activity: [`Question ${r.round + 1} is live.`, ...(r.activity || [])].slice(0, 8)
    }));
    setFeedback(null);
    setSelected(null);
  }

  async function revealAnswer() {
    await updateRoom(r => ({ ...r, showAnswer: true, activity: [`Host revealed the answer.`, ...(r.activity || [])].slice(0, 8) }));
  }

  async function resetRoom() {
    await updateRoom(r => ({ ...defaultRoomState(r.roomCode), players: r.players.map(p => ({ ...p, credits: 0, streak: 0, secretCode: makeSecretCode() })), activity: ["Host reset the game."] }));
  }

  async function answerQuestion(index) {
    if (!room || !me || room.status !== "playing" || hasAnswered) return;
    setSelected(index);
    const correct = index === currentQuestion.answer;
    const message = messages[(room.round + room.players.findIndex(p => p.id === studentId)) % messages.length];
    await updateRoom(r => {
      if (r.answered?.[studentId]) return r;
      const q = questions[r.questionIndex % questions.length];
      const isCorrect = index === q.answer;
      const playerName = r.players.find(p => p.id === studentId)?.name || "A student";
      return {
        ...r,
        answered: { ...r.answered, [studentId]: { choice: index, correct: isCorrect, at: Date.now() } },
        players: r.players.map(p => p.id === studentId ? {
          ...p,
          credits: p.credits + (isCorrect ? r.settings.correctCredits + Math.min(p.streak * 2, 10) : 0),
          streak: isCorrect ? p.streak + 1 : 0
        } : p),
        activity: [`${playerName} answered ${isCorrect ? "correctly" : "incorrectly"}.`, ...(r.activity || [])].slice(0, 8)
      };
    });
    if (correct) playDrumRoll();
    setFeedback({ correct, message });
  }

  async function stealCredits() {
    if (!stealTarget || !secretGuess.trim()) return;
    await updateRoom(r => {
      const actor = r.players.find(p => p.id === studentId);
      const target = r.players.find(p => p.id === stealTarget);
      if (!actor || !target || actor.id === target.id) return r;
      const success = secretGuess.trim() === target.secretCode;
      const steal = Math.min(r.settings.stealCredits, target.credits);
      return {
        ...r,
        players: r.players.map(p => {
          if (success && p.id === actor.id) return { ...p, credits: p.credits + steal };
          if (success && p.id === target.id) return { ...p, credits: Math.max(0, p.credits - steal) };
          if (!success && p.id === actor.id) return { ...p, credits: Math.max(0, p.credits - r.settings.wrongGuessFee) };
          return p;
        }),
        activity: [success ? `${actor.name} cracked ${target.name}'s secret code and won ${steal} gold!` : `${actor.name} tried a secret-code challenge. The vault stayed safe.`, ...(r.activity || [])].slice(0, 8)
      };
    });
    setSecretGuess("");
    setStealTarget("");
  }

  function copyJoinLink() { navigator.clipboard?.writeText(joinUrl); }

  const Shell = ({ children }) => (
    <div className="app">
      <div className="wrap">
        <header className="header">
          <div>
            <h1 className="title"><Sparkles /> Math Quest Live</h1>
            <p className="subtitle">Blooket-style Grade 7 multiplayer gold rush</p>
          </div>
          <div className="status-pill"><Wifi size={20} /> {supabase ? "Realtime ready" : "Needs Supabase setup"}</div>
        </header>
        {children}
      </div>
    </div>
  );

  if (mode === "home") return (
    <Shell>
      <div className="grid grid-3">
        <div className="card">
          <div className="card-pad">
            <h2>Choose your role</h2>
            <p>The teacher creates a room. Students join from laptop, mobile, or iPad using the room code or link.</p>
            <div className="grid grid-2">
              <Button onClick={createRoom}><Monitor /> I am the Host / Teacher</Button>
              <Button onClick={() => setMode("join")} kind="secondary"><UserPlus /> I am a Student</Button>
            </div>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
        <div className="card dark">
          <div className="card-pad">
            <h2>Multiplayer features</h2>
            <p>Room codes and join links</p>
            <p>Live syncing through Supabase</p>
            <p>Student join screens</p>
            <p>Real-time leaderboard</p>
            <p>Host controls</p>
            <p>Safe secret-code gold stealing</p>
          </div>
        </div>
      </div>
    </Shell>
  );

  if (mode === "join") return (
    <Shell>
      <div className="card" style={{ maxWidth: 560, margin: "0 auto" }}>
        <div className="card-pad">
          <h2>Join the game</h2>
          <label className="label">Your name</label>
          <input value={studentName} onChange={e => setStudentName(e.target.value)} className="input" placeholder="Type your name" />
          <label className="label">Room code</label>
          <input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} className="input" placeholder="ABC123" />
          <Button onClick={joinRoom}><UserPlus /> Join Room</Button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </Shell>
  );

  if (mode === "host" && room) return (
    <Shell>
      <div className="grid game-grid">
        <div className="card">
          <div className="hero">
            <div className="row">
              <div>
                <p className="label">ROOM CODE</p>
                <h2 className="room-code">{room.roomCode}</h2>
              </div>
              <div className="row">
                <Button onClick={copyJoinLink} kind="secondary"><Copy size={18} /> Copy Link</Button>
                <Button onClick={startGame}><Play size={18} /> Start</Button>
                <Button onClick={revealAnswer} kind="secondary">Reveal</Button>
                <Button onClick={nextQuestion}><Shuffle size={18} /> Next</Button>
                <Button onClick={resetRoom} kind="danger"><Settings size={18} /> Reset</Button>
              </div>
            </div>
          </div>
          <div className="card-pad">
            <div className="row small"><span>Round {room.round}</span><span>{Object.keys(room.answered || {}).length}/{room.players.length} answered</span></div>
            <h3 className="question">{currentQuestion.q}</h3>
            <div className="choice-grid">
              {currentQuestion.choices.map((choice, index) => (
                <div key={choice} className={`choice ${room.showAnswer && index === currentQuestion.answer ? "correct" : ""}`}>
                  <span className="letter">{String.fromCharCode(65 + index)}</span>{choice}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Leaderboard sortedPlayers={sortedPlayers} room={room} host />
      </div>
    </Shell>
  );

  if (mode === "student" && room && me) return (
    <Shell>
      <div className="grid game-grid">
        <div className="card">
          <div className="hero">
            <div className="row">
              <div><p className="label">PLAYER</p><h2>{me.name}</h2></div>
              <div><p className="label">GOLD CREDITS</p><h2><Coins /> {me.credits}</h2></div>
            </div>
          </div>
          <div className="card-pad">
            {room.status === "lobby" ? (
              <div style={{ textAlign: "center", padding: "50px 0" }}>
                <Crown size={64} color="#f59e0b" />
                <h2>You are in!</h2>
                <p>Wait for your teacher to start the game.</p>
                <p><b>Your secret classroom code: {me.secretCode}</b></p>
                <p className="small">Keep it private. It is only for this game, not a real password.</p>
              </div>
            ) : (
              <>
                <div className="row small"><span>Round {room.round}</span><span>Streak: {me.streak}</span></div>
                <motion.h3 key={room.questionIndex} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="question">{currentQuestion.q}</motion.h3>
                <div className="choice-grid">
                  {currentQuestion.choices.map((choice, index) => {
                    const chosen = selected === index || room.answered?.[studentId]?.choice === index;
                    const revealCorrect = room.showAnswer && index === currentQuestion.answer;
                    return (
                      <button key={choice} disabled={hasAnswered} onClick={() => answerQuestion(index)} className={`choice ${revealCorrect ? "correct" : ""} ${chosen ? "selected" : ""} ${hasAnswered ? "disabled" : ""}`}>
                        <span className="letter">{String.fromCharCode(65 + index)}</span>{choice}
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence>
                  {feedback && (
                    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className={`feedback ${feedback.correct ? "good" : "bad"}`}>
                      {feedback.correct ? <Trophy /> : <Star />}
                      <div>
                        <h3>{feedback.correct ? feedback.message : "Good try — mistakes are proof you are learning. Keep going!"}</h3>
                        {feedback.correct && <p><Volume2 size={16} /> Drum roll celebration earned!</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="vault">
                  <h3><LockKeyhole size={20} /> Secret Code Gold Challenge</h3>
                  <p className="small">Guess another player’s game-only secret code to win gold. Wrong guesses cost a small fee.</p>
                  <div className="grid grid-3">
                    <select value={stealTarget} onChange={e => setStealTarget(e.target.value)} className="input">
                      <option value="">Choose player</option>
                      {room.players.filter(p => p.id !== studentId).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <input value={secretGuess} onChange={e => setSecretGuess(e.target.value)} className="input" placeholder="3-digit code" />
                    <Button onClick={stealCredits} kind="secondary">Try Vault</Button>
                  </div>
                  <p><b>Your secret code: {me.secretCode}</b></p>
                </div>
              </>
            )}
          </div>
        </div>
        <Leaderboard sortedPlayers={sortedPlayers} room={room} />
      </div>
    </Shell>
  );

  return <Shell><p>Loading...</p></Shell>;
}

function Leaderboard({ sortedPlayers, room, host = false }) {
  return (
    <div className="grid">
      <div className="card">
        <div className="card-pad">
          <h2><Trophy color="#f59e0b" /> Live Leaderboard</h2>
          {sortedPlayers.length === 0 && <p className="small">Waiting for students to join...</p>}
          {sortedPlayers.map((p, i) => (
            <motion.div layout key={p.id} className="leader-row">
              <div>
                <span className={`rank ${i === 0 ? "top" : ""}`}>{i + 1}</span>
                <b>{p.name}</b>
                {host && <p className="small">Secret code: {p.secretCode}</p>}
              </div>
              <b><Coins size={16} /> {p.credits}</b>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="card dark">
        <div className="card-pad">
          <h2>Live Activity</h2>
          {(room.activity || []).length === 0 && <p>No activity yet.</p>}
          {(room.activity || []).map((item, i) => <p key={i} className="activity">{item}</p>)}
        </div>
      </div>
    </div>
  );
}
