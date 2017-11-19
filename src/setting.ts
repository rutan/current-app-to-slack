import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";

import { AppInfo } from "./current-app";
import { Matcher } from "./match";
import {appDir} from "./utils";

const settingFilePath = path.join(appDir, "settings.json");

export interface Setting {
    matchers: Matcher[];
}

const defaultSetting: Setting = {
    matchers: [],
};

export function loadLocalSetting(): Setting {
    try {
        const json = fs.readFileSync(settingFilePath, {encoding: "utf8"});
        const data = JSON.parse(json);
        return Object.assign({}, defaultSetting, data);
    } catch (e) {
        saveLocalSetting(defaultSetting);
        return Object.assign({}, defaultSetting);
    }
}

export function saveLocalSetting(credential: Setting) {
    mkdirp.sync(appDir);
    fs.writeFileSync(
        settingFilePath,
        JSON.stringify(credential, null, 4),
        {encoding: "utf8"},
    );
}
