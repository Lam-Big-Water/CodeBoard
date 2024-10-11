import { ReactNode } from "react"

type FooterProps = {
    children: ReactNode
}

const Footer = ({children}: FooterProps) => {
  return (
    <footer>
        {children}
    </footer>
  )
}

export default Footer