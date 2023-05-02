const LoadingModal = () => {
    return (<div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
            {/*content*/}
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                    <h3 className="text-3xl font-semibold">
                        Chargement
                    </h3>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                    {/* Add Spinner*/}
                    <div className="flex items-center justify-center">
                        <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                    </div>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Veuillez patienter pendant que nous enregistrons votre commande
                    </p>
                </div>
            </div>
        </div>
    </div>)
}

export default LoadingModal;