import { useState } from "react";

import Home from "@/views/Home";
import ThemeContext from "@/contexts/ThemeContext";

const isSystemDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

function App() {
  const [themeClass, setThemeClass] = useState<"dark" | "light">(
    isSystemDarkMode ? "dark" : "light"
  );

  return (
    <ThemeContext.Provider value={{ themeClass, setThemeClass }}>
      <div className={themeClass}>
        <Home />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
