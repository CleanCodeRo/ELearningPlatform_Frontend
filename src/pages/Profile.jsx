import { useEffect, useRef, useState } from "react";
import CostumInput from "../components/ReusableComponents/CostumInput";
import { useAtom } from "jotai";
import state, { getUserWithToken } from "../components/ReusableComponents/Atom";
import { startLink } from "../constants/Constants";
import { useNavigate } from "react-router-dom";
import SuccessError from "../components/ReusableComponents/SuccessError";
import ProfilePicture from "../components/Profile/ProfilePicture";
import UploadPfp from "../components/Profile/UploadPfp";
import Loading from "../components/ReusableComponents/Loading/Loading";


const Profile = () => {
    const [user, setUser] = useAtom(state.user);
    const [completedLessons, setCompletedLessons] = useAtom(state.completedLessons);
    const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks);
    const [completedModules, setCompletedModules] = useAtom(state.completedModules);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true)
    const [loadingText, setLoadingText] = useState("Gathering data ... ")

    const imageRef = useRef(null)
    const [openUploadPfp, setOpenUploadPfp] = useState(false)

    const githubUsernameRef = useRef(null);
    const codeWarsUsernameRef = useRef(null);
    const discordUsernameRef = useRef(null);
    const linkedInUsernameRef = useRef(null);
    const instagramUsernameRef = useRef(null);
    const facebookUsernameRef = useRef(null);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const birthdayRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const addressRef = useRef(null);
    const locationRef = useRef(null);

    const navigate = useNavigate()
    let updateObject = {}

    useEffect(() => {
        if (!user) {
            getUserWithToken(
                localStorage.getItem("ELearningToken"),
                setUser,
                setCompletedLessons,
                setCompletedWeeks,
                setCompletedModules
            );
        }
        setTimeout(() =>{
            setLoading(false)
        },1500) 
    }, []);

    const updateUser = () => {
        setLoading(true)

        if (imageRef.current.src != user?.profileImageUrl) {
            setLoadingText("Uploading photo and saving changes... \n might take a moment")
            uploadPhoto()
        } else {
            setLoadingText("Saving changes...")
            updateFetch()
        }

    }

    const updateFetch = () => {
        fetch(`${startLink}/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
            },
            body: JSON.stringify(updateObject)
        })
            .then(res => res.json())
            .then(() => {
                setLoading(false);
                setSuccess("Chages Saved!"); // afisare mesaj
                setTimeout(() => {
                    setSuccess(null); // curatare eroare
                }, 2000);
            })
            .catch((err) => {
                setError("Something went wrong")
                setLoading(false);
                console.log(err)
                setTimeout(() => {
                    setError(null); // curatare eroare
                }, 2000);
            })
    }

    const onChangeEvent = (e) => {
        updateObject[e.target.id] = e.target.value
    }


    const uploadPhoto = () => {
        let url = "https://script.google.com/macros/s/AKfycbxw6i617kJ7mwdxVniVR2vjms4p33A6W0rg5HvQGwe9JSnF90_XAHg46BO4jBi5BMqB/exec";

        let obj = {
            base64: imageRef.current.src.split("base64,")[1],
            type: imageRef.current.type,
            name: imageRef.current.name,
            userId: user?.id,
            username: `${user?.firstName} ${user?.lastName}`
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                updateObject["profileImageUrl"] = data.newLink;
                console.log(updateObject)
                updateFetch()
            })
            .catch((err) => console.log(err))
    }


    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("ELearningToken");
        navigate("/");
    };

    const editer = () => {
        return false;
    }

    return (
        <div id="profilePageContainer" className="w-full relative min-h-screen  bg-generalColors-dark-blue flex flex-col justify-center items-center gap-6">
            <SuccessError success={success} error={error} />

            {loading &&
                <div className="absolute w-full h-full top-o left-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-20">
                    <Loading />
                    <p className="mt-10 text-4xl text-generalColors-white p-3 bg-black bg-opacity-80 rounded-xl">{loadingText}</p>
                </div>
            }

            <div className="w-full flex justify-end h-7">
                <button id="logOut" onClick={logout} className="mt-[20px] w-fit px-7 py-4 bg-generalColors-dark-blue text-white rounded-2xl size-8 flex items-center justify-center border-[1px] border-white mr-8">Logout</button>
            </div>


            <ProfilePicture openUpload={() => setOpenUploadPfp(true)} imageRef={imageRef} imageSrc={user?.profileImageUrl} />
            {openUploadPfp && <UploadPfp setOpenUploadPfp={setOpenUploadPfp} pfpImageRef={imageRef} />}


            <div id="socialsAndInformationContainer" className="w-full h-fit px-7  flex flex-row gap-20 justify-center">
                <div id="socialsContainer" className=" w-96 h-fit bg-white rounded-3xl flex flex-col gap-0.5 p-5" >
                    <div id="socialTitle" className="w-full my-5 flex-row flex gap-5 justify-center">
                        <p className=" text-generalColors-medium-gray font-semibold text-xl">Social Networks</p>
                    </div>
                    <div id="gitHubUsernameContainer" className="w-full  h-20 flex items-center">
                        <img src="images/social1.png" alt="" className=" size-11 " />
                        <CostumInput id="githubUsername"
                            disabled={editer()}
                            defaultValue={user?.githubUsername}

                            inputRef={githubUsernameRef}
                            onChange={onChangeEvent}
                            placeholder={'Github Username'}
                            label={<span style={{ fontSize: '17px' }}>
                                Github username<span className="text-red-500">*</span></span>} size={'lg'}
                        />

                    </div>
                    <div id="codeWarsUsernameContainer" className="w-full  h-20 flex items-center">
                        <img src="images/social2.png" alt="" className=" size-11 " />
                        <CostumInput id="codeWarsUsername"
                            disabled={editer()}
                            defaultValue={user?.codeWarsUsername}
                            inputRef={codeWarsUsernameRef}
                            onChange={onChangeEvent}
                            placeholder={'Codewars Username'}
                            label={<span style={{ fontSize: '17px' }}>
                                Codewars username<span className="text-red-500">*</span></span>} size={'lg'}
                        />

                    </div>
                    <div id="discordId" className="w-full  h-20 flex items-center">
                        <img src="images/social3.png" alt="" className=" size-11 " />
                        <CostumInput id="discordUsername"
                            disabled={editer()}
                            defaultValue={user?.discordUsername}
                            inputRef={discordUsernameRef}
                            onChange={onChangeEvent}
                            placeholder={'Discord Username'}
                            label={<span style={{ fontSize: '17px' }}>
                                Discord username<span className="text-red-500">*</span></span>} size={'lg'}
                        />
                    </div>
                    <div id="linkedInUsernameContainer" className="w-full  h-20 flex items-center">
                        <img src="images/social4.png" alt="" className=" size-11 " />
                        <CostumInput id="linkedInUsername"
                            disabled={editer()}
                            inputRef={linkedInUsernameRef}
                            defaultValue={user?.linkedInUsername}
                            onChange={onChangeEvent}
                            placeholder={'LinkedIn Username'}
                            label={<span style={{ fontSize: '17px' }}>
                                LinkedIn username</span>} size={'lg'}
                        />
                    </div>
                    <div id="instagramUsernameContainer" className="w-full  h-20 flex items-center">
                        <img src="images/social5.png" alt="" className=" size-11 " />
                        <CostumInput id="instagramUsername"
                            disabled={editer()}
                            inputRef={instagramUsernameRef}
                            defaultValue={user?.instagramUsername}
                            onChange={onChangeEvent}
                            placeholder={'Instagram Username'}
                            label={<span style={{ fontSize: '17px' }}>
                                Instagram username</span>} size={'lg'}
                        />
                    </div>

                    <div id="facebookUsernameContainer" className="w-full  h-20 flex items-center">
                        <img src="images/social6.png" alt="" className=" size-11 " />
                        <CostumInput id="facebookUsername"
                            disabled={editer()}
                            inputRef={facebookUsernameRef}
                            defaultValue={user?.facebookUsername}
                            onChange={onChangeEvent}
                            placeholder={'Facebook Username'}
                            label={<span style={{ fontSize: '17px' }}>
                                Facebook username</span>} size={'lg'}
                        />
                    </div>
                </div>
                <div id="informationContainer" className="w-96 h-fit bg-white rounded-3xl flex flex-col gap-0.5 p-5" >
                    <div id="informationTitle" className="w-full my-5 flex-row flex gap-5 justify-center">
                        <p className=" text-generalColors-medium-gray font-semibold text-xl">Personal Information</p>
                    </div>
                    <div id="givenName" className="w-full  h-20 flex items-center">
                        <img src="images/info1.png" alt="" className=" size-11 " />
                        <CostumInput id="firstName"
                            disabled={editer()}
                            defaultValue={user?.firstName}
                            inputRef={firstNameRef}
                            onChange={onChangeEvent}
                            placeholder={'Given Name'}
                            label={<span style={{ fontSize: '17px' }}>
                                Given Name<span className="text-red-500">*</span></span>} size={'lg'}
                        />
                    </div>
                    <div id="surName" className="w-full  h-20 flex items-center">
                        <img src="images/info1.png" alt="" className=" size-11 " />
                        <CostumInput id="lastName"
                            disabled={editer()}
                            defaultValue={user?.lastName}
                            inputRef={lastNameRef}
                            onChange={onChangeEvent}
                            placeholder={'Surname'}
                            label={<span style={{ fontSize: '17px' }}>
                                Surname<span className="text-red-500">*</span></span>} size={'lg'}
                        />

                    </div>
                    <div id="birthdayContainer" className="w-full  h-20 flex items-center">
                        <img src="images/info5.png" alt="" className=" size-11 " />
                        <CostumInput id="birthday"
                            disabled={editer()}
                            defaultValue={user?.birthday}
                            inputRef={birthdayRef}
                            onChange={onChangeEvent}
                            placeholder={'DD / MM / YYYY'}
                            label={<span style={{ fontSize: '17px' }}>
                                Birth day</span>} size={'lg'}
                        />
                    </div>
                    <div id="phoneNumberContainer" className="w-full  h-20 flex items-center">
                        <img src="images/info3.svg" alt="" className=" size-11 " />
                        <CostumInput id="phoneNumber"
                            disabled={editer()}
                            defaultValue={user?.phoneNumber}
                            inputRef={phoneNumberRef}
                            onChange={onChangeEvent}
                            placeholder={'Phone number'}
                            label={<span style={{ fontSize: '17px' }}>
                                Phone number<span className="text-red-500">*</span></span>} size={'lg'}
                        />
                    </div>

                    <div id="locationContainer" className="w-full  h-20 flex items-center">
                        <img src="images/info4.png" alt="" className=" size-11 " />
                        <CostumInput id="location"
                            disabled={editer()}
                            defaultValue={user?.location}
                            inputRef={locationRef}
                            onChange={onChangeEvent}
                            placeholder={'City'}
                            label={<span style={{ fontSize: '17px' }}>
                                Location<span className="text-red-500">*</span></span>} size={'lg'}
                        />
                    </div>

                    <div id="addressContainer" className="w-full  h-20 flex items-center">
                        <img src="images/info4.png" alt="" className=" size-11 " />
                        <CostumInput id="address"
                            disabled={editer()}
                            defaultValue={user?.address}
                            inputRef={addressRef}
                            onChange={onChangeEvent}
                            placeholder={'Streent - number'}
                            label={<span style={{ fontSize: '17px' }}>
                                Address<span className="text-red-500">*</span></span>} size={'lg'}
                        />
                    </div>

                </div>
            </div>

            <div id="saveAndCancelSocial" className="relative w-full h-20 mb-10 flex items-center justify-center gap-5">
                {/* <div className="absolute w-full h-full top-o left-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Loading />
                </div> */}
                <button id="saveSocial"
                    onClick={updateUser}
                    className="px-7 py-3 bg-generalColors-dark-blue text-white rounded-3xl border-[1px] border-white text-center">
                    Save Changes
                </button>
                <button id="cancelSocial"
                    onClick={() =>{
                     setUser(null);
                     window.history.back();
                    }}
                    className="px-7 py-3 bg-white text-generalColors-dark-blue font-semibold border border-generalColors-medium-gray  rounded-3xl">
                    Back
                </button>
            </div>
        </div>
    )
}


export default Profile;