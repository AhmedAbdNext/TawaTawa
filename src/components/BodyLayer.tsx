interface LayoutType {
    children: React.ReactNode
}

const BodyLayer = ({ children }: LayoutType) => {
    return (
        <div className="container mx-auto">
            <div className="mx-auto py-8 px-4 sm:px-6 w-full max-w-7xl bg-transparent">
                <div className="mx-auto sm:max-w-2xl lg:max-w-none">
                    <div className="mt-6">
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