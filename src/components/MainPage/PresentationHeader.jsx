import { Popover, PopoverHandler, Button } from "@material-tailwind/react";

const PresentationHeader = () => {
  return (
    <div id="PresentationHeader" className="bg-gray-250 px-[6rem] font-inter">
      <div className="flex justify-between items-center">
        <img className="w-28" src="/images/CleanCode-removebg-preview.png" />
        <div className="flex space-x-1.5">
          <div className="w-64 ">
            <div className="relative h-10 min-w-[200px] ">
              <input
                type="text"
                placeholder="Username"
                className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>
          <div className="w-64">
            <div className="relative h-10 min-w-[200px] ">
              <input
                type="password"
                placeholder="Password"
                className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>
          <Popover>
            <PopoverHandler>
              <Button id="loginHeader" className="bg-fourth">Login</Button>
            </PopoverHandler>
          </Popover>
        </div>
      </div>
    </div>
  );
};
export default PresentationHeader;
