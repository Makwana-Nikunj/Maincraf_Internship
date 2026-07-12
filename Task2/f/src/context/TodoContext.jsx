import { createContext, useContext, useState, useEffect } from "react";
import { fetchTodos as apiFetchTodos, createTodo as apiCreateTodo, updateTodo as apiUpdateTodo, deleteTodo as apiDeleteTodo } from "../services/api";

const TodoContext = createContext();

export function TodoProvider({ children }) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTodos = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiFetchTodos();
            setTodos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (todo) => {
        const created = await apiCreateTodo(todo);
        setTodos((prev) => [...prev, created]);
    };

    const updateTodo = async (id, updates) => {
        const updated = await apiUpdateTodo(id, updates);
        setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    };

    const removeTodo = async (id) => {
        await apiDeleteTodo(id);
        setTodos((prev) => prev.filter((t) => t._id !== id));
    };

    useEffect(() => {
        loadTodos();
    }, []);

    return (
        <TodoContext.Provider value={{ todos, loading, error, addTodo, updateTodo, removeTodo, reload: loadTodos }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodos() {
    const context = useContext(TodoContext);
    if (!context) throw new Error("useTodos must be used within a TodoProvider");
    return context;
}
