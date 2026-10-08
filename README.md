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
- `src/components/`: Learn, Cases, Cards (flashcards), Quiz
- `src/storage.js`: saves progress in the browser
- `src/styles.css`: colours, fonts, dark mode
