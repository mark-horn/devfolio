import fs from 'fs-extra';

const sourceDirectory = '.data';
const destinationDirectory = 'static/images';
fs.ensureDirSync(destinationDirectory);

console.log('copyImages.js ... copying images');
fs.copySync(sourceDirectory, destinationDirectory, {
  filter: (src, dest) => {
    const stats = fs.statSync(src);

    const isDirectory = stats.isDirectory();
    const isImageFile = ['.jpg', '.jpeg', '.png', '.gif']
    .some(ext => src.toLowerCase().endsWith(ext));
    
    return isDirectory || isImageFile;
  }
});
console.log('copyImages.js ... copying images completed');