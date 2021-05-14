import store from '../store'
import { fetchPosts } from './blogSlice'

export function getPosts() {
    store.dispatch(fetchPosts())
}