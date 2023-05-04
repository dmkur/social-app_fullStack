import "./style.scss";
import {Home, Login, Profile, Register} from "./pages";
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import {NavBar} from "./components/navbar/NavBar";
import {LeftBar} from "./components/leftBar/LeftBar";
import {RightBar} from "./components/rightBar/RightBar";
import {useContext} from "react";
import {AuthContext, DarkModeContext} from "./context";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'

const App = () => {
    const {currentUser} = useContext(AuthContext);
    // useContext(DarkModeContext) - обираємо який контекс використати1
    const {darkMode} = useContext(DarkModeContext);
    const queryClient = new QueryClient()

    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <div className={`theme-${darkMode ? "dark" : "light"}`}>
                    <NavBar/>
                    <div style={{display: "flex"}}>
                        <LeftBar/>
                        <div style={{flex: 6}}>
                            <Outlet/>
                        </div>
                        <RightBar/>
                    </div>
                </div>
            </QueryClientProvider>
        );
    };

    const ProtectedRoute = ({children}) => {
        if (!currentUser) {
            return <Navigate to={"/login"}/>;
        }

        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout/>
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Home/>,
                },
                {
                    path: "/profile/:id",
                    element: <Profile/>,
                },
            ],
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
    ]);

    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
};

export {App};
