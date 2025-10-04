import { BrowserRouter as Router, Route, Routes } from "react-router";
import UserLayout from "./layout/user/UserLayout.tsx";
import RegisterPage from "./pages/account/Register";
import HomePage from "./pages/account/Home";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<UserLayout />}>

                        <Route index element={<HomePage />} />
                        <Route path="registration" element={<RegisterPage />} />

                    </Route>

                </Routes>
            </Router>
        </>

    )
}

export default App;
