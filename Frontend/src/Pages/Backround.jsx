const Bg = ({children}) => {
    return (
        <div className="h-screen w-screen bg-cover bg-center bg-[url('/bg.jpg')]">{children}</div>
    );
}

export default Bg;