import React from "react"

const PresentationHero = () => {
  return (
    <div id="ParentHolder" className="grid grid-cols-2 w-full px-[2rem] smd:px-[6rem] py-5 xs:py-16 lg:py-20 font-inter relative" >

      <div id="TitleAndButtons" className=" mt-10 col-span-2 lg:col-span-1">
        <p className="text-3xl xs:text-4xl smd:text-5xl px1400:text-[4rem] leading-snug  tracking-wide  font-bold">Up Your <span className=" text-[#20B486]">Skills</span> <br /> To  <span className=" text-[#20B486]">Advance</span> Your <br />  <span className=" text-[#20B486]">Career</span> Path</p>
        <p className="text-xs xs:text-sm smd:text-base px1400:text-lg  text-gray-800 tracking-wide ">Learn Full Stack Development, UI-UX Design skills with weekend UX . The latest online learning system and material that help your knowledge growing.</p>

        <div id="buttons" className="flex flex-col xs:flex-row items-center text-base smd:text-xl font-bold my-7 smd:my-14">
          <button className=" my-2 xs:my-0 px-8 py-5 bg-[#20B486] rounded-lg text-light-green-50 mr-4 shadow-sm shadow-[#20B486]">
            Get Started
          </button>
          <button className="my-2 xs:my-0 px-8 py-5 text-[#20B486] rounded-lg bg-[#EAFFF9] shadow-sm shadow-[#EAFFF9]">
            Get Free Trail
          </button>
        </div>
      </div>

      <div id="PhotoPart" className="flex items-center justify-end px1400:justify-center col-span-2 xs:col-span-1 ">
        <img className="rounded-lg rounded-tr-[6rem] rounded-bl-[6rem] lg:rounded-full  w-[25rem] px1400:w-[35rem]" draggable={false} src="/images/CleanCode.jpg" />
      </div>

      <div id="perks" className="flex flex-col lg:flex-row items-center justify-center lg:justify-start col-span-2 xs:col-span-1 lg:!col-span-2 text-sm smd:text-base py-10 xs:py-0">
          <div className="flex items-center mx-3 bg-[#EAFFF9] shadow-sm shadow-[#EAFFF9] p-3 rounded-lg ">
            <svg draggable={false} className="mx-1" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.273 0.629542C15.3935 -0.264628 9.86944 3.55953 8.68378 9.34188C8.47284 10.3752 8.1554 11.2117 7.71588 11.8988C7.67682 11.9608 7.64166 12.0258 7.61139 12.0927L5.48132 16.8329C5.27911 17.2837 5.31134 17.8042 5.56726 18.2262C5.8241 18.649 6.27142 18.9176 6.76465 18.946L9.19165 19.0837V21.7597C9.19165 23.087 10.2709 24.1662 11.5972 24.1662H12.9694V27.3658C12.9694 28.194 13.6414 28.8659 14.4695 28.8659H24.5175C25.3457 28.8659 26.0176 28.194 26.0176 27.3658C26.0176 24.7542 26.842 20.7928 28.682 17.8277C28.683 17.8267 28.683 17.8257 28.6839 17.8247C30.3677 15.3694 30.9781 12.3764 30.4009 9.38876C30.4009 9.38827 30.4009 9.38827 30.4009 9.38827C29.5239 4.84871 25.8555 1.32882 21.273 0.629542ZM26.1847 16.1639C26.1603 16.1991 26.1378 16.2357 26.1163 16.2728C24.4824 18.9167 23.3514 22.5391 23.0798 25.8656H15.9697V23.5714C15.9697 22.2451 14.8905 21.1659 13.5632 21.1659H12.1919V18.5221C12.1919 17.2475 11.1948 16.1927 9.92217 16.12L9.11156 16.0741L10.305 13.418C10.9145 12.437 11.3462 11.2991 11.6235 9.94398C12.4879 5.72871 16.5352 2.93934 20.8198 3.59565C24.0995 4.09571 26.8273 6.71223 27.4553 9.95716C27.8812 12.1649 27.4299 14.3693 26.1847 16.1639ZM4.58765 23.4015C4.58765 26.102 6.78516 28.2995 9.48566 28.2995C10.3138 28.2995 10.9858 27.6275 10.9858 26.7993C10.9858 25.9711 10.3138 25.2992 9.48566 25.2992C8.43964 25.2992 7.58795 24.4475 7.58795 23.4015C7.58795 22.5733 6.91601 21.9013 6.08783 21.9013C5.25958 21.9013 4.58765 22.5733 4.58765 23.4015Z" fill="#F1BF5A" />
              <path d="M2.88714 23.2305C2.05895 23.2305 1.38696 23.9025 1.38696 24.7306C1.38696 28.4634 4.42346 31.4999 8.15527 31.4999C8.98352 31.4999 9.65545 30.828 9.65545 29.9998C9.65545 29.1716 8.98351 28.4996 8.15527 28.4996C6.07794 28.4996 4.38733 26.809 4.38733 24.7307C4.38732 23.9025 3.71538 23.2305 2.88714 23.2305Z" fill="#F1BF5A" />
            </svg>
            <p>Public Speaking</p>
          </div>

          <div className="flex items-center mx-3  bg-[#EAFFF9] shadow-sm shadow-[#EAFFF9] p-3 rounded-lg my-4 sm:my-10 lg:my-0 ">
            <svg draggable={false} className="mx-1" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1_188)">
                <path d="M31.3975 9.2041C31.3975 7.22461 29.7876 5.61426 27.8086 5.61426H24.1274V5.13379C24.1274 2.5791 22.0488 0.5 19.4936 0.5H12.5063C9.95117 0.5 7.87256 2.5791 7.87256 5.13379V5.61426H4.19141C2.21241 5.61426 0.602539 7.22461 0.602539 9.2041V10.831C0.602539 12.9765 1.37488 14.9437 2.65381 16.4736V25.8213C2.65381 28.9521 5.20117 31.5 8.33252 31.5H23.6675C26.7988 31.5 29.3462 28.9521 29.3462 25.8213V16.4736C30.6251 14.9437 31.3975 12.9765 31.3975 10.831V9.2041ZM10.8726 5.13379C10.8726 4.2334 11.6055 3.5 12.5063 3.5H19.4936C20.3945 3.5 21.1274 4.2334 21.1274 5.13379V5.61426H10.8726V5.13379ZM3.60254 9.2041C3.60254 8.8789 3.8667 8.61426 4.19141 8.61426H27.8086C28.1333 8.61426 28.3975 8.87891 28.3975 9.2041V10.831C28.3975 12.3829 27.7825 13.7911 26.7883 14.8346C26.7849 14.8379 26.782 14.8418 26.7786 14.8452C25.7199 15.9509 24.2334 16.6436 22.5855 16.6436H21.8462V16.2334C21.8462 15.4053 21.1748 14.7334 20.3462 14.7334C19.5176 14.7334 18.8462 15.4053 18.8462 16.2334V16.6436H13.1538V16.2334C13.1538 15.4053 12.4824 14.7334 11.6538 14.7334C10.8252 14.7334 10.1538 15.4053 10.1538 16.2334V16.6436H9.41455C7.76666 16.6436 6.28009 15.9509 5.22137 14.8452C5.21801 14.8418 5.21508 14.838 5.21173 14.8346C4.21747 13.7911 3.60254 12.3829 3.60254 10.8311V9.2041ZM23.6675 28.5H8.33252C6.85547 28.5 5.65381 27.2978 5.65381 25.8213V18.7888C6.79627 19.3311 8.06812 19.6436 9.41455 19.6436H10.1538V20.0537C10.1538 20.8819 10.8252 21.5537 11.6538 21.5537C12.4824 21.5537 13.1538 20.8818 13.1538 20.0537V19.6436H18.8462V20.0537C18.8462 20.8819 19.5176 21.5537 20.3462 21.5537C21.1748 21.5537 21.8462 20.8818 21.8462 20.0537V19.6436H22.5854C23.9319 19.6436 25.2037 19.3311 26.3462 18.7888V25.8213C26.3462 27.2978 25.1445 28.5 23.6675 28.5Z" fill="#F4876B" />
              </g>
              <defs>
                <clipPath id="clip0_1_188">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>Career-Oriented</p>
          </div>

          <div className="flex items-center mx-3  bg-[#EAFFF9] shadow-sm shadow-[#EAFFF9] p-3 rounded-lg ">
            <svg draggable={false} className="mx-1" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 4V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4C15 4.26522 15.1054 4.51957 15.2929 4.70711C15.4804 4.89464 15.7348 5 16 5C16.2652 5 16.5196 4.89464 16.7071 4.70711C16.8946 4.51957 17 4.26522 17 4ZM7.51 6.1C7.3187 5.93617 7.07262 5.85057 6.82095 5.86029C6.56927 5.87001 6.33053 5.97434 6.15244 6.15244C5.97434 6.33053 5.87001 6.56927 5.86029 6.82095C5.85057 7.07262 5.93617 7.3187 6.1 7.51L6.81 8.22C7.0013 8.38383 7.24738 8.46943 7.49905 8.45971C7.75073 8.44999 7.98947 8.34566 8.16756 8.16756C8.34566 7.98947 8.44999 7.75073 8.45971 7.49905C8.46943 7.24738 8.38383 7.0013 8.22 6.81L7.51 6.1ZM4 17C4.26522 17 4.51957 16.8946 4.70711 16.7071C4.89464 16.5196 5 16.2652 5 16C5 15.7348 4.89464 15.4804 4.70711 15.2929C4.51957 15.1054 4.26522 15 4 15H3C2.73478 15 2.48043 15.1054 2.29289 15.2929C2.10536 15.4804 2 15.7348 2 16C2 16.2652 2.10536 16.5196 2.29289 16.7071C2.48043 16.8946 2.73478 17 3 17H4ZM6.1 25.9C6.28736 26.0862 6.54081 26.1908 6.805 26.1908C7.06919 26.1908 7.32264 26.0862 7.51 25.9L8.22 25.19C8.38383 24.9987 8.46943 24.7526 8.45971 24.5009C8.44999 24.2493 8.34566 24.0105 8.16756 23.8324C7.98947 23.6543 7.75073 23.55 7.49905 23.5403C7.24738 23.5306 7.0013 23.6162 6.81 23.78L6.1 24.49C5.91375 24.6774 5.80921 24.9308 5.80921 25.195C5.80921 25.4592 5.91375 25.7126 6.1 25.9ZM25.19 23.78C24.9987 23.6162 24.7526 23.5306 24.5009 23.5403C24.2493 23.55 24.0105 23.6543 23.8324 23.8324C23.6543 24.0105 23.55 24.2493 23.5403 24.5009C23.5306 24.7526 23.6162 24.9987 23.78 25.19L24.49 25.9C24.6813 26.0638 24.9274 26.1494 25.1791 26.1397C25.4307 26.13 25.6695 26.0257 25.8476 25.8476C26.0257 25.6695 26.13 25.4307 26.1397 25.1791C26.1494 24.9274 26.0638 24.6813 25.9 24.49L25.19 23.78ZM29 15H28C27.7348 15 27.4804 15.1054 27.2929 15.2929C27.1054 15.4804 27 15.7348 27 16C27 16.2652 27.1054 16.5196 27.2929 16.7071C27.4804 16.8946 27.7348 17 28 17H29C29.2652 17 29.5196 16.8946 29.7071 16.7071C29.8946 16.5196 30 16.2652 30 16C30 15.7348 29.8946 15.4804 29.7071 15.2929C29.5196 15.1054 29.2652 15 29 15ZM25.9 6.1C25.7126 5.91375 25.4592 5.80921 25.195 5.80921C24.9308 5.80921 24.6774 5.91375 24.49 6.1L23.78 6.81C23.6753 6.89965 23.5903 7.00996 23.5303 7.13403C23.4703 7.25809 23.4365 7.39323 23.4312 7.53095C23.4259 7.66867 23.4491 7.806 23.4994 7.93432C23.5496 8.06265 23.6259 8.1792 23.7234 8.27665C23.8208 8.3741 23.9374 8.45036 24.0657 8.50064C24.194 8.55091 24.3313 8.57412 24.4691 8.5688C24.6068 8.56348 24.7419 8.52975 24.866 8.46973C24.99 8.4097 25.1004 8.32468 25.19 8.22L25.9 7.51C26.0863 7.32264 26.1908 7.06919 26.1908 6.805C26.1908 6.54081 26.0863 6.28736 25.9 6.1ZM7 16C7.00219 17.4778 7.36826 18.9324 8.06588 20.2352C8.7635 21.538 9.77121 22.649 11 23.47V29C11 29.2652 11.1054 29.5196 11.2929 29.7071C11.4804 29.8946 11.7348 30 12 30H20C20.2652 30 20.5196 29.8946 20.7071 29.7071C20.8946 29.5196 21 29.2652 21 29V23.47C22.2933 22.6059 23.3406 21.4213 24.0397 20.0318C24.7388 18.6423 25.0659 17.0954 24.989 15.5419C24.9121 13.9883 24.4339 12.4812 23.601 11.1676C22.7682 9.85391 21.6091 8.77853 20.2368 8.0463C18.8644 7.31408 17.3258 6.95001 15.7709 6.98961C14.2159 7.02921 12.6978 7.47112 11.3645 8.27225C10.0313 9.07338 8.92841 10.2064 8.16348 11.5607C7.39856 12.9151 6.9977 14.4446 7 16ZM13 28V26H19V28H13ZM16 9C17.5402 9.00083 19.0372 9.50964 20.2589 10.4476C21.4807 11.3855 22.3589 12.7002 22.7576 14.188C23.1563 15.6757 23.0532 17.2534 22.4643 18.6766C21.8753 20.0998 20.8334 21.289 19.5 22.06C19.3474 22.1481 19.2208 22.275 19.133 22.4277C19.0452 22.5805 18.9993 22.7538 19 22.93V24H17V18H19C19.2652 18 19.5196 17.8946 19.7071 17.7071C19.8946 17.5196 20 17.2652 20 17C20 16.7348 19.8946 16.4804 19.7071 16.2929C19.5196 16.1054 19.2652 16 19 16H13C12.7348 16 12.4804 16.1054 12.2929 16.2929C12.1054 16.4804 12 16.7348 12 17C12 17.2652 12.1054 17.5196 12.2929 17.7071C12.4804 17.8946 12.7348 18 13 18H15V24H13V22.92C13.0007 22.7438 12.9548 22.5705 12.867 22.4177C12.7792 22.265 12.6526 22.1381 12.5 22.05C11.1715 21.2769 10.1344 20.088 9.54886 18.6668C8.96327 17.2457 8.86173 15.6713 9.2599 14.1867C9.65807 12.7021 10.5338 11.3898 11.752 10.4524C12.9701 9.51499 14.4629 9.0046 16 9Z" fill="#B4708D" />
            </svg>
            <p>Creative Thinking</p>
          </div>


        </div>


    </div>
  )
}
export default PresentationHero