import React from "react";
import { Separator } from "@/components/ui/separator";
const OrSeparator = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Separator className="text-white w-[45%]" />
      OR
      <Separator className="text-white w-[45%]" />
    </div>
  );
};

export default OrSeparator;
