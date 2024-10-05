import { useContext } from "react";
import { Link, useParams } from "react-router-dom"
import "./welcome.css"
import {securityContext} from "../Security/AuthComponent"


export default function WelcomeComponent(){

    const requestParams = useParams();

    const authContext = useContext(securityContext)

    console.log(authContext.currentUser)

    return (
        <div className="welcomeComponent">

            {/* <h3> Welcome Back {requestParams.username}... </h3> */}
            <h3> Welcome Back chodu {authContext.currentUser}... </h3>
            To manage your Todos <Link to="/todos"> click here</Link>

        </div>
    )
}