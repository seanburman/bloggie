import store from '../store'
import { fetchPosts, removePost } from './postsSlice'

export function getPosts(uid) {
    store.dispatch(fetchPosts(uid))
}
export function deletePost(id) {
    store.dispatch(removePost(id))
}