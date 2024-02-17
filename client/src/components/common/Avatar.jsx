import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";

function Avatar({ type, image, setImage }) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setisContextMenuVisible] = useState(false);
  const [constextMenuCordinates, setisContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [grabPhoto, setGrabPhoto] = useState(false)
  const [showPhotoLibrary, setshowPhotoLibrary] = useState(false)

  const showContextMenu = (e) => {
    e.preventDefault();
    setisContextMenuVisible(true);
    setisContextMenuCordinates({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    if(grabPhoto){
      const data = document.getElementById("photo-picker");
      data.click()
      document.body.onfocus = (e) =>{
        setTimeout(() => {
          setGrabPhoto(false)
          
        }, 1000)
      }
    }
  }, [grabPhoto])
  

  const contextMenuOptions = [
    { 
      name: "Take Photo",
      callback: () => {}
    },

    { 
      name: "Chose From Library",
      callback: () => {
      setshowPhotoLibrary(true)
      } 
    },

    { 
      name: "Upload Photo",
      callback: () => {
      setGrabPhoto(true)
      }
    },
    { 
      name: "Remove Photo",
      callback: () => {
      setImage("/default_avatar.png")
      }
    }
  ];

    

  const photoPickerChange = async (e) => {

    const file = e.target.files[0];

    const reader = new FileReader();

    const data = document.createElement("img");

    reader.onload = function ( event ) {

      data.src = event.target.result

      data.setAttribute("data-src", event.target.result)
      
    }

    reader.readAsDataURL(file)
    
    setTimeout(() => {
      console.log(data.src)
      setImage(data.src)
      
    }, 1000)

  }

  return (
    <>
      <div className="flex items-center justify-center ">
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "xl" && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center flex-col justify-center rounded-full gap-2 ${
                hover ? "visible" : "hidden"
              }`}
              onClick={(e) => showContextMenu(e)}
              id="context-opener"
            >
              <FaCamera
                onClick={(e) => showContextMenu(e)}
                className="text-2xl"
                id="context-opener"
              />
              <span id="context-opener" onClick={(e) => showContextMenu(e)}>
                Change
                <br />
                Profile
                <br />
                Photo
              </span>
            </div>
            <div className="flex items-center justify-center h-60 w-60">
              <Image src={image} alt="avatar" className="rounded-full" fill />
            </div>
          </div>
        )}
        {isContextMenuVisible && (
          <ContextMenu
            option={contextMenuOptions}
            cordinates={constextMenuCordinates}
            setContextMenu={setisContextMenuVisible}
            ContextMenu={isContextMenuVisible}
          />
        )}
        {showPhotoLibrary && (
          <PhotoLibrary
          setImage={setImage}
          hidePhotoLibrary={setshowPhotoLibrary}
          />

        )}
        {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
      </div>
    </>
  );
}

export default Avatar;
