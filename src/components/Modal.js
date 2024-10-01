import modals from "../modals"
import { Dialog, DialogPanel, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { modalClose } from "../utils"

export default function Modal({ name, data }) {
    const currentModal = modals.find(m => m.name === name)

    const [isOpen, setIsOpen] = useState(true)

    const closeModal = () => {
        setIsOpen(false)
        setTimeout(modalClose(), 200)
    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <currentModal.element close={closeModal} data={data} />
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}