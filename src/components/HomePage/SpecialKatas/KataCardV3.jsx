import React from 'react';

export default function KataCardV3() {
  return (
    <div
    id="cardHolder"
    class="w-64 max-h-17 bg-gradient-to-br from-[#f2f2f2] to-[#e0e0e0] flex flex-col items-center border-2 border-[#c4c4c4] rounded-lg relative top-[10%] left-[40%] shadow-lg"
  >
    <p id="title" class="text-[#333] mt-2 font-semibold text-lg">Quest Title</p>
    <div
      id="theme"
      class="w-48 h-32 mt-2 rounded-xl flex items-center justify-center border-2 border-[#c4c4c4] shadow-md"
      style={{backgroundImage: 'linear-gradient(to right, #f2f2f2, #e0e0e0)'}}
    ></div>
    <p class="text-[#333] text-start mt-2 font-bold">Training details</p>
  
    <div id="Details" class="text-[#333] flex flex-row mt-2">
      <div
        id="leftDetails"
        class="mr-2 border-2 rounded-xl border-[#c4c4c4] min-w-[8rem] bg-[#f8f8f8] text-[#666] shadow-md"
      >
        Ceva
      </div>
  
      <div
        id="rightDetails"
        class="border-2 rounded-xl border-[#c4c4c4] min-w-[6rem] bg-[#f8f8f8] text-[#666] shadow-md"
      >
        <p id="pointsPerCompetion" class="ml-1 mt-1 font-semibold">RP: +</p>
        <p id="status" class="ml-1 font-semibold">Status</p>
      </div>
    </div>
  
    <div id="buttonsContainer" class="flex flex-row justify-evenly w-full mt-6 mb-2">
      <button
        id="markedAsDone"
        class="text-[#333] border border-[#c4c4c4] rounded-full w-2/5 font-semibold bg-[#e0e0e0] hover:bg-[#c4c4c4] shadow-md"
      >
        Done
      </button>
      <a
        id="beginTraining"
        class="text-[#333] border border-[#c4c4c4] rounded-full w-24 font-semibold flex items-center justify-center bg-[#e0e0e0] hover:bg-[#c4c4c4] shadow-md"
        target="_blank"
      >
        Train
      </a>
    </div>
  </div>
  


  );
}
