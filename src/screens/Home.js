// import logo from './logo.svg';
import './Home.css';
import { useState, useEffect} from 'react';
import axios from "axios";
import {useUser} from '../context/useUser';
// import Row from "../components/Row"

const url = "http://localhost:3001"

function Home() {
  const { user } = useUser()
  const [task, setTask] = useState("")
  const [tasks,setTasks] = useState([])


  useEffect(() => {
    axios.get(url)
    .then(response => {
      setTasks(response.data)
  }).catch(error => {
    alert(error.response.data.error ? error.response.data.error: error)
  })
  }, []
)

  const addTask = () => {
    const headers = {headers: {Authorization: user.token}}
    axios.post(url + "/create", {
      description: task
    }, headers)
    .then(response => {
      setTasks([...tasks, {id: response.data.id, description: task}])
      setTask("")
    }).catch(error =>{ 
      alert(error.response.data.error ? error.response.data.error:error)

    })
    // setTasks([...tasks, task])
    // setTask('')
  }

  const deleteTask = (id) => {
    const headers = {headers: {Authorization: user.token}}
    axios.delete(url + "/delete/" + id, headers
      // {  description:task}
    )
    .then(response => {
      const withoutRemoved = tasks.filter((item) => item.id !== id)
      setTasks(withoutRemoved)
      // setTask("")
    }).catch(error =>{ 
      alert(error.response.data.error ? error.response.data.error:error)

    })
    // setTasks([...tasks, task])
    // setTask('')
  }


    // const withoutRemoved = tasks.filter((item) => item !== deleted)
    // setTasks(withoutRemoved)

  return (
    <div id="container">
       <h3>Todos</h3>
       <form>
          <input 
          placeholder='Add new task' 
          value={task}
          onChange={ e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter"){
              e.preventDefault()
              addTask()
            }
          }}
          />
       </form>
       <ul>
          {
            tasks.map(item => (
              <li key={item.id}>
                {item.description}
                <button className='delete-button' onClick={() => deleteTask(item.id)}>Delete</button>
              </li>
            ))
            
          }


          {/* {
            tasks.map( item => (
              <li>{item}</li>
            ))
          } */}

       </ul>
    </div>
  )
  
}

export default Home;
