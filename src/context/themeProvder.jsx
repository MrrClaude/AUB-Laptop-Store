import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light"
    );

    const toggle = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        localStorage.setItem("theme", theme)

        document.documentElement.classList.remove("light", "dark")
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.add("light")
        }
    }, [theme]);


    return <ThemeContext.Provider value={{ theme,toggle }}>{children}</ThemeContext.Provider>
}


export default ThemeContext;