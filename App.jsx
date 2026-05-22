import React from "react";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #312e81, #7e22ce, #db2777)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>
        <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
          Math Quest Live
        </h1>

        <p style={{ fontSize: "24px", marginTop: "20px" }}>
          Multiplayer Grade 7 Math Game
        </p>

        <div
          style={{
            marginTop: "40px",
            background: "rgba(255,255,255,0.1)",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <h2>Realtime ready 🚀</h2>
          <p>Your deployment is working!</p>
          <p>Next step: multiplayer syncing.</p>
        </div>
      </div>
    </div>
  );
}
