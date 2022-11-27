import React from 'react'

const Todo = ({todo,toggleTodo}) => {
  return (
    <div>
        <label>
            <input type="checkbox" className='form-check-input' checked={todo.completed} onChange={() => toggleTodo(todo.id)}/>
            <span className='d-inline-block mx-3 mb-3'>{todo.name}</span>
        </label> 
    </div>
  )
}

export default Todo