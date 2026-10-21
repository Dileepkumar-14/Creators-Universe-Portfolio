CREATORS UNIVERSE — UPDATED CODE BUNDLE

This bundle updates the source-code files only. Your original photo/video assets are not included. Keep your existing assets folders and images.

FILES TO COPY INTO YOUR WEBSITE FOLDER (overwrite the matching files):
- index.html
- css/style.css
- js/data.js
- js/main.js
- js/stills-manifest.js
- projects/paranormal-connections.html
- projects/loop-break-free.html
- generate-stills.ps1 (new file)

AUTOMATIC STILLS COUNTS
1. Open the main website folder (the one containing index.html).
2. In File Explorer's address bar type powershell and press Enter.
3. Run: powershell -ExecutionPolicy Bypass -File .\generate-stills.ps1
4. The script scans assets/stills/home, assets/stills/paranormal, and assets/stills/loop-break-free and writes js/stills-manifest.js.
5. Refresh pages using Ctrl+F5.

Supported image extensions: .jpg, .jpeg, .png, .webp, .avif. File names are sorted alphabetically. Keep the original asset folders in place.

POSTER PATH
The Paranormal Connections vertical poster is expected at assets/cards for scripts/paranormal-connections.png. If the real filename differs, update the src in projects/paranormal-connections.html.

CHALLENGE GALLERIES
Challenge images remain configured in js/data.js and are resolved relative to both the homepage and project pages. The expected paths are under assets/challenges/... as listed in js/data.js. Check those filenames against your actual folders.

EMAIL
The homepage contact button is already set to mailto:dileepmummina@gmail.com. Opening the mail app depends on Windows/browser mailto settings.
