import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getImages } from "../../redux/images/imagesHelpers";
import './Carousel.css'

export default function Carousel({editPost, editPostData, callback=()=>{}}) {
    const { images, photoUrls } = useSelector(state => state.images)
    const { uid } = useSelector(state => state.user[0])
    const [serialPosition, setSerialPosition] = useState(0)
    const start = ((images.length -1 ) * 3) + 0.25
    const step = 6
    const end = start - ((images.length * step) - step)
    const [ position, setPosition ] = useState(start)

    useEffect(() => {
        if(editPost) {
            let postImagePosition = 
                editPostData 
                ? photoUrls.indexOf(editPostData.previewimage)
                : 0
            setSerialPosition(postImagePosition)
            setPosition(start - (postImagePosition * step))
        }
    },[editPost, editPostData, photoUrls, start])

    useEffect(() => {
        //Callback sends image data back to Post form
        callback(images[serialPosition])
    },[serialPosition, callback, images])

    useEffect(() => {
      getImages(uid)  
    },[uid])
    
    const pageLeft = () => {
        setSerialPosition(serialPosition - 1)
        setPosition(position + step)
    }
    const pageRight = () => {
        setSerialPosition(serialPosition + 1)
        setPosition(position - step)
    }

    const selectImage = (i) => {
        setPosition(start - (i * step))
        setSerialPosition(i)
    }

    const slideImage = {
        "transform": `translateX(${position}em)`,
        "transition": "500ms"
    }

    return (
        <div>
            <div>
                {
                    images.map((image, i) => (
                        <div 
                        key={i}
                        className="carousel-image-preview-wrapper"
                        style={{
                            display: (images.indexOf(image) !== serialPosition) && "none"
                        }}
                        >
                            <img 
                            key={i}
                            src={image.details.mainimage}
                            alt={"Photo by " + image.uploadSource}
                            className="carousel-image-preview fade-in shadow"
                            /> 
                        </div>
                    ))
                }
            </div>   

            <div className="carousel-wrapper">
                <div 
                className="carousel-image-wrapper shadow"
                >
                {
                    images.map((image, i) => (
                        <div style={slideImage} key={i}>
                            <img
                            key={i} 
                            src={image.details.previewimage}
                            className="carousel-image carousel-image-left shadow hover-bounce" 
                            alt={image.uploadSource}
                            onClick={() => selectImage(i)}
                            /> 
                        
                        </div>
                        
                    )) 
                }
                
                </div>
            </div>
            
            <div className="pagination-wrapper">
                <div className="pagination-button-wrapper">
                    <button 
                    className="pagination-button"
                    disabled={position === start}
                    onClick={() => pageLeft()}
                    >
                    <i className="fas fa-arrow-circle-left" />
                    </button>
                </div>

                <div className="pagination-button-wrapper">
                <button 
                className="pagination-button"
                disabled={position === end}
                onClick={() => pageRight()}
                >
                <i className="fas fa-arrow-circle-right" />
                </button>
                </div>
            </div>
            
        </div>
        
    )
}