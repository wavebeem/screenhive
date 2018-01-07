const { spawnSync } = require("child_process");

process.chdir(__dirname);
process.chdir("../img");

for (const size of [16, 32, 40, 48, 256]) {
  for (const os of ["mac", "win"]) {
    spawnSync("convert", [
      `${os}-orig.png`,
      "-scale",
      size + "",
      `${os}-${size}px.png`
    ]);
  }
}
