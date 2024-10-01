import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logout as logoutHandle } from "../store/auth"
import {
    logout,
    emailVerification,
    auth,
    addTodo,
    deleteTodo,
} from "../firebase"
import { useNavigate } from "react-router-dom"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { modal } from "../utils"

/* tarih formatlamak için */
import dayjs from "dayjs"

/* o anki zamanı almak için */
import relativeTime from "dayjs/plugin/relativeTime"

/* mesajı türkçeleştirmek için */
import "dayjs/locale/tr"

/* o anki zamanı almak için */
dayjs.extend(relativeTime)

/* mesajı türkçeleştirmek için */
dayjs.locale('tr')

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { todos } = useSelector((state) => state.todos)
    const [parent, enableAnimations] = useAutoAnimate()
    const [todo, setTodo] = useState("")
    const [done, setDone] = useState(true)

    const submitHandle = async (e) => {
        e.preventDefault()
        try {
            await addTodo({
                todo,
                uid: user.uid,
                done,
            })
            setTodo("") // todo eklendikten sonra input'u temizlemek için
        } catch (error) {
            console.error("Todo ekleme hatası:", error)
        }
    }
    const handleDelete = async (id) => {
        await deleteTodo(id)
    }

    const handleLogout = async () => {
        await logout()
        dispatch(logoutHandle())
        navigate("/", { replace: true })
    }

    const handleVerification = async () => {
        await emailVerification()
    }

    if (user) {
        return (
            <>
                <h1 className="text-2xl font-bold flex gap-x-4 items-center justify-center">
                    {auth.currentUser.photoURL ? (
                        <img
                            src={auth.currentUser.photoURL}
                            alt="avatar"
                            className="w-12 h-12 rounded-full "
                        />
                    ) : null}
                    Sayın {user.displayName}({user.email}) Hoşgeldiniz.
                </h1>
                <Link
                    to="/settings"
                    className="flex items-center justify-center h-8 rounded px-4 text-sm text-white bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg hover:font-bold"
                >
                    Ayarlar
                </Link>

                <button
                    onClick={handleLogout}
                    className="h-8 rounded px-4 text-sm text-white bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg hover:font-bold"
                >
                    Çıkış Yap
                </button>
                {!user.emailVerified && (
                    <button
                        onClick={handleVerification}
                        className="h-8 rounded px-4 text-sm text-white bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg hover:font-bold"
                    >
                        E-Posta Onayla
                    </button>
                )}
                <form className="flex gap-x-4 mt-4" onSubmit={submitHandle}>
                    <input
                        onChange={(e) => setTodo(e.target.value)}
                        type="text"
                        value={todo}
                        placeholder="Todo yaz"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={done}
                            onChange={(e) => setDone(e.target.checked)}
                        />
                        Tamamlandı Olarak İşaretleyiniz.
                    </label>

                    <button
                        disabled={!todo}
                        className="h-8 rounded px-4 text-sm text-white bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg hover:font-bold"
                    >
                        Ekle
                    </button>
                </form>
                {/** animasyonu eklemek için @formkit/auto-animate import edip ref={parent} yapınca nesneler animasyonlu çılıp kapanıyor */}
                <ul ref={parent} className="mt-4 flex flex-col gap-y-2">
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="flex justify-between items-center p-4 rounded bg-indigo-50 text-sm text-indigo-700"
                            >

                                <span className={`${todo.done ? `line-through` : ``}`}>
                                    {todo.todo}
                                </span>

                                {todo?.createdAt?.seconds && (
                                    <span>{dayjs.unix(todo.createdAt.seconds).fromNow()}</span>
                                )}

                                <div className="flex gap-x-2">
                                    <button
                                        onClick={() => modal("edit-todo-modal", todo)}
                                        className="h-7 rounded px-3 text-xs text-white bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg hover:font-bold"
                                    >
                                        Düzenle
                                    </button>
                                    <button
                                        onClick={() => handleDelete(todo.id)}
                                        className="h-7 rounded px-3 text-xs text-white bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg hover:font-bold"
                                    >
                                        Sil
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="text-center text-yellow-700">
                            Hiç Todo Eklemediniz!!
                        </li>
                    )}
                </ul>
            </>
        )
    }

    return (
        <>
            <div className="flex flex-col-1 justify-center items-center" >
                <h1 className="text-3xl font-black bg-indigo-500  text-white rounded">React Firebase Authentication Project</h1>


            </div>
            <div>
                <Link className="flex items-center justify-center h-8 rounded px-4 text-sm text-white bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg hover:font-bold m-2" to="/register">
                    <h1>Kayıt Ol</h1>
                </Link>

                <Link className="flex items-center justify-center h-8 rounded px-4 text-sm text-white bg-indigo-500 hover:bg-indigo-800 hover:shadow-lg hover:font-bold" to="/login">
                    <h1>Giriş Yap</h1>
                </Link>
            </div>
        </>
    )
}

export default Home
