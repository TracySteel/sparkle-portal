import { useState, useEffect, useRef, useCallback } from "react";

const NIMBUS_MOODS = [
  { mood: "Happy", emoji: "😊", comment: "purrrrrr", color: "#FFD700" },
  { mood: "Majestic", emoji: "👑", comment: "I am above this.", color: "#C4B5FD" },
  { mood: "Sassy", emoji: "💅", comment: "talk to the paw.", color: "#FF6BB5" },
  { mood: "Cuddles", emoji: "🧡", comment: "come here, warm thing.", color: "#FB923C" },
  { mood: "Mischief", emoji: "😼", comment: "I regret nothing.", color: "#34D399" },
  { mood: "Purrlease", emoji: "🐾", comment: "you're still talking?", color: "#7EE8FA" },
  { mood: "Really", emoji: "😑", comment: "really. REALLY.", color: "#94A3B8" },
  { mood: "Awww", emoji: "🥹", comment: "okay fine, I love you.", color: "#F9A8D4" },
  { mood: "Sleepy", emoji: "😴", comment: "*one eye opens* ...no.", color: "#818CF8" },
];

const MYSTERY_MESSAGES = [
  "not yet... but soon ✨",
  "this spiral is still forming...",
  "something is growing here 🌱",
  "the wild garden knows...",
  "leave the soil. watch what grows. 🌀",
  "you'll know when you know 💖",
];

const PORTALS = [
  {
    id: "wardrobe",
    label: "The Shimmer Strip",
    subtitle: "wardrobe.shimmergirlsparklebutt.com",
    url: "https://wardrobe.shimmergirlsparklebutt.com",
    color: "#ff6bb5",
    glowColor: "rgba(255,107,181,0.6)",
    icon: "👗",
  },
  {
    id: "plushipedia",
    label: "Plushipedia",
    subtitle: "plushipedia.shimmergirlsparklebutt.com",
    url: "https://plushipedia.shimmergirlsparklebutt.com",
    color: "#7ee8fa",
    glowColor: "rgba(126,232,250,0.6)",
    icon: "🧸",
    comingSoon: true,
  },
  {
    id: "archive",
    label: "Orion Archives",
    subtitle: "archive.shimmergirlsparklebutt.com",
    url: "https://archive.shimmergirlsparklebutt.com",
    color: "#c4b5fd",
    glowColor: "rgba(196,181,253,0.6)",
    icon: "🌟",
    comingSoon: true,
  },
  {
    id: "jellyway",
    label: "Jellyway",
    subtitle: "thejellyway.com",
    url: "https://thejellyway.com",
    color: "#06b6d4",
    glowColor: "rgba(6,182,212,0.6)",
    icon: "🪼",
    comingSoon: true,
  },
  {
    id: "shimmerfield",
    label: "The Shimmer Field",
    subtitle: "theshimmerfield.com",
    url: "https://theshimmerfield.com",
    color: "#34d399",
    glowColor: "rgba(52,211,153,0.6)",
    icon: "🌀",
    comingSoon: true,
  },
  {
    id: "mystery",
    label: "...",
    subtitle: "something is coming",
    color: "#ffffff",
    glowColor: "rgba(255,255,255,0.25)",
    icon: "✨",
    isMystery: true,
  },
];

