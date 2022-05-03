import { WebClient } from "@slack/web-api";
import { Credential } from "./credential";

export function authTest(credential: Credential): Promise<void> {
    const slack = new WebClient(credential.slackToken);
    return slack.auth.test().then((resp) => {
        if (!resp.ok) { return Promise.reject(resp); }
    });
}

export function fetchEmojiNameList(credential: Credential): Promise<string[]> {
    const slack = new WebClient(credential.slackToken);
    return slack.emoji.list().then((response) => {
        if (!response.ok) { return Promise.reject(response); }
        return Object.keys(response.emoji).sort();
    });
}

export function updateStatus(credential: Credential, emoji: string, text: string): Promise<void> {
    const slack = new WebClient(credential.slackToken);
    return slack.users.profile.set({
        profile: JSON.stringify({
            status_emoji: emoji ? `:${emoji}:` : "",
            status_text: text,
        }),
    }).then((resp) => {
        if (!resp.ok) { return Promise.reject(resp); }
    });
}
