import store from '../store'
import { fetchSettings } from './settingsSlice'

export function getSettings(uid) {
    store.dispatch(fetchSettings(uid))
}
