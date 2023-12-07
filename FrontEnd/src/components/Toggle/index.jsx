import React, { useEffect } from 'react';
import { toggleDarkMode } from '@/redux/reducers/globalReducer';
import { useSelector, useDispatch } from 'react-redux';
import useDarkMode from '@/hooks/useDarkMode';

const Toggle = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const globalOptions = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    dispatch(toggleDarkMode(!globalOptions));
  };
  useEffect(() => {
    dispatch(toggleDarkMode(darkMode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`w-[60px] h-[30px] rounded-2xl cursor-pointer ${
        globalOptions
          ? 'bg-[#6d4eec] border-transparent p-[1px]'
          : 'bg-white border border-black p-[1px]'
      }`}
      onClick={handleToggleDarkMode}
    >
      <div
        className={`w-[27px] h-[27px] bg-[#ccc] rounded-full transition-all ${
          globalOptions ? 'translate-x-[30px] bg-white' : ''
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
