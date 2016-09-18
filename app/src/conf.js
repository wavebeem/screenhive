const fs = require("fs")
const path = require("path")

const env = process.env
const dir =
  env.HOME ||
  env.USERPROFILE ||
  env.TMPDIR ||
  env.TEMP ||
  env.TMP ||
  "."
const name = path.resolve(dir, ".screenhive.json")
const UTF8 = "utf-8"

function read() {
  try {
    return JSON.parse(fs.readFileSync(name, UTF8))
  } catch (err) {
    return {}
  }
}

function write(data) {
  try {
    fs.writeFileSync(name, JSON.stringify(data, null, 2), UTF8)
  } catch (err) {
    // Ignore
  }
}

exports.read = read
exports.write = write
