import React, { useState } from 'react'

const Todo = () => {
    const [stored,setstored] = useState("")
    const [todo,settodo] = useState([ ])

    const handleAdd =()=>{
        settodo([stored,...todo])
        setstored("")
        console.log(todo)
    }
   
  return (
    <div>
      <input value={stored}   onChange={(e)=>setstored(e.target.value)}  />
      <button onClick={handleAdd}>Add</button>

    <ul>
           {todo.map((e,index)=> ( 
        <li  key={index}>{e}</li>
            ))}
    </ul>
    
    </div>
  )
}

export default Todo
