/* =========================================================
   Surprise pour Benicia — logique de l'application
   ========================================================= */
(function () {
  "use strict";

  const screens = Array.from(document.querySelectorAll(".screen"));
  const byId = (id) => document.getElementById("screen-" + id);

  function goTo(targetId) {
    const current = document.querySelector(".screen.active");
    const target = byId(targetId);
    if (!target || target === current) return;

    if (current) {
      current.classList.add("leaving");
      current.classList.remove("active");
      window.setTimeout(() => current.classList.remove("leaving"), 700);
    }
    // léger décalage pour laisser respirer la transition de sortie
    window.setTimeout(() => target.classList.add("active"), current ? 60 : 0);

    // arrêter la vidéo/vinyle si on quitte l'écran playlist ou lettre
    if (current && current.id === "screen-music_playlist") {
      const vinyl = document.getElementById("vinyl");
      const arm = document.getElementById("tonearm");
      if (vinyl) vinyl.classList.remove("spinning");
      if (arm) arm.classList.remove("down");
    }
  }

  /* ---------- 1. QR portal -> enveloppe ---------- */
  const qrPortal = document.getElementById("qrPortal");
  if (qrPortal) {
    qrPortal.addEventListener("click", () => goTo("envelope_landing"));
  }

  /* ---------- 2. Enveloppe -> aperçu ---------- */
  const envelopeBtn = document.getElementById("envelopeBtn");
  if (envelopeBtn) {
    let opened = false;
    envelopeBtn.addEventListener("click", () => {
      if (opened) return;
      opened = true;
      envelopeBtn.classList.add("opening");
      window.setTimeout(() => {
        goTo("envelope_opened_preview");
        // réinitialise l'enveloppe pour une éventuelle réouverture (bouton "Gift")
        window.setTimeout(() => {
          envelopeBtn.classList.remove("opening");
          opened = false;
        }, 900);
      }, 950);
    });
  }

  /* ---------- 3. Aperçu -> menu ---------- */
  const toMenuBtn = document.getElementById("toMenuBtn");
  if (toMenuBtn) {
    toMenuBtn.addEventListener("click", () => goTo("main_menu"));
  }

  /* ---------- 4. Menu principal : navigation par data-target ---------- */
  document.querySelectorAll("[data-target]").forEach((el) => {
    el.addEventListener("click", () => goTo(el.getAttribute("data-target")));
  });

  /* ---------- 6. Lettre : lecteur audio ---------- */
  const audioBtn = document.getElementById("audioBtn");
  const audioLabel = document.getElementById("audioLabel");
  const letterAudio = document.getElementById("letterAudio");
  if (audioBtn && letterAudio) {
    audioBtn.addEventListener("click", () => {
      if (letterAudio.paused) {
        letterAudio.play().catch(() => {});
        audioBtn.classList.add("playing");
        audioLabel.textContent = "Pause Musik";
      } else {
        letterAudio.pause();
        audioBtn.classList.remove("playing");
        audioLabel.textContent = "Play Musik";
      }
    });
  }

  /* ---------- 7. Playlist : vinyle + bras ---------- */
  const vinyl = document.getElementById("vinyl");
  const tonearm = document.getElementById("tonearm");
  const screenPlaylist = byId("music_playlist");
  if (screenPlaylist && vinyl && tonearm) {
    // observe l'apparition de l'écran playlist pour lancer l'animation du vinyle
    const observer = new MutationObserver(() => {
      if (screenPlaylist.classList.contains("active")) {
        window.setTimeout(() => {
          tonearm.classList.add("down");
          vinyl.classList.add("spinning");
        }, 350);
      }
    });
    observer.observe(screenPlaylist, { attributes: true, attributeFilter: ["class"] });
  }

  /* ---------- pause vidéos hors-écran (perf mobile) ---------- */
  const allVideos = Array.from(document.querySelectorAll("video"));
  const videoObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const v = entry.target;
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      }, { threshold: 0.15 })
    : null;
  if (videoObserver) allVideos.forEach((v) => videoObserver.observe(v));

  /* ---------- placeholders : si un média manque, on affiche un état clair ---------- */
  document.querySelectorAll("video").forEach((v) => {
    v.addEventListener("error", () => {
      v.closest("figure, .portrait-frame")?.classList.add("media-missing");
    }, true);
  });
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.alt = "Photo à remplacer — dépose ton fichier dans /assets";
    });
  });

  /* ---------- particules ambiantes (coeurs / pétales) ---------- */
  const particlesEl = document.getElementById("particles");
  if (particlesEl) {
    const symbols = ["💗", "🌸", "✨", "🌹"];
    const COUNT = window.innerWidth < 480 ? 12 : 18;
    for (let i = 0; i < COUNT; i++) {
      const span = document.createElement("span");
      span.className = "particle";
      span.textContent = symbols[i % symbols.length];
      span.style.setProperty("--s", (12 + Math.random() * 14) + "px");
      span.style.setProperty("--o", (0.25 + Math.random() * 0.35).toFixed(2));
      span.style.setProperty("--dur", (10 + Math.random() * 12) + "s");
      span.style.setProperty("--delay", (Math.random() * 14) + "s");
      span.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
      span.style.left = Math.random() * 100 + "%";
      particlesEl.appendChild(span);
    }
  }

  /* ---------- clavier : Echap = retour, flèches pour tester ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const backBtn = document.querySelector(".screen.active .btn-back");
      if (backBtn) backBtn.click();
    }
  });
})();
