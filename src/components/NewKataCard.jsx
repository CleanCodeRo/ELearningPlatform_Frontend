export default function NewKataCard(){


    return (
        <div id="cardHolder" className="absolute right-[50vw] top-6 w-3/12 h-80 bg-black flex flex-col items-center">
            <p id="title" className="text-[#afafaf] mt-2">Kata Name</p>
            <div id="theme" className="w-3/4 h-2/4 mt-2" style={{backgroundImage: `url('https://img.freepik.com/premium-photo/surprising-luxurious-background-design-with-golden-lotus-lotus-flowers-line-art-design-wallpaper-generative-ai_779468-4131.jpg')`, backgroundPosition: 'center'}}>
                
</div>


            <div id="stars"  className="text-[#afafaf] mt-2 "> * * * * * kyU</div>
            <div id="Details"  className="text-[#afafaf]">
                <p id="tags">FUNDAMENTALS</p>
                <p id="status">BULINA VERDE</p>
                <p id="pointsPerCompetion">rank +30</p>
            </div>
            <button id="markedAsDone"></button>
            <button id="beginTraining"></button>
        </div>
    );
    
}


{/* <img src="https://img.freepik.com/premium-photo/surprising-luxurious-background-design-with-golden-lotus-lotus-flowers-line-art-design-wallpaper-generative-ai_779468-4131.jpg" /> */}