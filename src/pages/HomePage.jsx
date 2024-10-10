import { Outlet } from "react-router-dom";
import NavigationBar from "../components/navbar/NavigationBar";

const HomePage = () => {
    return (
        <>
            <NavigationBar />
            <main className="relative min-h-screen w-full bg-slate-950">
                <div className="max-w-screen-xl mx-auto">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
                    <Outlet />
                </div>
            </main>
        </>
    )
}
export default HomePage;