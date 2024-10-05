package com.TodoApplication.Backend.TodoController;

import com.TodoApplication.Backend.TodoRepository.TodoRepository;
import com.TodoApplication.Backend.TodoService.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class TodoController {

    @Autowired
    private TodoService todoService;

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/user/{username}/todos")
    public List<Todo> getTodos(@PathVariable String username){
        //return todoService.getByUsername(username);
        return todoRepository.findByAuthor(username);
    }

    @DeleteMapping("/user/{username}/todos/{id}")
    public ResponseEntity deleteTodo(@PathVariable String username, @PathVariable int id){
        //todoService.deleteTodo(id);
        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build() ;
    }

    @GetMapping("/user/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username, @PathVariable int id){
        //return todoService.getTodoById(id);
        return todoRepository.findById(id).get();
    }

    @PutMapping("/user/{username}/todos/{id}")
    public ResponseEntity<Void> putTodo(@PathVariable String username, @PathVariable int id ,
                        @RequestBody Todo todo){
        //todoService.updateTodo(todo);
        todoRepository.save(todo);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/user/{username}/todos")
    public ResponseEntity<Void> addTodo(@PathVariable String username,
                                        @RequestBody Todo todo){
        //int id = todoService.addTodo(todo);
        Todo newTodo = todoRepository.save(todo);
        URI uri = UriComponentsBuilder
                .fromPath("/user/{username}/todos/{id}")
                .buildAndExpand(username,newTodo.getId())
                .encode()
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping(path = "/basicauth")
    public String basicAuth(){
        return "Success";
    }
}
