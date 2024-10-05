import {Routes , BrowserRouter , Route, Navigate} from 'react-router-dom'
import LoginComponent from '../LoginComponent/LoginComponent'
import WelcomeComponent from '../WelcomeComponent/WelcomeComponent'
import TodoList from '../TodoList/TodoList'
import ErrorComponent from '../ErrorComponent/ErrorComponent'
import HeaderComponent from '../Header/HeaderComponent'
import AuthComponent from '../Security/AuthComponent'
import { securityContext } from '../Security/AuthComponent'
import { useContext } from 'react'
import Todo from '../Todo/todo'

export default function TodoApplication(){

    

    function Authenticate( {children} ){

        const authContext = useContext(securityContext);

        if(authContext.isAuthorized)
            return children

        return <Navigate to="/" />
    }

    return (
        <div className="todoApplication">
            <div className=''>
                <AuthComponent>
                    <BrowserRouter>
                    <HeaderComponent/>
                        <Routes>
                            <Route path="/" element={ <LoginComponent/> }/>

                            <Route path='/welcome/:username' element= { 
                                <Authenticate>
                                    <WelcomeComponent/>
                                </Authenticate>  
                            }/>

                            <Route path='/todos' element={
                                <Authenticate>
                                    <TodoList/>
                                </Authenticate>
                            }/>

                            <Route path='/todos/update/:id' element={
                                <Authenticate>
                                    <Todo/>
                                </Authenticate>
                            }/>

                            <Route path='*' element={<ErrorComponent/>}/>
                        </Routes>
                    </BrowserRouter>
                </AuthComponent>
            </div>
        </div>
    )
}