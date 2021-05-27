import AsyncStorage from '@react-native-async-storage/async-storage';

import app from '@config/app';

export default {
    async get<T>(key: string): Promise<T | null | undefined> {
        try {
            const data = await AsyncStorage.getItem(`${app.session.key}${key}`);
            
            if (data !== null) return Promise.resolve(JSON.parse(data) as T);
            
            throw new Error('Empty');
        } catch(e) {
            return Promise.resolve(null);
        }
    },
    set<T>(key: string, data: T): void {
        AsyncStorage.setItem(`${app.session.key}${key}`, JSON.stringify(data));
    }
}