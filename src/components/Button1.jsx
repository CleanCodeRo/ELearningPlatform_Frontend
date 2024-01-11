import React from "react";
import { Button } from "@material-tailwind/react";

export default function Button1({text, event}){
    return(
        <Button variant="text" className="rounded-lg mx-1 text-lg capitalize">
         {text}
      </Button>
    )
}