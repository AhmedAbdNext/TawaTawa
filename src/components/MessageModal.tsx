const MessageModal = ({closeModal, status, message}) => {
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
            {/*content*/}
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                    <h3 className={ status === "Success"? "text-green-500 ": "text-red-500 " + " text-3xl font-semibold "}>
                        {status === "Success" ? "Succès" : "Erreur"
                        }
                    </h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => closeModal()}
                    >
                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                        </span>
                    </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        {
                            message
                        }
                    </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                    <button
                        className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-green-500 rounded shadow outline-none active:bg-green-600 hover:shadow-lg focus:outline-none"
                        type="button"
                        onClick={() => closeModal()}
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default MessageModal;