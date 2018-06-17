const { spawnSync } = require("child_process");

process.chdir(__dirname);
process.chdir("../build");

const sizes = [16, 32, 40, 48, 256];

const getFilename = size => `scaled-${size}px.png`;

const filenames = sizes.map(getFilename);

for (const size of sizes) {
  spawnSync("convert", ["icon.png", "-scale", size + "", getFilename(size)]);
}

spawnSync("convert", [...filenames, "icon.ico"]);
