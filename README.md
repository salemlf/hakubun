# Hakubun

A cross-platform, third-party Japanese Study App for Wanikani

## Overview

Hakubun is a Japanese learning app that can be used with Wanikani, an SRS-based Japanese learning service. Learn and review radicals, kanji, and vocabulary, easily search for subjects, and explore content across levels.

## Download the App

The iOS and web versions are still being tested, but the alpha version Android is [available on the Play Store through early access!](https://play.google.com/store/apps/details?id=io.hakubun.app)

### Interface

- Use swipe gestures or keyboard shortcuts to submit or retry answers
- Cross-platform, web-based app with native-like interactions and animations

### Reviews and Lessons

- Review or learn by subject
  - Radical, kanji, vocabulary, kana vocabulary
- Select specific items to review or learn
- Shuffle or sort by SRS stage, level, available date
- Option to filter subjects by current level
- Typo tolerance

### Reviews

- Back to back ordering: change card order in queue
  - Meaning then reading
  - Reading then meaning
  - Disabled (shuffled)
- Wrap-up mode: finish up the reviews you started on, unreviewed are removed from queue

## Privacy Policy/Information Collected

Hakubun uses [Logrocket](https://logrocket.com/), a log collecting tool, to detect common errors that users are experiencing.

This means the following information may be stored:

- Username
- Errors encountered
- User actions in app (for example: how often user a page)

The following information is **NOT** stored and I will never be able to access to it:

- API tokens
- User location data
- User's name or other sensitive data

Please [email me](mailto:salemlfenn@gmail.com) if you have any questions or concerns about how/what data is stored.

## Screenshots

### Home

<img src="./resources/app-screenshots/home/home-page.jpg" width="300" alt="home page" /> <img src="./resources/app-screenshots/home/subject-popover.jpg" width="300" alt="subject popover" /> <img src="./resources/app-screenshots/home/review-forecast.jpg" width="300" alt="review forecast" />

### Lessons

<img src="./resources/app-screenshots/lessons/settings-basic.jpg" width="300" alt="basic lesson settings" /> <img src="./resources/app-screenshots/lessons/settings-advanced.jpg" width="300" alt="advanced lesson settings" /> <img src="./resources/app-screenshots/lessons/settings-advanced-filters.jpg" width="300" alt="advanced lesson settings with filters" /> <img src="./resources/app-screenshots/lessons/lesson-quiz.jpg" width="300" alt="lesson quiz" /> <img src="./resources/app-screenshots/lessons/lesson-session.jpg" width="300" alt="lesson session, card with 'correct' popover after user input" /> <img src="./resources/app-screenshots/lessons/lesson-summary.jpg" width="300" alt="lesson summary, shows user what items they learned" />

### Reviews

<img src="./resources/app-screenshots/reviews/settings-basic.jpg" width="300" alt="basic review settings" /> <img src="./resources/app-screenshots/reviews/settings-advanced-filters.jpg" width="300" alt="advanced review settings with filters" /> <img src="./resources/app-screenshots/reviews/review-session-correct.jpg" width="300" alt="correct review item after user input" /> <img src="./resources/app-screenshots/reviews/retry-item.jpg" width="300" alt="retrying a review after a bad typo" /> <img src="./resources/app-screenshots/reviews/next-item.jpg" width="300" alt="moving to the next item in review queue" /> <img src="./resources/app-screenshots/reviews/subject-info.jpg" width="300" alt="Viewing subject info in bottom sheet for subject during review" /> <img src="./resources/app-screenshots/reviews/end-review-dialog.jpg" width="300" alt="dialog with cancel, end session, and wrap up options for when user attempts to leave page before completing all reviews" /> <img src="./resources/app-screenshots/reviews/wrapping-up-overlay.jpg" width="300" alt="overlay of checkered flag displaying after 'wrap up' is selected" /> <img src="./resources/app-screenshots/reviews/review-summary.jpg" width="300" alt="summary of reviews items user got correct and incorrect" />

### Subjects

<img src="./resources/app-screenshots/subjects/subjects-levels.jpg" width="300" alt="subjects page with radicals, kanji, and vocabulary where you can browse the levels" /> <img src="./resources/app-screenshots/subjects/subjects-level-vocab.jpg" width="300" alt="subjects page scrolled down to view vocabulary for level" />

### Search

<img src="./resources/app-screenshots/search/empty-input.jpg" width="300" alt="empty search box with Hakubun crabigator asking user to search for something" /> <img src="./resources/app-screenshots/search/no-results.jpg" width="300" alt="search box with nonsense input, Hakubun crabigator saying 'no results' while looking distressed" /> <img src="./resources/app-screenshots/search/results.jpg" width="300" alt="search box with 'cat' input and long list of results to choose from" />

### Subject Details

<img src="./resources/app-screenshots/subject-details/vocab-and-user-meaning.jpg" width="300" alt="subject details page for vocabulary with user-added meaning" /> <img src="./resources/app-screenshots/subject-details/vocab-context-sentences.jpg" width="300" alt="subject details page for vocabulary, showing context sentences with translations that can be hidden and shown" /> <img src="./resources/app-screenshots/subject-details/kanji-entering-user-note.jpg" width="300" alt="subject details page for kanji with user entering their own meaning note" /> <img src="./resources/app-screenshots/subject-details/kanji-reading-user-note.jpg" width="300" alt="subject details page for kanji with saved meaning note by user, displaying reading section below" />

## Code Implementation and Future Goals for this Project

### Cross-Platform Framework

Hakubun is written in React TypeScript, and uses [Capacitor](https://capacitorjs.com/) to create a cross-platform app experience. When I started this project though, it was actually in React Native! I quickly realized that the language/framework I wanted to build my project on required more investigation and thought, so I decided to evaluate the pros and cons of the options out there.

#### Why not Flutter?

The other main contender was [Flutter](https://flutter.dev/), a cross-platform, natively complied framework that's pretty well-known in the cross-platform/hybrid app world.

I didn't go with this for a couple reasons:

**Flutter Apps are Written in Dart**
Why is this a problem?

- Dart is a relatively new language on the scene, and not well-known
- Dart is also used almost exclusively for writing Flutter apps. _It's not a widespread, multi-purpose language like JavaScript, TypeScript, or Python are_

I want this project to be written in a language that a large portion of programmers can understand. That way, if others want to contribute to the app or if I stop maintaining it, it's easier for others to learn and add on to the existing codebase. Dart is such a niche language that I don't feel it's accessible for the everyday programmer/software engineer.

**Google has a tendency to axe their creations**

- They're a massive company that handles all sorts of apps and services, so this isn't surprising

#### Why Capacitor?

I want my apps to be flexible and accessible to as many people as possible. [Capacitor](https://capacitorjs.com/) is described as a "cross-platform native runtime for web apps". It's essentially something you can stick onto web apps that creates iOS and Android versions of it. Using this approach, I can use the libraries and packages I want and modify those as requirements change. There are of course some tradeoffs to this approach (as with anything in software), but it's worked out well so far.

### Future Goals and Improvements

...
