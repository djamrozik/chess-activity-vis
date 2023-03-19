import { useContext } from "react";

import ThemeContext from "@/contexts/ThemeContext";

const ToggleSunIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
};

const ToggleMoonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const Toggle = () => {
  const { themeClass, setThemeClass } = useContext(ThemeContext);
  const isToggled = themeClass === "dark";

  return (
    <div className="flex items-center">
      <span className="mr-3 text-gray-600 dark:text-neutral-100">
        <ToggleSunIcon />
      </span>
      <label className="relative inline-flex cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={isToggled}
          className="sr-only peer"
        />
        <div
          onClick={() => setThemeClass(isToggled ? "light" : "dark")}
          className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
        ></div>
      </label>
      <span className="ml-3 text-gray-600 dark:text-neutral-100">
        <ToggleMoonIcon />
      </span>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="w-full border-b border-b-neutral-200 py-4 flex justify-center">
      <div className="w-[839px] font-bold text-xl flex justify-between items-center px-6">
        <div>Chess Activity Vis</div>
        <Toggle />
      </div>
    </div>
  );
};

export default Navbar;
