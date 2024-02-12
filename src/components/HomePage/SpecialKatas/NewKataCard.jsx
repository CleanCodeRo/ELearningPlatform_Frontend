import Stars from "./Stars";


export default function NewKataCard({ kata }) {

    let maxPoints = 48;
    return (
        <div id="cardHolder" className=" w-64 h-fit bg-[#fceeca] flex flex-col items-center border-2 border-[#aa6b48] rounded-2xl font-ninja" >
            <p id="title" className="text-[#0b0f1b] mt-2 font-ninja">{kata.title}</p>
            <div id="theme" className="w-48 h-32 mt-2 rounded-xl flex items-center justify-center  border-2 shadow-md border-[#aa6b48]" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/surprising-luxurious-background-design-with-golden-lotus-lotus-flowers-line-art-design-wallpaper-generative-ai_779468-4131.jpg')`, backgroundPosition: 'center' }}>
                <img src="/public/images/Swords.png" className=" w-48 absolute z-2 pb-3"></img>

            </div>


            <div id="stars" className="text-[#0b0f1b] mt-2 flex flex-row z-10">
                {[...Array(8)].map((_, index) => (
                    <Stars key={index} color={index < kata.level ? '#e98735' : '#806A5F'} />
                ))}
            </div>

            <p className="text-[#0b0f1b] text-start relative flex items">Training details</p>
            <div id="Details" className="text-[#0b0f1b] flex !flex-row">
                <div id="leftDetails" className="mr-1 border-2 rounded-xl border-[#aa6b48] min-w-32">
                    {/* <p id="tags" className="ml-1">Fndamentals</p>
                    <p id="tags" className="ml-1">Mathematics</p>
                    <p id="tags" className="ml-1">Algorithm</p> */}

                    {kata.category?.map((category, index) => (
                    <p id="tags" key={index} className="ml-1">{category}</p>
                ))}

                </div>
                <div id="rightDetails" className=" border-2 rounded-xl border-[#aa6b48] min-w-24">
                    <p id="pointsPerCompetion" className="ml-1 mt-1">Rank: {maxPoints/kata.level}</p>
                    <p id="status" className="ml-1">Status</p>
                </div>


            </div>
            <div id="buttonsContainer" className="flex flex-row mt-4 mb-4">
                <button id="markedAsDone" className="text-[#0b0f1b] border border-[#aa6b48] rounded-full w-2/5">Done</button>
                <a id="beginTraining" className="text-[#0b0f1b]  border border-[#aa6b48] rounded-full w-24 " href={kata.kataLink} target="_blank">Train</a>
            </div>

        </div>
    );

}


{/* <img src="https://img.freepik.com/premium-photo/surprising-luxurious-background-design-with-golden-lotus-lotus-flowers-line-art-design-wallpaper-generative-ai_779468-4131.jpg" /> */ }