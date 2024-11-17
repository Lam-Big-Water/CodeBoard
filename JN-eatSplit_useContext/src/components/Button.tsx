import { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    handleClick?: () => void;
}

const Button = ({children, handleClick}: ButtonProps) => {
  return (
    <button
      type="button"
      className="w-20 ml-auto bg-red-500 px-4 py-2 text-cyan-50"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default Button