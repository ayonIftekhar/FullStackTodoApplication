package com.TodoApplication.Backend.TodoService;


import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class TodoService {

    private static List<Todo> todos = new ArrayList<>() ;

    private static int todoCount = 0;

    static {
        todos.add( new Todo(++todoCount , "todo number one" , false , LocalDate.now().plusYears(1) , "Ayon") );
        todos.add( new Todo(++todoCount , "todo number two" , false , LocalDate.now().plusYears(1) ,"Ayon"));
        todos.add( new Todo(++todoCount , "todo number three" , false , LocalDate.now().plusYears(1),"Ayon") );
        todos.add( new Todo(++todoCount , "todo number four" , false , LocalDate.now().plusYears(1),"Ayon") );
    }

    public List<Todo> getByUsername(String username){
        List<Todo> result = new ArrayList<>();

        for(Todo todo : todos){
            if(todo.getAuthor().equals(username)) result.add(todo);
        }
        return result;
    }

    public void deleteTodo(int id){
        Todo toDelete = null ;
        for(Todo todo : todos){
            if(todo.getId() == id) toDelete = todo ;
        }
        todos.remove(toDelete);
    }

    public Todo getTodoById(int id){
        Todo result = null ;
        for(Todo todo : todos){
            if(todo.getId() == id){
                result = todo;
            }
        }
        return result;
    }

    public void updateTodo(Todo todo){
        deleteTodo(todo.getId());
        todos.add(todo);
    }

    public int addTodo(Todo todo){
        todo.setId(++todoCount);
        todos.add(todo);
        return todoCount;
    }
}

