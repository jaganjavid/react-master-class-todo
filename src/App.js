import { useState, useRef , useEffect} from "react";
import TodoList from "./components/TodoList";
import {v4 as uuidv4} from 'uuid';

function App() {

  const todoKey = "todos";


  // const [todos, setTodos] = useState([{id:1, name: "Todo 1", completed:true},
  // {id:2, name: "Todo 2", completed:false}])
  const [todos, setTodos] = useState([]);

  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(todoKey));
    if(storedTodos){
      setTodos(storedTodos);
    }
  },[])

  const todoNameRef = useRef();
  
  function handleAddTodo(e){
    const name = todoNameRef.current.value;

    if(name === ''){
      alert("Please add todo");
      return;
    }

    setTodos(prevTodos => {
      localStorage.setItem(todoKey, JSON.stringify([...prevTodos, {id:uuidv4(), name:name, completed:false}]))
        return [...prevTodos, {id:uuidv4(), name:name, completed:false}];
    })

    todoNameRef.current.value = '';
    
  }

  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(prevTodos => {
      localStorage.setItem(todoKey, JSON.stringify(newTodos));
      return newTodos;
    })
  }

  function toggleTodo(id){
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }


  return (
    <>
    <div className="container">
      <h3 className="text-primary">Add Todo</h3>
      <input className="form-control" type="text" ref={todoNameRef}/>
      <div className="d-flex gap-3 my-3">
      <button className="btn btn-primary" onClick={handleAddTodo}>Add</button>
      <button className="btn btn-warning" onClick={handleClearTodo}>Clear</button>
      </div>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>

      <h5>{todos.filter(todo => !todo.completed).length} left to do</h5>
    </div>
     
    </>
  )
}

export default App;
