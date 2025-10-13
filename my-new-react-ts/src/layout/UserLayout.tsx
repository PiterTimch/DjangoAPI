import { Link, Outlet, useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../store";
import { clearTokens } from "../store/authSlice";
import {APP_ENV} from "../env";

const UserLayout: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearTokens());
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="w-full py-4 px-6 bg-gray-500 text-white shadow-md flex justify-between items-center">
                <div className="hidden items-center gap-4 lg:flex">
                    <Link to="/" className="text-xl font-semibold">
                        PDA Test
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="flex items-center gap-3">
                                {user.image && (
                                    <img
                                        src={APP_ENV.IMAGE_BASE_URL + user.image}
                                        alt={user.username}
                                        className="w-8 h-8 rounded-full border border-white"
                                    />
                                )}
                                <div className="flex flex-col leading-tight">
                                    <span className="font-medium">{user.username}</span>
                                    <span className="text-xs text-gray-200">{user.email}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
                            >
                                Вихід
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-white text-gray-500 px-4 py-2 rounded hover:bg-gray-100 transition"
                            >
                                Вхід
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-gray-500 px-4 py-2 rounded hover:bg-gray-100 transition"
                            >
                                Реєстрація
                            </Link>
                        </>
                    )}
                </div>
            </header>

            <main className="flex-1 p-6">
                <Outlet />
            </main>

            <footer className="w-full py-3 px-6 bg-gray-100 text-sm text-center">
                © 2025 PDA (Python Django API) Test. Усі права захищено.
            </footer>
        </div>
    );
};

export default UserLayout;
