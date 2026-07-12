import { useState } from "react";
import { useTodos } from "../context/TodoContext";

export default function TodoForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { addTodo } = useTodos();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        await addTodo({ title: title.trim(), description: description.trim() });
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Todo</h2>
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Todo name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                >
                    Add
                </button>
            </div>
        </form>
    );
}
