import React, { ReactNode } from "react";

const Button = ({
  onClick,
  children,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="p-5 px-10 bg-[#83b34dda] cursor-pointer hover:bg-[#83b34d] rounded-2xl font-semibold text-2xl"
    >
      {children}
    </div>
  );
};

export default Button;
