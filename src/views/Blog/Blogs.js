import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { deletePost, getPosts } from "../../redux/posts/postsHelpers"
import './grids.css'
import './Blog.css'

function BlogPost({post, click}) {

    return (
     <div className="blog-post-full slide-in">
        <div className="blog-post-button-wrapper">
            <button 
                onClick={() => click()} 
                className="blog-post-button shadow hover-bounce">
                Back to Posts
            </button>
            <button 
                onClick={() => click()} 
                className="blog-post-button shadow hover-bounce">
                Edit
            </button>
            <button 
                onClick={() => {
                    deletePost(post._id)
                    // TO DO: Need Popup, Are you sure you want to delete this post?
                    click()
                }} 
                className="blog-post-button shadow hover-bounce">
                Delete
            </button>
        </div>
        <h1>{post.title}</h1>
        <div className="blog-post-full-image-wrapper">
            <img src={post.mainimage} alt={post.title} className="blog-post-full-image"/>
        </div>
        <p>{post.content}</p>
    </div>   
    )
    
}

function BlogIntro({intro}) {
    return (
        <div className="grid-container-blog-intro slide-in">
         <div className="blog-intro-image-wrapper">
         <img src={"https://via.placeholder.com/300"} alt="Some alternate text" className="blog-intro-image"/>
         </div>
         <div className="blog-intro-info">
            <div className="blog-intro-header">
                <h1>{intro.header}</h1>
            </div>
            <div className="blog-intro-content">
                <p>{intro.content}</p>
            </div>
         </div>
        </div>
    )
}

function BlogPostPreview({post, click}) {
    const { title, content, previewimage } = post
    const titleSubString = title.substr(0, 60)
    const contentSubString = content.substr(0,100)
    const titleElipses = title.length > 60 ? "..." : null
    const contentElipses = content.length > 100 ? "..." : null
    var date = "14 May 2020"
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

export default function Blog({title="My Blog"}) {
    const [posts, setPosts] = useState([])
    const postsState = useSelector(state => state.posts.posts)
    // TO DO: While pending, need loading placeholder
    const pending = useSelector(state => state.posts.pending)
    const user = useSelector(state =>  state.user)
    const [ fullPost, setFullPost ] = useState(null)

     useEffect(() => {
         if(user[0])
         getPosts(user[0].uid)
     },[user])
    

    useEffect(() => {
        setPosts(postsState)
    },[pending, postsState])

    const showFullPost = (post) => {
        setFullPost(post)
        window.scrollTo(0,0)
    }

    const intro = {
        header: "Welcome to my blog",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas natus non minima alias perferendis debitis praesentium molestiae magni inventore voluptates maxime repellat exercitationem rem, eligendi quaerat corrupti nobis. Ut quo minus tenetur maxime, quidem dolorem assumenda dolore in est soluta ab ea deserunt facilis laboriosam nemo saepe ipsum asperiores harum."
    }

    return (
        <div className="grid-container-blog slide-in">
        <div className="blog-header-wrapper">
            <p className="blog-title">{title}</p>
        
        </div>
        <div className="grid-container-blog-posts">
    
        { /* Blog intro object will need to be in blog document Mongo */}
        {
          !fullPost &&
         <BlogIntro intro={intro}/>    
        }

        {
            //If a post is selected, display full post
            fullPost ? <BlogPost post={fullPost} click={() => setFullPost(null)}/> :
            //If no post selected, display all posts
            posts ?
                posts.map((post, i) => (
                    <BlogPostPreview key={i} post={post} click={() => showFullPost(post)}/>
                ))
            :"No Posts to display"
        }
        {/* TO DO: Need "no posts to display" with call to action to make a new post */}
        </div>
        </div>
    )
}