import React from "react";

export type ThemeMode = "light" | "dark";

export const ThemeContext = React.createContext<{
    theme: ThemeMode;
    toggleTheme: () => void;
}>({
    theme: "dark",
    toggleTheme: () => {},
});


