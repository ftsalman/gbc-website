import fs from 'fs';
import https from 'https';

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(resolve);
        });
      } else {
        reject(new Error(`Status: ${response.statusCode}`));
      }
    }).on('error', function(err) {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function run() {
  fs.mkdirSync('./src/assets/lanyard', { recursive: true });
  await download('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/card.glb', './src/assets/lanyard/card.glb');
  await download('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/lanyard.png', './src/assets/lanyard/lanyard.png');
  console.log('Downloaded');
}
run();
