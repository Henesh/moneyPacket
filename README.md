# Laughing Cat QR Prank

A tiny static site (HTML + CSS + vanilla JS). Scan the QR on the fictional Halloween money packet and you land on a generic fake "e-wallet" claim screen. Tap **Click here to redirect to the app** and a laughing cat appears with a random Malay roast and a laugh sound (the tap is what lets mobile browsers play sound). No backend, no tracking, no permissions, no personal data.

Live site: https://henesh.github.io/moneyPacket/  (repo: https://github.com/Henesh/moneyPacket)

The gate page is deliberately generic: no Touch 'n Go (or any real payment brand) name, logo or colours, and it never asks for any input. Keep it that way — copying a real brand can get the site flagged as phishing.

Roast lines are picked at random from the `lines` array in `script.js`.

## 1. Add the two assets (required)

```
assets/laughing-cat.png   <- your supplied laughing cat image (.jpg/.jpeg also works if named laughing-cat.jpg)
assets/laugh.mp3          <- a laugh sound effect you have the right to use
```

If either is missing, the page shows a 😹 placeholder (cat) or no mute button (sound). Use a royalty-free / licensed sound (e.g. a CC0 clip from freesound.org or pixabay.com/sound-effects). The current clip is trimmed to 3 s, limited to peak 0 dB and under 50 KB.

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
3. After ~1 minute your URL is `https://<username>.github.io/<repo>/` (for this project: `https://henesh.github.io/moneyPacket/`). If you rename the repo the URL changes and any old QR code stops working.

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
- Check: the fake wallet screen shows, tapping the button reveals the cat without scrolling, the laugh plays on a loop, and the 🔊 button in the top-right mutes and unmutes it.
- Print the QR at least 3 cm wide on a matte, light packet with a white border, and test it in dim light.
- Try on mobile data (not just Wi-Fi) to confirm it's truly public.

Note: browsers block sound until the visitor interacts. The site relies on the tap on the gate button, so the laugh normally plays straight away. The laugh loops; the mute button is the only sound control. If a browser still refuses, the next tap anywhere starts it.

## Packet text suggestions

"SCAN TO CLAIM RM10" (or any small amount; the page randomly shows RM2, RM5 or RM10) / "100% LEGIT (TRUST ME BRO)". Keep the design clearly fictional — don't imitate real banknotes or real payment-app branding.
