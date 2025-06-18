import { useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header";

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

    return <div>

    <Header  isAuthorized = { isAuthorized }/>
    

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