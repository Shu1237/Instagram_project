import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const Darkmode = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark" || 
               (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="flex items-center">
            
            <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300"
            >
                {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-800" />}
            </button>
        </div>
    );
};

export default Darkmode;
