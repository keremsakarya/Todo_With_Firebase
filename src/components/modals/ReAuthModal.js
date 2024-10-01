import { reAuth } from "../../firebase"
import LoginForm from "../LoginForm"

export default function ReAuthModal({ close }) {
    const handleSubmit = async (e, password) => {
        e.preventDefault()

        await reAuth(password)
        close()
    }
    return (
        <div>
            <LoginForm handleSubmit={handleSubmit} noEmail={true} />
        </div>
    )
}
