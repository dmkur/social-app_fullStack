import {createContext, useEffect, useState} from "react";

const DarkModeContext = createContext();

const DarkModeContextProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(
        // || - озн. якщо відсутнє значення (напр перше відвідування сайту)
        // то localStorage порожній, відповідно застосується наступне значення яке ми вказали, тобто false
        JSON.parse(localStorage.getItem("darkMode") || false)
        // без JSON отримуємо стрінгу замість boolean
    );

    const toggle = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        // сетаємо ключ darkMode із значенням darkMode(false- див 7 рядок)
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);
    // в залежність ставимо darkMode щоб при зміні ми сетали нове значення в сховище

    return (
        // тут ми через Provider вказуємо що повертаємо
        // darkMode - щоб тема змінювалась відносно даного значення
        // toggle - щоб змінювати значення darkMode
        <DarkModeContext.Provider value={{darkMode, toggle}}>
            {children}
        </DarkModeContext.Provider>
    );
};

export {DarkModeContext, DarkModeContextProvider};
