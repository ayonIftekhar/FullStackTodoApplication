import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { securityContext } from "../Security/AuthComponent";
import {getTodoById , updateTodo , createTodo} from "../BackEndCommunication/BackEndCom"
import {Formik,Form,Field, ErrorMessage} from 'formik'
import moment from 'moment'

export default function Todo(){

    //extracting id sent through URL
    const params = useParams();
    const todoID = params.id;

    //extract current username
    const authContext = useContext(securityContext);
    const username = authContext.currentUser;

    //creating states to save Todo
    const [description , setDescription] = useState("");
    const [target , setTargetDate ] = useState('');

    //Invoking the extractTodo function
    useEffect(
        () => extractTodo(),
        [todoID]
    );

    //initializing useNavigate hook
    const navigate = useNavigate()

    //extract Todo details from API
    function extractTodo(){

        if(todoID != -1){
            getTodoById(username,todoID)
            .then( (response)=>{ 
                setDescription(response.data.description);
                setTargetDate(response.data.target); 
            } )
            .catch( (error)=> {console.log(error)} )
        }  
    }

       
    //submitting updated todo
    //only triggered if validate function returns empty -
    // error object
    function onSubmit(values){

        const todo = {
            id : todoID,
            description : values.description ,
            isDone : false ,
            target : values.target ,
            author : username
        }

        if(todoID != -1){
            updateTodo(username , todoID , todo)
            .then( (response) => navigate("/todos") )
            .catch( (error) => console.log(error) )
        }
        else{
            createTodo(username , todo)
            .then( (response) => navigate("/todos") )
            .catch( (error) => console.log(error) )
        }  
        
    }    


    //validating updated todo
    function validate(values){
        let errors={ }

        if( values.description.length < 5){
            errors.description = "Enter atleast 5 characters."
        }

        if( !moment(values.target).isAfter(moment()) ){
            errors.target = "Target date must be in future."
        }
        console.log(values)
        return errors
    }  

    return(
    <div className="container">
        <h1>Enter Todo Details</h1>
        <Formik initialValues = { { description, target } } 
            enableReinitialize = {true}
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}  //don't validate until submitted
            validateOnBlur={false}
        >
        {
            (props) => (
               <Form>

                    <ErrorMessage 
                        name="description"
                        component="div"
                        className="alert alert-warning"
                    />

                    <ErrorMessage 
                        name="target"
                        component="div"
                        className="alert alert-warning"
                    />
                    <fieldset className="form-group">
                        <label>Description</label>
                        <Field type="text" className="form-control" name="description"></Field>
                    </fieldset>

                    <fieldset className="form-group">
                        <label>Target Date</label>  
                        <Field type="date" className="form-control" name="target"></Field>
                    </fieldset>
                    <div>
                        <button className="btn btn-success m-5" type="submit"> Save </button>
                    </div>
               </Form>
            )
        }
        </Formik>
    </div>
    ) 
}