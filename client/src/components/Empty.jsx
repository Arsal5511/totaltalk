import Image from "next/image";
import React from "react";

function Empty() {
  return( 
  <div className="border-conversation-border border-1 w-full h-[100vh] bg-panel-header-background flex flex-col border-b-4 border-b-icon-green items-center justify-center ">
    <Image src="/whatsapp.gif" alt="whatsapp" width={300} height={300} />

  </div>);}

export default Empty;
