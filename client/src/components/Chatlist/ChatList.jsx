import React, { useEffect, useState } from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";
import { useStateProvider } from "@/context/StateContext";
import ContactsList from "./ContactsList";

function ChatList() {
  const [{ contactsPage }] = useStateProvider();
  const [pageType, setPageType] = useState("default");

  // rendering of contacts on chat list
  useEffect(() => {
    if (contactsPage) {
      setPageType("all-contacts");
    } else {
      setPageType("default");
    }
  }, [contactsPage]);

  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20 ">
      {pageType === "default" && (
        <div>
          <ChatListHeader />
          <SearchBar />
          <List />
        </div>
      )}
      {pageType === "all-contacts" && <ContactsList />}
    </div>
  );
}

export default ChatList;
