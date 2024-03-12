import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";

function ContactsList() {
  const [{}, dispatch] = useStateProvider();

  const [allContacts, setAllContacts] = useState([]);


  useEffect(() => {
    alert('in effect')
    const getContacts = async () => {
      try {

        const  {data:{users}}  = await axios.get(GET_ALL_CONTACTS);

        alert('in try catch')
        console.log(users)
        setAllContacts(users);

      } catch (err) {

        console.log(err);

      }
    };

    getContacts();

  }, []);

  return (
    <div className="h-full flex flex-col">

      {/* icon of arrowback to go to chat list page from contacts  */}
      <div className="h-24 flex items-end px-3 py-4 ">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() =>
              dispatch({
                type: reducerCases.SET_ALL_CONTACTS_PAGE,
                contactsPage: false,
              })
            }
          />
          <span>New Chat</span>
        </div>
      </div>

      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
              {/* search bar in chat to search for contacts  */}
        <div className="flex py-3 items-center gap-3 h-14">

          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
            {/* Search icon  */}
            <div>

              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-lg" />

            </div>
              {/* input  */}
            <div>

              <input
                type="text"
                placeholder="Search Contacts"
                className="bg-transparent text-sm focus:outline-none text-white w-full"
              />

            </div>

          </div>

        </div>

              {/* maping of contacts in chatlist */}
        {Object.entries(allContacts).map(([initialLetter, userList ]) => {
            return (
              <div key={Date.now() + initialLetter}>
                <div className="text-teal-light pl-10 pr-5">
                  {initialLetter}

                </div>
              </div>
              )
          })
        }
      </div>
    </div>
  );
}

export default ContactsList;
