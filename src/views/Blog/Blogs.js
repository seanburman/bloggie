import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { deletePost, getPosts } from "../../redux/posts/postsHelpers"
import { getSettings } from "../../redux/settings/settingsHelpers"
import './grids.css'
import './Blog.css'
import { useParams } from "react-router"
import PostForm from "./PostForm/PostForm"

function BlogPost({post, edit, user, click}) {
    const { uid } = useSelector(state => state.user[0]) || user.uid
    const [ editPost, setEditPost ] = useState(false)

    useEffect(() => {
        getPosts(uid)
    },[uid, editPost])


    return (
     <div className="blog-post-full slide-in">
        
            <div className="blog-post-button-wrapper">
                <button 
                    onClick={() => click()} 
                    className="blog-post-button shadow hover-bounce">
                    Back to Posts
                </button>
                {/* Edit and Delete buttons only accessible when user is
                    logged into the dashboard */}
                {   edit &&
                    <React.Fragment>
                    {
                    !editPost &&
                        <button 
                            onClick={() => setEditPost(true)} 
                            className="blog-post-button shadow hover-bounce">
                            Edit
                        </button>   
                    }
                    
                    <button 
                        onClick={() => {
                            deletePost(post._id)
                            // TO DO: Need Popup, Are you sure you want to delete this post?
                            click()
                        }} 
                        className="blog-post-button shadow hover-bounce">
                        Delete
                    </button>
                    </React.Fragment>
                }
            </div>
        {
            editPost
            ? <PostForm editPost editPostData={post} 
            callback={() => {setEditPost(false); click()}} />
            : <React.Fragment>
                <div className="blog-post-full-image-wrapper">
                <img src={post.mainimage} alt={post.title} className="blog-post-full-image"/>
                </div>
                <h1 className="blog-post-full-title blog-post-full-text">{post.title}</h1>
                <p className="blog-post-full-content blog-post-full-text">{post.content}</p>
             </React.Fragment>
        } 
        
    </div>   
    )
    
}

function BlogIntro({intro}) {
    const { blogIntroTitle, blogIntroContent, blogIntroImage } = intro
    return (
        <div className="grid-container-blog-intro slide-in">
         <div className="blog-intro-image-wrapper">
         <img src={blogIntroImage} alt={blogIntroTitle} className="blog-intro-image"/>
         </div>
         <div className="blog-intro-info">
            <div className="blog-intro-header">
                <h1>{blogIntroTitle}</h1>
            </div>
            <div className="blog-intro-content">
                <p>{blogIntroContent}</p>
            </div>
         </div>
        </div>
    )
}

function BlogPostPreview({post, click}) {
    const { title, content, previewimage, date } = post
    const titleSubString = title.substr(0, 60)
    const contentSubString = content.substr(0,100)
    const titleElipses = title.length > 60 ? "..." : null
    const contentElipses = content.length > 100 ? "..." : null

    // TO DO
    //Split strings by word count
    return (
        <div className="blog-post-preview slide-in hover-bounce" onClick={() => click()}>
        <div className="blog-post-preview-header-image">
        <img src={previewimage} alt={title} />
        </div>
        <div className="blog-post-preview-date"><p>{date}</p></div>
        <div className="blog-post-preview-title"><h3>{titleSubString}{titleElipses}</h3></div>
        <div className="blog-post-preview-content"><p>{contentSubString}{contentElipses}</p></div>
        
        </div>
    )
}

export default function Blog({uid, edit}) {
    const params = useParams()
    const userID = uid ? uid : params.id
    const user = userID ? {
        uid: userID
    } : null
    const [posts, setPosts] = useState([])
    const [settings, setSettings] = useState([])
    const postsState = useSelector(state => state.posts.posts)
    const settingsState = useSelector(state => state.settings.settings)
    const pending = useSelector(state => state.posts.pending)
    const [ fullPost, setFullPost ] = useState(null)
    const [ newPost, setNewPost ] = useState(null)

     useEffect(() => {
            getSettings(userID)
            getPosts(userID)
     },[userID, fullPost])

    useEffect(() => {
        setPosts(postsState)
        setSettings(settingsState)
    },[pending, postsState, settingsState])

    // When click on post preview, show full post 
    const showFullPost = (post) => {
        setFullPost(post)
        window.scrollTo(0,0)
    }
    
    return (
        <div className="grid-container-view slide-in">
        <div className="blog-header-wrapper">
            {
              settings.length > 0 &&  
                <p className="view-title">
                {
                    settings[0].blogTitle 
                }
                </p>
            }
        </div>
        <div className="grid-container-blog-posts">
            {
                edit && !fullPost ?
                <div className="new-post-button-wrapper">
                    <button
                    className="blog-post-button new-post-button shadow hover-bounce"
                    onClick={() => setNewPost(!newPost)}
                    >
                    {
                        newPost
                        ? "Back to Posts"
                        : "New Post" 
                    }
                    </button>
                </div> : null
            }
        {
        /* If a full post is not being viewed, then all posts are being viewed,
        which requires the intro */
          !newPost && !fullPost && settings.length > 0 &&
         <BlogIntro intro={settings[0].blogIntro}/>    
        }

        {
            //If a post is selected, display full post
            newPost
            ? <PostForm callback={() => setNewPost(false)}/>
            : fullPost && !edit
            ? <BlogPost post={fullPost} user={user} click={() => setFullPost(null)}/>
            : fullPost 
            ? <BlogPost post={fullPost} edit={edit} click={() => setFullPost(null)}/> 
            //If no post selected, display all posts
            : posts 
            ? posts.map((post, i) => (
                <BlogPostPreview key={i} post={post} click={() => showFullPost(post)}/>
                ))
            :"No Posts to display"
        }
        {/* TO DO: Need "no posts to display" with call to action to make a new post */}
        </div>
        </div>
    )
}