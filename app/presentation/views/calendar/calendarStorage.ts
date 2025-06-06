import AsyncStorage from '@react-native-async-storage/async-storage';


export interface CalendarEntry {
    dayMealKey: string;
    recipe: any;
    savedAt: number;
    mode: 'SEMANA' | 'PERMANENTE';
}

const STORAGE_KEY = 'calendarEntries';


export async function loadCalendarEntries(): Promise<CalendarEntry[]> {
    try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (!saved) return [];
        const arr: CalendarEntry[] = JSON.parse(saved);
        const now = Date.now();
        const valid = arr.filter(e => {
            if (e.mode === 'PERMANENTE') return true;
            return now - e.savedAt < 7 * 24 * 60 * 60 * 1000;
        });
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
        return valid;
    } catch {
        return [];
    }
}


export async function saveCalendarEntry(entry: CalendarEntry): Promise<void> {
    try {
        const all = await loadCalendarEntries();
        const filtered = all.filter(e => e.dayMealKey !== entry.dayMealKey);
        filtered.push(entry);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch {
    }
}


export async function removeCalendarEntry(key: string): Promise<void> {
    try {
        const all = await loadCalendarEntries();
        const filtered = all.filter(e => e.dayMealKey !== key);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch {
    }
}