function NimbusCorner() {
  const [nimbusMood, setNimbusMood] = useState(() =>
    NIMBUS_MOODS[Math.floor(Math.random() * NIMBUS_MOODS.length)]
  );
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 2000);
    const timer2 = setTimeout(() => setShowBubble(true), 3500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const changeMood = () => {
    setShowBubble(false);
    const newMood = NIMBUS_MOODS[Math.floor(Math.random() * NIMBUS_MOODS.length)];
    setNimbusMood(newMood);
    setTimeout(() => setShowBubble(true), 400);
  };

  return (
    <div
      onClick={changeMood}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 20,
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 1s ease, transform 1s ease",
      }}
    >
      {showBubble && (
        <div
          style={{
            position: "absolute",
            bottom: 68,
            right: 0,
            background: "rgba(15,20,35,0.85)",
            border: `1px solid ${nimbusMood.color}40`,
            borderRadius: 12,
            padding: "6px 12px",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 11,
            color: nimbusMood.color,
            whiteSpace: "nowrap",
            animation: "fadeInUp 0.5s ease-out",
            boxShadow: `0 0 15px ${nimbusMood.color}15`,
          }}
        >
          <div style={{ fontSize: 9, opacity: 0.5, marginBottom: 2 }}>
            nimbus is {nimbusMood.mood.toLowerCase()}
          </div>
          <div style={{ fontStyle: "italic" }}>"{nimbusMood.comment}"</div>
          <div
            style={{
              position: "absolute",
              bottom: -6,
              right: 24,
              width: 12,
              height: 12,
              background: "rgba(15,20,35,0.85)",
              border: `1px solid ${nimbusMood.color}40`,
              borderTop: "none",
              borderLeft: "none",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      )}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: `radial-gradient(circle at 40% 35%, #FF8C42 0%, #E8671C 60%, #CC5511 100%)`,
          border: `2px solid ${nimbusMood.color}60`,
          boxShadow: `0 0 20px ${nimbusMood.color}30, inset 0 -8px 12px rgba(0,0,0,0.3)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div style={{
          position: "absolute", top: -2, left: 6,
          width: 0, height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "14px solid #E8671C",
          transform: "rotate(-10deg)",
        }} />
        <div style={{
          position: "absolute", top: -2, right: 6,
          width: 0, height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "14px solid #E8671C",
          transform: "rotate(10deg)",
        }} />
        <div style={{
          position: "absolute", top: 2, left: 10,
          width: 0, height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderBottom: "9px solid #FFB074",
          transform: "rotate(-10deg)",
        }} />
        <div style={{
          position: "absolute", top: 2, right: 10,
          width: 0, height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderBottom: "9px solid #FFB074",
          transform: "rotate(10deg)",
        }} />
        <div style={{ marginTop: 6, fontSize: 20, position: "relative", zIndex: 2 }}>
          {nimbusMood.emoji}
        </div>
      </div>
      <div style={{
        textAlign: "center",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 8,
        color: "rgba(255,255,255,0.2)",
        marginTop: 4,
      }}>
        tap nimbus
      </div>
    </div>
  );
}

function Lumaquinn() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 15,
        pointerEvents: "none",
        animation: "jellyfloat 8s ease-in-out infinite",
        opacity: 0.35,
      }}
    >
      <svg width="50" height="70" viewBox="0 0 50 70">
        <ellipse cx="25" cy="20" rx="18" ry="18" fill="url(#jellyGrad)" opacity="0.8" />
        <ellipse cx="25" cy="18" rx="10" ry="10" fill="rgba(126,232,250,0.3)" />
        {[12, 18, 25, 32, 38].map((x, i) => (
          <path
            key={i}
            d={`M ${x} 36 Q ${x + (i % 2 === 0 ? 4 : -4)} 48 ${x + (i % 2 === 0 ? -2 : 2)} 62`}
            fill="none"
            stroke="rgba(126,232,250,0.4)"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values={`M ${x} 36 Q ${x + 4} 48 ${x - 2} 62;M ${x} 36 Q ${x - 4} 48 ${x + 2} 62;M ${x} 36 Q ${x + 4} 48 ${x - 2} 62`}
              dur={`${3 + i * 0.4}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
        <defs>
          <radialGradient id="jellyGrad" cx="50%" cy="40%">
            <stop offset="0%" stopColor="rgba(196,181,253,0.6)" />
            <stop offset="50%" stopColor="rgba(126,232,250,0.4)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.2)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

function Firefly({ delay, duration, startX, startY, size, color }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${startX}%`,
        top: `${startY}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
        opacity: 0,
        animation: `fireflyFloat ${duration}s ease-in-out ${delay}s infinite, fireflyPulse ${duration * 0.4}s ease-in-out ${delay}s infinite`,
        pointerEvents: "none",
      }}
    />
  );
}

