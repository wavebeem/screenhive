const { spawnSync } = require("child_process");

process.chdir(__dirname);
process.chdir("../img");

for (const size of [16, 32, 40, 48, 256]) {
  spawnSync("convert", [
    "orig.png",
    "-scale",
    size + "",
    `Screenhive-${size}px.png`
  ]);
}
