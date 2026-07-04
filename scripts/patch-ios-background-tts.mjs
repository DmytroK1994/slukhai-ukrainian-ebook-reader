import fs from 'node:fs';

const file = 'node_modules/@capacitor-community/text-to-speech/ios/Sources/TextToSpeechPlugin/TextToSpeech.swift';
if (!fs.existsSync(file)) process.exit(0);
let source = fs.readFileSync(file, 'utf8');
if (source.includes('mode: .spokenAudio')) process.exit(0);
const marker = '    @objc public func speak(_ text: String, _ lang: String, _ rate: Float, _ pitch: Float, _ category: String, _ volume: Float, _ voice: Int, _ queueStrategy: Int, _ call: CAPPluginCall) throws {\n';
const setup = `${marker}        let audioSession = AVAudioSession.sharedInstance()\n        if category == "playback" {\n            try audioSession.setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])\n        } else {\n            try audioSession.setCategory(.ambient, mode: .spokenAudio)\n        }\n        try audioSession.setActive(true)\n        self.synthesizer.usesApplicationAudioSession = true\n`;
source = source.replace(marker, setup);
fs.writeFileSync(file, source);
