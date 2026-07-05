# Нативні Android та iOS

Вебчастина вже підтримує Media Session: назву книги та кнопки відтворення, паузи й переходу між уривками на заблокованому екрані.

## Генерація оболонок

Потрібні Node.js 22+, Android Studio з Android SDK та повний Xcode.

```sh
npm install
npm run prepare:web
npx cap add android
npx cap add ios
npm run native:sync
```

## Гарантоване фонове TTS

Однієї оболонки Capacitor недостатньо: браузерний `speechSynthesis` може бути приспаний системою.

- Android: нативний `TextToSpeech` у foreground service, media-style notification і `MediaSession`.
- iOS: `AVSpeechSynthesizer`, категорія `AVAudioSession.Category.playback`, Background Modes → Audio та `MPRemoteCommandCenter`.

Нативний модуль має надсилати у вебчастину події `boundary`, `ended` і `error`, а також приймати `speak`, `pause`, `resume`, `stop`, `rate` та `voice`. Саме цей модуль забезпечить безперервність після блокування екрана.
