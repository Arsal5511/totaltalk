import Image from "next/image";
import React from "react";

function ChatContainer() {
  return (
    <div className=" bg-chat-background opacity-5  h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className=" bg-fixed   fixed left-0 top-0 z-0">
        <div className="flex flex-col justify-end w-full gap-1 overflow-auto">

        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
