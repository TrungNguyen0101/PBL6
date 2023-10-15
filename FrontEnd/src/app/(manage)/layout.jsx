import { Overlay } from './components/Overlay';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/sidebar/Sidebar';

const style = {
  container: 'bg-gray-900 h-screen overflow-hidden relative',
  mainContainer: 'flex flex-col h-screen pl-0 w-full lg:pl-20 lg:space-y-4',
  main: 'h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-[25px]',
};

function LayoutAdmin({ children }) {
  return (
    <div className={style.container}>
      <div className="flex items-start">
        <Overlay />
        <Sidebar mobileOrientation="end" />
        <div className={`${style.mainContainer} bg-white `}>
          <TopBar />
          <main className={style.main}>{children}</main>
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin;
