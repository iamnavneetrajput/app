```bash
# Navigate to the Android emulator directory and start the emulator with the specified AVD (Android Virtual Device)
cd ~/Android/Sdk/emulator && ./emulator -avd Pixel_2_API_35
```
```bash
# Navigate to the platform-tools directory and list all connected Android devices
cd ~/Android/Sdk/platform-tools && ./adb devices
```

Genrate JWT
const crypto = require('crypto');

// Generate a 256-bit (32-byte) secret key
const secret = crypto.randomBytes(32).toString('hex');
console.log('Generated JWT Secret:', secret);
