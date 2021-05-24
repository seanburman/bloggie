import store from '../store'
import { createPost, fetchPosts, removePost } from './postsSlice'

export function getPosts(uid) {
    store.dispatch(fetchPosts(uid))
}
export function savePost(post) {
    console.log(post)
    store.dispatch(createPost(post))
}
export function deletePost(id) {
    store.dispatch(removePost(id))
}

export function dateMaker() {
    const d = new Date()
    const year = d.getFullYear()
    const day = d.getDate()
    const month = d.getMonth()
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }
    return (months[month] + " " + day + " " + year)
}