import { useState } from 'react'
import './grids.css'
import './Tabs.css'

export default function Tabs({tabs}) {
    console.log(tabs)
    const [ item, setItem ] = useState(tabs[0].item)

    return (
        <div className="grid-container-tabs">
            <div className="tab-pagination">
                <div className="tab-options-wrapper">
                {
                    tabs.map((tab, i) => (
                            <button 
                            key={i} 
                            className="tab-options-item bg-gradient" 
                            onClick={() => setItem(tab.item)}>
                            {tab.tab}
                            </button>
                    ))
                }
                </div>
            </div>
            <div className="tab-item">{item}</div>
        </div>
    )
}