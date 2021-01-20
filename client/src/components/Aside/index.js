import {useEffect, useState} from "react";
import "./style.css";

function Aside() {

    const [visible, setVisible] = useState(true);
    const [yPosition, setYPosition] = useState(0);
   

    return(
        <aside>
            <div id = "info">
                <p><em>"Tardyblom"</em><br />What does it mean? Nothing at all!</p>
                <hr />
                <p>This site is one man's attempt to be the next IGN...but with every medium.</p>
                <br />
                <p>You can expect anything from standard reviews to ruminations on different hobbies. 
                    Additionally, there'll be the occasional article completely out of left field.</p>
            </div>
            <div id = "icon-box">
                <a href = "https://twitter.com/tardyblom" target = "__blank">
                   <img className = "icon" src = "/images/twitter-icon.png" />
                </a>
            </div>
        </aside>
    )
}

export default Aside;