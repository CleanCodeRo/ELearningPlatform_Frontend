import state from "./Atom";
import { useAtom } from "jotai";
import { useState } from "react";

const ProfileAndEditPage = () => {
    const [user, setUser] = useAtom(state.user);
    const [selectedImage,setSelectedImage] = useState("")

  //   const handleUpload = (e) => {
  //     console.log(e.target.files[0]);
  //   };

  return (
    <div className="">
      <div className="container mx-auto py-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-4">
              Profile of {user.username}
            </h1>
            <button>
              <label className="cursor-pointer">
                <img
                  src="/images/noprofilepicture.png"
                  alt="Profile Picture"
                  className="w-48 h-48 rounded-xl mx-auto md:mx-0 mb-4"
                  
                />
                <input
                  id="profilePictureInput"
                  type="file"
                  className="hidden"
                  //   onChange={handleFileInputChange}
                />
              </label>
            </button>
            <div>
              <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none">
                Upload Image
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <table className="table-auto text-xl ">
              <tbody className="border-2 border-black">
                <tr className="">
                  <td className="font-inter ">Username:</td>
                  <td>{user.username}</td>
                </tr>
                <tr className="">
                  <td className="font-inter">First Name:</td>
                  <td>{user.firstName}</td>
                </tr>
                <tr className="">
                  <td className="font-inter">Last Name:</td>
                  <td>{user.lastName}</td>
                </tr>
                <tr className="">
                  <td className="font-inter">Email:</td>
                  <td>{user.email}</td>
                </tr>
                <tr className="">
                  <td className="font-inter">Address:</td>
                  <td>{user.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="border-4 bg-blue-400 text-white rounded-xl">
            Edit your profile
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileAndEditPage;
