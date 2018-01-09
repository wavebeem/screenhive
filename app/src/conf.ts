import * as fs from "fs";
import * as path from "path";

const env = process.env;
const dir =
  env.HOME || env.USERPROFILE || env.TMPDIR || env.TEMP || env.TMP || ".";
const name = path.resolve(dir, ".screenhive.json");
const UTF8 = "utf-8";

export function read() {
  try {
    return JSON.parse(fs.readFileSync(name, UTF8));
  } catch (err) {
    return {};
  }
}

export function write(data: any) {
  try {
    fs.writeFileSync(name, JSON.stringify(data, null, 2), UTF8);
  } catch (err) {
    console.error("Failed to write config file!");
  }
}
