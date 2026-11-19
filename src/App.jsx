import React, { useEffect, useRef, useState } from "react";

function MovingEdupage({
  reward,
  speed,
  soundEnabled,
  addSvicens,
}) {
  const logoRef = useRef(null);

  const pos = useRef({
    x: Math.random() * 500,
    y: Math.random() * 300,
  });

  const vel = useRef({
    x: 3 + speed,
    y: 2 + speed,
  });

  // The timer below is created once, so it must read the latest props from a ref.
  // Without this, speed upgrades and the audio upgrade never reached logos that already existed.
  const latest = useRef({ reward, speed, soundEnabled, addSvicens });
  latest.current = { reward, speed, soundEnabled, addSvicens };

  useEffect(() => {
    const interval = setInterval(() => {
      const logo = logoRef.current;

      if (!logo) return;

      const {
        reward: rw,
        speed: sp,
        soundEnabled: snd,
        addSvicens: add,
      } = latest.current;

      vel.current.x = Math.sign(vel.current.x) * (3 + sp);
      vel.current.y = Math.sign(vel.current.y) * (2 + sp);

      const w = window.innerWidth - 70;
      const h = window.innerHeight - 70;

      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      let bounced = false;

      if (
        pos.current.x <= 0 ||
        pos.current.x >= w
      ) {
        vel.current.x *= -1;
        bounced = true;
      }

      if (
        pos.current.y <= 0 ||
        pos.current.y >= h
      ) {
        vel.current.y *= -1;
        bounced = true;
      }

      if (bounced) {
        add(rw);

        if (
          snd &&
          !speechSynthesis.speaking
        ) {
          const msg =
            new SpeechSynthesisUtterance(
              "Napíšu ti do edu"
            );

          speechSynthesis.speak(msg);
        }
      }

      logo.style.left =
        pos.current.x + "px";

      logo.style.top =
        pos.current.y + "px";
    }, 16);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <img
      ref={logoRef}
      src="https://play-lh.googleusercontent.com/RsU_654iJptIAJWqXoJVF1kwKJf2XqeYMGaMgDdWnvn4QdR6Xf20mrFxw8cXBpUfhnXa=w240-h480-rw"
      alt=""
      style={{
        width: "70px",
        position: "fixed",
        zIndex: 999,
        pointerEvents: "none",
      }}
    />
  );
}

export default function App() {
  const [svicens, setSvicens] =
    useState(0);

  const [perSecond, setPerSecond] =
    useState(0);

  const [perClick, setPerClick] =
    useState(1);

  const [generatorBought, setGeneratorBought] =
    useState(false);

  const [computerBought, setComputerBought] =
    useState(false);

  const [sabinaBought, setSabinaBought] =
    useState(false);

  const [boostBought, setBoostBought] =
    useState(false);

  const [messageBought, setMessageBought] =
    useState(false);

  const [crusherBought, setCrusherBought] =
    useState(false);

  const [imagesBought, setImagesBought] =
    useState(false);

  const [choralBought, setChoralBought] =
    useState(false);

  const [dolaBought, setDolaBought] =
    useState(false);

  const [planeBought, setPlaneBought] =
    useState(false);

  const [edupageCount, setEdupageCount] =
    useState(0);

  const [edupageCost, setEdupageCost] =
    useState(100);

  const [edupageSpeed, setEdupageSpeed] =
    useState(0);

  const [
    edupageSpeedCost,
    setEdupageSpeedCost,
  ] = useState(500);

  const [eduSound] = useState(true);

  const [choralPlaying, setChoralPlaying] =
    useState(false);

  const choralRef = useRef(null);

  const [crusherPhase, setCrusherPhase] =
    useState("idle");

  const [planeFlying, setPlaneFlying] =
    useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSvicens((prev) =>
        prev + perSecond
      );
    }, 1000);

    return () =>
      clearInterval(interval);
  }, [perSecond]);

  useEffect(() => {
    if (!planeBought) return;

    const interval = setInterval(() => {
      setPlaneFlying(true);

      setPerClick((p) => p + 2);

      setPerSecond((p) => p + 10);

      setTimeout(() => {
        setPlaneFlying(false);

        setPerClick((p) =>
          Math.max(1, p - 2)
        );

        setPerSecond((p) =>
          Math.max(0, p - 10)
        );
      }, 12000);
    }, 60000);

    return () =>
      clearInterval(interval);
  }, [planeBought]);

  function clickMain() {
    setSvicens((prev) =>
      prev + perClick
    );
  }

  function startChoral() {
    if (!choralRef.current) {
      choralRef.current = new Audio(
        import.meta.env.BASE_URL + "svicen-choral.mp3"
      );

      choralRef.current.loop = true;
    }

    choralRef.current.play();

    setChoralPlaying(true);
  }

  function stopChoral() {
    if (choralRef.current) {
      choralRef.current.pause();
    }

    setChoralPlaying(false);
  }

  function startCrusher() {
    if (crusherPhase !== "idle")
      return;

    setCrusherPhase("down");

    setTimeout(() => {
      setCrusherPhase("ready");
    }, 3000);
  }

  function collectCrusher() {
    setSvicens((prev) => prev + 1000);

    setCrusherPhase("idle");
  }

  function buyUpgrade(type) {
    if (
      type === "generator" &&
      svicens >= 10 &&
      !generatorBought
    ) {
      setSvicens((p) => p - 10);
      setPerSecond((p) => p + 1);
      setGeneratorBought(true);
    }

    if (
      type === "computer" &&
      svicens >= 20 &&
      !computerBought
    ) {
      setSvicens((p) => p - 20);
      setPerClick((p) => p + 1);
      setComputerBought(true);
    }

    if (
      type === "sabina" &&
      svicens >= 30 &&
      !sabinaBought
    ) {
      setSvicens((p) => p - 30);
      setSabinaBought(true);
    }

    if (
      type === "boost" &&
      svicens >= 40 &&
      !boostBought
    ) {
      setSvicens((p) => p - 40);
      setPerSecond((p) => p + 2);
      setBoostBought(true);
    }

    if (
      type === "edupage" &&
      svicens >= edupageCost
    ) {
      setSvicens((p) =>
        p - edupageCost
      );

      setEdupageCount((p) => p + 1);

      setPerSecond((p) => p + 1);

      setEdupageCost((p) =>
        Math.floor(p * 1.5)
      );
    }

    if (
      type === "edupageSpeed" &&
      svicens >=
        edupageSpeedCost
    ) {
      setSvicens((p) =>
        p - edupageSpeedCost
      );

      setEdupageSpeed((p) =>
        p + 1
      );

      setEdupageSpeedCost((p) =>
        Math.floor(p * 1.6)
      );
    }

    if (
      type === "message" &&
      svicens >= 1000 &&
      !messageBought
    ) {
      setSvicens((p) => p - 1000);

      setMessageBought(true);

      const choice = window.confirm(
        "NAPÍŠU TI DO EDU 😈\n\nOK = Dej pokoj (+5000)\nCancel = Odejít (+1000)"
      );

      if (choice) {
        setSvicens((p) => p + 5000);
      } else {
        setSvicens((p) => p + 1000);
      }
    }

    if (
      type === "crusher" &&
      svicens >= 3000 &&
      !crusherBought
    ) {
      setSvicens((p) => p - 3000);

      setCrusherBought(true);
    }

    if (
      type === "images" &&
      svicens >= 5000 &&
      !imagesBought
    ) {
      setSvicens((p) => p - 5000);

      setImagesBought(true);
    }

    if (
      type === "choral" &&
      svicens >= 8000 &&
      !choralBought
    ) {
      setSvicens((p) => p - 8000);

      setPerClick((p) => p + 8);

      setChoralBought(true);

      startChoral();
    }

    if (
      type === "dola" &&
      svicens >= 10000 &&
      !dolaBought
    ) {
      setSvicens((p) => p - 10000);

      setDolaBought(true);
    }

    if (
      type === "plane" &&
      svicens >= 100000 &&
      !planeBought
    ) {
      setSvicens((p) =>
        p - 100000
      );

      setPlaneBought(true);
    }
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        inset: 0,
        background:
          "linear-gradient(#4ec0ff,#111)",
        color: "white",
        textAlign: "center",
      }}
    >
      {sabinaBought && (
        <h1
          style={{
            color: "yellow",
            fontSize: "50px",
            textShadow:
              "0 0 20px red",
            animation:
              "sabinaFlash 0.7s infinite",
          }}
        >
          ⚡ SABINA JE BLBÁ ⚡
        </h1>
      )}

      <h1>
        🕯️ SVÍCENS CLICKER
      </h1>

      <h2>
        {Math.floor(svicens)} svícens
      </h2>

      <p>
        +{perSecond}/sec | +
        {perClick}/click
      </p>

      <button
        onClick={clickMain}
        style={{
          background: "transparent",
          border: "none",
        }}
      >
        {computerBought ? (
          <img
            src="https://www.ifantazie.cz/content/images/thumbs/0035088_kovovy-svicen-romantika-5-svetel_0.jpeg"
            alt=""
            width="140"
          />
        ) : (
          <div
            style={{
              padding: "20px",
              background: "#222",
              borderRadius: "20px",
            }}
          >
            💻 CLICK
          </div>
        )}
      </button>

      {computerBought && (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            width: "260px",
            borderRadius: "20px",
          }}
        >
          <source
            src={import.meta.env.BASE_URL + "8873011-uhd_2560_1440_25fps.mp4"}
            type="video/mp4"
          />
        </video>
      )}

      <div>
        {!generatorBought && (
          <button onClick={() => buyUpgrade("generator")}>
            +1/sec — 10
          </button>
        )}

        {!computerBought && (
          <button onClick={() => buyUpgrade("computer")}>
            Candle + Video — 20
          </button>
        )}

        {!sabinaBought && (
          <button onClick={() => buyUpgrade("sabina")}>
            ⚡ SABINA JE BLBÁ ⚡ — 30
          </button>
        )}

        {!boostBought && (
          <button onClick={() => buyUpgrade("boost")}>
            +2/sec — 40
          </button>
        )}

        <button onClick={() => buyUpgrade("edupage")}>
          📘 EduPage — {edupageCost}
        </button>

        <button
          onClick={() =>
            buyUpgrade("edupageSpeed")
          }
        >
          ⚡ Faster Logos —{" "}
          {edupageSpeedCost}
        </button>

        {!messageBought && (
          <button onClick={() => buyUpgrade("message")}>
            📘 Napíšu ti do Edu — 1000
          </button>
        )}

        {!crusherBought && (
          <button onClick={() => buyUpgrade("crusher")}>
            🕯️ Crusher — 3000
          </button>
        )}

        {!imagesBought && (
          <button onClick={() => buyUpgrade("images")}>
            🔊 Edu Audio — 5000
          </button>
        )}

        {!choralBought && (
          <button onClick={() => buyUpgrade("choral")}>
            🎵 Svícen Chorál — 8000
          </button>
        )}

        {choralBought && (
          <button
            onClick={() => {
              if (choralPlaying) {
                stopChoral();
              } else {
                startChoral();
              }
            }}
          >
            {choralPlaying
              ? "⏸ Stop Chorál"
              : "▶️ Play Chorál"}
          </button>
        )}

        {!dolaBought && (
          <button onClick={() => buyUpgrade("dola")}>
            💖 DOLA DOLA — 10000
          </button>
        )}

        {!planeBought && (
          <button onClick={() => buyUpgrade("plane")}>
            ✈️ Plane Upgrade — 100000
          </button>
        )}
      </div>

      {Array.from({
        length: edupageCount,
      }).map((_, i) => (
        <MovingEdupage
          key={i}
          reward={1}
          speed={edupageSpeed}
          soundEnabled={
            imagesBought &&
            eduSound
          }
          addSvicens={(n) =>
            setSvicens((p) => p + n)
          }
        />
      ))}

      {crusherBought && (
        <div
          style={{
            position: "absolute",
            right: "60px",
            bottom: "60px",
            width: "180px",
            height: "260px",
            background: "#333",
            borderRadius: "20px",
            overflow: "hidden",
            border: "5px solid black",
          }}
        >
          <div
            style={{
              position: "absolute",
              top:
                crusherPhase === "down"
                  ? "120px"
                  : crusherPhase ===
                    "ready"
                  ? "160px"
                  : "0px",
              left: "0",
              width: "100%",
              height: "100px",
              background:
                "darkred",
              transition: "1.5s",
            }}
          />

          {crusherPhase ===
            "idle" && (
            <button
              onClick={
                startCrusher
              }
              style={{
                position:
                  "absolute",
                bottom: "10px",
                left: "20px",
                width: "140px",
              }}
            >
              START CRUSHER
            </button>
          )}

          {crusherPhase ===
            "ready" && (
            <button
              onClick={
                collectCrusher
              }
              style={{
                position:
                  "absolute",
                bottom: "10px",
                left: "20px",
                width: "140px",
                background:
                  "gold",
              }}
            >
              COLLECT 1000
            </button>
          )}
        </div>
      )}

      {planeBought &&
        planeFlying && (
          <img
            src={import.meta.env.BASE_URL + "plane-banner.png"}
            alt=""
            style={{
              position: "fixed",
              top: "80px",
              left: "-700px",
              width: "650px",
              animation:
                "planeFly 12s linear forwards",
            }}
          />
        )}

      <style>
        {`
          button {
            margin:5px;
            padding:10px;
            border-radius:12px;
            border:none;
            cursor:pointer;
          }

          @keyframes planeFly {
            from {
              left:-700px;
            }

            to {
              left:110vw;
            }
          }

          @keyframes sabinaFlash {
            0% {
              transform: scale(1);
              opacity: 1;
            }

            50% {
              transform: scale(1.2);
              opacity: 0.3;
            }

            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
