import React from "react";

type ButtonProps = {
  onButtonClick: (text: string) => void;
  children: JSX.Element | string;
};

export const Button = ({ onButtonClick, children }: ButtonProps) => {
  return <button onClick={() => onButtonClick("test123")}>{children}</button>;
};