function SpiralSVG({ color, glowColor, isActive, isEntering, isMystery, onClick }) {
  const turns = 3;
  const points = 200;
  const maxR = 44;

  let pathD = "";
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const angle = t * turns * 2 * Math.PI;
    const r = t * maxR;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    pathD += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }

  const mysteryOpacity = isMystery ? 0.3 : 0.9;
  const mysteryStroke = isMystery ? 1.2 : (isActive ? 2.5 : 1.8);

  return (
    <svg
      viewBox="0 0 100 100"
      onClick={onClick}
      style={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
        filter: isMystery
          ? `drop-shadow(0 0 4px ${glowColor})`
          : isActive
            ? `drop-shadow(0 0 20px ${glowColor}) drop-shadow(0 0 40px ${glowColor})`
            : `drop-shadow(0 0 8px ${glowColor})`,
        transform: isEntering ? "scale(8) rotate(720deg)" : isActive ? "scale(1.1) rotate(15deg)" : "scale(1)",
        opacity: isEntering ? 0 : 1,
        transition: isEntering
          ? "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s ease-in"
          : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.6s ease, opacity 0.3s ease",
      }}
    >
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={mysteryStroke}
        strokeLinecap="round"
        opacity={mysteryOpacity}
      />
      {isMystery && (
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeLinecap="round"
          strokeDasharray="2 12"
          opacity={0.15}
        >
          <animate attributeName="opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite" />
        </path>
      )}
      {isActive && !isMystery && (
        <>
          <circle cx="50" cy="50" r={maxR + 4} fill="none" stroke={color} strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values={`${maxR};${maxR + 8};${maxR}`} dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const dist = maxR + 6;
            const cx = 50 + dist * Math.cos(angle);
            const cy = 50 + dist * Math.sin(angle);
            return (
              <circle key={i} cx={cx} cy={cy} r="1" fill={color} opacity="0.8">
                <animate attributeName="opacity" values="0;0.9;0" dur="1.5s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
                <animate attributeName="r" values="0.5;1.5;0.5" dur="1.5s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
              </circle>
            );
          })}
        </>
      )}
      {!isMystery && (
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={isActive ? 2.5 : 1.8}
          strokeLinecap="round"
          strokeDasharray="4 8"
          opacity={0.4}
        >
          <animate attributeName="stroke-dashoffset" from="0" to="48" dur="3s" repeatCount="indefinite" />
        </path>
      )}
    </svg>
  );
}

