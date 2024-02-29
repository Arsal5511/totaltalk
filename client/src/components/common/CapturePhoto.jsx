import React from "react";
import { IoClose } from "react-icons/io5";


function CapturePhoto({hide, setImage}) {
  return (
    <>
        <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex items-center justify-center " >
          <div className="flex flex-col gap-4 w-full">
            <div className=" pt-2  pr-2 cursor-pointer flex items-end justify-end "  onClick={() => hide(false)}>
              <IoClose className=" h-10 w-10 " />
            </div>
            <div className="flex"></div>
          </div>
        </div>
   </>

)}

export default CapturePhoto;
