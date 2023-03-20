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
      className="h-5 w-5"
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
      className="h-5 w-5"
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
          className="peer sr-only"
        />
        <div
          onClick={() => setThemeClass(isToggled ? "light" : "dark")}
          className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"
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
    <div className="flex w-full justify-center border-b border-b-neutral-200 py-4">
      <div className="flex w-[909px] items-center justify-between px-6 text-xl font-bold">
        <div>Chess Activity Vis</div>
        <Toggle />
      </div>
    </div>
  );
};

export default Navbar;
