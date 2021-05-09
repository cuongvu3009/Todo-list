import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      text: task,
      id: new Date().getTime(),
    };
    if (task === "") {
      return null;
    }
    setList([...list].concat(newTask));
    setTask("");
  };

  const handleDelete = (id) => {
    const updatedList = [...list].filter((item) => item.id !== id);
    setList(updatedList);
  };

  const submitEdit = (id) => {
    const editedList = [...list].map((task) => {
      if (task.id === id) {
        task.text = editingText;
      }
      return task;
    });
    setList(editedList);
    setIsEditing(null);
  };

  return (
    <div className='App' id='todo-list'>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='eg. Wash dishes'
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type='submit'>Add</button>
      </form>

      {/* task visualize */}
      {list.map((task) => {
        return (
          <div key={task.id} className='todo'>
            <div className='todo-text'>
              <input
                type='checkbox'
                id='completed'
                onClick={() => setIsDone(!isDone)}
              />
              {task.id === isEditing ? (
                <input
                  type='text'
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <div>{task.text}</div>
              )}
            </div>

            <div className='todo-actions'>
              {task.id === isEditing ? (
                <button onClick={() => submitEdit(task.id)}>Submit Edit</button>
              ) : (
                <button onClick={() => setIsEditing(task.id)}>Edit</button>
              )}

              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
