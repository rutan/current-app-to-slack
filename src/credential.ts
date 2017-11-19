import * as fs from "fs";
import * as inquirer from "inquirer";
import * as mkdirp from "mkdirp";
import * as path from "path";

import {appDir} from "./utils";

const credentialFilePath = path.join(appDir, "credential.json");

export interface Credential {
    slackToken: string;
}

export function loadCredential() {
    try {
        const json = fs.readFileSync(credentialFilePath, {encoding: "utf8"});
        const data = JSON.parse(json);
        return data;
    } catch (_e) {
        // nothing to do
    }
}

export function saveCredential(credential: Credential) {
    mkdirp.sync(appDir);
    fs.writeFileSync(
        credentialFilePath,
        JSON.stringify(credential, null, 4),
        {encoding: "utf8"},
    );
}

export function inputCredential(): Promise<Credential> {
    return new Promise((resolve) => {
        inquirer.prompt([
            {
                name: "slackToken",
                type: "input",
                message: "Enter your Slack Token:",
                validate(value) {
                    return value.length > 0 ? true : "Please enter your Slack Token";
                },
            },
        ]).then(resolve);
    });
}
