// import { useDashboardContext } from "./Provider";
'use client';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../../../../redux/reducers/menuReducer';

// The overlay will only be visible on small screens to emphasize the focus on Sidebar when it is open.
export function Overlay() {
  const collapsed = useSelector((state) => state.menu.collapsed);

  const dispatch = useDispatch();
  // const { sidebarOpen, closeSidebar } = useDashboardContext();
  return (
    <div
      onClick={() => dispatch(toggleMenu())}
      className={
        collapsed
          ? 'fixed left-0 top-0 z-30 h-screen w-screen bg-black opacity-40 lg:bg-transparent'
          : ''
      }
    />
  );
}
