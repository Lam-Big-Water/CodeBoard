import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
export default function App() {
  return (
    <div className="max-w-[80rem] h-screen mx-auto bg-amber-50">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}