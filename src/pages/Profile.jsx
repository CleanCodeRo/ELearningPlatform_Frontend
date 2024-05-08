import { useEffect, useRef } from "react";
import CostumInput from "../components/ReusableComponents/CostumInput";
import { useAtom } from "jotai";
import state, { getUserWithToken } from "../components/ReusableComponents/Atom";
import { startLink } from "../constants/Constants";
import { getBoolean } from "firebase/remote-config";


const Profile = () => {
    const [user, setUser] = useAtom(state.user);
    const [completedLessons, setCompletedLessons] = useAtom(state.completedLessons);
    const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks);
    const [completedModules, setCompletedModules] = useAtom(state.completedModules);

    const githubUsernameRef = useRef(null);
    const codeWarsUsernameRef = useRef(null);
    const discordUsernameRef = useRef(null);
    const linkedInUsernameRef = useRef(null);
    const instagramUsernameRef = useRef(null);
    const facebookUsernameRef = useRef(null);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const addressRef = useRef(null);
    const locationRef = useRef(null);

    let updateObject = {}

    const updateUser = () => {
        // console.log(updateObject)

        fetch(`${startLink}/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
            },
            body: JSON.stringify(updateObject)
        })
            .then(res => res.json())
            // .then(data => console.log(data))
    }

    const onChangeEvent = (e) => {
        updateObject[e.target.id] = e.target.value
    }

    useEffect(() => {
        if (!user) {
            getUserWithToken(
                localStorage.getItem("ELearningToken"),
                setUser,
                setCompletedLessons,
                setCompletedWeeks,
                setCompletedModules
            );
            // console.log("User received use effect");
        }
    }, []);
    // modifica return ul pentru a modifica si editul, e 3 dimineata nu am putut face asta inca :))
    //also needs fixing: opacitatea imaginii la hover
    //pentru a folosi un onClick il vei pune pe clickDetectorImage(fix unde e hoverul, e deja pus peste toate, nu are sens sa il mtam)
    const editer = () => {
        return true;
    };

    return (
        <div id="profilePageContainer" className="w-full - h-full  bg-generalColors-dark-blue flex flex-col justify-center items-center gap-6">

            <div id="image" className="w-[200px] h-[200px] bg-white rounded-full flex justify-center items-center">
                <div id="clickDetectorImage" className="bg-white opacity-0 hover:opacity-50 absolute w-[200px] h-[200px] rounded-full flex justify-center items-center cursor-pointer">
                    <img src="images/camera-dark-blue.png" alt="" className="size-14 custom-img" />
                </div>


                <img src="images/default-picture.png" alt="" className="size-32" />
            </div>
            <div id="socialsAndInformationContainer" className="w-full h-3/5  flex flex-row  gap-20 justify-center">
                <div id="socialsContainer" className="w-1/4 bg-white rounded-3xl flex flex-col gap-3 p-5" >
                    <div id="socialTitle" className="w-full  h-20 flex-row flex gap-5 justify-center">
                        <p className=" text-generalColors-medium-gray font-semibold text-xl">Social Networks</p>
                        <div id="imageDot" className="size-7 bg-generalColors-medium-gray rounded-3xl flex items-center justify-center cursor-pointer" onClick={() => { console.log("modifica booleanul edit()") }}>
                            <img src="images/pencil.png" alt="" className="size-4 " />
                        </div>
                    </div>
                    <div id="gitHubUsername" className="w-full  h-20 flex items-center">
                        <img src="images/social1.png" alt="" className=" size-11 " />
                        <CostumInput id="githubUsername"
                            disabled={editer()}
                            defaultValue={user?.githubUsername}

                            inputRef={githubUsernameRef}
                            onChange={onChangeEvent}
                            placeholder={'Github Username'}
                            label={<span style={{ fontSize: '17px' }}>
                                Github username<span className="text-red-500">*</span></span>}  size={'lg'}
                        />

                    </div>
                    <div id="codeWarsUsername" className="w-full  h-20 flex items-center">
                        <img src="images/social2.png" alt="" className=" size-11 " />
                        <CostumInput id="codeWarsUsername"
                            disabled={editer()}
                            defaultValue={user?.codeWarsUsername}
                            inputRef={codeWarsUsernameRef}
                            onChange={onChangeEvent}
                            placeholder={'Codewars Username'}
                            label={<span style={{ fontSize: '17px' }}>
                                Codewars username<span className="text-red-500">*</span></span>}  size={'lg'}
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
                                Discord username<span className="text-red-500">*</span></span>}  size={'lg'}
                        />
                    </div>
                    <div id="linkedInUsername" className="w-full  h-20 flex items-center">
                        <img src="images/social4.png" alt="" className=" size-11 " />
                        <CostumInput id="linkedInUsername"
                            disabled={editer()}
                            inputRef={linkedInUsernameRef}
                            onChange={onChangeEvent}
                            placeholder={'LinkedIn Username'}
                            label={<span style={{ fontSize: '17px' }}>
                                LinkedIn username</span>}  size={'lg'}
                        />
                    </div>
                    <div id="instagramUsername" className="w-full  h-20 flex items-center">
                        <img src="images/social5.png" alt="" className=" size-11 " />
                        <CostumInput id="instagramUsername"
                            disabled={editer()}
                            inputRef={instagramUsernameRef}
                            onChange={onChangeEvent}
                            placeholder={'Instagram Username'}
                            label={<span style={{ fontSize: '17px' }}>
                                Instagram username</span>}  size={'lg'}
                        />
                    </div>

                    <div id="facebookUsername" className="w-full  h-20 flex items-center">
                        <img src="images/social6.png" alt="" className=" size-11 " />
                        <CostumInput id="facebookUsername"
                            disabled={editer()}
                            inputRef={facebookUsernameRef}
                            onChange={onChangeEvent}
                            placeholder={'Facebook Username'}
                            label={<span style={{ fontSize: '17px' }}>
                                Facebook username</span>}  size={'lg'}
                        />
                    </div>
                    <div id="saveAndCancelSocial" className="w-full  h-20 flex items-center justify-center gap-5">
                        <button id="saveSocial" onClick={updateUser} className="w-2/5 bg-generalColors-dark-blue text-white rounded-3xl size-8  text-center">Save Changes</button>
                        <button id="cancelSocial" className="w-1/4 bg-white text-generalColors-medium-gray font-semibold border border-generalColors-medium-gray  rounded-3xl size-8">Cancel</button>
                    </div>


                </div>
                <div id="informationContainer" className="w-1/4 bg-white rounded-3xl flex flex-col gap-3 p-5" >
                    <div id="informationTitle" className="w-full  h-20 flex-row flex gap-5 justify-center">
                        <p className=" text-generalColors-medium-gray font-semibold text-xl">Personal Information</p>
                        <div id="imageDot" className="size-7 bg-generalColors-medium-gray rounded-3xl flex items-center justify-center cursor-pointer" onClick={() => { console.log("hey si aici") }}>
                            <img src="images/pencil.png" alt="" className="size-4 " />
                        </div>
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
                                Given Name<span className="text-red-500">*</span></span>}  size={'lg'}
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
                                Surname<span className="text-red-500">*</span></span>}  size={'lg'}
                        />

                    </div>
                    <div id="email" className="w-full  h-20 flex items-center">
                        <img src="images/info2.png" alt="" className=" size-11 " />
                        <CostumInput id="email"
                            disabled={editer()}
                            defaultValue={user?.email}
                            inputRef={emailRef}
                            onChange={onChangeEvent}
                            placeholder={'Email'}
                            label={<span style={{ fontSize: '17px' }}>
                                Email<span className="text-red-500">*</span></span>}  size={'lg'}
                        />
                    </div>
                    <div id="phoneNumber" className="w-full  h-20 flex items-center">
                        <img src="images/info3.svg" alt="" className=" size-11 " />
                        <CostumInput id="phoneNumber"
                            disabled={editer()}
                            defaultValue={user?.phoneNumber}
                            inputRef={phoneNumberRef}
                            onChange={onChangeEvent}
                            placeholder={'Phone number'}
                            label={<span style={{ fontSize: '17px' }}>
                                Phone number<span className="text-red-500">*</span></span>}  size={'lg'}
                        />
                    </div>
                    <div id="address" className="w-full  h-20 flex items-center">
                        <img src="images/info4.png" alt="" className=" size-11 " />
                        <CostumInput id="address"
                            disabled={editer()}
                            defaultValue={user?.address}
                            inputRef={addressRef}
                            onChange={onChangeEvent}
                            placeholder={'Address'}
                            label={<span style={{ fontSize: '17px' }}>
                                Address<span className="text-red-500">*</span></span>}  size={'lg'}
                        />
                    </div>
                    <div id="birthDay" className="w-full  h-20 flex items-center">
                        <img src="images/info5.png" alt="" className=" size-11 " />
                        <CostumInput id="location"
                            disabled={editer()}
                            defaultValue={user?.location}
                            inputRef={locationRef}
                            onChange={onChangeEvent}
                            placeholder={'Location'}
                            label={<span style={{ fontSize: '17px' }}>
                                Location</span>}  size={'lg'}
                        />
                    </div>
                    <div id="saveAndCancelInfo" className="w-full  h-20 flex items-center justify-center gap-5">
                        <button id="saveSocial" onClick={updateUser} className="w-2/5 bg-generalColors-dark-blue text-white rounded-3xl size-8  text-center">Save Changes</button>
                        <button id="cancelSocial" className="w-1/4 bg-white text-generalColors-medium-gray font-semibold border border-generalColors-medium-gray  rounded-3xl size-8">Cancel</button>
                    </div>


                </div>

            </div>

        </div>
    )
}


export default Profile;