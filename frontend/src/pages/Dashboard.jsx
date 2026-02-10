
import { useEffect, useState } from "react";
import api from "../services/api";


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);



const fetchProfile = async () => {
  const res = await api.get("/auth/profile");
  setUser(res.data);
};
useEffect(() => {
  fetchProfile();
  fetchTasks();
}, []);


  const fetchTasks = async () => {
  try {
    setLoading(true);
    const res = await api.get("/tasks");
    setTasks(res.data);
  } finally {
    setLoading(false);
  }
};


  const addTask = async () => {
    if (!title.trim()) return;
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };
  const updateTask = async (id) => {
  if (!editTitle.trim()) return;

  await api.put(`/tasks/${id}`, { title: editTitle });
  setEditingId(null);
  setEditTitle("");
  fetchTasks();
};


  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };



  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
    
<div className="bg-white border-b px-6 py-4 flex justify-between items-center">
  <div>
    <h1 className="text-xl font-semibold">Dashboard</h1>
    {user && (
      <p className="text-sm text-gray-500">
        {user.name} • {user.email}
      </p>
    )}
  </div>

  <button
    onClick={logout}
    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
  >
    Logout
  </button>
</div>


      <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">My Tasks</h2>

        <div className="flex gap-2 mb-4">
          <input
            placeholder="New task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <input
          placeholder="Search tasks..."
          className="mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

      <ul className="space-y-2">
  {filteredTasks.map((task) => {
    const isEditing = editingId === task._id;
    const isDirty = editTitle !== task.title;

    return (
      <li
        key={task._id}
        className="flex justify-between items-center border p-3 rounded"
      >
        {isEditing ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="mr-3"
          />
        ) : (
          <span className="text-gray-800">{task.title}</span>
        )}

        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={() => updateTask(task._id)}
              disabled={!isDirty}
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white disabled:opacity-50"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => {
                setEditingId(task._id);
                setEditTitle(task.title);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
          >
            Delete
          </button>
        </div>
      </li>
    );
  })}
</ul>


     {loading && (
  <p className="text-gray-500 text-sm text-center mt-4">
    Loading tasks...
  </p>
)}

{!loading && filteredTasks.length === 0 && (
  <p className="text-gray-500 text-sm text-center mt-4">
    No tasks found
  </p>
)}

      </div>
      
    </div>
  );
  
}
