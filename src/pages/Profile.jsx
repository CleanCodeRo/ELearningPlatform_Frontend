import CostumInput from "../components/ReusableComponents/CostumInput";


const Profile = () => {


    return(
        <div id="profilePageContainer" className="w-full - h-full  bg-generalColors-dark-blue flex flex-col justify-center items-center gap-6">
            <div id="image" className="w-[200px] h-[200px] bg-white rounded-full flex justify-center items-center">
                <img src="images/default-picture.png" alt="" className="size-32"/>
            </div>
            <div id="socialsAndInformationContainer" className="w-full h-3/5  flex flex-row gap-20 justify-center">
                <div id="socialsContainer" className="w-1/4 bg-white rounded-3xl flex flex-col gap-3 p-5" >
                    <div id="socialTitle" className="w-full  h-20 flex-row flex gap-5 justify-center">
                        <p className=" text-generalColors-medium-gray font-semibold text-xl">Social Networks</p>
                        <div id="imageDot" className="size-7 bg-generalColors-medium-gray rounded-3xl flex items-center justify-center cursor-pointer" onClick={()=>{console.log("hey")}}>
                        <img src="images/pencil.png" alt="" className="size-4 "/>
                        </div>
                    </div>
                    <div id="gitHubUsername" className="w-full  h-20 flex items-center">
                        <img src="images/social1.png" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'Github Username'} label={<span style={{ fontSize: '17px' }}>Github username<span className="text-red-500">*</span></span>} color={''} size={'lg'}/>
                       
                    </div>
                    <div id="codeWarsUsername" className="w-full  h-20 flex items-center">
                    <img src="images/social2.png" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'Codewars Username'} label={<span style={{ fontSize: '17px' }}>Codewars username<span className="text-red-500">*</span></span>} color={''} size={'lg'}/>
                    
                    </div>
                    <div id="discordId" className="w-full  h-20 flex items-center">
                        <img src="images/social3.png" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'Discord Username'} label={<span style={{ fontSize: '17px' }}>Discord username<span className="text-red-500">*</span></span>} color={''} size={'lg'}/>
                    </div>
                    <div id="linkedInUsername" className="w-full  h-20 flex items-center">
                        <img src="images/social4.png" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'LinkedIn Username'} label={<span style={{ fontSize: '17px' }}>LinkedIn username</span>} color={''} size={'lg'}/>
                    </div>
                    <div id="instagramUsername" className="w-full  h-20 flex items-center">
                        <img src="images/social5.png" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'Instagram Username'} label={<span style={{ fontSize: '17px' }}>Instagram username</span>} color={''} size={'lg'}/>
                    </div>
                    <div id="facebookUsername" className="w-full  h-20 flex items-center">
                        <img src="images/social6.png" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'Facebook Username'} label={<span style={{ fontSize: '17px' }}>Facebook username</span>} color={''} size={'lg'}/>
                    </div>
                    <div id="saveAndCancelSocial" className="w-full  h-20 flex items-center justify-center gap-5">
                        <button id="saveSocial" className="w-2/5 bg-generalColors-dark-blue text-white rounded-3xl size-8  text-center">Save Changes</button>
                        <button id="cancelSocial" className="w-1/4 bg-white text-generalColors-medium-gray font-semibold border border-generalColors-medium-gray  rounded-3xl size-8">Cancel</button>
                    </div>


                </div>
                <div id="informationContainer" className="w-1/4 bg-white rounded-3xl flex flex-col gap-3 p-5" >
                    <div id="informationTitle" className="w-full  h-20 flex-row flex gap-5 justify-center">
                        <p className=" text-generalColors-medium-gray font-semibold text-xl">Personal Information</p>
                        <div id="imageDot" className="size-7 bg-generalColors-medium-gray rounded-3xl flex items-center justify-center cursor-pointer" onClick={()=>{console.log("hey info")}}>
                        <img src="images/pencil.png" alt="" className="size-4 "/>
                        </div>
                    </div>
                    <div id="givenName" className="w-full  h-20 flex items-center">
                        <img src="images/info1.png" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'Given Name'} label={<span style={{ fontSize: '17px' }}>Given Name<span className="text-red-500">*</span></span>} color={''} size={'lg'}/>
                       
                    </div>
                    <div id="surName" className="w-full  h-20 flex items-center">
                    <img src="images/info1.png" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'Surname'} label={<span style={{ fontSize: '17px' }}>Surname<span className="text-red-500">*</span></span>} color={''} size={'lg'}/>
                    
                    </div>
                    <div id="email" className="w-full  h-20 flex items-center">
                        <img src="images/info2.png" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'Email'} label={<span style={{ fontSize: '17px' }}>Email<span className="text-red-500">*</span></span>} color={''} size={'lg'}/>
                    </div>
                    <div id="phoneNumber" className="w-full  h-20 flex items-center">
                        <img src="images/info3.svg" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'Phone number'} label={<span style={{ fontSize: '17px' }}>Phone number<span className="text-red-500">*</span></span>} color={''} size={'lg'}/>
                    </div>
                    <div id="address" className="w-full  h-20 flex items-center">
                        <img src="images/info4.png" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'Address'} label={<span style={{ fontSize: '17px' }}>Address<span className="text-red-500">*</span></span>} color={''} size={'lg'}/>
                    </div>
                    <div id="birthDay" className="w-full  h-20 flex items-center">
                        <img src="images/info5.png" alt=""  className=" size-11 " />
                        <CostumInput id={1} placeholder={'Birthday'} label={<span style={{ fontSize: '17px' }}>Birthday</span>} color={''} size={'lg'}/>
                    </div>
                    <div id="saveAndCancelInfo" className="w-full  h-20 flex items-center justify-center gap-5">
                    <button id="saveSocial" className="w-2/5 bg-generalColors-dark-blue text-white rounded-3xl size-8  text-center">Save Changes</button>
                        <button id="cancelSocial" className="w-1/4 bg-white text-generalColors-medium-gray font-semibold border border-generalColors-medium-gray  rounded-3xl size-8">Cancel</button>
                    </div>


                </div>

            </div>
            
        </div>
    )
}


export default Profile;