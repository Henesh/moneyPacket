(function () {
  'use strict';

  var audio = document.getElementById('laugh');
  var playBtn = document.getElementById('play');
  var stopBtn = document.getElementById('stop');
  var cat = document.getElementById('cat');
  var catMissing = document.getElementById('cat-missing');

  var PLAY_LABEL = '🔊 PLAY LAUGH AGAIN';
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

  /* ---- Audio ---- */
  function showStop(on) { stopBtn.hidden = !on; }

  function setPlaying(on) {
    showStop(on);
    playBtn.textContent = on ? '🔁 REPLAY LAUGH' : PLAY_LABEL;
  }

  function play() {
    if (audioBroken) {
      playBtn.textContent = '🔇 Sound file missing';
      return;
    }
    // One <audio> element, always restarted from 0: no overlapping instances.
    audio.pause();
    audio.currentTime = 0;
    var p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(function () {
        playBtn.classList.remove('attention');
        setPlaying(true);
      }).catch(function () {
        // Autoplay blocked (or interrupted): leave the button visible and wait for a tap.
        if (audioBroken) return;
        setPlaying(false);
        playBtn.classList.add('attention');
      });
    }
  }

  function stop() {
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
  }

  audio.addEventListener('ended', function () { setPlaying(false); });
  audio.addEventListener('error', function () {
    audioBroken = true;
    playBtn.textContent = '🔇 Sound file missing';
  });

  playBtn.addEventListener('click', play);
  stopBtn.addEventListener('click', stop);

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
  document.getElementById('go').addEventListener('click', function () {
    gate.hidden = true;
    var lines = [
      'RM100? AKU INTERN JE BRO 💀',
      'DOMPET KOSONG BRO 💀',
      'KENA PRANK! 🎃',
      'DUIT? MIMPI JE BRO 😹',
      'RM100 WHERE BRO? KENA SCAM!'
    ];
    document.querySelector('.scam').textContent = lines[Math.floor(Math.random() * lines.length)];
    reveal.hidden = false;
    document.title = 'HAHAHAHAHA! You Really Thought?';
    play();
    rain();
  });
})();
