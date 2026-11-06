# mohamedeyaad.github.io

Personal portfolio of **Mohamed Eyad**, robotics engineer: <https://mohamedeyaad.github.io>

A static site with no build step: plain HTML, one stylesheet and one small script. GitHub Pages serves it directly from this repository.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | Home page: hero, about, experience, projects, skills, education, contact |
| `pages/*.html` | One page per project (same layout for every page) |
| `assets/css/site.css` | All styles. Colours and sizes are the variables at the top (`:root`) |
| `assets/js/site.js` | Mobile menu, active-section highlight, image viewer, click-to-load videos |
| `assets/fonts/` | Inter and Space Grotesk (SIL Open Font License, see `OFL.txt`) |
| `images/` | Photos, diagrams, logos, card thumbnails (`images/cards/`), video posters (`images/posters/`) |
| `files/` | PDFs: CV, reports, poster |
| `videos/` | Local project videos |

## Common edits

- **CV:** replace `files/Mohamed_Eyad_CV.pdf` (keep the file name and every "Résumé" button keeps working).
- **Availability line:** search `index.html` for `MSc defense` (hero and "At a glance") and update it after the defense.
- **New project:** copy an existing page in `pages/`, then add a card to the "Selected projects" grid in `index.html`
  (copy one `<article class="card">` block) with a 16:9 image in `images/cards/`.
- **Images:** clicking any image wrapped in `<a class="zoom" href="...">` opens it in the built-in viewer.
- **YouTube videos** load only after the visitor presses play (no YouTube cookies before that):
  copy an existing `<button class="embed-btn" data-embed="...">` block and change the video ID.

Old template files (`assets/css/main.css`, `assets/js/jquery*.js`, `assets/sass/`, `assets/webfonts/`, ...) are no longer
used by any page and can be deleted.
