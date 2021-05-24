import { storage } from './index'
import { useState } from 'react'
import './FileUpload.css'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../components/Loading/Loading'
import { saveImage } from '../redux/images/imagesHelpers'

export default function FileUpload() {
    const [ image, setImage ] = useState(null)
    const imageName = image ? image.name : null
    const [ url, setUrl ] = useState(null)
    const [ progress, setProgress ] = useState(0)
    const { uid, displayName } = useSelector(state => state.user[0])
    
    const allowedImageFormats = [".jpg", "jpeg", ".gif", ".png"]

    const imageFormatIsValid = 
        imageName !== null 
        ? allowedImageFormats.includes(
            imageName.slice(-4, (imageName.length)) || imageName.slice(-5, (imageName.length)))
        : null

    const saveImageDetails = (url) => {
        let imageSaveTemplate = {
                uid: uid,
                uploadSource: displayName,
                details: {
                    previewimage: url,
                    mainimage: url
                }
        }
        saveImage(imageSaveTemplate)
    }

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${uid}/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            snapshot => {
                let progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref(`images/${uid}`)
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url)
                        saveImageDetails(url)
                    })
            }
        )
        // TO DO: Dispatch post url to images collection in database
    }

    return (
        <div className="upload-wrapper">
            <div className="image-uploaded-name-wrapper slide-in">
            {
                image ? image.name
                : <p>Please choose an image to upload with one of the following extensions: .jpg .jpeg .gif .png</p>
            }
            
            {
                imageFormatIsValid === false &&
                <p style={{color: "red"}}>Invalid file extension. Please choose an image with one of the following extensions: .jpg .jpeg .gif .png</p>
            }
            </div>
            
            <div className="upload-button-wrapper slide-in">
                <div className="file-input">
                    <input type="file" id="file" onChange={handleChange} />
                    <button 
                    className="round-button-white hover-bounce shadow choose-image"
                    onClick={() => setProgress(0)}
                    >
                        <label 
                        htmlFor="file" 
                        className="file-input-button-label"
                        >
                        Choose Image
                        </label>
                    </button>
                    
                </div>
                
                <button
                className="round-button-white hover-bounce shadow"
                onClick={handleUpload} 
                disabled={!imageFormatIsValid || (progress > 0)}
                >Upload Image
                </button>
            </div>
            
            <div className="image-uploaded-wrapper">
                {
                    url !== null ?
                    <div>
                    {
                        progress === 100 &&
                        <p style={{color: "green"}} className="slide-in">Upload success!</p>
                    }
                    <img src={url} alt={image.name} className="slide-in"/>
                    </div>
                    :
                    <div>
                    {
                        (progress > 0 && progress < 100) &&
                        <div>
                        <LoadingSpinner />
                        <p>Uploading ... {progress}%</p>
                        </div>
                    }
                    </div>

                }
            </div>
        </div>
        
        
    )
}