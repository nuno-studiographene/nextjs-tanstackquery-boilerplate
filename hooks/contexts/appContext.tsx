import { createContext, useContext, useState, ReactNode } from "react";

// Define allowed types
type Theme = "light" | "dark" | "white";
type Language = "en" | "es" | "fr";

// Define the shape of the context
interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleTheme?: () => void; // optional toggle if you want both
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Optional: toggle between two themes only
  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{ theme, setTheme, toggleTheme, language, setLanguage }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easier usage
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
