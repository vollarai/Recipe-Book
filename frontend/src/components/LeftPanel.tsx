import { NavLink, useNavigate } from "react-router-dom";
import { LuBookOpen, LuPlus, LuStar, LuHeart, LuUtensils, LuUser, LuLogOut } from "react-icons/lu";
import { useUser } from "../providers/UserContext";

export const LeftPanel = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const username = user?.userName;

  const handleLogout = () => {
    logout();        
    navigate("/"); 
  };
  
  return (
    <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-slate-50 p-6 gap-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-xl">
          <LuUtensils size={20} className="text-white" />
        </div>
        <div>
          <div className="text-lg font-semibold tracking-tight">RecipeBook</div>
        </div>
      </div>

      <nav className="flex flex-col gap-2 text-sm">
        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg px-3 py-2 ${
              isActive
                ? "bg-slate-800"
                : "hover:bg-slate-800/70"
            }`
          }
        >
          <LuBookOpen size={18} />
          <span>My recipes</span>
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg px-3 py-2 ${
              isActive
                ? "bg-slate-800"
                : "hover:bg-slate-800/70"
            }`
          }
        >
          <LuPlus size={18} />
          <span>Add recipe</span>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg px-3 py-2 ${
              isActive
                ? "bg-slate-800"
                : "hover:bg-slate-800/70"
            }`
          }
        >
          <LuHeart size={18} />
          <span>Favorites</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg px-3 py-2 ${
              isActive
                ? "bg-slate-800"
                : "hover:bg-slate-800/70"
            }`
          }
        >
          <LuStar size={18} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="mt-auto">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <LuUser size={18} className="text-slate-300" />
            <span className="text-base font-semibold text-slate-100">
              {username}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="
              flex items-center gap-2
              text-sm font-medium
              text-slate-400 hover:text-red-300 
              transition
            "
          >
            <LuLogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
