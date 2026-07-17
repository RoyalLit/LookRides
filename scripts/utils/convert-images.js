const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brainDir = '/Users/pahul/.gemini/antigravity-ide/brain/a35d1a62-80fb-48af-9add-3a8fd7957877';

// Find the latest generated files
const files = fs.readdirSync(brainDir);
const tempoFile = files.filter(f => f.startsWith('tempo_') && f.endsWith('.png')).sort().pop();
const urbaniaFile = files.filter(f => f.startsWith('urbania_') && f.endsWith('.png')).sort().pop();
const hycrossFile = files.filter(f => f.startsWith('hycross_') && f.endsWith('.png')).sort().pop();

async function convert() {
  if (tempoFile) {
    await sharp(path.join(brainDir, tempoFile)).toFile('public/tempo.png');
    console.log('Saved public/tempo.png');
  }
  
  if (urbaniaFile) {
    await sharp(path.join(brainDir, urbaniaFile)).jpeg({ quality: 90 }).toFile('public/urbania.jpg');
    console.log('Saved public/urbania.jpg');
  }
  
  if (hycrossFile) {
    await sharp(path.join(brainDir, hycrossFile)).webp({ quality: 90 }).toFile('public/hycross.webp');
    console.log('Saved public/hycross.webp');
  }
}

convert().catch(console.error);
