import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getLocations } from "../../store/locations";

function Home(){
    const dispatch = useDispatch() // acts like a fetch
    const history = useHistory() //acts as a redirect

    const locations = useSelector((state)=> state?.locations?.joon)
    const [html, setHtml] = useState('hello')
    const [isLoaded, setIsLoaded] = useState(false)

    console.log(locations, "this is locations") //an array of all locations
    //async
    useEffect(()=> {
        dispatch(getLocations()) //sends request to backend (may send data from front end if needed)
        .then(()=> setIsLoaded(true))
    },[isLoaded])

    function changeHtml(e) {
        e.preventDefault()
        e.stopPropagation()
        if (html === 'hello'){
            setHtml('bye')
        }else {
            setHtml('hello')
        }
    }

    function sendToPage(e,id){
        e.preventDefault()
        e.stopPropagation()
        history.push(`/locations/${id}`)
    }


if (!isLoaded){
    return <h1 style={{'position':'relative', 'top':'400px'}}>loading...</h1>
} else {
    return(
        <>
        {/* <h1 onClick={e=> changeHtml(e)}style={{'position':'relative', 'top':'100px'}}>{html}</h1> */}
        {locations? locations.map(location =><>
        <div className="picture-cards">
            <img style={{'height':'50px', 'width':'50px'}} src={`${location.Images[0].url}`}></img>
            <h1 onClick={(e)=> sendToPage(e, location?.id)}>{`${location?.name}`}</h1>
        </div>
            </>
                )
        : <h1>Loading...</h1>}
        </>
        )
    }
}

export default Home
