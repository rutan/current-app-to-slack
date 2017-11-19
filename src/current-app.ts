import {exec} from "child_process";
import * as fs from "fs";
import * as path from "path";

const scriptPath = path.join(__dirname, "..", "script", "mac.js");

export interface AppInfo {
    name: string;
    shortName: string;
}

export function getCurrentAppInfo(): Promise<AppInfo> {
    return new Promise((resolve, reject) => {
        exec(`osascript -l JavaScript ${scriptPath}`, (err, stdout, stderr) => {
            if (err) { reject(); }
            try {
                resolve(JSON.parse(stdout));
            } catch (e) {
                reject(e);
            }
        });
    });
}
