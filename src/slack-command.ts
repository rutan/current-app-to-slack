import * as Slack from "slack-node";
import { Credential } from "./credential";

export function authTest(credential: Credential): Promise<void> {
    return new Promise((resolve, reject) => {
        const slack = new Slack(credential.slackToken);
        slack.api("auth.test", (err, response) => {
            if (err) { return reject(err); }
            response.ok ? resolve() : reject(response.error);
        });
    });
}

export function fetchEmojiNameList(credential: Credential): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const slack = new Slack(credential.slackToken);
        slack.api("emoji.list", (err, response) => {
            if (err) { return reject(err); }
            response.ok ? resolve(Object.keys(response.emoji).sort()) : reject(response.error);
        });
    });
}

export function updateStatus(credential: Credential, emoji: string, text: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const slack = new Slack(credential.slackToken);
        slack.api("users.profile.set", {
            profile: JSON.stringify({
                status_emoji: emoji ? `:${emoji}:` : "",
                status_text: text,
            }),
        }, (err, response) => {
            if (err) { return reject(err); }
            response.ok ? resolve() : reject(response.error);
        });
    });
}
