import {useEffect, useState} from "react";
import {useGlobalContext} from "../../utils/GlobalContext";
import {Link} from "react-router-dom";
import API from "../../utils/API";
import "./style.css";

function Dropdown({onMouseLeave, filteredArticles}) {

    const [state, dispatch] = useGlobalContext();

    return (
        <div id = "dropdown" onMouseLeave = {() => onMouseLeave()}>
            {
                filteredArticles.length > 0 ?
                filteredArticles.map(item => <Link onClick = { () =>
                   { 
                    dispatch({
                        type: "getArticle",
                        article: item.id
                    })
                    onMouseLeave();
                    }
                    
                } to = {"/article/" + item.id}>{item.title}</Link>)
                :
                ""
            }
        </div>
    )

}

export default Dropdown;