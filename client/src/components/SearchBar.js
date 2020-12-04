import React from "react"
import '../styles/search.css'
import search from '../search.png'
const SearchBar = (props) => {
   
    return (
        <div className="search">
        <img className="search-image" src={search}/>
        <input className="search-text" type="text" onChange={(e)=>{
                props.onSearch(e.target.value)
            }}/>
    </div>
)
}


export default SearchBar;