import { ReactNode } from "react"

type InputProps = {
    children: ReactNode;
    val: string;
    onChangeValue: (val: string) => void;
}

const Input = ({children, val, onChangeValue}: InputProps) => {
  return (
    <div className="flex flex-row justify-between">
        <label>{children}</label>
        <input value={val} onChange={(e) => onChangeValue(e.target.value)} />
    </div>
  )
}

export default Input