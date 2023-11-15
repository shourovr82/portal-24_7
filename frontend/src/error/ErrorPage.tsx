import { Popover, Whisper } from "rsuite";
import codeQuiversLogo from "../assets/logo/CodeQuivers.png";
import portalLogo from "../assets/logo/portal-logo.png";
import notFoundImg from "../assets/not-found/404.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="select-none">
      <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
        <div className="flex-1 min-h-full min-w-full rounded-3xl bg-[#e7f8ff] shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
          <div className="w-full md:w-1/2">
            <div className="mb-10 lg:mb-10">
              <div className="flex items-center gap-5">
                <img className="w-20" src={portalLogo} alt="" />
                <h2 className="text-5xl font-black uppercase text-[#0582c1]">
                  Portal 247
                </h2>
              </div>
            </div>
            <div className="mb-10 md:mb-20 text-gray-600 ">
              <h1 className="font-black uppercase text-3xl lg:text-5xl text-[#86c6fc] mb-10">
                You seem to be lost!
              </h1>
              <p className="font-Playpen text-[#3a7aaf]">
                The page you're looking for isn't available.
              </p>
              <p className="font-Playpen text-[#3895aa]">
                Try searching again or use the Go Back button below.
              </p>
            </div>
            <div className="mb-20 md:mb-0">
              <button className="text-lg  font-bold !border-[2px] hover:bg-[#0582c1] hover:text-white/75 font-Inter !border-[#0582c1] uppercase outline-none  transform transition-all duration-300 ease-in-out  px-5 py-1 rounded-full text-[#0582c1]">
                <Link to="/">Go Back</Link>
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img className="object-contain" src={notFoundImg} alt="" />
          </div>
        </div>
        <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
        <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
      </div>

      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <Whisper
            placement="left"
            speaker={<Popover>Developed By CodeQuivers</Popover>}
          >
            <a
              href="https://codequivers.com/"
              target="_blank"
              className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
            >
              <img
                className="object-contain  bg-white w-full h-full rounded-full"
                src={codeQuiversLogo}
              />
            </a>
          </Whisper>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
