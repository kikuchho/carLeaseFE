import { useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header";
import CardSlider from "../components/CardSlider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import "../styles/unProtectedHome.css";

function UnprotectedHome () {

    ///-------------start of authroization logic------------------///
    const [isAuthorized, setIsAuthorized] = useState<null | boolean>(null);

    useEffect(() => {
        auth().catch( () => {setIsAuthorized(false)}  )
        
    }, [])



    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        try{
            //if refresh token is not yet expired , then get the access key to login
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            });
            if(res.status === 200 ){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }

        } catch (error) {
            // error means the refresh token is expired. 
            console.log(error)
            setIsAuthorized(false) 
        }


    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token) {
            setIsAuthorized(false)
            return 
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp || 0
        const now = Date.now() / 1000 

        //if the accesstoken is expired , then use refreshtoken to get new access token 
        if(tokenExpiration < now ){
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }


    }


    if(isAuthorized === null ){
        return <div> Loading... </div>
    }

    console.log("user is " + isAuthorized)

    ///--------------end of authroization logic------------------///

    
    api.get("/api/cars/")
            .then((res) => { console.log("carList2", res.data); } )
            .catch((err) => { alert(err) } )
    
   
    return <div>

    <Header  isAuthorized = { isAuthorized }/>
    
    
    
    <CardSlider />
    

    { isAuthorized === true ? 
        <div> 
            
        </div> 
        : 
        <div>  

        </div> 
    }

    </div>
}
export default UnprotectedHome 


// var settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // };


{/* <div className="card-container">
        <Slider   {...settings}>
        <div className="card">
            <h3>1</h3>
        </div>
        <div>
            <h3>2</h3>
        </div>
        <div>
            <h3>3</h3>
        </div>
        <div>
            <h3>4</h3>
        </div>
        <div>
            <h3>5</h3>
        </div>
        <div>
            <h3>6</h3>
        </div>
        </Slider>
    </div>
     */}