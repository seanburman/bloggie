import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Carousel from "../../../components/Carousel/Carousel"
import { getImages } from "../../../redux/images/imagesHelpers"
import { dateMaker, savePost, updatePost} from "../../../redux/posts/postsHelpers"
import '../Blog.css'
import './PostForm.css'

export default function PostForm({editPost, editPostData, callback}){
    const { images } = useSelector(state => state.images)
    const { uid, displayName } = useSelector(state => state.user[0])
    const [title, setTitle] = useState(editPost ? editPostData.title : "")
    const [body, setBody] = useState(editPost ? editPostData.content : "")
    const [image, setImage] = useState(editPost ? editPostData.image :images[0])
    
    const onTitleChange = (e) => setTitle(e.target.value)
    const onBodyChange = (e) => setBody(e.target.value)
    
    useEffect(() => {
        getImages(uid)
    },[uid]) 

    const date = dateMaker()

    console.log(editPostData)
    const postTemplate = {
        uid: uid,
        title: title,
        content: body,
        previewimage: image ? image.details.previewimage: null,
        mainimage: image ? image.details.mainimage: null,
        displayname: displayName,
        date: editPost ? editPostData.date : date
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(editPost) {
            //dispatch update editPostTemplate
            updatePost(postTemplate, editPostData._id)
            callback()
        } else {
            savePost(postTemplate)
            callback()
        }
    }

    const resetForm = () => {
        setTitle("")
        setBody("")
    }

    return (
        <div className="new-post-form-wrapper slide-in">
            <div className="instruction">
            <div className="instruction-number">1</div>
            <p>Choose an image from your collection.</p>
            </div>
            {   
                editPost
                ? <Carousel editPost editPostData={editPostData} callback={setImage} />
                : images.length > 0
                ? <Carousel callback={setImage}/>
                : <div>
                  <p>Search or upload images on the Images page to use them for your blog posts!</p>
                  </div>
            }
            <div className="instruction">
            <div className="instruction-number">2</div>
            <p>Release your inner poet and save it to your blog!</p>
            </div>
            <form className="new-post-form" onSubmit={handleSubmit}>
            <input
                type="text"
                id="post-title"
                name="post-title"
                className="shadow"
                value={title}
                onChange={onTitleChange}
                placeholder="Catchy blog post title goes here..."
                required
            />
            <textarea
                type="text"
                id="post-body"
                name="post-body"
                className="shadow"
                value={body}
                onChange={onBodyChange}
                rows="10"
                placeholder="Dear bloggie, today I..."
                required
            />
            <div className="save-post-button-wrapper">
                <button  
                    type="submit"
                    className="blog-post-button shadow hover-bounce"
                >
                Save Post
                </button>
                <button 
                    type="reset" 
                    className="blog-post-button shadow hover-bounce" 
                    onClick={() => resetForm()}
                >
                Reset
                </button>
            </div>
            
            </form>
            
            
        </div>
    )
}