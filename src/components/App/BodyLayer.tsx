interface LayoutType {
    children: React.ReactNode
    hasNoBackGround?: boolean
}

const BodyLayer = ({ children, hasNoBackGround }: LayoutType) => {
    const mClass = hasNoBackGround ? 'bg-transparent ' :
    'bg-white ' + " x-auto py-8 px-4 sm:px-6 w-full max-w-8xl bg-transparen p-4 rounded-lg shadow-md"
    return (
        <div className="container mx-auto">
            <div className={mClass}>
                <div className="mx-auto sm:max-w-2xl lg:max-w-none bg">
                    <div className="mt-3">
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BodyLayer