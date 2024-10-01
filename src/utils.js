import store from "./store"
import { login } from "./store/auth"
import { closeModal, openModal } from "./store/modal"
import { auth } from "./firebase"

export const modalClose = () => {
    store.dispatch(closeModal())
}
export const modal = (name, data = false) => {
    store.dispatch(openModal({
        name, data
    }))
}
export const setUserData = () => {
    store.dispatch(login({
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        uid: auth.currentUser.uid,
    }))
}