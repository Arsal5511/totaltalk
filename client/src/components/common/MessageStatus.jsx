import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus() {
  return <>
  {MessageStatus === 'sent' && <BsCheck className="text-lg" />}
  {MessageStatus === 'delivered' && <BsCheckAll className="text-lg" />}
  {MessageStatus === 'read' && <BsCheck className="text-lg text-icon-ack" />}
  </>;
}

export default MessageStatus;
