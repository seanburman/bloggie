import { storage } from './index'
import { useState } from 'react'
import './FileUpload.css'
import { useSelector } from 'react-redux'

export default function FileUpload() {
    const [ image, setImage ] = useState(null)
    const [ url, setUrl ] = useState(null)
    const [ progress, setProgress ] = useState(0)
    const uid = useSelector(state => state.user[0].uid)
    console.log(url)

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
                const progress = Math.round(
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
                    })
            }
        )
        // TO DO: Dispatch post url to images collection in database
    }


    return (
        <div className="upload-wrapper">
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button><br />
            {
                (progress > 0 && progress < 100) &&
                <progress value={progress} max='100' />
                
            }
            {
                progress === 100 &&
                "Upload Complete!"
            }
            {
                
                url !== null &&
                <div>
                <img src={url} alt={image.name} />
                </div>
            }
        </div>
        
    )
}