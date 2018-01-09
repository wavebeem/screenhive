import * as path from "path";
import * as fs from "fs-extra";
import * as sanitize from "sanitize-filename";
import * as glob from "glob";

const STEAM_URL = "https://api.steampowered.com/ISteamApps/GetAppList/v0001/";
const SCREENSHOT_REGEXP = /[0-9]+_.*[.]png/;

const folderNames: Record<string, string> = {};

interface SteamAppEntry {
  appid: string;
  name: string;
}

function getSteamData(): Promise<SteamAppEntry[]> {
  return fetch(STEAM_URL)
    .then(resp => {
      if (!resp.ok) {
        throw new Error("failed to fetch Steam API data");
      }
      return resp.json();
    })
    .then(data => data.applist.apps.app);
}

function getFolderName(id: keyof typeof folderNames) {
  return folderNames[id] || "_game-" + id;
}

function getID(filename: string) {
  return filename.split("_")[0];
}

function initializeNames(list: SteamAppEntry[]) {
  list.forEach(item => {
    folderNames[item.appid] = sanitize(item.name);
  });
}

export function findRoot() {
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
    (_x, i) => String.fromCharCode(start + i) + ":/"
  );
}

function possibleSteamPaths() {
  return ["Program Files (x86)", "Program Files", ""];
}

function possibleDirs() {
  if (process.platform === "darwin") {
    const home = process.env.HOME || "";
    const macDir = path.resolve(home, "Library/Application Support/Steam");
    return [macDir];
  } else if (process.platform === "win32") {
    const dirs = [];
    for (const drive of driveLetters()) {
      for (const dir of possibleSteamPaths()) {
        dirs.push(path.resolve(drive, dir, "Steam"));
      }
    }
    return dirs;
  }
  return [];
}

function looksSteamy(dir: string) {
  const dirs = ["steamapps", "userdata"];
  return dirs.map(d => path.resolve(dir, d)).every(d => fs.existsSync(d));
}

function findJPEGs(steamRoot: string) {
  return new Promise<string[]>(resolve => {
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

function looksLikeSteamScreenshot(name: string) {
  return SCREENSHOT_REGEXP.test(name);
}

function organizeJPEGs(steamRoot: string, folder: string) {
  return findJPEGs(steamRoot).then(files => {
    return processJPEG(folder, files);
  });
}

function findPNGs(dir: string) {
  return fs
    .readdir(dir)
    .then(files => files.filter(looksLikeSteamScreenshot))
    .then(files => files.map(f => path.resolve(dir, f)));
}

function processPNG(folder: string, files: string[]) {
  const n = files.length;
  const results = files.map(file => {
    const base = path.basename(file);
    const id = getID(base);
    const name = getFolderName(id);
    const dest = path.resolve(folder, name, base);
    return move(file, dest);
  });
  return Promise.all(results).then(() => n);
}

function processJPEG(folder: string, files: string[]) {
  const n = files.length;
  const results = files.map(file => {
    const chunks = path.resolve(file, "../..").split(path.sep);
    const id = chunks[chunks.length - 1];
    const base = path.basename(file);
    const name = getFolderName(id);
    const dest = path.resolve(folder, name, base);
    return copy(file, dest);
  });
  return Promise.all(results).then(() => n);
}

function move(src: string, dest: string) {
  return fs.move(src, dest, { overwrite: true });
  // console.log(`MOVE ${src} => ${dest}`);
}

function copy(src: string, dest: string) {
  return fs.copy(src, dest, { overwrite: false });
  // console.log(`COPY ${src} => ${dest}`);
}

function organizePNGs(folder: string) {
  return findPNGs(folder).then(files => processPNG(folder, files));
}

export function organize(steamRoot: string, folder: string) {
  return getSteamData()
    .then(initializeNames)
    .then(() => {
      return Promise.all([
        organizePNGs(folder),
        organizeJPEGs(steamRoot, folder)
      ]);
    });
}
