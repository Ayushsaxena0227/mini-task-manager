import React from "react";

const Taskform = ({ text, settext, handlesubmit, editId, loading }) => {
  return (
    <form onSubmit={handlesubmit}>
      <input
        value={text}
        onChange={(e) => settext(e.target.value)}
        placeholder="Enter task"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {editId ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default Taskform;
