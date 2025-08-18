import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    theme: "light" | "dark" | "system";
    setTheme: (theme: "light" | "dark" | "system") => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const isValidTheme = (theme: string) => {
    return theme === "light" || theme === "dark" || theme === "system";
};
const getTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
        return "system";
    }

    return isValidTheme(savedTheme) ? savedTheme : "system";
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<"light" | "dark" | "system">(getTheme());

    const update_UI_Theme = () => {
        const classList = document.documentElement.classList;
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";

        if (
            theme === "dark" ||
            (theme === "system" && systemTheme === "dark")
        ) {
            classList.add("dark");
        } else {
            classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    };

    useEffect(() => {
        update_UI_Theme();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    // listens for system theme changes
    useEffect(() => {
        if (theme !== "system") return;

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = () => update_UI_Theme();
        media.addEventListener("change", handleSystemThemeChange);

        return () => {
            media.removeEventListener("change", handleSystemThemeChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
