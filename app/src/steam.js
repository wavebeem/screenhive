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
const glob = require("glob");

// const { log } = require("./console");

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

function findRoot() {
  for (const dir of possibleDirs()) {
    if (looksSteamy(dir)) {
      return dir;
    }
  }
  return undefined;
}

function driveLetters() {
  const start = "C".charCodeAt(0);
  return Array.from(
    { length: 24 },
    (x, i) => String.fromCharCode(start + i) + ":/"
  );
}

function possibleDirs() {
  if (process.platform === "darwin") {
    const home = process.env.HOME || "";
    const macDir = path.resolve(home, "Library/Application Support/Steam");
    return [macDir];
  } else if (process.platform === "win32") {
    const dirs = [];
    for (const drive of driveLetters()) {
      for (const dir of ["Program Files", ""]) {
        dirs.push(path.resolve(drive, dir, "Steam"));
      }
    }
    return dirs;
  }
  return [];
}

function looksSteamy(dir) {
  const dirs = ["steamapps", "userdata"];
  return dirs.map(d => path.resolve(dir, d)).every(d => fs.existsSync(d));
}

function findScreenshots(steamRoot) {
  return new Promise(resolve => {
    // 760 is the ID of the app "Steam Screenshots"
    const pattern = "/userdata/*/760/remote/*/screenshots/*.jpg";
    glob(pattern, { root: steamRoot }, (err, files) => {
      if (err) {
        throw err;
      }
      resolve(files);
    });
  });
}

function organize(steamRoot, folder) {
  // TODO
  folder;
  findScreenshots(steamRoot).then(files => {
    return files.reduce((p, file) => {
      return p.then(() => {
        console.log("COPY THE FILE OVER? " + file);
      });
    }, Promise.resolve(undefined));
  });
}

exports.findRoot = findRoot;
exports.organize = organize;
