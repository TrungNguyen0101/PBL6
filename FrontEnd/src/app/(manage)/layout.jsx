import { Overlay } from './components/Overlay';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/sidebar/Sidebar';

const style = {
  container: 'bg-gray-900 h-screen overflow-hidden relative',
  mainContainer: 'flex flex-col h-screen pl-0 w-full lg:pl-20 lg:space-y-4',
  main: 'h-screen overflow-auto  px-[30px] lg-py-0 py-[15px]',
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
