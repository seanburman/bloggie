import Blog from "../Blog/Blogs";
import './PublicBlog.css'
export default function PublicBlog() {
    return(
        <div className="grid-container-blog-solo">
            <div className="blog-container">
                <Blog />
            </div>
        </div>
        
    )
}