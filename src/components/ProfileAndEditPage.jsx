import { useAtom } from "jotai";
import React from "react";
import { useState, useEffect } from "react";
import state, { getUserWithToken } from "./ReusableComponents/Atom";

const ProfileAndEditPage = () => {
  const cloud_name = "dpsgzmpez";
  const preset_key = "elearning";

  const [image, setImage] = useState("");
  const [user, setUser] = useAtom(state.user);
  const [completedLessons, setCompletedLessons] = useAtom(
    state.completedLessons
  );
  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks);
  const [completedModules, setCompletedModules] = useAtom(
    state.completedModules
  );

  // const handleFile = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("uploadPreset", preset_key);

  //   fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // };
  // console.log(image);

  const handleImageUpload = async () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: cloud_name,
        uploadPreset: preset_key,
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          setImage(await result.info["secure_url"]);
        }
      }
    );
  };

  console.log(image);

  useEffect(() => {
    if (!user) {
      getUserWithToken(
        localStorage.getItem("ELearningToken"),
        setUser,
        setCompletedLessons,
        setCompletedWeeks,
        setCompletedModules
      );
      console.log("User received use effect");
    }
  }, []);

  console.log(user);

  return (
    <div className="flex  justify-center items-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">My Profile</h1>
          <button
            className="bg-blue-500 text-white"
            type="button"
            onClick={handleImageUpload}
          >
            Select your image
          </button>
        </div>

        <div>
          {/* <h1 className="text-xl font-semibold">My profile</h1> */}
          {user ? (
            <div className="text-center">
              <h2>Username: {user.username}</h2>
              <h2>Firstname: {user.firstName}</h2>
              <h2>Lastname: {user.lastName}</h2>
              <h2>Your rank points: {user.rankPoints}</h2>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow">
                Edit
              </button>
            </div>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileAndEditPage;
