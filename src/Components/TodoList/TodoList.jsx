import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTodosList , deleteTodoApi} from "../BackEndCommunication/BackEndCom";
import { securityContext } from "../Security/AuthComponent";

export default function TodoList(){

    const [todos , setTodos] = useState([]);
    const [warning , setWarning] = useState(null);
    const authContext = useContext(securityContext);
    const navigate = useNavigate();

    function retrieveTodos(){

        getTodosList(authContext.currentUser)
        .then( (response)=> { setTodos(response.data) } )
        .catch( (error)=> { console.log(error)} )
        .finally( ()=> { } )

    }

    function deleteTodo(id){
        setWarning('Todo has been deleted with id ' + id);
        deleteTodoApi( authContext.currentUser , id)
        .then( (response)=> retrieveTodos())
        .catch( (error)=> console.log(error) );
    }

    function updateTodo(id){
        navigate(`/todos/update/${id}`);
    }

    function createTodo(){
        navigate(`/todos/update/-1`);
    }

    useEffect(
        ()=> {
            retrieveTodos();
        }
    );

    return (
        <div className="todoList">

            <h4 className="mt-5 mb-5 p-3">Your List Of Todos ...</h4>

            <div className="container">

                { warning && <div className="alert alert-warning"> {warning} </div>}

                <table className="table">
                    <thead>
                        <tr><th>Description</th><th>isDone</th><th>Target</th><th>Delete</th><th>Update</th></tr>
                    </thead>
                    <tbody>
                        {
                            todos.map( 
                                item => (
                                    <tr key={item.id}>
                                        <td>{item.description}</td>
                                        <td>{item.isDone.toString()}</td>
                                        <td>{item.target.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={()=> deleteTodo(item.id) }> Delete</button></td>
                                        <td><button className="btn btn-success" onClick={()=> updateTodo(item.id) }> Update</button></td>
                                    </tr>
                                )  
                            )
                        }
                    </tbody>
                </table>
                <div>
                    <button className="btn btn-warning" onClick={createTodo}> Create new Todo</button>
                </div>
            </div>

        </div>
    )
}