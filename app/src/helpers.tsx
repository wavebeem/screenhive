import { shell, remote, MessageBoxOptions } from "electron";

export function pickDir() {
  return new Promise<string>(resolve => {
    remote.dialog.showOpenDialog({ properties: ["openDirectory"] }, files => {
      if (files) {
        resolve(files[0]);
      } else {
        throw new Error("no file selected");
      }
    });
  });
}

export function openFile(file: string) {
  return shell.openItem(file);
}

export function openUrl(url: string) {
  return shell.openExternal(url);
}

export function showMessageBox(options: MessageBoxOptions, cb: () => void) {
  cb = cb || (() => {});
  return remote.dialog.showMessageBox(options, cb);
}
