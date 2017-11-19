import { Credential, inputCredential, loadCredential, saveCredential } from "./credential";
import { AppInfo, getCurrentAppInfo } from "./current-app";
import { matchEmoji } from "./match";
import { loadLocalSetting, Setting } from "./setting";
import { authTest, fetchEmojiNameList, updateStatus } from "./slack-command";

class Cli {
    private _localSetting: Setting;
    private _credential: Credential;
    private _emojiList: string[];

    constructor() {
        this._localSetting = loadLocalSetting();
        this._credential = loadCredential();
    }

    async ping() {
        try {
            await authTest(this._credential);
            return true;
        } catch (_e) {
            return false;
        }
    }

    async askCredential() {
        this._credential = await inputCredential();
        saveCredential(this._credential);
    }

    async watch() {
        let prevEmoji = null;
        this._emojiList = await fetchEmojiNameList(this._credential);
        while (true) {
            await this._wait(10000);
            try {
                const appInfo = await getCurrentAppInfo();
                const emoji = this._getEmojiByApp(appInfo);
                console.log(`emoji: ${emoji}, app: ${appInfo.name}/${appInfo.shortName}`);
                if (emoji !== prevEmoji) {
                    await updateStatus(this._credential, emoji, "");
                    prevEmoji = emoji;
                }
            } catch (e) {
                console.error(e);
            }
        }
    }

    private _getEmojiByApp(appInfo: AppInfo): string {
        const emojis = matchEmoji(appInfo, this._localSetting.matchers);
        return emojis.find((emoji) => {
            return this._emojiList.includes(emoji);
        }) || "";
    }

    private _wait(n) {
        return new Promise((resolve) => {
            setTimeout(resolve, n);
        });
    }
}

export default async function cli() {
    const command = new Cli();
    if (!(await command.ping())) {
        await command.askCredential();
    }
    return command.watch();
}
