import { removeImageLocal, storeImageLocal} from '../pexels/pexelsSlice'
import store from '../store'
import { fetchImages, postImage, removeImage } from './imagesSlice'


export function getImages(uid) {
    console.log(uid)
    store.dispatch(fetchImages(uid))
}

export async function saveImage(image) {
    console.log(image)
    await store.dispatch(postImage(image))
    store.dispatch(storeImageLocal(image))
    store.dispatch(fetchImages(image.uid))
}

export async function deleteImage(uid, url) {
    await store.dispatch(removeImage({uid, url}))
    store.dispatch(removeImageLocal(uid, url))
    store.dispatch(fetchImages(uid))
}