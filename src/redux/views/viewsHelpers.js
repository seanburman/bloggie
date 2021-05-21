import store from '../store'
import { loadView } from './viewsSlice'

export function changeView(name) {
    store.dispatch(
        loadView({
            name: name
        })
        
    )
}