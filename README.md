# International Law, made easy

A React (Vite) study site: plain-English notes, case stories, flashcards and quizzes.

## Run it
```
npm install
npm run dev      # open the local address it prints
npm run build    # makes the dist/ folder
```
Put the `dist/` folder on Netlify, Vercel or GitHub Pages to share it.

## Add or edit content
Everything she reads lives in `src/data/chapters.js`. To add a chapter, copy one
object in the list and change the text. No other file needs to change.

## Files
- `src/App.jsx`: page layout, chapter and tab switching, progress
- `src/components/`: Learn, Cases, Cards (flashcards), Quiz, Practice (exam practice), Cases (with the audio reader), Revision (mixed revision quiz across all chapters)
- `src/storage.js`: saves progress in the browser
- `src/styles.css`: colours, fonts, dark mode

## Visitor stats (Vercel Web Analytics)
`@vercel/analytics` is already added. After running `npm install` and redeploying,
turn it on in the Vercel dashboard: your project > Analytics tab > Enable.
Visits then appear there (it does not count visits while you run it locally).
