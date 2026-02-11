/* ================================================================
   X-MEN: MUTANT KOMBAT — Real-Time Fighting Game Engine
   MK11-Style with Keyboard Controls
   ================================================================ */

// ─── CONFIGURATION ──────────────────────────────────────────────
const GW = 1280,
  GH = 720;
const GROUND = 540;
const GRAVITY = 2200;
const WALK_SPD = 280;
const JUMP_VEL = -750;
const DASH_SPD = 600;
const DASH_DUR = 0.15;
const STAGE_LEFT = 60,
  STAGE_RIGHT = 1220;
const ROUND_TIME = 90;
const WINS_NEEDED = 2;

// ─── CHARACTER DATA ─────────────────────────────────────────────
const CHARS = {
  wolverine: {
    name: "WOLVERINE",
    title: "The Berserker",
    hp: 1100,
    atk: 90,
    def: 78,
    spd: 75,
    suit: "#2a2a05",
    suitL: "#3a3a10",
    skin: "#d4a574",
    hair: "#111",
    accent: "#ccaa00",
    boot: "#1a1a3a",
    belt: "#cc0000",
    moves: {
      punch: {
        name: "Adamantium Slash",
        dmg: 65,
        startup: 3,
        active: 4,
        recovery: 7,
        reach: 58,
        stun: 14,
        type: "mid",
      },
      kick: {
        name: "Berserker Barrage",
        dmg: 90,
        startup: 6,
        active: 5,
        recovery: 10,
        reach: 65,
        stun: 20,
        type: "mid",
      },
      special: {
        name: "WEAPON X FURY",
        dmg: 230,
        startup: 10,
        active: 8,
        recovery: 16,
        reach: 75,
        stun: 32,
        type: "mid",
        cost: 100,
      },
      projectile: null,
    },
    passive: "regen",
    passiveVal: 2,
    drawExtra(ctx, j, f) {
      // Wolverine mask points
      ctx.fillStyle = "#ccaa00";
      ctx.beginPath();
      ctx.moveTo(j.head.x - 10, j.head.y - 2);
      ctx.lineTo(j.head.x - 16, j.head.y - 24);
      ctx.lineTo(j.head.x - 4, j.head.y - 8);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(j.head.x + 10, j.head.y - 2);
      ctx.lineTo(j.head.x + 16, j.head.y - 24);
      ctx.lineTo(j.head.x + 4, j.head.y - 8);
      ctx.fill();
      // Mask on face
      ctx.fillStyle = "#ccaa00";
      ctx.beginPath();
      ctx.arc(j.head.x, j.head.y, 11, Math.PI * 0.8, Math.PI * 2.2);
      ctx.fill();
      // Claws on front hand
      const hx = j.handF.x,
        hy = j.handF.y;
      ctx.strokeStyle = "#ccc";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(hx + i * 3, hy);
        ctx.lineTo(hx + i * 3 + f * 6, hy - 22);
        ctx.stroke();
      }
    },
  },
  storm: {
    name: "STORM",
    title: "Weather Goddess",
    hp: 900,
    atk: 86,
    def: 58,
    spd: 84,
    suit: "#111118",
    suitL: "#1a1a25",
    skin: "#8B6914",
    hair: "#f0f0f0",
    accent: "#aaddff",
    boot: "#222",
    belt: "#444",
    moves: {
      punch: {
        name: "Gale Force",
        dmg: 55,
        startup: 4,
        active: 3,
        recovery: 7,
        reach: 60,
        stun: 14,
        type: "mid",
      },
      kick: {
        name: "Thunder Strike",
        dmg: 88,
        startup: 7,
        active: 5,
        recovery: 11,
        reach: 62,
        stun: 19,
        type: "mid",
      },
      special: {
        name: "GODDESS TEMPEST",
        dmg: 240,
        startup: 14,
        active: 10,
        recovery: 20,
        reach: 140,
        stun: 36,
        type: "mid",
        cost: 100,
      },
      projectile: {
        name: "Lightning Bolt",
        dmg: 58,
        speed: 650,
        startup: 9,
        recovery: 13,
      },
    },
    drawExtra(ctx, j) {
      // Flowing white hair
      ctx.fillStyle = "#f0f0f0";
      ctx.beginPath();
      ctx.arc(j.head.x, j.head.y - 4, 13, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(j.head.x - 8, j.head.y, 5, 14, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(j.head.x + 8, j.head.y, 5, 14, 0.2, 0, Math.PI * 2);
      ctx.fill();
      // Tiara
      ctx.strokeStyle = "#ffd700";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(j.head.x - 8, j.head.y - 8);
      ctx.lineTo(j.head.x, j.head.y - 16);
      ctx.lineTo(j.head.x + 8, j.head.y - 8);
      ctx.stroke();
      // Glowing eyes
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "#aaddff";
      ctx.shadowBlur = 8;
      ctx.fillRect(j.head.x - 6, j.head.y - 3, 4, 3);
      ctx.fillRect(j.head.x + 2, j.head.y - 3, 4, 3);
      ctx.shadowBlur = 0;
    },
  },
  jeangrey: {
    name: "JEAN GREY",
    title: "The Phoenix",
    hp: 850,
    atk: 94,
    def: 50,
    spd: 80,
    suit: "#1a3a1a",
    suitL: "#2a4a2a",
    skin: "#e8b88a",
    hair: "#cc2200",
    accent: "#ff4488",
    boot: "#2a2a00",
    belt: "#ffd700",
    moves: {
      punch: {
        name: "Telekinetic Strike",
        dmg: 60,
        startup: 4,
        active: 3,
        recovery: 8,
        reach: 65,
        stun: 15,
        type: "mid",
      },
      kick: {
        name: "Psychic Scream",
        dmg: 95,
        startup: 8,
        active: 5,
        recovery: 13,
        reach: 70,
        stun: 22,
        type: "mid",
      },
      special: {
        name: "DARK PHOENIX RISING",
        dmg: 260,
        startup: 14,
        active: 10,
        recovery: 22,
        reach: 150,
        stun: 38,
        type: "mid",
        cost: 100,
      },
      projectile: {
        name: "Phoenix Wave",
        dmg: 52,
        speed: 580,
        startup: 10,
        recovery: 13,
      },
    },
    drawExtra(ctx, j) {
      // Red flowing hair
      ctx.fillStyle = "#cc2200";
      ctx.beginPath();
      ctx.arc(j.head.x, j.head.y - 3, 12, Math.PI * 0.9, Math.PI * 2.1);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(j.head.x - 9, j.head.y + 2, 4, 16, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(j.head.x + 9, j.head.y + 2, 4, 16, 0.15, 0, Math.PI * 2);
      ctx.fill();
      // Phoenix aura (subtle)
      ctx.fillStyle = "rgba(255,68,136,0.1)";
      ctx.beginPath();
      ctx.arc(j.chest.x, j.chest.y, 40, 0, Math.PI * 2);
      ctx.fill();
    },
  },
  cyclops: {
    name: "CYCLOPS",
    title: "Field Leader",
    hp: 1000,
    atk: 80,
    def: 68,
    spd: 72,
    suit: "#1a1a4a",
    suitL: "#2a2a5a",
    skin: "#e8b88a",
    hair: "#6B4513",
    accent: "#ff0000",
    boot: "#111",
    belt: "#ffd700",
    moves: {
      punch: {
        name: "Combat Training Strike",
        dmg: 54,
        startup: 3,
        active: 3,
        recovery: 7,
        reach: 50,
        stun: 12,
        type: "mid",
      },
      kick: {
        name: "Field Leader Kick",
        dmg: 78,
        startup: 6,
        active: 4,
        recovery: 10,
        reach: 55,
        stun: 17,
        type: "mid",
      },
      special: {
        name: "FULL POWER OPTIC BLAST",
        dmg: 225,
        startup: 12,
        active: 10,
        recovery: 18,
        reach: 220,
        stun: 34,
        type: "mid",
        cost: 100,
      },
      projectile: {
        name: "Optic Beam",
        dmg: 62,
        speed: 750,
        startup: 7,
        recovery: 11,
      },
    },
    drawExtra(ctx, j) {
      // Brown hair
      ctx.fillStyle = "#6B4513";
      ctx.beginPath();
      ctx.arc(j.head.x, j.head.y - 4, 11, Math.PI, Math.PI * 2);
      ctx.fill();
      // Red visor
      ctx.fillStyle = "#cc0000";
      ctx.shadowColor = "#ff0000";
      ctx.shadowBlur = 10;
      ctx.fillRect(j.head.x - 10, j.head.y - 3, 20, 5);
      ctx.shadowBlur = 0;
    },
  },
  rogue: {
    name: "ROGUE",
    title: "Untouchable",
    hp: 1050,
    atk: 86,
    def: 65,
    spd: 76,
    suit: "#1a2a1a",
    suitL: "#2a3a2a",
    skin: "#e8b88a",
    hair: "#5c2a00",
    accent: "#00ff88",
    boot: "#222",
    belt: "#444",
    moves: {
      punch: {
        name: "Super Strength Slam",
        dmg: 68,
        startup: 4,
        active: 4,
        recovery: 8,
        reach: 55,
        stun: 16,
        type: "mid",
      },
      kick: {
        name: "Power Drain Touch",
        dmg: 75,
        startup: 7,
        active: 4,
        recovery: 11,
        reach: 52,
        stun: 17,
        type: "mid",
        heal: 25,
      },
      special: {
        name: "POWER ABSORPTION",
        dmg: 210,
        startup: 10,
        active: 6,
        recovery: 16,
        reach: 68,
        stun: 32,
        type: "mid",
        cost: 100,
        heal: 50,
      },
      projectile: null,
    },
    drawExtra(ctx, j) {
      // Brown hair with white streak
      ctx.fillStyle = "#5c2a00";
      ctx.beginPath();
      ctx.arc(j.head.x, j.head.y - 3, 12, Math.PI * 0.85, Math.PI * 2.15);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(j.head.x - 7, j.head.y + 4, 4, 14, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(j.head.x + 7, j.head.y + 4, 4, 14, 0.1, 0, Math.PI * 2);
      ctx.fill();
      // White streak
      ctx.fillStyle = "#f0f0f0";
      ctx.beginPath();
      ctx.ellipse(j.head.x + 5, j.head.y - 2, 3, 10, 0.2, 0, Math.PI * 2);
      ctx.fill();
    },
  },
  professorx: {
    name: "PROFESSOR X",
    title: "World's Most Powerful Telepath",
    hp: 750,
    atk: 95,
    def: 48,
    spd: 55,
    suit: "#2a2a3a",
    suitL: "#3a3a4a",
    skin: "#e8b88a",
    hair: "#e8b88a",
    accent: "#aaddff",
    boot: "#333",
    belt: "#555",
    moves: {
      punch: {
        name: "Mental Probe",
        dmg: 65,
        startup: 5,
        active: 4,
        recovery: 9,
        reach: 75,
        stun: 16,
        type: "mid",
      },
      kick: {
        name: "Telepathic Assault",
        dmg: 92,
        startup: 8,
        active: 6,
        recovery: 13,
        reach: 80,
        stun: 22,
        type: "mid",
      },
      special: {
        name: "ASTRAL PROJECTION",
        dmg: 255,
        startup: 16,
        active: 12,
        recovery: 24,
        reach: 180,
        stun: 40,
        type: "mid",
        cost: 100,
      },
      projectile: {
        name: "Cerebro Psi Bolt",
        dmg: 65,
        speed: 520,
        startup: 11,
        recovery: 15,
      },
    },
    drawExtra(ctx, j) {
      // Bald head (no hair drawn - skin color head is already there)
      // Psychic glow around head
      ctx.fillStyle = "rgba(170,221,255,0.15)";
      ctx.beginPath();
      ctx.arc(j.head.x, j.head.y, 18, 0, Math.PI * 2);
      ctx.fill();
      // Wheelchair indication - small wheels near feet
      ctx.strokeStyle = "#666";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(j.footB.x, j.footB.y - 2, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(j.footF.x, j.footF.y - 2, 8, 0, Math.PI * 2);
      ctx.stroke();
    },
  },
  mystique: {
    name: "MYSTIQUE",
    title: "Shape Shifter",
    hp: 900,
    atk: 82,
    def: 62,
    spd: 90,
    suit: "#0a0a3a",
    suitL: "#1a1a4a",
    skin: "#3355cc",
    hair: "#cc2200",
    accent: "#ff4444",
    boot: "#111",
    belt: "#222",
    moves: {
      punch: {
        name: "Morphing Strike",
        dmg: 56,
        startup: 2,
        active: 3,
        recovery: 6,
        reach: 52,
        stun: 13,
        type: "mid",
      },
      kick: {
        name: "Shapeshifter Sweep",
        dmg: 84,
        startup: 5,
        active: 4,
        recovery: 10,
        reach: 62,
        stun: 18,
        type: "mid",
      },
      special: {
        name: "METAMORPHOSIS FURY",
        dmg: 215,
        startup: 8,
        active: 7,
        recovery: 14,
        reach: 65,
        stun: 32,
        type: "mid",
        cost: 100,
      },
      projectile: null,
    },
    drawExtra(ctx, j) {
      // Blue skin is already handled by skin color
      // Red slicked hair
      ctx.fillStyle = "#cc2200";
      ctx.beginPath();
      ctx.arc(j.head.x, j.head.y - 4, 11, Math.PI, Math.PI * 2);
      ctx.fill();
      // Scales texture on suit
      ctx.fillStyle = "rgba(50,80,200,0.3)";
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(j.chest.x + (i - 2) * 6, j.chest.y + 5, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  },
  nightcrawler: {
    name: "NIGHTCRAWLER",
    title: "The Incredible Nightcrawler",
    hp: 850,
    atk: 78,
    def: 52,
    spd: 98,
    suit: "#0a0a1a",
    suitL: "#151525",
    skin: "#2244aa",
    hair: "#111",
    accent: "#aa44ff",
    boot: "#0a0a1a",
    belt: "#880000",
    moves: {
      punch: {
        name: "BAMF Strike",
        dmg: 54,
        startup: 2,
        active: 3,
        recovery: 5,
        reach: 58,
        stun: 12,
        type: "mid",
      },
      kick: {
        name: "Teleport Kick",
        dmg: 82,
        startup: 4,
        active: 5,
        recovery: 8,
        reach: 72,
        stun: 18,
        type: "mid",
      },
      special: {
        name: "BAMF BLITZ",
        dmg: 205,
        startup: 6,
        active: 10,
        recovery: 14,
        reach: 90,
        stun: 30,
        type: "mid",
        cost: 100,
      },
      projectile: null,
    },
    drawExtra(ctx, j) {
      // Dark hair
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(j.head.x, j.head.y - 4, 11, Math.PI, Math.PI * 2);
      ctx.fill();
      // Tail
      ctx.strokeStyle = "#2244aa";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(j.hip.x, j.hip.y + 5);
      ctx.quadraticCurveTo(
        j.hip.x - 20,
        j.hip.y + 30,
        j.hip.x - 10,
        j.hip.y + 40,
      );
      ctx.stroke();
      // Pointed tail end
      ctx.fillStyle = "#2244aa";
      ctx.beginPath();
      ctx.moveTo(j.hip.x - 10, j.hip.y + 38);
      ctx.lineTo(j.hip.x - 15, j.hip.y + 44);
      ctx.lineTo(j.hip.x - 5, j.hip.y + 44);
      ctx.fill();
      // Bamf smoke (subtle)
      ctx.fillStyle = "rgba(100,50,200,0.08)";
      ctx.beginPath();
      ctx.arc(j.hip.x, j.hip.y, 30, 0, Math.PI * 2);
      ctx.fill();
    },
  },
};
const CHAR_IDS = Object.keys(CHARS);

// ─── INPUT MANAGER ──────────────────────────────────────────────
const keys = {};
const keysJustPressed = {};
window.addEventListener("keydown", (e) => {
  if (!keys[e.code]) keysJustPressed[e.code] = true;
  keys[e.code] = true;
  e.preventDefault();
});
window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});
function consumePress(code) {
  if (keysJustPressed[code]) {
    keysJustPressed[code] = false;
    return true;
  }
  return false;
}
function clearPresses() {
  for (const k in keysJustPressed) keysJustPressed[k] = false;
}

// ─── SOUND ENGINE ───────────────────────────────────────────────
const SFX = {
  ctx: null,
  init() {
    if (!this.ctx)
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {}
  },
  play(type) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime,
      o = this.ctx.createOscillator(),
      g = this.ctx.createGain();
    o.connect(g);
    g.connect(this.ctx.destination);
    const presets = {
      hit: [200, 80, 0.15, 0.3, 0.2, "sawtooth"],
      heavy: [400, 100, 0.3, 0.4, 0.35, "square"],
      miss: [300, 150, 0.1, 0.1, 0.15, "sine"],
      block: [150, 150, 0.08, 0.2, 0.1, "triangle"],
      special: [100, 200, 0.5, 0.4, 0.6, "sawtooth"],
      select: [440, 880, 0.08, 0.15, 0.1, "sine"],
      ko: [300, 50, 0.8, 0.3, 1, "sawtooth"],
      win: [523, 1047, 0.4, 0.25, 0.5, "sine"],
    };
    const p = presets[type] || presets.hit;
    o.frequency.setValueAtTime(p[0], now);
    o.frequency.exponentialRampToValueAtTime(Math.max(p[1], 20), now + p[2]);
    g.gain.setValueAtTime(p[3], now);
    g.gain.exponentialRampToValueAtTime(0.01, now + p[4]);
    o.type = p[5];
    o.start(now);
    o.stop(now + p[4]);
  },
};

// ─── PARTICLES ──────────────────────────────────────────────────
const particles = [];
function spawnParticles(x, y, color, count = 8) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 400,
      vy: -Math.random() * 300 - 100,
      life: 1,
      decay: 0.02 + Math.random() * 0.03,
      size: 2 + Math.random() * 4,
      color,
    });
  }
}
function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 800 * dt;
    p.life -= p.decay;
    if (p.life <= 0) particles.splice(i, 1);
  }
}
function drawParticles(ctx) {
  for (const p of particles) {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

// ─── PROJECTILE SYSTEM ──────────────────────────────────────────
const projectiles = [];
function spawnProjectile(owner, charData, x, y, facing) {
  const pdata = charData.moves.projectile;
  if (!pdata) return;
  projectiles.push({
    owner,
    x,
    y: y - 50,
    vx: pdata.speed * facing,
    dmg: pdata.dmg * (charData.atk / 80),
    w: 20,
    h: 10,
    color: charData.accent,
    life: 2,
  });
}
function updateProjectiles(dt, fighters) {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    p.x += p.vx * dt;
    p.life -= dt;
    if (p.life <= 0 || p.x < 0 || p.x > GW) {
      projectiles.splice(i, 1);
      continue;
    }
    // Hit detection
    for (const f of fighters) {
      if (f === p.owner || f.state === "down" || f.invincible > 0) continue;
      const hb = f.getHurtbox();
      if (p.x > hb.x && p.x < hb.x + hb.w && p.y > hb.y && p.y < hb.y + hb.h) {
        if (f.blocking) {
          f.blockstun = 10;
          f.hp -= p.dmg * 0.15;
          SFX.play("block");
        } else {
          f.hp -= p.dmg;
          f.hitstun = 16;
          f.comboCount++;
          SFX.play("hit");
          spawnParticles(p.x, p.y, p.color, 10);
        }
        projectiles.splice(i, 1);
        break;
      }
    }
  }
}
function drawProjectiles(ctx) {
  for (const p of projectiles) {
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, 15, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

// ─── POSE SYSTEM ────────────────────────────────────────────────
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function lerpJoint(a, b, t) {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

function getJoints(state, frame, facing) {
  const f = facing;
  const bob = Math.sin(frame * 0.08) * 2;
  const wf = Math.sin(frame * 0.15) * 12;

  const poses = {
    idle: {
      head: { x: f * 2, y: -68 + bob },
      neck: { x: 0, y: -56 + bob },
      chest: { x: 0, y: -42 + bob },
      shoulderF: { x: f * 14, y: -52 + bob },
      elbowF: { x: f * 24, y: -36 + bob },
      handF: { x: f * 20, y: -20 + bob },
      shoulderB: { x: -f * 14, y: -52 + bob },
      elbowB: { x: -f * 20, y: -36 + bob },
      handB: { x: -f * 16, y: -22 + bob },
      hip: { x: 0, y: -10 },
      kneeF: { x: f * 10, y: 12 },
      footF: { x: f * 8, y: 35 },
      kneeB: { x: -f * 10, y: 12 },
      footB: { x: -f * 12, y: 35 },
    },
    walk: {
      head: { x: f * 4, y: -66 },
      neck: { x: f * 2, y: -54 },
      chest: { x: f * 2, y: -40 },
      shoulderF: { x: f * 16, y: -50 },
      elbowF: { x: f * 26 - wf * 0.3, y: -34 },
      handF: { x: f * 22 - wf * 0.4, y: -18 },
      shoulderB: { x: -f * 12, y: -50 },
      elbowB: { x: -f * 18 + wf * 0.3, y: -34 },
      handB: { x: -f * 14 + wf * 0.4, y: -20 },
      hip: { x: 0, y: -10 },
      kneeF: { x: f * 12 + wf * 0.5, y: 10 },
      footF: { x: f * 14 + wf, y: 35 },
      kneeB: { x: -f * 8 - wf * 0.5, y: 10 },
      footB: { x: -f * 6 - wf, y: 35 },
    },
    crouch: {
      head: { x: f * 3, y: -42 },
      neck: { x: f * 1, y: -34 },
      chest: { x: 0, y: -24 },
      shoulderF: { x: f * 14, y: -30 },
      elbowF: { x: f * 26, y: -20 },
      handF: { x: f * 22, y: -8 },
      shoulderB: { x: -f * 12, y: -30 },
      elbowB: { x: -f * 20, y: -18 },
      handB: { x: -f * 16, y: -8 },
      hip: { x: 0, y: 4 },
      kneeF: { x: f * 18, y: 16 },
      footF: { x: f * 14, y: 35 },
      kneeB: { x: -f * 16, y: 16 },
      footB: { x: -f * 18, y: 35 },
    },
    jump: {
      head: { x: f * 2, y: -72 },
      neck: { x: 0, y: -60 },
      chest: { x: 0, y: -46 },
      shoulderF: { x: f * 14, y: -54 },
      elbowF: { x: f * 22, y: -44 },
      handF: { x: f * 18, y: -34 },
      shoulderB: { x: -f * 14, y: -54 },
      elbowB: { x: -f * 18, y: -42 },
      handB: { x: -f * 14, y: -32 },
      hip: { x: 0, y: -14 },
      kneeF: { x: f * 12, y: 0 },
      footF: { x: f * 6, y: 14 },
      kneeB: { x: -f * 10, y: 4 },
      footB: { x: -f * 14, y: 18 },
    },
    punch: {
      head: { x: f * 6, y: -66 },
      neck: { x: f * 4, y: -54 },
      chest: { x: f * 4, y: -40 },
      shoulderF: { x: f * 16, y: -50 },
      elbowF: { x: f * 36, y: -42 },
      handF: { x: f * 52, y: -40 },
      shoulderB: { x: -f * 10, y: -50 },
      elbowB: { x: -f * 22, y: -38 },
      handB: { x: -f * 18, y: -28 },
      hip: { x: 0, y: -10 },
      kneeF: { x: f * 14, y: 12 },
      footF: { x: f * 16, y: 35 },
      kneeB: { x: -f * 10, y: 12 },
      footB: { x: -f * 14, y: 35 },
    },
    kick: {
      head: { x: -f * 2, y: -66 },
      neck: { x: -f * 2, y: -54 },
      chest: { x: -f * 2, y: -40 },
      shoulderF: { x: f * 12, y: -50 },
      elbowF: { x: f * 20, y: -38 },
      handF: { x: f * 16, y: -26 },
      shoulderB: { x: -f * 14, y: -50 },
      elbowB: { x: -f * 24, y: -38 },
      handB: { x: -f * 20, y: -28 },
      hip: { x: 0, y: -10 },
      kneeF: { x: f * 30, y: 2 },
      footF: { x: f * 50, y: -4 },
      kneeB: { x: -f * 12, y: 14 },
      footB: { x: -f * 14, y: 35 },
    },
    special: {
      head: { x: 0, y: -72 },
      neck: { x: 0, y: -60 },
      chest: { x: 0, y: -44 },
      shoulderF: { x: f * 14, y: -54 },
      elbowF: { x: f * 30, y: -50 },
      handF: { x: f * 46, y: -48 },
      shoulderB: { x: -f * 14, y: -54 },
      elbowB: { x: -f * 28, y: -50 },
      handB: { x: -f * 42, y: -48 },
      hip: { x: 0, y: -8 },
      kneeF: { x: f * 14, y: 12 },
      footF: { x: f * 18, y: 35 },
      kneeB: { x: -f * 14, y: 12 },
      footB: { x: -f * 18, y: 35 },
    },
    block: {
      head: { x: -f * 4, y: -66 },
      neck: { x: -f * 2, y: -54 },
      chest: { x: -f * 2, y: -40 },
      shoulderF: { x: f * 10, y: -50 },
      elbowF: { x: f * 14, y: -38 },
      handF: { x: f * 10, y: -26 },
      shoulderB: { x: -f * 14, y: -50 },
      elbowB: { x: -f * 16, y: -36 },
      handB: { x: -f * 12, y: -24 },
      hip: { x: 0, y: -10 },
      kneeF: { x: f * 8, y: 12 },
      footF: { x: f * 6, y: 35 },
      kneeB: { x: -f * 12, y: 12 },
      footB: { x: -f * 14, y: 35 },
    },
    hitstun: {
      head: { x: -f * 8, y: -62 },
      neck: { x: -f * 6, y: -50 },
      chest: { x: -f * 4, y: -38 },
      shoulderF: { x: f * 8, y: -46 },
      elbowF: { x: f * 14, y: -30 },
      handF: { x: f * 10, y: -18 },
      shoulderB: { x: -f * 16, y: -46 },
      elbowB: { x: -f * 24, y: -30 },
      handB: { x: -f * 20, y: -18 },
      hip: { x: 0, y: -6 },
      kneeF: { x: f * 8, y: 14 },
      footF: { x: f * 6, y: 35 },
      kneeB: { x: -f * 12, y: 14 },
      footB: { x: -f * 14, y: 35 },
    },
    down: {
      head: { x: f * 20, y: -10 },
      neck: { x: f * 14, y: -8 },
      chest: { x: f * 6, y: -6 },
      shoulderF: { x: f * 14, y: -8 },
      elbowF: { x: f * 20, y: -2 },
      handF: { x: f * 26, y: 4 },
      shoulderB: { x: -f * 2, y: -8 },
      elbowB: { x: -f * 8, y: -2 },
      handB: { x: -f * 14, y: 4 },
      hip: { x: 0, y: 6 },
      kneeF: { x: f * 14, y: 20 },
      footF: { x: f * 24, y: 30 },
      kneeB: { x: -f * 8, y: 20 },
      footB: { x: -f * 16, y: 30 },
    },
    projectile: {
      head: { x: f * 4, y: -68 },
      neck: { x: f * 2, y: -56 },
      chest: { x: f * 2, y: -42 },
      shoulderF: { x: f * 14, y: -52 },
      elbowF: { x: f * 32, y: -46 },
      handF: { x: f * 48, y: -44 },
      shoulderB: { x: -f * 14, y: -52 },
      elbowB: { x: -f * 20, y: -40 },
      handB: { x: -f * 16, y: -30 },
      hip: { x: 0, y: -10 },
      kneeF: { x: f * 10, y: 12 },
      footF: { x: f * 12, y: 35 },
      kneeB: { x: -f * 10, y: 12 },
      footB: { x: -f * 14, y: 35 },
    },
    victory: {
      head: { x: 0, y: -72 + bob },
      neck: { x: 0, y: -58 + bob },
      chest: { x: 0, y: -44 + bob },
      shoulderF: { x: f * 14, y: -54 + bob },
      elbowF: { x: f * 22, y: -66 + bob },
      handF: { x: f * 18, y: -78 + bob },
      shoulderB: { x: -f * 14, y: -54 + bob },
      elbowB: { x: -f * 22, y: -66 + bob },
      handB: { x: -f * 18, y: -78 + bob },
      hip: { x: 0, y: -10 },
      kneeF: { x: f * 10, y: 12 },
      footF: { x: f * 8, y: 35 },
      kneeB: { x: -f * 10, y: 12 },
      footB: { x: -f * 12, y: 35 },
    },
  };
  return poses[state] || poses.idle;
}

// ─── CHARACTER RENDERER ─────────────────────────────────────────
function drawFighter(ctx, charId, state, frame, x, y, facing, scale = 1) {
  const ch = CHARS[charId];
  const j = getJoints(state, frame, facing);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.ellipse(0, 38, 28, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  function limb(from, to, w, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }
  function circle(pos, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Back leg
  limb(j.hip, j.kneeB, 11, ch.suit);
  limb(j.kneeB, j.footB, 10, ch.suit);
  ctx.fillStyle = ch.boot;
  ctx.fillRect(j.footB.x - 7, j.footB.y - 3, 14, 7);

  // Back arm
  limb(j.shoulderB, j.elbowB, 8, ch.suit);
  limb(j.elbowB, j.handB, 7, ch.suit);
  circle(j.handB, 4, ch.skin);

  // Torso
  ctx.fillStyle = ch.suit;
  ctx.beginPath();
  ctx.moveTo(j.hip.x - 13, j.hip.y);
  ctx.lineTo(j.chest.x - 16, j.chest.y);
  ctx.lineTo(j.neck.x, j.neck.y - 4);
  ctx.lineTo(j.chest.x + 16, j.chest.y);
  ctx.lineTo(j.hip.x + 13, j.hip.y);
  ctx.closePath();
  ctx.fill();

  // Suit lighter overlay on front
  ctx.fillStyle = ch.suitL;
  ctx.beginPath();
  ctx.moveTo(j.hip.x + facing * 2, j.hip.y);
  ctx.lineTo(j.chest.x + facing * 2, j.chest.y);
  ctx.lineTo(j.neck.x, j.neck.y - 2);
  ctx.lineTo(j.chest.x + 16 * facing, j.chest.y);
  ctx.lineTo(j.hip.x + 13 * facing, j.hip.y);
  ctx.closePath();
  ctx.fill();

  // Belt
  if (ch.belt) {
    ctx.fillStyle = ch.belt;
    ctx.fillRect(j.hip.x - 14, j.hip.y - 3, 28, 5);
  }

  // X-emblem on chest
  ctx.strokeStyle = ch.accent || "#ffd700";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(j.chest.x - 6, j.chest.y + 2);
  ctx.lineTo(j.chest.x + 6, j.chest.y + 10);
  ctx.moveTo(j.chest.x + 6, j.chest.y + 2);
  ctx.lineTo(j.chest.x - 6, j.chest.y + 10);
  ctx.stroke();

  // Front leg
  limb(j.hip, j.kneeF, 11, ch.suitL);
  limb(j.kneeF, j.footF, 10, ch.suitL);
  ctx.fillStyle = ch.boot;
  ctx.fillRect(j.footF.x - 7, j.footF.y - 3, 14, 7);

  // Front arm
  limb(j.shoulderF, j.elbowF, 8, ch.suitL);
  limb(j.elbowF, j.handF, 7, ch.suitL);
  circle(j.handF, 4, ch.skin);

  // Neck
  limb(j.neck, { x: j.head.x, y: j.head.y + 8 }, 6, ch.skin);

  // Head
  circle(j.head, 10, ch.skin);

  // Default hair (can be overridden)
  if (!ch.drawExtra || charId === "wolverine") {
    // Characters that override fully handle their own hair
  } else {
    ctx.fillStyle = ch.hair;
    ctx.beginPath();
    ctx.arc(j.head.x, j.head.y - 3, 11, Math.PI, Math.PI * 2);
    ctx.fill();
  }

  // Eyes
  if (charId !== "cyclops" && charId !== "storm") {
    ctx.fillStyle = "#fff";
    ctx.fillRect(j.head.x - 5 * facing - 1, j.head.y - 2, 3, 2);
    ctx.fillRect(j.head.x + 2 * facing, j.head.y - 2, 3, 2);
    ctx.fillStyle = "#111";
    ctx.fillRect(j.head.x - 5 * facing, j.head.y - 1.5, 1.5, 1.5);
    ctx.fillRect(j.head.x + 3 * facing, j.head.y - 1.5, 1.5, 1.5);
  }

  // Character-specific extras
  if (ch.drawExtra) ch.drawExtra(ctx, j, facing);

  // Hit flash
  if (state === "hitstun" && frame % 4 < 2) {
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillRect(-30, -80, 60, 120);
  }

  // Block shield
  if (state === "block") {
    ctx.strokeStyle = "rgba(0,170,255,0.4)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(facing * 10, -30, 30, -Math.PI * 0.5, Math.PI * 0.5);
    ctx.stroke();
  }

  // Special aura
  if (state === "special") {
    ctx.fillStyle = (ch.accent || "#ffd700") + "33";
    ctx.beginPath();
    ctx.arc(0, -30, 50 + Math.sin(frame * 0.3) * 10, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// ─── FIGHTER CLASS ──────────────────────────────────────────────
class Fighter {
  constructor(charId, x, facing, isAI = false) {
    const ch = CHARS[charId];
    this.charId = charId;
    this.charData = ch;
    this.x = x;
    this.y = GROUND;
    this.vx = 0;
    this.vy = 0;
    this.facing = facing;
    this.hp = ch.hp;
    this.maxHp = ch.hp;
    this.energy = 0;
    this.state = "idle";
    this.stateFrame = 0;
    this.stateTimer = 0;
    this.grounded = true;
    this.hitstun = 0;
    this.blockstun = 0;
    this.blocking = false;
    this.invincible = 0;
    this.comboCount = 0;
    this.comboTimer = 0;
    this.isAI = isAI;
    this.currentAttack = null;
    this.attackPhase = "";
    this.attackTimer = 0;
    this.hasHit = false;
    this.dashTimer = 0;
    this.dashDir = 0;
    this.lastDirPress = 0;
    this.lastDirTime = 0;
    this.projectileCooldown = 0;
  }

  getHurtbox() {
    const w = 40,
      h = this.state === "crouch" ? 50 : 90;
    return { x: this.x - w / 2, y: this.y - h, w, h };
  }

  getHitbox() {
    if (!this.currentAttack || this.attackPhase !== "active") return null;
    const atk = this.currentAttack;
    const reach = atk.reach || 50;
    const fx = this.facing === 1 ? this.x + 10 : this.x - 10 - reach;
    return { x: fx, y: this.y - 70, w: reach, h: 50 };
  }

  update(dt, opponent) {
    // Timers
    if (this.hitstun > 0) {
      this.hitstun -= dt * 60;
      if (this.hitstun <= 0) {
        this.hitstun = 0;
        this.state = "idle";
      }
    }
    if (this.blockstun > 0) {
      this.blockstun -= dt * 60;
      if (this.blockstun <= 0) {
        this.blockstun = 0;
        this.state = "idle";
      }
    }
    if (this.invincible > 0) this.invincible -= dt;
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.comboCount = 0;
    }
    if (this.projectileCooldown > 0) this.projectileCooldown -= dt;

    // Passive (wolverine regen)
    if (
      this.charData.passive === "regen" &&
      this.hp < this.maxHp &&
      this.hp > 0
    ) {
      this.hp = Math.min(this.maxHp, this.hp + this.charData.passiveVal * dt);
    }

    // Dash timer
    if (this.dashTimer > 0) {
      this.dashTimer -= dt;
      this.vx = this.dashDir * DASH_SPD;
      if (this.dashTimer <= 0) {
        this.dashTimer = 0;
        this.vx = 0;
      }
    }

    // Attack state machine
    if (this.currentAttack && this.hitstun <= 0) {
      this.attackTimer -= dt * 60;
      if (this.attackTimer <= 0) {
        if (this.attackPhase === "startup") {
          this.attackPhase = "active";
          this.attackTimer = this.currentAttack.active;
          this.hasHit = false;
          if (this.currentAttack === this.charData.moves.special)
            SFX.play("special");
        } else if (this.attackPhase === "active") {
          this.attackPhase = "recovery";
          this.attackTimer = this.currentAttack.recovery;
        } else {
          this.currentAttack = null;
          this.attackPhase = "";
          this.state = this.grounded ? "idle" : "jump";
        }
      }
    }

    // Physics
    if (!this.grounded) {
      this.vy += GRAVITY * dt;
      this.y += this.vy * dt;
      if (this.y >= GROUND) {
        this.y = GROUND;
        this.vy = 0;
        this.grounded = true;
        if (!this.currentAttack && this.hitstun <= 0) this.state = "idle";
      }
    }

    this.x += this.vx * dt;
    this.x = Math.max(STAGE_LEFT, Math.min(STAGE_RIGHT, this.x));

    // Face opponent
    if (
      this.state === "idle" ||
      this.state === "walk" ||
      this.state === "crouch"
    ) {
      this.facing = opponent.x > this.x ? 1 : -1;
    }

    // Push apart (prevent overlap)
    const dist = Math.abs(this.x - opponent.x);
    if (dist < 40) {
      const push = (40 - dist) / 2;
      if (this.x < opponent.x) {
        this.x -= push;
        opponent.x += push;
      } else {
        this.x += push;
        opponent.x -= push;
      }
    }

    this.stateFrame++;
  }

  handleInput(opponent) {
    if (this.hp <= 0) return;
    if (this.hitstun > 0 || this.blockstun > 0) return;
    if (this.state === "down") return;

    const busy = this.currentAttack != null;
    const left = keys["KeyA"] || keys["ArrowLeft"];
    const right = keys["KeyD"] || keys["ArrowRight"];
    const up = keys["KeyW"] || keys["ArrowUp"];
    const down = keys["KeyS"] || keys["ArrowDown"];
    const blockKey = keys["Space"];
    const punchKey = consumePress("KeyJ");
    const kickKey = consumePress("KeyK");
    const specialKey = consumePress("KeyL");

    // Block
    this.blocking = blockKey && this.grounded && !busy;
    if (this.blocking) {
      this.state = "block";
      this.vx = 0;
      return;
    }

    if (busy) return;

    // Special attack
    if (specialKey && this.energy >= 100) {
      this.startAttack("special");
      this.energy = 0;
      return;
    }

    // Projectile: Down + Punch
    if (
      punchKey &&
      down &&
      this.charData.moves.projectile &&
      this.projectileCooldown <= 0 &&
      this.grounded
    ) {
      this.state = "projectile";
      this.currentAttack = this.charData.moves.projectile;
      this.attackPhase = "startup";
      this.attackTimer = this.charData.moves.projectile.startup;
      this.projectileCooldown = 1;
      this.hasHit = false;
      return;
    }

    // Punch
    if (punchKey) {
      this.startAttack("punch");
      return;
    }

    // Kick
    if (kickKey) {
      this.startAttack("kick");
      return;
    }

    // Jump
    if (up && this.grounded) {
      this.vy = JUMP_VEL;
      this.grounded = false;
      this.state = "jump";
      return;
    }

    // Crouch
    if (down && this.grounded) {
      this.state = "crouch";
      this.vx = 0;
      return;
    }

    // Walk
    if (left || right) {
      this.state = "walk";
      this.vx = (right ? 1 : -1) * WALK_SPD;
    } else {
      if (this.grounded) {
        this.state = "idle";
        this.vx = 0;
      }
    }
  }

  startAttack(moveKey) {
    const move = this.charData.moves[moveKey];
    if (!move) return;
    this.currentAttack = move;
    this.attackPhase = "startup";
    this.attackTimer = move.startup;
    this.hasHit = false;
    this.state = moveKey;
    if (moveKey === "punch") SFX.play("hit");
    else if (moveKey === "kick") SFX.play("heavy");
  }

  takeDamage(dmg, stunFrames, attacker) {
    this.hp = Math.max(0, this.hp - dmg);
    this.hitstun = stunFrames;
    this.state = "hitstun";
    this.currentAttack = null;
    this.attackPhase = "";
    this.vx = -this.facing * 120;
    // Attacker gains energy
    attacker.energy = Math.min(100, attacker.energy + 12);
    // Defender gains some energy too
    this.energy = Math.min(100, this.energy + 5);
    // Heal on Rogue's power drain attacks (kick and special)
    if (attacker.currentAttack && attacker.currentAttack.heal) {
      attacker.hp = Math.min(
        attacker.maxHp,
        attacker.hp + attacker.currentAttack.heal,
      );
    }
  }

  takeBlock(dmg, attacker) {
    this.hp = Math.max(0, this.hp - dmg * 0.15);
    this.blockstun = 8;
    this.state = "block";
    attacker.energy = Math.min(100, attacker.energy + 5);
    SFX.play("block");
  }
}

// ─── AI CONTROLLER ──────────────────────────────────────────────
class AIController {
  constructor() {
    this.thinkTimer = 0;
    this.action = "idle";
    this.actionTimer = 0;
    this.difficulty = 0.7; // 0-1
  }

  update(dt, fighter, opponent) {
    this.thinkTimer -= dt;
    this.actionTimer -= dt;

    if (fighter.hp <= 0 || fighter.hitstun > 0 || fighter.blockstun > 0) return;

    if (this.thinkTimer <= 0) {
      this.thinkTimer = 0.1 + Math.random() * 0.2;
      this.decide(fighter, opponent);
    }

    this.execute(dt, fighter, opponent);
  }

  decide(f, opp) {
    const dist = Math.abs(f.x - opp.x);
    const oppAttacking = opp.currentAttack != null;
    const lowHp = f.hp / f.maxHp < 0.3;
    const oppLowHp = opp.hp / opp.maxHp < 0.25;

    // Block if opponent is attacking and close
    if (oppAttacking && dist < 80 && Math.random() < this.difficulty * 0.8) {
      this.action = "block";
      this.actionTimer = 0.3;
      return;
    }

    // Special if has energy and opponent is close
    if (f.energy >= 100 && dist < 100 && Math.random() < 0.5) {
      this.action = "special";
      this.actionTimer = 0.1;
      return;
    }

    // Projectile at range
    if (
      f.charData.moves.projectile &&
      dist > 250 &&
      f.projectileCooldown <= 0 &&
      Math.random() < 0.4
    ) {
      this.action = "projectile";
      this.actionTimer = 0.1;
      return;
    }

    if (dist > 120) {
      this.action = "approach";
      this.actionTimer = 0.3 + Math.random() * 0.3;
    } else if (dist < 70) {
      const r = Math.random();
      if (r < 0.35) {
        this.action = "punch";
        this.actionTimer = 0.1;
      } else if (r < 0.65) {
        this.action = "kick";
        this.actionTimer = 0.1;
      } else if (r < 0.8) {
        this.action = "block";
        this.actionTimer = 0.3;
      } else {
        this.action = "retreat";
        this.actionTimer = 0.3;
      }
    } else {
      const r = Math.random();
      if (r < 0.4) {
        this.action = "approach";
        this.actionTimer = 0.2;
      } else if (r < 0.6) {
        this.action = "punch";
        this.actionTimer = 0.1;
      } else if (r < 0.8) {
        this.action = "kick";
        this.actionTimer = 0.1;
      } else {
        this.action = "idle";
        this.actionTimer = 0.2;
      }
    }
  }

  execute(dt, f, opp) {
    if (f.currentAttack) return;
    const toOpp = opp.x > f.x ? 1 : -1;

    switch (this.action) {
      case "approach":
        f.state = "walk";
        f.vx = toOpp * WALK_SPD;
        break;
      case "retreat":
        f.state = "walk";
        f.vx = -toOpp * WALK_SPD * 0.7;
        break;
      case "punch":
        f.startAttack("punch");
        this.action = "idle";
        break;
      case "kick":
        f.startAttack("kick");
        this.action = "idle";
        break;
      case "special":
        if (f.energy >= 100) {
          f.startAttack("special");
          f.energy = 0;
        }
        this.action = "idle";
        break;
      case "projectile":
        if (f.charData.moves.projectile && f.projectileCooldown <= 0) {
          f.state = "projectile";
          f.currentAttack = f.charData.moves.projectile;
          f.attackPhase = "startup";
          f.attackTimer = f.charData.moves.projectile.startup;
          f.projectileCooldown = 1.5;
          f.hasHit = false;
        }
        this.action = "idle";
        break;
      case "block":
        f.blocking = true;
        f.state = "block";
        f.vx = 0;
        break;
      default:
        f.blocking = false;
        if (f.grounded && !f.currentAttack) {
          f.state = "idle";
          f.vx = 0;
        }
    }
  }
}

// ─── ARENA RENDERING ────────────────────────────────────────────
function drawArena(ctx) {
  // Dark background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, GH);
  bg.addColorStop(0, "#050510");
  bg.addColorStop(0.5, "#0a0a1e");
  bg.addColorStop(1, "#15152e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, GW, GH);

  // Floor
  ctx.fillStyle = "#12122a";
  ctx.fillRect(0, GROUND + 40, GW, GH - GROUND - 40);

  // Floor line
  const flg = ctx.createLinearGradient(0, 0, GW, 0);
  flg.addColorStop(0, "transparent");
  flg.addColorStop(0.3, "#cc000088");
  flg.addColorStop(0.5, "#ffd70088");
  flg.addColorStop(0.7, "#cc000088");
  flg.addColorStop(1, "transparent");
  ctx.fillStyle = flg;
  ctx.fillRect(0, GROUND + 38, GW, 3);

  // Ambient particles (floor glow)
  ctx.fillStyle = "rgba(204,0,0,0.03)";
  for (let i = 0; i < 5; i++) {
    const px = 200 + i * 200 + Math.sin(Date.now() * 0.001 + i) * 30;
    ctx.beginPath();
    ctx.arc(
      px,
      GROUND + 50,
      40 + Math.sin(Date.now() * 0.002 + i) * 10,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  // Grid lines on floor
  ctx.strokeStyle = "rgba(100,100,150,0.05)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 20; i++) {
    const lx = i * 70 + ((Date.now() * 0.01) % 70);
    ctx.beginPath();
    ctx.moveTo(lx, GROUND + 40);
    ctx.lineTo(lx, GH);
    ctx.stroke();
  }
}

// ─── MAIN GAME ──────────────────────────────────────────────────
class MutantKombat {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = GW;
    this.canvas.height = GH;
    this.resize();
    window.addEventListener("resize", () => this.resize());

    this.state = "title"; // title, select, vs, fight, roundEnd, victory
    this.p1 = null;
    this.p2 = null;
    this.ai = new AIController();
    this.selectedChar = null;
    this.aiChar = null;
    this.p1Wins = 0;
    this.p2Wins = 0;
    this.roundNum = 1;
    this.roundTimer = ROUND_TIME;
    this.announceTimer = 0;
    this.announceText = "";
    this.shakeTimer = 0;
    this.shakeIntensity = 0;
    this.fightStartDelay = 0;
    this.roundEndTimer = 0;

    this.setupUI();
    this.lastTime = performance.now();
    this.loop();
  }

  resize() {
    const scaleX = window.innerWidth / GW;
    const scaleY = window.innerHeight / GH;
    const scale = Math.min(scaleX, scaleY);
    this.canvas.style.width = GW * scale + "px";
    this.canvas.style.height = GH * scale + "px";
    this.canvas.style.left = (window.innerWidth - GW * scale) / 2 + "px";
    this.canvas.style.top = (window.innerHeight - GH * scale) / 2 + "px";
    this.canvasScale = scale;
  }

  setupUI() {
    // Title: Enter/click to start
    document
      .getElementById("title-screen")
      .addEventListener("click", () => this.goToSelect());
    window.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        SFX.init();
        SFX.play("select");
        if (this.state === "title") this.goToSelect();
        else if (this.state === "select" && this.selectedChar) this.goToFight();
      }
    });

    // Victory buttons
    document
      .getElementById("btn-rematch")
      .addEventListener("click", () => this.rematch());
    document
      .getElementById("btn-reselect")
      .addEventListener("click", () => this.goToSelect());
  }

  showOverlay(id) {
    document
      .querySelectorAll(".overlay")
      .forEach((o) => o.classList.remove("active"));
    if (id) document.getElementById(id).classList.add("active");
  }

  // ─── CHARACTER SELECT ──────────
  goToSelect() {
    SFX.init();
    this.state = "select";
    this.selectedChar = null;
    this.aiChar = null;
    this.p1Wins = 0;
    this.p2Wins = 0;
    this.roundNum = 1;
    this.showOverlay("select-screen");
    document.getElementById("fight-hud").classList.add("hidden");
    this.buildSelectGrid();
  }

  buildSelectGrid() {
    const grid = document.getElementById("select-grid");
    grid.innerHTML = "";
    for (const id of CHAR_IDS) {
      const ch = CHARS[id];
      const card = document.createElement("div");
      card.className = "char-card";
      card.dataset.id = id;
      // Mini canvas for preview
      const c = document.createElement("canvas");
      c.width = 100;
      c.height = 100;
      const cx = c.getContext("2d");
      cx.translate(50, 80);
      drawFighter(cx, id, "idle", 0, 0, 0, 1, 0.7);
      card.appendChild(c);
      const nm = document.createElement("div");
      nm.className = "char-card-name";
      nm.textContent = ch.name;
      card.appendChild(nm);
      const tt = document.createElement("div");
      tt.className = "char-card-title";
      tt.textContent = ch.title;
      card.appendChild(tt);
      card.addEventListener("click", () => this.selectChar(id));
      grid.appendChild(card);
    }
  }

  selectChar(id) {
    SFX.play("select");
    this.selectedChar = id;
    // Pick random AI opponent
    const others = CHAR_IDS.filter((c) => c !== id);
    this.aiChar = others[Math.floor(Math.random() * others.length)];
    // Highlight cards
    document.querySelectorAll(".char-card").forEach((c) => {
      c.classList.remove("selected", "ai-pick");
      if (c.dataset.id === id) c.classList.add("selected");
      if (c.dataset.id === this.aiChar) c.classList.add("ai-pick");
    });
    // Update previews
    this.updatePreview("left", id);
    this.updatePreview("right", this.aiChar);
  }

  updatePreview(side, charId) {
    const ch = CHARS[charId];
    document.getElementById(`sel-name-${side}`).textContent = ch.name;
    const avatar = document.getElementById(`sel-avatar-${side}`);
    avatar.innerHTML = "";
    const c = document.createElement("canvas");
    c.width = 140;
    c.height = 140;
    const cx = c.getContext("2d");
    cx.translate(70, 110);
    drawFighter(cx, charId, "idle", 0, 0, 0, side === "left" ? 1 : -1, 0.9);
    avatar.appendChild(c);
    // Stats
    const stats = document.getElementById(`sel-stats-${side}`);
    stats.innerHTML = ["HP", "ATK", "DEF", "SPD"]
      .map((s, i) => {
        const val = [ch.hp / 12, ch.atk, ch.def, ch.spd][i];
        const cls = ["hp", "atk", "def", "spd"][i];
        return `<div class="sel-stat"><span style="width:30px;color:#888;font-size:0.5rem">${s}</span><div class="sel-stat-bar"><div class="sel-stat-fill ${cls}" style="width:${val}%"></div></div></div>`;
      })
      .join("");
  }

  // ─── FIGHT ──────────
  goToFight() {
    if (!this.selectedChar) return;
    this.state = "vs";
    this.showOverlay(null);
    document.getElementById("fight-hud").classList.add("hidden");
    this.announceTimer = 2;
    this.announceText = "";
    this.initRound();
    // VS screen on canvas
    setTimeout(() => {
      this.state = "fight";
      this.fightStartDelay = 1.5;
      this.announce("ROUND " + this.roundNum, false);
      document.getElementById("fight-hud").classList.remove("hidden");
      setTimeout(() => this.announce("FIGHT!", false), 1500);
    }, 2000);
  }

  initRound() {
    const pch = CHARS[this.selectedChar];
    const ach = CHARS[this.aiChar];
    this.p1 = new Fighter(this.selectedChar, 350, 1, false);
    this.p2 = new Fighter(this.aiChar, 930, -1, true);
    this.roundTimer = ROUND_TIME;
    this.ai = new AIController();
    projectiles.length = 0;
    particles.length = 0;
    // HUD
    document.getElementById("hud-p1-name").textContent = pch.name;
    document.getElementById("hud-p2-name").textContent = ach.name;
    this.updateHUD();
    this.updateGems();
  }

  announce(text, isRed = false) {
    const el = document.getElementById("announcement");
    const txt = document.getElementById("announce-text");
    txt.textContent = text;
    txt.className = "announce-text" + (isRed ? " red" : "");
    el.classList.remove("hidden");
    // Re-trigger animation
    txt.style.animation = "none";
    txt.offsetHeight;
    txt.style.animation = "";
    setTimeout(() => el.classList.add("hidden"), 1800);
  }

  rematch() {
    SFX.play("select");
    this.p1Wins = 0;
    this.p2Wins = 0;
    this.roundNum = 1;
    this.showOverlay(null);
    this.state = "vs";
    this.initRound();
    setTimeout(() => {
      this.state = "fight";
      this.fightStartDelay = 1.5;
      this.announce("ROUND 1", false);
      document.getElementById("fight-hud").classList.remove("hidden");
      setTimeout(() => this.announce("FIGHT!", false), 1500);
    }, 1500);
  }

  // ─── UPDATE ──────────
  updateHUD() {
    if (!this.p1 || !this.p2) return;
    const p1pct = Math.max(0, (this.p1.hp / this.p1.maxHp) * 100);
    const p2pct = Math.max(0, (this.p2.hp / this.p2.maxHp) * 100);
    document.getElementById("hud-p1-hp").style.width = p1pct + "%";
    document.getElementById("hud-p2-hp").style.width = p2pct + "%";
    document.getElementById("hud-p1-hp-text").textContent = Math.max(
      0,
      Math.round(this.p1.hp),
    );
    document.getElementById("hud-p2-hp-text").textContent = Math.max(
      0,
      Math.round(this.p2.hp),
    );
    document
      .getElementById("hud-p1-hp")
      .classList.toggle("critical", p1pct < 25);
    document
      .getElementById("hud-p2-hp")
      .classList.toggle("critical", p2pct < 25);
    document.getElementById("hud-p1-nrg").style.width = this.p1.energy + "%";
    document.getElementById("hud-p2-nrg").style.width = this.p2.energy + "%";
    document
      .getElementById("hud-p1-nrg")
      .classList.toggle("full", this.p1.energy >= 100);
    document
      .getElementById("hud-p2-nrg")
      .classList.toggle("full", this.p2.energy >= 100);
    document.getElementById("hud-round").textContent = "ROUND " + this.roundNum;
    document.getElementById("hud-timer").textContent = Math.ceil(
      Math.max(0, this.roundTimer),
    );
  }

  updateGems() {
    for (let i = 0; i < 2; i++) {
      document
        .getElementById(`gem-p1-${i}`)
        .classList.toggle("won", i < this.p1Wins);
      document
        .getElementById(`gem-p2-${i}`)
        .classList.toggle("won", i < this.p2Wins);
    }
  }

  checkHits() {
    if (!this.p1 || !this.p2) return;
    this.checkHit(this.p1, this.p2);
    this.checkHit(this.p2, this.p1);
    // Projectile spawn check
    for (const f of [this.p1, this.p2]) {
      if (
        f.currentAttack === f.charData.moves.projectile &&
        f.attackPhase === "active" &&
        !f.hasHit
      ) {
        spawnProjectile(f, f.charData, f.x, f.y, f.facing);
        f.hasHit = true;
        SFX.play("hit");
      }
    }
  }

  checkHit(attacker, defender) {
    if (attacker.hasHit) return;
    const hitbox = attacker.getHitbox();
    if (!hitbox) return;
    const hurtbox = defender.getHurtbox();
    if (
      hitbox.x < hurtbox.x + hurtbox.w &&
      hitbox.x + hitbox.w > hurtbox.x &&
      hitbox.y < hurtbox.y + hurtbox.h &&
      hitbox.y + hitbox.h > hurtbox.y
    ) {
      attacker.hasHit = true;
      const atkMod = attacker.charData.atk / 80;
      const defMod = defender.charData.def / 100;
      const rawDmg = attacker.currentAttack.dmg * atkMod * (1 - defMod * 0.25);

      if (defender.blocking) {
        defender.takeBlock(rawDmg, attacker);
        spawnParticles(
          defender.x + defender.facing * -10,
          defender.y - 40,
          "#00aaff",
          5,
        );
      } else {
        defender.takeDamage(rawDmg, attacker.currentAttack.stun, attacker);
        defender.comboCount++;
        defender.comboTimer = 1;
        const isSpecial =
          attacker.currentAttack === attacker.charData.moves.special;
        spawnParticles(
          defender.x,
          defender.y - 50,
          isSpecial ? attacker.charData.accent : "#ff4444",
          isSpecial ? 20 : 10,
        );
        SFX.play(isSpecial ? "special" : "heavy");
        this.shakeTimer = isSpecial ? 0.3 : 0.15;
        this.shakeIntensity = isSpecial ? 12 : 6;
        this.showDamageNumber(defender.x, defender.y - 80, Math.round(rawDmg));

        // Combo display
        if (attacker === this.p1 && defender.comboCount >= 2) {
          const cd = document.getElementById("combo-display");
          document.getElementById("combo-count").textContent =
            defender.comboCount;
          cd.classList.remove("hidden");
          cd.style.animation = "none";
          cd.offsetHeight;
          cd.style.animation = "";
          clearTimeout(this.comboHideTimeout);
          this.comboHideTimeout = setTimeout(
            () => cd.classList.add("hidden"),
            1500,
          );
        }
      }
    }
  }

  showDamageNumber(x, y, dmg) {
    const el = document.createElement("div");
    el.className = "dmg-num";
    el.textContent = dmg;
    el.style.color = dmg > 100 ? "#ffd700" : "#ff4444";
    // Convert game coords to screen coords
    const sx = x * this.canvasScale + parseFloat(this.canvas.style.left);
    const sy = y * this.canvasScale + parseFloat(this.canvas.style.top);
    el.style.left = sx + "px";
    el.style.top = sy + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  checkRoundEnd() {
    if (this.state !== "fight" || this.fightStartDelay > 0) return;
    let winner = null;
    if (this.p1.hp <= 0) winner = "p2";
    else if (this.p2.hp <= 0) winner = "p1";
    else if (this.roundTimer <= 0)
      winner = this.p1.hp >= this.p2.hp ? "p1" : "p2";

    if (!winner) return;

    this.state = "roundEnd";
    SFX.play("ko");

    // Loser falls
    const loser = winner === "p1" ? this.p2 : this.p1;
    loser.state = "down";
    loser.currentAttack = null;
    const winnerF = winner === "p1" ? this.p1 : this.p2;
    winnerF.state = "victory";
    winnerF.currentAttack = null;
    winnerF.vx = 0;

    if (winner === "p1") this.p1Wins++;
    else this.p2Wins++;
    this.updateGems();

    const name =
      winner === "p1" ? CHARS[this.selectedChar].name : CHARS[this.aiChar].name;

    if (this.p1Wins >= WINS_NEEDED || this.p2Wins >= WINS_NEEDED) {
      // Match over
      setTimeout(() => {
        this.announce(name + "\nWINS!", true);
        SFX.play("win");
      }, 1000);
      setTimeout(() => this.showVictory(winner), 3500);
    } else {
      // Next round
      setTimeout(
        () => this.announce(name + "\nWINS ROUND " + this.roundNum, false),
        800,
      );
      this.roundNum++;
      setTimeout(() => {
        this.initRound();
        this.state = "fight";
        this.fightStartDelay = 1.5;
        this.announce("ROUND " + this.roundNum, false);
        setTimeout(() => this.announce("FIGHT!", false), 1500);
      }, 3000);
    }
  }

  showVictory(winner) {
    const isP1 = winner === "p1";
    const label = document.getElementById("victory-label");
    label.textContent = isP1 ? "VICTORY" : "DEFEAT";
    label.className = "victory-label" + (isP1 ? "" : " defeat");
    const charName = isP1
      ? CHARS[this.selectedChar].name
      : CHARS[this.aiChar].name;
    document.getElementById("victory-char").textContent = charName + " WINS";
    this.showOverlay("victory-screen");
    document.getElementById("fight-hud").classList.add("hidden");
    this.state = "victory";
  }

  // ─── GAME LOOP ──────────
  loop() {
    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    this.update(dt);
    this.render();
    clearPresses();
    requestAnimationFrame(() => this.loop());
  }

  update(dt) {
    if (this.state === "fight") {
      if (this.fightStartDelay > 0) {
        this.fightStartDelay -= dt;
        return;
      }

      // Round timer
      this.roundTimer -= dt;

      // Player input
      this.p1.handleInput(this.p2);

      // AI
      this.ai.update(dt, this.p2, this.p1);

      // Update fighters
      this.p1.update(dt, this.p2);
      this.p2.update(dt, this.p1);

      // Hit detection
      this.checkHits();

      // Projectiles
      updateProjectiles(dt, [this.p1, this.p2]);

      // Particles
      updateParticles(dt);

      // Screen shake
      if (this.shakeTimer > 0) this.shakeTimer -= dt;

      // HUD
      this.updateHUD();

      // Round end check
      this.checkRoundEnd();
    } else if (this.state === "roundEnd") {
      if (this.p1) this.p1.stateFrame++;
      if (this.p2) this.p2.stateFrame++;
      updateParticles(dt);
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, GW, GH);

    if (this.state === "vs") {
      this.renderVS(ctx);
      return;
    }

    if (this.state === "fight" || this.state === "roundEnd") {
      // Screen shake
      ctx.save();
      if (this.shakeTimer > 0) {
        const s = this.shakeIntensity * (this.shakeTimer / 0.3);
        ctx.translate((Math.random() - 0.5) * s, (Math.random() - 0.5) * s);
      }

      drawArena(ctx);

      // Draw projectiles
      drawProjectiles(ctx);

      // Draw fighters
      if (this.p1 && this.p2) {
        // Draw back fighter first
        const f1 = this.p1,
          f2 = this.p2;
        drawFighter(
          ctx,
          f2.charId,
          f2.state,
          f2.stateFrame,
          f2.x,
          f2.y,
          f2.facing,
        );
        drawFighter(
          ctx,
          f1.charId,
          f1.state,
          f1.stateFrame,
          f1.x,
          f1.y,
          f1.facing,
        );
      }

      // Particles
      drawParticles(ctx);

      ctx.restore();
    } else if (
      this.state === "title" ||
      this.state === "select" ||
      this.state === "victory"
    ) {
      // Dark background for menus
      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, GW, GH);
      // Ambient particles on title
      updateParticles(1 / 60);
      if (Math.random() < 0.03) {
        spawnParticles(Math.random() * GW, GH, "#cc000044", 1);
      }
      drawParticles(ctx);
    }
  }

  renderVS(ctx) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, GW, GH);

    // Player character
    ctx.save();
    ctx.translate(300, 450);
    ctx.scale(1.5, 1.5);
    drawFighter(
      ctx,
      this.selectedChar,
      "idle",
      Math.floor(performance.now() / 16),
      0,
      0,
      1,
    );
    ctx.restore();

    // VS text
    ctx.fillStyle = "#cc0000";
    ctx.font = 'bold 80px "Press Start 2P", monospace';
    ctx.textAlign = "center";
    ctx.shadowColor = "#cc0000";
    ctx.shadowBlur = 30;
    ctx.fillText("VS", GW / 2, GH / 2);
    ctx.shadowBlur = 0;

    // AI character
    ctx.save();
    ctx.translate(980, 450);
    ctx.scale(1.5, 1.5);
    drawFighter(
      ctx,
      this.aiChar,
      "idle",
      Math.floor(performance.now() / 16),
      0,
      0,
      -1,
    );
    ctx.restore();

    // Names
    ctx.font = '20px "Press Start 2P", monospace';
    ctx.fillStyle = "#00aaff";
    ctx.textAlign = "center";
    ctx.fillText(CHARS[this.selectedChar].name, 300, 550);
    ctx.fillStyle = "#cc0000";
    ctx.fillText(CHARS[this.aiChar].name, 980, 550);
  }
}

// ─── INITIALIZE ─────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  const game = new MutantKombat();
});
