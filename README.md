<div align="center">
  <a href="https://github.com/salemlf/hakubun">
    <img src="./src/images/logo.svg" alt="Hakubun Logo - Crabigator creature with alligator head and crab arm" width="100" height="100">
  </a>

  <h1 style="font-size: 2.5rem" align="center">Hakubun</h3>

  <p align="center">
    A cross-platform, third-party Japanese Study App for Wanikani
  </p>
  <p style="display: flex; align-items: center; flex-wrap: wrap; justify-content: center; margin: 0">
    <a href="https://github.com/salemlf/hakubun/issues/new?labels=bug&template=bug-report.md">Report Bug 🐛</a>
    <span style="padding: 0 5px; font-size: 2rem">·</span>
    <a href="https://github.com/salemlf/hakubun/issues/new?labels=enhancement&template=feature-request.md">Request Feature 🚀</a>  
  </p>
  <p style="display: flex; align-items: center; flex-wrap: wrap; justify-content: center; margin: 0">
    <a href="https://play.google.com/store/apps/details?id=io.hakubun.app">Android Beta App <img src="./resources/play-store.svg" width="14" alt="Android play store icon" /></a>
    <span style="padding: 0 5px; font-size: 2rem">·</span>
    <a href="https://testflight.apple.com/join/8ajt7uYv">iOS Beta App <img src="./resources/testflight.svg" width="14" alt="Apple Testflight icon" /></a>
  </p>
  <p style="display: flex; align-items: center; flex-wrap: wrap; justify-content: center; margin: 0">
    <a href="#features-star2">Features 🌟</a>
    <span style="padding: 0 5px; font-size: 2rem">·</span>
    <a href="#contributing-trophy">Contributing 🏆</a>
    <span style="padding: 0 5px; font-size: 2rem">·</span>
    <a href="#development-desktop_computer">Development 🖥️</a>
    <span style="padding: 0 5px; font-size: 2rem">·</span>
    <a href="#license-notebook">License 📓</a>
    <span style="padding: 0 5px; font-size: 2rem">·</span>
    <a href="#credits-1st_place_medal">Credits 🥇</a>
  </p>
</div>

## Overview

