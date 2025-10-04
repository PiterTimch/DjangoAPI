import {Link, Outlet} from "react-router";

const UserLayout: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col bg-white ">
            <header className="w-full py-4 px-6 bg-gray-500 text-white shadow-md flex justify-between">
                <div className="hidden items-center gap-4 lg:flex">
                    <Link to="/" className="text-xl font-semibold">PDA Test</Link>
                </div>

                <div className="flex items-center gap-4">

                    <Link
                        to="login"
                        className="bg-white text-gray-500 px-4 py-2 rounded hover:bg-gray-100 transition"
                    >
                        Вхід
                    </Link>

                    <Link
                        to="registration"
                        className="bg-white text-gray-500 px-4 py-2 rounded hover:bg-gray-100 transition"
                    >
                        Реєстрація
                    </Link>
                </div>

            </header>

            <main className="flex-1 p-6">
                <Outlet />
            </main>

            <footer className="w-full py-3 px-6 bg-gray-100 text-sm text-center">
                © 2025 PDA(Python Django Api) Test. Усі права захищено.
            </footer>
        </div>
    );
};

export default UserLayout;
