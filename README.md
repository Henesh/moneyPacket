# Laughing Cat QR Prank

A tiny static site (HTML + CSS + vanilla JS). Scan the QR on the fictional Halloween money packet, get roasted by a laughing cat. No backend, no tracking, no permissions, no personal data.

## 1. Add the two assets (required)

```
assets/laughing-cat.png   <- your supplied laughing cat image (.jpg/.jpeg also works if named laughing-cat.jpg)
assets/laugh.mp3          <- a laugh sound effect you have the right to use
```

Until they exist, the page shows a 😹 placeholder and a "Sound file missing" button. Use a royalty-free / licensed sound (e.g. a CC0 clip from freesound.org or pixabay.com/sound-effects). Keep it short (1–4 s) and compressed (under ~100 KB).

## 2. Run locally

From this folder, either:

```
python -m http.server 8000
```
or
```
npx serve .
```

Open http://localhost:8000. (Opening index.html directly also works, but a server matches real hosting.)
Test on your phone while on the same Wi-Fi via `http://<your-PC-LAN-IP>:8000` — but **never** put this address in the QR code.

## 3. Deploy (free, HTTPS)

### GitHub Pages
1. Create a GitHub repo and push these files (index.html at the repo root).
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`. Save.
3. After ~1 minute your URL is `https://<username>.github.io/<repo>/`.

### Netlify (alternative)
1. Go to https://app.netlify.com/drop and drag this whole folder onto the page (or connect the GitHub repo; no build command, publish directory `.`).
2. Netlify gives you `https://<random-name>.netlify.app`. Rename it under **Site configuration → Change site name**.

## 4. Get the final URL and make the QR code

1. Open the public `https://…` URL in a browser and confirm the cat loads.
2. Generate a QR code containing **only that URL** using any free generator (e.g. https://www.qrcode-monkey.com or https://goqr.me), or locally: `pip install qrcode[pil]` then `qr "https://your-url/" > qr.png`.
3. Download as PNG (min 1000 px) or SVG for printing. Don't pick a "dynamic"/paid QR that routes through a tracking service.
4. Print at least ~2.5 cm × 2.5 cm with good contrast and a white margin.

## 5. Test on a real phone

- Scan the *printed* code (not the screen) with the camera app on both iPhone and Android.
- Confirm the URL shown is your public https address, not localhost.
- Check: cat visible without scrolling, laugh plays or the **PLAY LAUGH AGAIN** button works, STOP works.
- Try on mobile data (not just Wi-Fi) to confirm it's truly public.

Note: iOS and most mobile browsers block autoplay with sound. That's expected; the visitor just taps the button. The site doesn't try to bypass this.

## Packet text suggestions

"SCAN TO CLAIM RM100" / "100% LEGIT (TRUST ME BRO)". Keep the design clearly fictional — don't imitate real banknotes or real payment-app branding.
