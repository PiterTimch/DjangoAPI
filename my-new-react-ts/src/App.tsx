import './App.css'
import UsersListPage from "./pages/users/UsersListPage";
import {Route, Routes} from "react-router";
import UserRegisterPage from "./pages/users/UserRegisterPage";
import UserLoginPage from "./pages/users/UserLoginPage";


function App() {

    return (
        <>
            <Routes>
                <Route path="/" >
                    <Route index element={<UsersListPage />}/>
                    <Route path={"register"} element={<UserRegisterPage />}/>
                    <Route path={"login"} element={<UserLoginPage />}/>
                </Route>
            </Routes>

        </>
    )
}

export default App
