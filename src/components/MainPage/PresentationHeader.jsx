import {
  Popover,
  PopoverHandler,
  Button,
} from "@material-tailwind/react";

const PresentationHeader = () => {
  return (
    <div className="bg-black-200">
      <div className="bg-black">
        <img className="w-20" src="/images/CleanCode-removebg-preview.png" />

        <Popover>
          <PopoverHandler>
            <Button>Login</Button>
          </PopoverHandler>
        </Popover>
      </div>
    </div>
  );
};
export default PresentationHeader;
