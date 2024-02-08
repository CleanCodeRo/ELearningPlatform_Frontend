import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";

export default function SideHeader() {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();

    console.log("test click");

    localStorage.removeItem("ELearningToken");
    navigate("/");
  };

  return (
    <div className="bg-[#dddcdc] min-w-20 h-screen flex flex-col items-center justify-center sticky top-0 border rounded-r-3xl">
      
      <div
        onClick={()=>navigate("/home")}
        id="homeButton"
        className=" rounded-full w-[50px] h-[50px] mb-4 mt-7  cursor-pointer fill-[#afafaf] hover:fill-[#2c8dfe]"
      >
         <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 256 256"
        >
          <g  fillRule="nonzero">
            <g transform="scale(4,4)">
              <path d="M32,8c-0.91125,0-1.82195,0.30919-2.56445,0.92969l-20.63477,17.24219c-0.765,0.639-1.0373,1.75333-0.5293,2.61133c0.647,1.092,2.07877,1.30534,3.00977,0.52734l0.71875,-0.59961v18.28906c0,2.761,2.239,5,5,5h30c2.761,0,5-2.239,5-5v-18.28711l0.71875,0.59961c0.374,0.313,0.8273,0.46484,1.2793,0.46484c0.695,0,1.38462,-0.36069,1.76563,-1.05469c0.465,-0.848,0.19122,-1.91906,-0.55078,-2.53906l-3.21289,-2.68555v-8.49805c0,-1.105-0.895,-2-2,-2h-2c-1.105,0-2,0.895-2,2v3.48438l-11.43555,-9.55469c-0.7425,-0.6205-1.6532,-0.92969-2.56445,-0.92969zM32,12.15234c0.11475,0,0.22877,0.03919,0.32227,0.11719l15.67773,13.09961v20.63086c0,1.105-0.895,2-2,2h-8v-14c0,-1.105-0.895,-2-2,-2h-8c-1.105,0-2,0.895-2,2v14h-8c-1.105,0-2,-0.895-2,-2v-20.63281l15.67773,-13.09766c0.0935,-0.078,0.20752,-0.11719,0.32227,-0.11719z"></path>
            </g>
          </g>
        </svg>
      </div>
      <div
        id="coursesButton"
        className=" rounded-full w-[50px] h-[50px] mb-4 mt-7 cursor-pointer fill-[#afafaf] hover:fill-[#2c8dfe]"
      >
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 256 256"
    >
      <g  fillRule="nonzero">
        <g transform="scale(4,4)">
          <path d="M21,13c-4.98,0-8.40906,1.93839-10.28906,3.40039c-1.085,0.844-1.71094,2.14258-1.71094,3.51758v29.1543c0,1.104 0.90858,1.90234 1.89258,1.90234c0.32,0 0.64612,-0.08453 0.95313,-0.26953c2.141,-1.292 5.3533,-2.70508 9.1543,-2.70508c2.973,0 5.40375,0.90245 7.21875,1.93945c1.173,0.671 2.47725,1.00586 3.78125,1.00586c1.304,0 2.60825,-0.33486 3.78125,-1.00586c1.815,-1.037 4.24575,-1.93945 7.21875,-1.93945c3.801,0 7.0133,1.41213 9.1543,2.70313c0.307,0.185 0.63412,0.26953 0.95313,0.26953c0.984,0 1.89258,-0.79639 1.89258,-1.90039v-29.1543c0,-1.375-0.62594,-2.67358-1.71094,-3.51758c-1.88,-1.462-5.30906,-3.40039-10.28906,-3.40039c-8,0-11,4-11,4c0,0-3,-4-11,-4zM21,17c4.10959,0 7.1588,2.04695 9,3.73633v25.23047c-1.83626,-0.89025-4.8779,-1.9668-9,-1.9668c-3.061,0-5.785,0.73139-8,1.65039v-25.92773c0,0 3.028,-2.72266 8,-2.72266zM43,17c4.991,0 8,2.69141 8,2.69141v25.95899c-2.215,-0.919-4.939,-1.65039-8,-1.65039c-4.11464,0-7.1609,1.07812-9,1.96875v-25.23437c1.84032,-1.68904 4.88834,-3.73437 9,-3.73437z"></path>
        </g>
      </g>
    </svg>
      </div>
      <div
        id="savedButton"
        className=" rounded-full w-[50px] h-[50px] mb-4 mt-7 cursor-pointer fill-[#afafaf] hover:fill-[#2c8dfe]"
      >
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 256 256"
    >
      <g  fillRule="nonzero">
        <g transform="scale(4,4)">
          <path d="M41.148,14h-18.296c-0.47,0-0.852,0.382-0.852,0.852v32.36c0,0.297 0.357,0.448 0.57,0.241l8.557,-8.303c0.487,-0.472 1.26,-0.472 1.747,0l8.557,8.303c0.212,0.207 0.569,0.056 0.569,-0.24v-32.36c0,-0.471-0.382,-0.853-0.852,-0.853zM41.148,10c2.679,0 4.852,2.173 4.852,4.852v37.46c0,1.925-2.314,2.903-3.695,1.563l-10.305,-9.998l-10.305,9.999c-1.381,1.34-3.695,0.361-3.695,-1.563v-37.46c0,-2.68 2.173,-4.853 4.852,-4.853z"></path>
        </g>
      </g>
    </svg>
      </div>
      <div
  id="myKatasButton"
  className=" rounded-full w-[50px] h-[50px] mb-4 mt-7 cursor-pointer fill-[#afafaf] hover:fill-[#2c8dfe] "
>
  <svg
  
    
    xmlns="http://www.w3.org/2000/svg"
    width="50"
      height="50"
    viewBox="-50 -20 512 512"
    xmlSpace="preserve"
    stroke="#ffffff"
  >
      <g>
        <g transform="scale(0.8,0.8)">
          <path d="M327.102,273.972l25.935-25.935l11.851,11.851c3.272,3.272,7.562,4.909,11.85,4.909s8.578-1.636,11.85-4.909 c6.545-6.545,6.545-17.156,0-23.7l-11.851-11.851L507.091,93.982c6.545-6.545,6.545-17.156,0-23.7L459.69,22.881 c-6.544-6.545-17.156-6.545-23.7,0c-6.628,6.628-123.568,123.568-130.354,130.354l-11.851-11.851 c-6.544-6.545-17.156-6.545-23.7,0s-6.545,17.156,0,23.7l11.851,11.851c-6.544,6.546-6.544,17.157,0,23.702 c-6.544,6.545-17.156,6.545-23.7,0l-11.851-11.851C199.579,146.449,82.639,29.509,76.011,22.88 c-6.544-6.545-17.156-6.545-23.7,0L4.909,70.282c-6.545,6.545-6.545,17.156,0,23.7l130.354,130.354l-11.851,11.851 c-6.545,6.545-6.545,17.156,0,23.7c6.544,6.545,17.156,6.546,23.7,0l11.851-11.851l25.936,25.936L4.909,453.961 c-7.908,7.907-5.982,21.2,3.809,26.554c16.34,8.937,34.263,13.513,52.575,13.513c28.21,0,56.36-10.606,77.995-32.241 l116.713-116.713l116.713,116.713c21.655,21.655,49.814,32.241,77.995,32.241c18.311,0,36.236-4.577,52.575-13.513 c9.81-5.364,11.701-18.662,3.809-26.554L327.102,273.972z M447.841,58.431l23.701,23.7l-23.701,23.7l-23.7-23.7L447.841,58.431z M400.44,105.833l23.7,23.7l-23.702,23.702l-23.7-23.7L400.44,105.833z M353.038,153.234l23.7,23.7l-23.7,23.7l-23.7-23.7 L353.038,153.234z M40.46,82.132l23.7-23.7l23.7,23.7l-23.7,23.7L40.46,82.132z M111.562,153.234l-23.702-23.702l23.7-23.7 l23.702,23.702L111.562,153.234z M158.963,200.635l-23.7-23.7l23.7-23.7l23.7,23.7L158.963,200.635z M182.665,224.335l23.7-23.7 l25.936,25.935L208.6,250.271L182.665,224.335z M115.586,438.086c-18.122,18.123-44.025,25.567-68.403,21.001l258.453-258.452 l23.701,23.7L115.586,438.086z M396.414,438.087L279.701,321.373l23.702-23.702l161.415,161.417 C440.439,463.657,414.537,456.208,396.414,438.087z"></path>
        </g>
      </g>
    </svg>
      </div>
      <Menu className="flex justify-end !mt-7 ">
        <MenuHandler>
          <Avatar
            variant="circular"
            alt="tania andrew"
            className="cursor-pointer mt-5 absolute bottom-5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </MenuHandler>
        <MenuList>
          <MenuItem className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
                fill="#90A4AE"
              />
            </svg>

            <Typography variant="small" className="font-medium">
              My Profile
            </Typography>
          </MenuItem>
          <MenuItem className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.48999 1.17C9.10999 -0.39 6.88999 -0.39 6.50999 1.17C6.45326 1.40442 6.34198 1.62213 6.18522 1.80541C6.02845 1.9887 5.83063 2.13238 5.60784 2.22477C5.38505 2.31716 5.1436 2.35564 4.90313 2.33709C4.66266 2.31854 4.42997 2.24347 4.22399 2.118C2.85199 1.282 1.28199 2.852 2.11799 4.224C2.65799 5.11 2.17899 6.266 1.17099 6.511C-0.390006 6.89 -0.390006 9.111 1.17099 9.489C1.40547 9.54581 1.62322 9.65719 1.80651 9.81407C1.98979 9.97096 2.13343 10.1689 2.22573 10.3918C2.31803 10.6147 2.35639 10.8563 2.33766 11.0968C2.31894 11.3373 2.24367 11.5701 2.11799 11.776C1.28199 13.148 2.85199 14.718 4.22399 13.882C4.42993 13.7563 4.66265 13.6811 4.90318 13.6623C5.14371 13.6436 5.38527 13.682 5.60817 13.7743C5.83108 13.8666 6.02904 14.0102 6.18592 14.1935C6.34281 14.3768 6.45419 14.5945 6.51099 14.829C6.88999 16.39 9.11099 16.39 9.48899 14.829C9.54599 14.5946 9.65748 14.377 9.8144 14.1939C9.97132 14.0107 10.1692 13.8672 10.3921 13.7749C10.6149 13.6826 10.8564 13.6442 11.0969 13.6628C11.3373 13.6815 11.57 13.7565 11.776 13.882C13.148 14.718 14.718 13.148 13.882 11.776C13.7565 11.57 13.6815 11.3373 13.6628 11.0969C13.6442 10.8564 13.6826 10.6149 13.7749 10.3921C13.8672 10.1692 14.0107 9.97133 14.1939 9.81441C14.377 9.65749 14.5946 9.546 14.829 9.489C16.39 9.11 16.39 6.889 14.829 6.511C14.5945 6.45419 14.3768 6.34281 14.1935 6.18593C14.0102 6.02904 13.8666 5.83109 13.7743 5.60818C13.682 5.38527 13.6436 5.14372 13.6623 4.90318C13.681 4.66265 13.7563 4.42994 13.882 4.224C14.718 2.852 13.148 1.282 11.776 2.118C11.5701 2.24368 11.3373 2.31895 11.0968 2.33767C10.8563 2.35639 10.6147 2.31804 10.3918 2.22574C10.1689 2.13344 9.97095 1.9898 9.81407 1.80651C9.65718 1.62323 9.5458 1.40548 9.48899 1.171L9.48999 1.17ZM7.99999 11C8.79564 11 9.55871 10.6839 10.1213 10.1213C10.6839 9.55871 11 8.79565 11 8C11 7.20435 10.6839 6.44129 10.1213 5.87868C9.55871 5.31607 8.79564 5 7.99999 5C7.20434 5 6.44128 5.31607 5.87867 5.87868C5.31606 6.44129 4.99999 7.20435 4.99999 8C4.99999 8.79565 5.31606 9.55871 5.87867 10.1213C6.44128 10.6839 7.20434 11 7.99999 11Z"
                fill="#90A4AE"
              />
            </svg>

            <Typography variant="small" className="font-medium">
              Edit Profile
            </Typography>
          </MenuItem>

          <hr className="my-2 border-blue-gray-50" />
          <MenuItem className="flex items-center gap-2 ">
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                fill="#90A4AE"
              />
            </svg>
            <Typography
              onClick={(e) => logout(e)}
              variant="small"
              className="font-medium"
            >
              Sign Out
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
