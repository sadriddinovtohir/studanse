import { Button } from "@/components/ui/button";
import { loadState, saveState } from "@/config/storej";
import { Moon, Sun } from "lucide-react";
import React from "react";

export default function ThemeMode() {
  const [theme, setTheme] = React.useState(loadState("theme") || "dark");
  React.useEffect(() => {
    const body = document.body;
    if (theme == "dark") {
      body.classList.remove("light");
      body.classList.add("dark");
      saveState("theme", "dark");
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
      saveState("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };
  return (
    <div>
      <div className="flex items-center">
        <Button
          style={{ boxShadow: "0 0 10px rgba(128, 128, 128, 0.5)" }}
          variant="outline"
          onClick={toggleTheme}
          className={`
  border border-textColor
  flex items-center gap-2 px-4 py-2 rounded-md 
  bg-transparent text-textColor
  transition-transform duration-300
  hover:scale-105
`}
        >
          {theme === "light" ? (
            <>
              <Sun size={18} />
            </>
          ) : (
            <>
              <Moon size={18} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
