// I really wish NTFS allowed more characters in its names. So many game titles
// include ":" and it looks really weird to strip it out. This sanitize function
// also truncates the filename at 255 characters because apparently lots of
// things have problems with that (even Linux).

const path = require("path");
const fs = require("fs-extra");
const sanitize = require("sanitize-filename");

const SCREENSHOT_REGEXP = /[0-9]+_.*[.]png/;
const STEAM_URL = "https://api.steampowered.com/ISteamApps/GetAppList/v0001/";

const folderNames = {};

function getSteamData() {
  return fetch(STEAM_URL).then(resp => {
    if (!resp.ok) {
      throw new Error("failed to fetch Steam API data");
    }
    return resp.json();
  });
}

function looksLikeSteamScreenshot(name) {
  return SCREENSHOT_REGEXP.test(name);
}

function getFolderName(id) {
  return folderNames[id] || "_game-" + id;
}

function getID(filename) {
  return filename.split("_")[0];
}

function initializeNames(body) {
  body.applist.apps.app.forEach(item => {
    folderNames[item.appid] = sanitize(item.name);
  });
}

function listFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter(looksLikeSteamScreenshot)
    .map(f => path.resolve(dir, f));
}

function processFiles(files) {
  const n = files.length;
  const results = files.map(file => {
    const dir = path.dirname(file);
    const base = path.basename(file);
    const id = getID(base);
    const name = getFolderName(id);
    const dest = path.resolve(dir, name, base);
    return fs.move(file, dest, { overwrite: true });
  });
  return Promise.all(results).then(() => n);
}

function organize(dir) {
  return getSteamData()
    .then(initializeNames)
    .then(() => dir)
    .then(listFiles)
    .then(processFiles);
}

exports.organize = organize;
