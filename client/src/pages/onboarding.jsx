import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import React from "react";

function onboarding() {
  const [{userInfo}] = useStateProvider()
  return (
  <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center ">
    <div className="flex items-center justify-center gap-2 ">
      <Image src='/whatsapp.gif' alt="whatsapp" height={300} width={300} priority />
      <span className="text-7xl" >Whatsapp</span>
    </div>
    <h2 className="text-2xl">Create your Profile</h2>
    <div className="flex gap-6 mt-6">
      <div className="flex flex-col items-center justify-center mt-5 gap-6  ">
        {userInfo?.name ? <h2 className="text-2xl">Welcome {userInfo?.name}</h2> : <h2 className="text-2xl">Welcome</h2>}
      </div>
    </div>

  </div>
  );
}

export default onboarding;
