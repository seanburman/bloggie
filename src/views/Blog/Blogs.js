import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getPosts } from "../../redux/blog/blogHelpers"
import './grids.css'
import './Blog.css'

function BlogPost({post, click}) {
    console.log(post)
    return (
     <div className="blog-post-full slide-in">
        <button onClick={() => click()}>Return to posts</button>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
    </div>   
    )
    
}

function BlogPostPreview({post, click}) {
    const { title, content } = post
    const titleSubString = title.substr(0, 60)
    const contentSubString = content.substr(0,100)
    var date = "14 May 2020"
    // TO DO
    //Split strings by word count
    return (
        <div className="blog-post-preview slide-in" onClick={() => click()}>
        <div className="blog-post-preview-header-image">
        <img src="https://via.placeholder.com/275" alt={title} />
        </div>
        <div className="blog-post-preview-date"><p>{date}</p></div>
        <div className="blog-post-preview-title"><h3>{titleSubString}...</h3></div>
        <div className="blog-post-preview-content"><p>{contentSubString}...</p></div>
        
        </div>
    )
}

export default function Blog({title="My Blog"}) {
    const [posts, setPosts] = useState([])
    const postsState = useSelector(state => state.blog.posts)
    const [ fullPost, setFullPost ] = useState(null)

    if(postsState.length === 0) {
        getPosts()
    }

    useEffect(() => {
        setPosts(postsState)
    },[postsState])
    console.log(fullPost)
    const showFullPost = (post) => {
        setFullPost(post)
        
    }

    return (
        <div className="grid-container-blog slide-in">
        <div className="blog-header">
        <p>{title}</p>
        </div>
        <div className="grid-container-blog-posts">
        {
            //If a post is selected, display full post
            fullPost ? <BlogPost post={fullPost} click={() => setFullPost(null)}/> :
            //If no post selected, display all posts
            posts.articles ?
                posts.articles.map((post, i) => (
                    <BlogPostPreview key={i} post={post} click={() => showFullPost(post)}/>
                ))
            : "No Posts to display"
        }
        </div>
        </div>
    )
}