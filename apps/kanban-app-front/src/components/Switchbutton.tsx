import { useState } from 'react';
import useDarkTheme from '../hooks/useDarkTheme';
import SunSvg from '../assets/icon-light-theme.svg';
import MoonSvg from '../assets/icon-dark-theme.svg';

function SwitchButton() {
  const [colorTheme, setTheme] = useDarkTheme();

  console.log(colorTheme);

  const [dark, setDark] = useState(colorTheme === 'light' ? true : false);

  const toggleDarkTheme = (
    checked: React.InputHTMLAttributes<HTMLInputElement>
  ): void => {
    setDark(!checked);

    console.log(checked);

    setTheme(colorTheme);
  };

  return (
    <div className="fixed bottom-10 mx-auto my-4 ml-2 mt-auto flex h-12 w-[15%] justify-center rounded-lg bg-secondary-gray pl-3">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={dark}
          onChange={() => {
            setTheme(colorTheme);
            setDark(!dark);
          }}
        />
        <div className="dark:peer-focus:ring-app-midnight after:bg-app-violet peer h-6 w-11 rounded-full bg-primary after:absolute after:left-[4px] after:top-[3px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:transition-all after:content-[''] after:hover:bg-primary peer-checked:bg-primary peer-checked:after:translate-x-5 peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 md:after:left-[5px] md:after:top-[15px] dark:border-gray-600 dark:bg-gray-700"></div>
        <span className="absolute -left-10 ml-3 text-sm font-medium text-white dark:text-gray-300">
          <img src={SunSvg} alt="sun" />
        </span>
        <span className="ml-3 text-sm font-medium text-white dark:text-gray-300">
          <img src={MoonSvg} alt="moon" />
        </span>
      </label>
    </div>
  );
}

export default SwitchButton;
