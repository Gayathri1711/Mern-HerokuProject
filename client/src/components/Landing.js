import React from "react"
import Heading from "./Heading"
import Axios from "axios"
import SearchBar from "./SearchBar"
import "../styles/landing.css"

export default class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            delete:"delete"
        }
        this.onSearch=this.onSearch.bind(this);
    }


    componentDidMount() {
        Axios.get("/api/article/get-all").then(res => {
           
            this.setState({data:[...res.data.data]})
        }).catch(err => {
            console.log(err)
            alert(err)
        })
    }

    deleteOnClick=(value)=>{
        Axios.delete(`/api/article?id=${value}`).then(res => {
           this.componentDidMount();
        }).catch(err => {
            console.log(err)
            alert(err)
        })
    }

    onClickArticle(url){
        window.open(url, "_blank")
    
    }

    onSearch(value){
        Axios.get(`/api/article/search?searchTerm=${value}`).then(res => {
            this.setState({data:[...res.data.data]})
        }).catch(err => {
            console.log(err)
            alert(err)
        })
    }

    render() {
        const history={...this.props,page:"landing"}
        return (
            <div>
                <Heading history={history}/>
                <SearchBar onSearch={this.onSearch}/>
                {(this.state.data.length>0)?
                  this.state.data.map((article,i)=>{
                    
                    return(
                    <div key={i+"container"} className="container">
                    <button key={i+"delete"} className={this.state.delete}
                    onClick={this.deleteOnClick.bind(this,article._id)}/>
                    <div key={i+"article-block"} className="article-block" onClick={this.onClickArticle.bind(this,article.url)}
                    >
                    <div key={i+"left-art"} className="left-art" >
                    <div key={i+"article-title"} className="article-title">{article.title}</div>
                    <div key={i+"article-desc"} className="article-desc">{article.description}</div>
                    </div>
                    <div key={i+"right-art"} className="right-art">
                    <img key={i+"article-image"} className="article-image" src={article.imageUrl}></img>
                    </div>
                    </div>
                    </div>
                    )}):<div/>}
                  
            </div>
        )
    }
}