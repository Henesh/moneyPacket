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

  // Single autoplay attempt on load; never retried automatically.
  play();
})();
