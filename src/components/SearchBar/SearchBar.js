import { useSelector } from 'react-redux'
import { getPexels } from '../../redux/pexels/pexelsHelpers'
import './SearchBar.css'

export default function SearchBar() {
    const resultsPerPage = useSelector(state => state.pexels.resultsPerPage)
    const searchPexels = (e) => {
        getPexels(e.target.value, resultsPerPage, 1)
    }

    return (
        <div className="search-bar-wrapper">
            <div className="search-bar-container drop-shadow">
                <input 
                type="text" 
                className="search-bar " 
                onChange={searchPexels}
                placeholder="Search for images..."
                />
                <div className="icon-wrapper">
                    <i className="fas fa-search search-bar-icon" />
                </div>
            </div>
        </div>
        
    )
}