import './App.css';
import {useEffect, useState} from "react"
function App() {
  const [todos,setTodos] = useState([]);
  const [todo,settodo] = useState("");
  const [todoEditing,settodoEditing] = useState(null);
  const [editingText,setEditingText] = useState("");
  useEffect(()=>{
    const temporary = localStorage.getItem("todos");
    const loadedToods = JSON.parse(temporary);

    if(loadedToods){
      setTodos(loadedToods);
    }
  },[])
  useEffect(()=>{
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos",temp);
  },[todos])
  const handleSubmit = (e)=>{
    e.preventDefault();

    const newTodo = {
      id : new Date().getTime(),
      text: todo,
      completed : false
    }
    setTodos([...todos].concat(newTodo));
    settodo("");
  }
  const deleteTodo = (id)=>{
    const updatedtodos = [...todos].filter((todo)=>todo.id !== id)
    setTodos(updatedtodos);
  }
  const editTodo = (id)=>{
    const updatedtodos = [...todos].map((todo)=> {
      if(todo.id === id){
        todo.text = editingText
      }
      return todo;
    })
    setTodos(updatedtodos);
    settodoEditing(null);
    setEditingText("");
  }
  return (
    <div className="App">
      <h1 className='heading-title'>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => settodo(e.target.value)} value={todo}/>
        <button type='submit' >AddTodo</button>
        </form>    
        {todos.map((todo)=> <div key={todo.id}>
          {todoEditing === todo.id ? ( <input 
          type="text" 
          onChange={(e) => setEditingText(e.target.value)} 
          value={editingText}
          />)
           : (<div>{todo.text}</div>)}
          <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
          {todoEditing === todo.id ? (          <button onClick={()=> editTodo(todo.id)}>Submit Edit</button>
) : (          <button onClick={()=> settodoEditing(todo.id)}>Edit</button>
)}
          </div>)}
    </div>
  );
}

export default App;
