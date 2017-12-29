// I really wish NTFS allowed more characters in its names. So many game titles
// include ":" and it looks really weird to strip it out. This sanitize function
// also truncates the filename at 255 characters because apparently lots of
// things have problems with that (even Linux).

// -*- TODO -*-
// Switch from "move" to "copy" since we're gonna use the Steam screenshot
// directories inside Steam's internal stuff and we don't want to mess with it.
// This means that app time will scale linearly with the number of screenshots
// you take which is not cool, but that's life. Thanks Valve for your bad app.
// Also we need to have smart detection logic for the actual Steam installation
// location.
//
// Steam is generally installed to one of these locations:
//
//     ~/Library/Application Support/Steam
//     C:\Program Files\Steam
//     ?:\Steam
//
// Where "?:" represents any drive C through Z.
//
// From the Steam root, screenshots can be found here:
//
//     <SteamRoot>/userdata/<UserID>/760/remote/<AppID>/screenshots
//
// 760 is the AppID for "Steam Screenshots"

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

function migrate(dir) {
  return getSteamData()
    .then(initializeNames)
    .then(() => dir)
    .then(listFiles)
    .then(processFiles);
}

module.exports = migrate;
