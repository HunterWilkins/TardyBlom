import {useEffect, useState} from "react";
import "./style.css";

function Aside() {

    const [visible, setVisible] = useState(true);
    const [yPosition, setYPosition] = useState(0);
   

    return(
        <aside>
            <p>Aside, dawg.</p>
            <p>Here's some filler text for all y'all</p>
        </aside>
    )
}

export default Aside;