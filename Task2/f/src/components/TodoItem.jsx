import { useState } from "react";
import { useTodos } from "../context/TodoContext";

const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
};

export default function TodoItem({ todo }) {
    const { updateTodo, removeTodo } = useTodos();
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [priority, setPriority] = useState(todo.priority || "medium");
    const [dueDate, setDueDate] = useState(todo.dueDate ? todo.dueDate.slice(0, 10) : "");
    const [completed, setCompleted] = useState(todo.completed || false);

    const handleSave = async () => {
        await updateTodo(todo._id, {
            title: title.trim(),
            description: description.trim(),
            priority,
            dueDate: dueDate || undefined,
            completed,
        });
        setEditing(false);
    };

    const handleCancel = () => {
        setTitle(todo.title);
        setDescription(todo.description);
        setPriority(todo.priority || "medium");
        setDueDate(todo.dueDate ? todo.dueDate.slice(0, 10) : "");
        setCompleted(todo.completed || false);
        setEditing(false);
    };

    const handleDelete = async () => {
        if (window.confirm("Delete this todo?")) {
            await removeTodo(todo._id);
        }
    };

    if (editing) {
        return (
            <div className="bg-white rounded-xl shadow-md p-5 border-2 border-blue-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="flex items-center gap-2 sm:col-span-2">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            className="h-4 w-4"
                        />
                        <span className="text-sm text-gray-700">Completed</span>
                    </label>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Update
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
                <h3 className={`text-lg font-semibold ${completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {todo.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{todo.description || "No description"}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[todo.priority] || priorityColors.medium}`}>
                        {todo.priority || "medium"}
                    </span>
                    {todo.dueDate && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            Due: {new Date(todo.dueDate).toLocaleDateString()}
                        </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${completed ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {completed ? "Completed" : "Pending"}
                    </span>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Update
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
