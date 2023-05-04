import React from "react";
import ReactDOM from "react-dom/client";

import {App} from "./App";
import {DarkModeContextProvider, AuthContextProvider} from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <DarkModeContextProvider>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </DarkModeContextProvider>
    </React.StrictMode>
);
