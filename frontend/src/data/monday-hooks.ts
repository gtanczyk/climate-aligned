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
    const {
        result,
        execute
    } = useAsync<T>(async () => userId ? JSON.parse((await monday.storage.instance.getItem(`setting:${userId}:${settingKey}`)).data.value) : undefined, [userId, settingKey]);

    return [result, execute] as const;
}

export function useStorageUserSettingWrite() {
    return async <T>(userId: string | undefined, settingKey: string, value: T) => {
        if (userId) {
            await monday.storage.instance.setItem(`setting:${userId}:${settingKey}`, JSON.stringify(value))
        }
    };
}

export function useStorageUserSettingRead() {
    return async <T>(userId: string | undefined, settingKey: string, defaultValue: T) => {
        if (userId) {
            return JSON.parse((await monday.storage.instance.getItem(`setting:${userId}:${settingKey}`)).data.value) || defaultValue;
        } else {
            return defaultValue;
        }
    };
}

export function useMondayUsersRead() {
    return async () => (await monday.api(`query { users { id } }`)).data as { users: { id: string }[] };
}