Hakubun is a Japanese learning app that can be used with [Wanikani](https://www.wanikani.com/), an SRS-based Japanese learning service. Learn and review radicals, kanji, and vocabulary, easily search for subjects, and explore content across levels.

## Download the App :zap:

The web version is still being tested, but the beta versions of both Android and iOS are available to download!

- [Android App on Play Store](https://play.google.com/store/apps/details?id=io.hakubun.app), available through Early Access
- [iOS App on Testflight](https://testflight.apple.com/join/8ajt7uYv)

## Features :star2:

### Interface

- Use swipe gestures or keyboard shortcuts to submit or retry answers
- Cross-platform, web-based app with native-like interactions and animations
- Light or dark theme options

### Reviews and Lessons

- Review or learn by subject
  - Radical, kanji, vocabulary, kana vocabulary
- Select specific items to review or learn
- Batch size selection
- Shuffle or sort by SRS stage, level, available date, date updated
- Option to filter subjects by current level
- Go to next item on correct answer
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
- User actions in app (for example: how often user visits a page)

The following information is **NOT** stored and I will never be able to access to it:

- API tokens
- User location data
- User's name or other sensitive data

Please [email me](mailto:salemlfenn@gmail.com) if you have any questions or concerns about how/what data is stored.

## Screenshots :camera_flash:

### Home

<img src="./resources/app-screenshots/home/home-page.jpg" width="100" alt="home page" /> <img src="./resources/app-screenshots/home/subject-popover.jpg" width="100" alt="subject popover" /> <img src="./resources/app-screenshots/home/review-forecast.jpg" width="100" alt="review forecast" />

### Lessons

<img src="./resources/app-screenshots/lessons/settings-basic.jpg" width="100" alt="basic lesson settings" /> <img src="./resources/app-screenshots/lessons/settings-advanced.jpg" width="100" alt="advanced lesson settings" /> <img src="./resources/app-screenshots/lessons/settings-advanced-filters.jpg" width="100" alt="advanced lesson settings with filters" /> <img src="./resources/app-screenshots/lessons/lesson-quiz.jpg" width="100" alt="lesson quiz" /> <img src="./resources/app-screenshots/lessons/lesson-session.jpg" width="100" alt="lesson session, card with 'correct' popover after user input" /> <img src="./resources/app-screenshots/lessons/lesson-summary.jpg" width="100" alt="lesson summary, shows user what items they learned" />

### Reviews

<img src="./resources/app-screenshots/reviews/settings-basic.jpg" width="100" alt="basic review settings" /> <img src="./resources/app-screenshots/reviews/settings-advanced-filters.jpg" width="100" alt="advanced review settings with filters" /> <img src="./resources/app-screenshots/reviews/review-session-correct.jpg" width="100" alt="correct review item after user input" /> <img src="./resources/app-screenshots/reviews/retry-item.jpg" width="100" alt="retrying a review after a bad typo" /> <img src="./resources/app-screenshots/reviews/next-item.jpg" width="100" alt="moving to the next item in review queue" /> <img src="./resources/app-screenshots/reviews/subject-info.jpg" width="100" alt="Viewing subject info in bottom sheet for subject during review" /> <img src="./resources/app-screenshots/reviews/end-review-dialog.jpg" width="100" alt="dialog with cancel, end session, and wrap up options for when user attempts to leave page before completing all reviews" /> <img src="./resources/app-screenshots/reviews/wrapping-up-overlay.jpg" width="100" alt="overlay of checkered flag displaying after 'wrap up' is selected" /> <img src="./resources/app-screenshots/reviews/review-summary.jpg" width="100" alt="summary of reviews items user got correct and incorrect" />

### Subjects

<img src="./resources/app-screenshots/subjects/subjects-levels.jpg" width="100" alt="subjects page with radicals, kanji, and vocabulary where you can browse the levels" /> <img src="./resources/app-screenshots/subjects/subjects-level-vocab.jpg" width="100" alt="subjects page scrolled down to view vocabulary for level" />

### Search

<img src="./resources/app-screenshots/search/empty-input.jpg" width="100" alt="empty search box with Hakubun crabigator asking user to search for something" /> <img src="./resources/app-screenshots/search/no-results.jpg" width="100" alt="search box with nonsense input, Hakubun crabigator saying 'no results' while looking distressed" /> <img src="./resources/app-screenshots/search/results.jpg" width="100" alt="search box with 'cat' input and long list of results to choose from" />

### Subject Details

<img src="./resources/app-screenshots/subject-details/vocab-and-user-meaning.jpg" width="100" alt="subject details page for vocabulary with user-added meaning" /> <img src="./resources/app-screenshots/subject-details/vocab-context-sentences.jpg" width="100" alt="subject details page for vocabulary, showing context sentences with translations that can be hidden and shown" /> <img src="./resources/app-screenshots/subject-details/kanji-entering-user-note.jpg" width="100" alt="subject details page for kanji with user entering their own meaning note" /> <img src="./resources/app-screenshots/subject-details/kanji-reading-user-note.jpg" width="100" alt="subject details page for kanji with saved meaning note by user, displaying reading section below" />

## Contributing :trophy:

Contributions are appreciated! See [this doc](.github/CONTRIBUTING.md) for full details on how to contribute, and the [development section](#development-desktop_computer) for how to build and test Hakubun

## Development :desktop_computer:

### Formatting and Linting :sparkles:

```bash
# Verify files are formatted correctly
npm run check-format

# If formatting issues...
npm run format

# Make sure no linting errors
npm run lint-err-only

# Make sure no TypeScript errors
npm run tsc-check
```

### Building the App :hammer:

Make sure to run `npm install` before trying the steps below!

#### Web Version

**Building using this method for general development is highly recommended over the iOS and Android methods,** it's much easier to debug and inspect changes. Running the app with iOS and Android simulators is only recommended to double-check that the changes you made are compatible with both platforms.

Start server:

```bash
npm run start
```

The app should then be available at http://localhost:5173/

#### iOS and Android Simulators (with Hot Reload)

Make sure to install Cordova's required dependencies for [iOS](https://cordova.apache.org/docs/en/10.x/guide/platforms/ios/)/[Android](https://cordova.apache.org/docs/en/10.x/guide/platforms/android/) if you have trouble running the simulators.
If below doesn't work, check that network URL after displayed after running `npm run start-exposed` matches the URL in the _capacitor.config.ts_ file

Start server in one terminal:

```bash
npm run start-exposed
```

Then run the script for the platform in another terminal:

#### iOS

```bash
npm run ios-live-reload
```

You can then select the type of iOS device you'd like to use as a simulator

###### To view debug info (inspect elements, view console output)

- If you've never done this before, you'll likely have to the make sure "Show features for web developers" is enabled under Safari's Settings

  <img src="./resources/debugging-screenshots/safari-web-dev-settings.png" width="200" alt="Safari settings displaying Show features for web developers setting" />

- Open Safari and click the iOS simulator for Hakubun under Develop -> iOS device you chose as simulator -> IP address displayed. _If this is not displayed, make sure you followed the previous step. If it's still not displayed, opening Xcode can sometimes make it appear_

  <img src="./resources/debugging-screenshots/safari-select-ios-simulator.png" width="200" alt="selecting iOS simulator" />
  <img src="./resources/debugging-screenshots/safari-inspecting-ios-device.png" width="200" alt="inspecting iOS simulator" />

#### Android

##### Android Studio

The easiest way to run the app is using [Android Studio](https://developer.android.com/studio/index.html).
Download and install it, and then make sure to install the [relevant SDKs](https://cordova.apache.org/docs/en/12.x/guide/platforms/android/index.html#android-studio).
Finally, open up the `android/` folder using Android Studio, and [build and run](https://developer.android.com/studio/run/index.html) the program.

##### CLI

You can also run the app in an emulator via the CLI using the following command:

```bash
npm run android-live-reload
```

If any errors occur, try setting the following environment variables:

```bash
export JAVA_HOME=<PATH_TO_JAVA_HOME>
export ANDROID_SDK_ROOT="~/Library/Android"
```

Where the `JAVA_HOME` value can be found relative to where the `javac` binary is stored.

##### To view debug info (inspect elements, view console output)

- In Chrome, go to chrome://inspect/#devices
- An address should be available under "Remote Target", you can click on "inspect" to bring up a web inspector. This can be used to inspect elements and view console output

  <img src="./resources/debugging-screenshots/chrome-remote-targets.png" width="200" alt="remote targets in Chrome" /> <img src="./resources/debugging-screenshots/chrome-web-inspector.png" width="200" alt="web inspector in Chrome for Android device" />

### Testing

#### Unit Testing

To run all unit tests:

```bash
npm run test
```

#### Device Testing for Android, iOS, etc.

This project is tested with BrowserStack

### Running Fastlane

**Note: it's unlikely you'll need to know this info, just used for GitHub workflows/CICD**

[Fastlane](https://fastlane.tools/) is a tool used to build and deploy the Android and iOS apps for Hakubun.

#### Install Dependencies

```bash
bundle install
```

#### Running Lanes

To run android lanes:

```bash
fastlane android <LANE>
```

To run iOS lanes:

```bash
fastlane ios <LANE>
```

## License :notebook:

This project uses [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html), a [copyleft license](https://en.wikipedia.org/wiki/Copyleft). Essentially this means that the source code for this app and all further iterations must stay free and open-source.
See [license file](./license.md) for complete license information.

## Credits :1st_place_medal:

- Logo by [Caleb Walsh](https://www.instagram.com/calebsevenhawks)
- Icons by [Icons8](https://icons8.com/)
- Pitch Accent Info from [Jotoba API](https://jotoba.de/docs.html)
