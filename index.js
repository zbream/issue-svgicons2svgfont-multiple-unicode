const fs = require('fs');
const path = require('path');
const svg2font = require('svgicons2svgfont');

// THIS FILE IS BASED ON `icon-font-buildr`:
// https://github.com/fabiospampinato/icon-font-buildr/blob/531eb64a891f4e1d9be6ea53c7233c95d1b2e566/src/index.ts#L352

const fontName = 'test-font';
const icons = [
  {
    name: 'rotate_left',
    inputPath: path.join(__dirname, 'icons/rotate_left.svg'),
    unicode: ['\ue008', 'rotate_left'],
  },
  {
    name: 'rotate_right',
    inputPath: path.join(__dirname, 'icons/rotate_right.svg'),
    unicode: ['\ue009', 'rotate_right'],
  },
]
const outputPath = path.join(__dirname, 'out.svg');

const stream = new svg2font({
  centerHorizontally: true,
  fontHeight: 4096,
  fontName: fontName,
  normalize: true,
  log: () => {}
});

stream.pipe(fs.createWriteStream(outputPath));

icons.forEach ( ({ name, inputPath, unicode }) => {
  const glyph = fs.createReadStream(inputPath);
  glyph['metadata'] = { unicode, name };
  stream.write(glyph);
});

stream.end ();
