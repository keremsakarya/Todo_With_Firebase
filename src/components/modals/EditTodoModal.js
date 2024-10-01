import { useState } from "react"

import { updateTodo } from "../../firebase"

export default function EditTodoModal({ close, data }) {
    const [todo, setTodo] = useState(data.todo)
    const [done, setDone] = useState(data.done)

    const updateHandle = async () => {
        await updateTodo(data.id, { todo, done })
        close()
    }

    return (
        <>
            <div className="flex items-center justify-center gap-x-2">
                <input
                    type="text"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={done}
                        onChange={(e) => setDone(e.target.checked)}
                    /> Tamamlandı.
                </label>

                <br />
                <button
                    onClick={updateHandle}
                    className="h-10 rounded px-4 text-sm text-white bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg hover:font-bold"
                >
                    Kaydet
                </button>
            </div>
        </>
    )
}
