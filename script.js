(function () {
  'use strict';

  var audio = document.getElementById('laugh');
  var cat = document.getElementById('cat');
  var catMissing = document.getElementById('cat-missing');

  var muteBtn = document.getElementById('mute');
  var audioBroken = false;

  /* ---- Image: fall back to .jpg, then to an emoji placeholder ---- */
  var imgTried = 0;
  var imgFallbacks = ['assets/laughing-cat.jpg', 'assets/laughing-cat.jpeg'];
  cat.addEventListener('error', function () {
    if (imgTried < imgFallbacks.length) {
      cat.src = imgFallbacks[imgTried++];
    } else {
      cat.hidden = true;
      catMissing.hidden = false;
    }
  });

  /* ---- Audio (looping; one element so nothing overlaps) ---- */
  function setMuted(m) {
    audio.muted = m;
    muteBtn.textContent = m ? '🔇' : '🔊';
    muteBtn.setAttribute('aria-pressed', m ? 'true' : 'false');
    muteBtn.setAttribute('aria-label', m ? 'Unmute the laugh' : 'Mute the laugh');
  }

  var armed = false;
  // If the browser refuses to start sound, start it on the next touch/click/key (once).
  function armRetry() {
    if (armed) return;
    armed = true;
    var evts = ['pointerdown', 'keydown'];
    function once() {
      evts.forEach(function (n) { document.removeEventListener(n, once, true); });
      armed = false;
      if (!audio.muted) play();
    }
    evts.forEach(function (n) { document.addEventListener(n, once, true); });
  }

  function play() {
    if (audioBroken) return;
    var p = audio.play();
    if (p && typeof p.catch === 'function') p.catch(function () { if (!audioBroken) armRetry(); });
  }

  audio.addEventListener('error', function () {
    audioBroken = true;
    muteBtn.hidden = true;
  });

  muteBtn.addEventListener('click', function () {
    var m = !audio.muted;
    setMuted(m);
    if (!m) play();
  });

  // The reveal starts from the visitor's tap on the gate button, which is a
  // genuine user gesture, so the browser allows the laugh to play.
  var d = new Date();
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  document.getElementById('gate-date').textContent =
    pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  document.getElementById('gate-ref').textContent =
    String(Math.floor(Math.random() * 1e12)).padStart(12, '0');

  // Short emoji rain (~3.5 s, 16 elements, transform-only). Skipped for reduced motion.
  function rain() {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var emo = ['💀', '😹', '💸', '🎃', '🤣', '🤡'];
    var box = document.createElement('div');
    box.className = 'rain';
    box.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 16; i++) {
      var b = document.createElement('span');
      b.className = 'bit';
      b.textContent = emo[Math.floor(Math.random() * emo.length)];
      b.style.left = Math.random() * 96 + '%';
      b.style.fontSize = 22 + Math.random() * 26 + 'px';
      b.style.animationDuration = 2 + Math.random() * 1.5 + 's';
      b.style.animationDelay = Math.random() * 0.9 + 's';
      b.style.setProperty('--spin', (Math.random() < 0.5 ? -1 : 1) * (180 + Math.random() * 360) + 'deg');
      box.appendChild(b);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 4800);
  }

  var gate = document.getElementById('gate');
  var reveal = document.getElementById('reveal');
  // Random small amount, shown on the gate and reused in the roast line.
  var amts = [2, 5, 10];
  var amt = amts[Math.floor(Math.random() * amts.length)];
  document.getElementById('gate-amt').textContent = 'RM ' + amt + '.00';

  // Scroll-in animation for the awareness section (progressive: content is visible without JS/IO).
  function animateAware() {
    var box = document.getElementById('aware');
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    var items = box.querySelectorAll('.aware-tag, h2, .aware-sub, .tile, .sos, .aware-foot');
    box.classList.add('anim-ready');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    items.forEach(function (el, i) {
      el.style.setProperty('--d', (el.classList.contains('tile') ? (i % 2) * 0.12 : 0) + 's');
      io.observe(el);
    });
  }

  var goBtn = document.getElementById('go');
  var going = false;

  function burst() {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var box = document.createElement('div');
    box.className = 'rain';
    box.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 14; i++) {
      var b = document.createElement('span');
      var ang = (i / 14) * Math.PI * 2;
      b.className = 'coin';
      b.textContent = '💸';
      b.style.setProperty('--dx', Math.cos(ang) * (110 + Math.random() * 90) + 'px');
      b.style.setProperty('--dy', Math.sin(ang) * (110 + Math.random() * 90) + 'px');
      box.appendChild(b);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 1200);
  }

  function showReveal() {
    var lines = [
      'RM' + amt + '? AKU INTERN JE BRO 💀',
      'DOMPET KOSONG BRO 💀',
      'KENA PRANK! 🎃',
      'DUIT? MIMPI JE BRO 😹',
      'RM' + amt + ' WHERE BRO? KENA SCAM!'
    ];
    document.querySelector('.scam').textContent = lines[Math.floor(Math.random() * lines.length)];
    gate.hidden = true;
    reveal.hidden = false;
    document.getElementById('aware').hidden = false;
    animateAware();
    if (!audioBroken) muteBtn.hidden = false;
    document.title = 'HAHAHAHA! You Really Thought?';
    play();
    burst();
    rain();
  }

  goBtn.addEventListener('click', function () {
    if (going) return;
    going = true;
    goBtn.classList.add('loading');
    goBtn.textContent = 'Redirecting…';
    // Unlock audio inside this tap (iOS), then play for real when the cat appears.
    var u = audio.play();
    if (u && u.then) {
      u.then(function () { if (!reveal.hidden) return; audio.pause(); audio.currentTime = 0; }).catch(function () {});
    }
    setTimeout(showReveal, 800);
  });
})();
