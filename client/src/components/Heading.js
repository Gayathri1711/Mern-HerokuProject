import React from "react"
import '../styles/heading.css'
import add from '../add.png'
import close from '../close.png'

const Heading = (props) => {
    console.log(props)
    var source = null;
    if (props.history.page == "landing") {
        source = add;
    } else {
        source = close
    }

    return (<div className="head">
        {
            <img src={source} onClick={()=>{
                if (props.history.page == "landing") {
                    props.history.history.push("/create");
                } else {
                    props.history.history.push("/dashboard");
                }
            }}></img>
        }
        <span>
            Readers Spot
        </span>
    </div>)
}


export default Heading;