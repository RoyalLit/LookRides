const sharp = require('sharp');

async function processImage() {
  try {
    const { data, info } = await sharp('public/logo-dark.png')
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Loop through pixels, if RGB is > 240 (almost white), set Alpha to 0
    // The image is RGBA (4 channels)
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      if (r > 240 && g > 240 && b > 240) {
        data[i + 3] = 0; // Alpha = 0 (transparent)
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels
      }
    })
    .png()
    .toFile('public/logo-dark.png');
    
    console.log("Logo successfully made transparent.");
  } catch (err) {
    console.error(err);
  }
}

processImage();
