import React from "react"
import Heading from "./Heading"
import "../styles/create.css"
import Axios from "axios";


export default class CreateArticle extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            data: [],
            imageUrl:null
        }
       
        this.handleSubmit=this.handleSubmit.bind(this);
        this.imageChange=this.imageChange.bind(this);
    }

    imageChange(e){
        this.setState({imageUrl:e.target.value})
       
    }
    handleSubmit(e){
        e.preventDefault();
        const title=e.target.elements.title.value;
        const description=e.target.elements.description.value;
        const imageUrl=e.target.elements.image.value;
        const url=e.target.elements.url.value;
        if(title&&description){
        var data={
            title,
            description,
            imageUrl,
            url
        }
        Axios.post("/api/article",data).then(res=>{
            console.log("Data added successfully");
            this.props.history.push("/dashboard")
        }).catch(err=>{
            alert(err)
        })
    }else{
        alert("Values are missing")
    }
    }
    render() {
        const history={...this.props,page:"create"}
        return (
            <div>
                <Heading history={history} />
                <form className="content" onSubmit={this.handleSubmit}>
                    <div className="left-desc">
                        <textarea id="title" name="title" placeholder="Enter the title" />
                        <textarea id="name" name="description" placeholder="Enter the description" />
                        <input type="text" id="image" name="image" placeholder="Enter the Image url" onChange={this.imageChange}/>
                        <input type="text" id="url" name="url" placeholder="Enter the Article url" />
                    </div>
                    <div className="right-desc">
                        <img className="image-div" src={this.state.imageUrl}></img>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}   