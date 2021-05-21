import React from 'react'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../../components/Loading/Loading'
import SearchBar from '../../components/SearchBar/SearchBar'
import useWindowDimensions from '../../hooks/Window'
import { deselectPhoto, getPexels, selectPhoto } from '../../redux/pexels/pexelsHelpers'
import './grids.css'
import './Images.css'


function PexelsImages() {
    const pexelsStore = useSelector(state => state.pexels)
    const { query, resultsPerPage, pexels} = pexelsStore
    const { photos, total_results, page, per_page} = pexels
    const pages = Math.ceil(total_results/per_page)
    const { width } = useWindowDimensions()
    const arrangement = width >= 1040 ? "triple" : "double"

    const double = photos ?
    {
        array1: [photos.slice(0, (photos.length / 2))],
        array2: [photos.slice((photos.length / 2), photos.length)]
    } : null

    const triple = photos ?
    {
        array1: [photos.slice(0, (photos.length / 3))],
        array2: [photos.slice((photos.length / 3), (photos.length * (2 / 3)))],
        array3: [photos.slice((photos.length * (2 / 3)), photos.length)]
    } : null


    const previous = () => {
        getPexels(query.query, resultsPerPage, (page-1))
    }

    const next = () => {
        getPexels(query.query, resultsPerPage, (page+1))
    }


    return (
        <div className="grid-container-pexels-images">
        {
            photos && photos.length > 0 &&
            <div className="pexels-pagination">
                <button className="prev-next" disabled={!(page !== 1)} onClick={() => previous()}>
                    <i className="fas fa-arrow-circle-left" />
                </button>
                <p>{page} / {pages}</p>
                <button className="prev-next" disabled={!(page !== pages)} onClick={() => next()}>
                    <i className="fas fa-arrow-circle-right" />
                </button>
            </div>
        }
        
        {   photos &&
           <React.Fragment>          
            {   
            arrangement === "double" ?
            <React.Fragment>
                <div className="double1">
                    {
                    double.array1[0].map((photo, i) => (
                    <PhotoCard key={i} photo={photo}/>
                    ))  
                    }
                </div>
                <div className="double2">
                    {
                    double.array2[0].map((photo, i) => (
                    <PhotoCard key={i} photo={photo}/>
                    ))  
                    }
                </div>
            </React.Fragment>
            :
            <React.Fragment>
            <div className="triple1">
                    {
                    triple.array1[0].map((photo, i) => (
                    <PhotoCard key={i} photo={photo}/>
                    ))  
                    }
                </div>
                <div className="triple2">
                    {
                    triple.array2[0].map((photo, i) => (
                    <PhotoCard key={i} photo={photo}/>
                    ))  
                    }
                </div>
                <div className="triple3">
                    {
                    triple.array3[0].map((photo, i) => (
                    <PhotoCard key={i} photo={photo}/>
                    ))  
                    }
                </div>
            </React.Fragment>
            } 
            </React.Fragment> 
        }
        </div>
    )
}

function PhotoCard({photo}) {

    const { src, photographer, photographer_url} = photo

    const save = (e) => {
        e.stopPropagation()
    }

    const pressEnterSelectPhoto = (e) => {
        console.log(e)
        if(e.keyCode === 0)
        selectPhoto({photo})
    }

    return (
        <div 
        className="photo-card-wrapper shadow hover-bounce slide-in"
        onClick={() => selectPhoto({photo})}
        onKeyPress={(e) => pressEnterSelectPhoto(e)}
        role="button"  
        tabIndex="0"
        >
            <div className="photo-wrapper">
                <img src={src.large} alt={src.photographer} className="photo"/>
            </div>
            <div className="photo-info-wrapper">
                <p>Photo by:
                <a href={photographer_url} target="blank" className="photo-link">{photographer}</a> 
                </p>
            </div>
            <div className="photo-options-wrapper">
                <button className="icon-button thumbtack" onClick={(e) => save(e)}>
                    <i className="fas fa-thumbtack"></i>
                </button>
            </div>
        </div>    
    )
    
}

function SelectedPhoto() {
    const photo = useSelector(state => state.pexels.selectedPhoto)
    const { src } = photo.photo.photo

    return (
        <div className="photo-selected-backdrop">
            <div className="photo-selected-wrapper">
                <div className="photo-selected-image-wrapper slide-in">
                    <img src={src.large2x} alt={src.photographer} className="photo-selected"/>
                    
                </div>      
            </div>
            <div className="photo-selected-options">
                <button className="icon-button" onClick={() => deselectPhoto()}>
                    <i className="fas fa-times-circle"/>
                </button>
            </div>
        </div>
    )
}

// function ImagesTab() {
//     //TO DO, User can select tabs to upload, use pexels, and browse their saved images.
//     return (
//         <div></div>
//     )
// }

export default function Images() {
    const pexels = useSelector(state => state.pexels)
    const { pending, selectedPhoto } = pexels

    return (
        <div className="grid-container-view slide-in">
            <div className="title-wrapper">
                <p className="view-title">Image Library</p>
            </div>
            <div className="searchbar-wrapper">
                <div className="pexel-credit">
                    <p>
                    Find images courtesy of <a href="https://pexels.com" target="blank">Pexels</a>
                    </p>
                </div>
                <SearchBar />
                
            </div>
            {
                pending ? 
                <div className="loading-spinner-wrapper">
                <LoadingSpinner />
                </div> 
                :<PexelsImages />
            }
            {
                selectedPhoto.photo && <SelectedPhoto /> 
            }
        </div>
    )
}

