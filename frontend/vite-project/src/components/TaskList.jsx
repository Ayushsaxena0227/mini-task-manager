import React from "react";

const TaskList = ({ tasks, handleedit, handledelete }) => {
  if (!Array.isArray(tasks)) {
    return <div className="no-tasks">No tasks to show</div>;
  }

  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="task-item">
            <div className="task-text">{task.text}</div>
            <div className="task-actions">
              <button className="edit-btn" onClick={() => handleedit(task)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handledelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-tasks">No tasks found!</p>
      )}
    </div>
  );
};

export default TaskList;
