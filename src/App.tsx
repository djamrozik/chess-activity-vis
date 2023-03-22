import { useState } from "react";

import Home from "@/views/Home";
import ThemeContext from "@/contexts/ThemeContext";

function App() {
  const [themeClass, setThemeClass] = useState<"dark" | "light">("dark");

  return (
    <ThemeContext.Provider value={{ themeClass, setThemeClass }}>
      <div className={`h-full ${themeClass}`}>
        <Home />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
