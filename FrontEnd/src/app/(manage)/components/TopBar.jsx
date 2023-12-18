'use client';
import { toggleMenu } from '@/redux/reducers/menuReducer';
import { useDispatch } from 'react-redux';

export function TopBar() {
  const dispatch = useDispatch();
  return (
    <header className="relative z-10 items-center ">
      <div className="relative z-10 flex flex-col justify-center h-full px-3 mx-auto text-black bg-[#90e0ef] py-[4px]">
        <div className="relative flex items-center w-full pl-1 sm:ml-0 sm:pr-2">
          <div className="relative flex items-center w-12 h-full group">
            <button
              type="button"
              aria-expanded="false"
              aria-label="Toggle sidenav"
              onClick={() => dispatch(toggleMenu())}
              className="text-4xl text-black focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"
                />
              </svg>
            </button>
          </div>
          <div className="container relative left-0 flex w-3/4 ">
            <div className="relative items-center hidden w-full ml-8 group md:flex lg:w-72">
              <div className="absolute flex items-center justify-center w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                <svg
                  fill="none"
                  className="relative w-5 h-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="black"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          {/* <div className="relative flex items-center justify-end w-full p-1 ml-5 sm:right-auto sm:mr-0">
            <a href="#" className="block pr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </a>
            <a href="#" className="block pr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
            <a href="#" className="relative block pr-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </a>
            <a href="#" className="relative block">
              <img
                alt="Maurice Lokumba"
                src="/images/jsx.png"
                className="object-cover w-10 h-10 mx-auto rounded-full"
              />
            </a>
          </div> */}
        </div>
      </div>
    </header>
  );
}
