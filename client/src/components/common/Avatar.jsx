import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";


function Avatar({ type, image, setImage }) { //props passed from parent


  // useStates
  const [hover, setHover] = useState(false); //when hover over avatar set state to true
  const [isContextMenuVisible, setisContextMenuVisible] = useState(false); 
  const [constextMenuCordinates, setisContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [grabPhoto, setGrabPhoto] = useState(false)
  const [showPhotoLibrary, setshowPhotoLibrary] = useState(false)
  const [capturePhoto, setCapturePhoto] = useState(false)

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
  

  //on clicking avatar an opion list will be shown
  const contextMenuOptions = [
    { 
      name: "Take Photo",
      callback: () => {
        setCapturePhoto(true)
      }
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

    

  // function to upload photo from gallery or device
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

        {/* for small image */}
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}

        {/* for large image */}
        {type === "lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}


        {/* for extra large image */}
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
              {/* camera icon  */}
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
        
        {/* option list or context menu will be shown */}
        {isContextMenuVisible && (
          <ContextMenu
            option={contextMenuOptions}
            cordinates={constextMenuCordinates}
            setContextMenu={setisContextMenuVisible}
            ContextMenu={isContextMenuVisible}
          />
        )}

        {/* Photo Library will be shown */}
        {showPhotoLibrary && (
          <PhotoLibrary
          setImage={setImage}
          hidePhotoLibrary={setshowPhotoLibrary}
          />

        )}

        {/* Photo Picker */}
        {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}



        {/* Photo Picker */}
        {capturePhoto && <CapturePhoto hide={setCapturePhoto}  setImage={setImage} />}
      </div>
    </>
  );
}

export default Avatar;
