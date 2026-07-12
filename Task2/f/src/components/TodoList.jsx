import { useTodos } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
    const { todos, loading, error } = useTodos();

    if (loading) return <p className="text-center text-gray-500 py-8">Loading todos...</p>;
    if (error) return <p className="text-center text-red-500 py-8">Error: {error}</p>;
    if (!todos.length) return <p className="text-center text-gray-400 py-8">No todos yet. Add one above!</p>;

    return (
        <div className="space-y-4">
            {todos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} />
            ))}
        </div>
    );
}
