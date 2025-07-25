import {  useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);

   useEffect(() => {
    fetch('http://localhost:8000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Failed to fetch tasks:", err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Task Tracker</h1>
      {/* Form to add a new task */}
      <form 
      //On submit runs when form is submitted
        onSubmit={e => {
          // Prevents the default form submission behavior (page reload)
          e.preventDefault();
          // e.target refers to the form element
          const form = e.target;
          // Access input field named 'title' and get its value
          const title = form.elements.title.value;
          const description = form.elements.description.value;
          // If input is empty, don't do anything
          if (title.trim() === "") return;
          console.log("Submitting task:", title);
          // Send POST request to backend to create a new task
          fetch('http://localhost:8000/tasks', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            //Convert response to JSON and update the tasks state
            body: JSON.stringify({ title, description}),
            })
            //Convert the response to JSON
            //Then update the tasks state with the new task
            .then((res) => res.json())
            .then((newTask) => {
            setTasks((prev) => [...prev, newTask]);
            form.reset();
          })

          .catch((err) => console.error("Failed to add task:", err));
        }}


      >
        <div className="form-group">
        Task Title:<br />
        <input name="title" placeholder="Enter task title"/>
        </div>
        <div className="form-group">
        Task Description:<br />
        <input name="description" placeholder="Enter task description" />
        </div>
        <div className="form-group">
        <button type="submit">Add Task</button>
        </div>

      </form>
          

      {/*Below is the ternery operator that checks if tasks are empty,
      //if empty it displays a message, otherwise it displays the list of tasks.*/}
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong> — {task.completed ? "✅ Done" : "❌ Not done"}
              <div style={{ marginLeft: "1rem", color: "#666" }}>
              {task.description}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
