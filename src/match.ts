import * as fs from "fs";
import * as path from "path";
import { AppInfo } from "./current-app";

const defaultMatchersPath = path.join(__dirname, "..", "data", "mac.json");
const defaultMatchers = JSON.parse(fs.readFileSync(defaultMatchersPath, {encoding: "utf8"}));

export interface Matcher {
    emoji: string | string[];
    name?: string;
    shortName?: string;
}

export function matchEmoji(appInfo: AppInfo, customMatchers: Matcher[]): string[] {
    const matchers = [].concat(customMatchers, defaultMatchers);
    const item = matchers.find((match) => {
        return (
            match.name === appInfo.name ||
            match.shortName === appInfo.shortName
        );
    });
    if (!item) { return []; }
    if (typeof item.emoji === "string") { return [item.emoji]; }
    return item.emoji;
}
