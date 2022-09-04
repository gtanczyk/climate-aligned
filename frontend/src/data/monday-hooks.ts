import {useAsync} from "react-async-hook";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

export function useMondayContext() {
    const {result} = useAsync<{ user: { id: string } }>(() => {
        return monday.get("context").then((result) => result.data)
    }, []);

    return result;
}

export function useStorageUserSetting<T>(userId: string | undefined, settingKey: string) {
    const {result} = useAsync<T>(async () => userId ? (await monday.storage.instance.getItem(`setting:${userId}:${settingKey}`)).data.value : undefined, [userId, settingKey]);

    return result;
}

export function useStorageUserSettingWrite() {
    return async (userId: string, settingKey: string, value: string) => {
        await monday.storage.instance.setItem(`setting:${userId}:${settingKey}`, value)
    };
}