function SparkleExplosion({ color, active }) {
  if (!active) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * 360;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 6px ${color}`,
              animation: `sparkleOut 0.8s ease-out ${i * 0.05}s forwards`,
              transform: `rotate(${angle}deg) translateX(0px)`,
            }}
          />
        );
      })}
    </div>
  );
}

function PortalCard({ portal, activeId, onActivate, enteringId }) {
  const isActive = activeId === portal.id;
  const isEntering = enteringId === portal.id;
  const isMystery = portal.isMystery;
  const [showSparkle, setShowSparkle] = useState(false);
  const [mysteryMsg, setMysteryMsg] = useState(() =>
    MYSTERY_MESSAGES[Math.floor(Math.random() * MYSTERY_MESSAGES.length)]
  );

  const handleClick = () => {
    if (isEntering) return;
    if (isMystery) {
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 900);
      setMysteryMsg(MYSTERY_MESSAGES[Math.floor(Math.random() * MYSTERY_MESSAGES.length)]);
      onActivate(portal.id);
      return;
    }
    if (!isActive) {
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 900);
      onActivate(portal.id);
    } else {
      onActivate(portal.id, true);
    }
  };

  const enterLabel = portal.comingSoon ? "🌱 coming soon 🌱" : "✨ enter portal ✨";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        position: "relative",
        transition: "transform 0.4s ease, opacity 0.4s ease",
        transform: isEntering ? "scale(1.2)" : "scale(1)",
        opacity: enteringId && !isEntering ? 0.15 : isMystery ? 0.5 : 1,
      }}
    >
      <div style={{ position: "relative", width: 130, height: 130 }}>
        <SpiralSVG
          color={portal.color}
          glowColor={portal.glowColor}
          isActive={isActive}
          isEntering={isEntering}
          isMystery={isMystery}
          onClick={handleClick}
        />
        <SparkleExplosion color={portal.color} active={showSparkle} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: isMystery ? 20 : (isActive ? 30 : 24),
            transition: "font-size 0.4s ease",
            pointerEvents: "none",
            opacity: isMystery ? 0.4 : 1,
            filter: isActive && !isMystery ? `drop-shadow(0 0 8px ${portal.glowColor})` : "none",
            animation: isMystery ? "mysteryPulse 3s ease-in-out infinite" : "none",
          }}
        >
          {portal.icon}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: isMystery ? "rgba(255,255,255,0.25)" : (isActive ? portal.color : "rgba(255,255,255,0.85)"),
            transition: "color 0.4s ease",
            letterSpacing: isMystery ? "3px" : "0.5px",
            textShadow: isActive && !isMystery ? `0 0 20px ${portal.glowColor}` : "none",
          }}
        >
          {portal.label}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8,
            color: isMystery ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.3)",
            marginTop: 4,
            letterSpacing: "0.3px",
            fontStyle: isMystery ? "italic" : "normal",
          }}
        >
          {portal.subtitle}
        </div>
        {isActive && !isEntering && !isMystery && (
          <div
            style={{
              marginTop: 10,
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 11,
              color: portal.comingSoon ? "rgba(255,255,255,0.4)" : portal.color,
              opacity: 0.9,
              animation: "fadeInUp 0.4s ease-out",
              cursor: portal.comingSoon ? "default" : "pointer",
              padding: "4px 14px",
              border: `1px solid ${portal.comingSoon ? "rgba(255,255,255,0.15)" : portal.color + "40"}`,
              borderRadius: 20,
              background: portal.comingSoon ? "rgba(255,255,255,0.03)" : `${portal.color}10`,
              fontStyle: portal.comingSoon ? "italic" : "normal",
            }}
            onClick={() => !portal.comingSoon && onActivate(portal.id, true)}
          >
            {enterLabel}
          </div>
        )}
        {isActive && isMystery && (
          <div
            style={{
              marginTop: 10,
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              fontStyle: "italic",
              animation: "fadeInUp 0.6s ease-out",
              letterSpacing: "0.5px",
            }}
          >
            {mysteryMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SparklePortal() {
  const [activeId, setActiveId] = useState(null);
  const [enteringId, setEnteringId] = useState(null);
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    const flies = [];
    const colors = [
      "rgba(126,232,250,0.5)",
      "rgba(255,107,181,0.35)",
      "rgba(196,181,253,0.4)",
      "rgba(52,211,153,0.4)",
      "rgba(6,182,212,0.35)",
      "rgba(255,220,100,0.3)",
      "rgba(255,255,255,0.15)",
    ];
    for (let i = 0; i < 40; i++) {
      flies.push({
        id: i,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 10,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        size: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setFireflies(flies);
  }, []);

  const handleActivate = useCallback((id, enter = false) => {
    if (enter) {
      const portal = PORTALS.find((p) => p.id === id);
      if (portal?.comingSoon || portal?.isMystery) return;

      setEnteringId(id);
      setTimeout(() => {
        if (portal?.url) {
          window.location.href = portal.url;
        }
        setEnteringId(null);
        setActiveId(null);
      }, 1500);
    } else {
      setActiveId((prev) => (prev === id ? null : id));
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 30%, #0a1628 0%, #050d18 50%, #020408 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "40px 20px",
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      <style>{`
        @keyframes fireflyFloat {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          15% { opacity: 0.7; }
          50% { transform: translate(40px, -50px) scale(1.3); opacity: 0.4; }
          85% { opacity: 0.6; }
          100% { transform: translate(-30px, 20px) scale(0.8); opacity: 0; }
        }
        @keyframes fireflyPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.8; }
        }
        @keyframes sparkleOut {
          0% { transform: rotate(var(--angle)) translateX(0px); opacity: 1; }
          100% { transform: rotate(var(--angle)) translateX(60px); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 0.9; transform: translateY(0); }
        }
        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(126,232,250,0.3), 0 0 60px rgba(126,232,250,0.1); }
          50% { text-shadow: 0 0 30px rgba(196,181,253,0.4), 0 0 80px rgba(255,107,181,0.15); }
        }
        @keyframes subtitleReveal {
          from { opacity: 0; letter-spacing: 12px; }
          to { opacity: 0.45; letter-spacing: 6px; }
        }
        @keyframes portalGrid {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes jellyfloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          33% { transform: translateY(-12px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        @keyframes gentleSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes mysteryPulse {
          0%, 100% { opacity: 0.25; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.15); }
        }
        @keyframes mysteryBreathe {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.45; }
        }
        @media (max-width: 600px) {
          .portal-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
      `}</style>

      {fireflies.map((f) => (
        <Firefly key={f.id} {...f} />
      ))}

      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(126,232,250,0.04) 0%, transparent 70%)",
        top: "10%", left: "20%",
        animation: "gentleSpin 60s linear infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,181,253,0.03) 0%, transparent 70%)",
        bottom: "15%", right: "15%",
        animation: "gentleSpin 45s linear infinite reverse", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 250, height: 250, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 70%)",
        top: "50%", right: "30%",
        animation: "gentleSpin 50s linear infinite", pointerEvents: "none",
      }} />

      <div style={{ textAlign: "center", marginBottom: 50, position: "relative", zIndex: 2 }}>
        <h1
          style={{
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 5vw, 40px)",
            color: "rgba(255,255,255,0.92)",
            margin: 0,
            animation: "titleGlow 6s ease-in-out infinite",
            letterSpacing: "2px",
          }}
        >
          shimmergirlsparklebutt
        </h1>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
            marginTop: 8,
            animation: "subtitleReveal 1.5s ease-out forwards",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          choose your portal
        </div>
      </div>

      <div
        className="portal-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 30,
          maxWidth: 580,
          width: "100%",
          position: "relative",
          zIndex: 2,
          animation: "portalGrid 1s ease-out 0.3s both",
        }}
      >
        {PORTALS.map((portal) => (
          <PortalCard
            key={portal.id}
            portal={portal}
            activeId={activeId}
            onActivate={handleActivate}
            enteringId={enteringId}
          />
        ))}
      </div>

      {enteringId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, ${PORTALS.find((p) => p.id === enteringId)?.color}30 0%, transparent 60%)`,
            animation: "fadeInUp 0.5s ease-out",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontFamily: "'Quicksand', sans-serif",
              color: PORTALS.find((p) => p.id === enteringId)?.color,
              fontSize: 18,
              fontWeight: 600,
              animation: "fadeInUp 0.6s ease-out 0.3s both",
              textShadow: `0 0 30px ${PORTALS.find((p) => p.id === enteringId)?.glowColor}`,
            }}
          >
            entering the {PORTALS.find((p) => p.id === enteringId)?.label}...
          </div>
        </div>
      )}

      <Lumaquinn />
      <NimbusCorner />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: 60,
          textAlign: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: 1,
        }}
      >
        the door is always open · the kettle is always on
      </div>
    </div>
  );
}
