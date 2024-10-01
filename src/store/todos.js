import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    todos: [],

}
const todos = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;

        },
        appendTodo: (state, action) => {
            state.todos = [...state.todos, action.payload]
        },

    }
})
export const { setTodos, appendTodo } = todos.actions
export default todos.reducer