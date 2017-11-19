import * as path from "path";

const homeDir = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];
export const appDir = path.join(homeDir, ".current-app-to-slack");
