import { useTheme } from "../providers/ThemeProvider";
import { useLocation } from "react-router-dom";
import { LuSun, LuMoon} from "react-icons/lu";
import { pageTitles } from "../models/pageTitles";

export const TopBar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const title = pageTitles[location.pathname] || "Recipe Book";

  return (
    <header className="flex items-center justify-between sticky top-0 gap-4 bg-white px-4 py-3 shadow-sm border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">

      <div className="flex flex-col gap-1">
        <h1 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-50">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 rounded-full border px-3 py-[6px] text-xs transition
            border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100
            dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {theme === "dark" ? <LuSun size={14} /> : <LuMoon size={14} />}
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
};
