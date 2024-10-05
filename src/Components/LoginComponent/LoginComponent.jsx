import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './login.css'
import {securityContext} from "../Security/AuthComponent"
import { useContext } from "react"
import {authorizationToken} from "../BackEndCommunication/BackEndCom"
import {apiCommunicator , jwtAuthentication} from "../BackEndCommunication/ApiClient"

export default function LoginComponent(){

    const [username , setUserName] = useState("Ayon")

    const [password , setPassword] = useState("")

    const [unauthenticated , setUnauthenticated] = useState(false);

    const authContext = useContext(securityContext);

    const navigate = useNavigate();

    function nameOnChangeHandler(event){
        setUserName(event.target.value);
    }

    function passwordOnChangeHandler(event){
        setPassword(event.target.value);
    }

    async function authenticateUser(){

        //const token = 'Basic ' + window.btoa(username + ':' + password)
        try{
            // const response = await authorizationToken(token)
            const response = await jwtAuthentication(username, password)

            if(response.status === 200){

                const token = 'Bearer ' + response.data.token
                authContext.setToken(token)
                setUnauthenticated(false);

                apiCommunicator.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = token
                        return config
                    }
                )

                authContext.Login() ;
                authContext.setCurrentUser(username);
                navigate(`/welcome/${username}`)
            } else{
                authContext.Logout( ) ;
                setUnauthenticated(true);
            }
        }catch(error){
            authContext.Logout( ) ;
            setUnauthenticated(true);
            authContext.setToken(null)
        }
    }

    return (
        <div className="loginComponent">
            <div className="MyloginForm">
                
                <div className="username">
                    <label> User Name :</label>
                    <input type="text" name="username" value={username} onChange={nameOnChangeHandler}/>
                </div>

                <div className="password">
                    <label> Password :</label>
                    <input type="password" name="username" value={password} onChange={passwordOnChangeHandler}/>
                </div>

                { (!authContext.isAuthorized && unauthenticated) && <h4> Plase provide valid credentials...</h4> }

                <button type="button" onClick={authenticateUser} className="mt-3 btn btn-primary"> Submit  </button>

            </div>
        </div>
    )
}