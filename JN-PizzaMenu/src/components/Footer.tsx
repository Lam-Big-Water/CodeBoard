const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <div className="flex flex-col items-center border-b-8 border-yellow-400">
      <h3 className="py-6 text-base font-light">
        {isOpen ? "We're open from 12:00 to 22:00. Come visit us or order online." : "We're happy to welcome you between 12:00 and 22:00"}
      </h3>
      <button
        className="
        bg-orange-500
        text-white
        active:bg-orange-600
        font-bold
        uppercase
        text-xs
        px-6
        py-3
        rounded
        shadow
        hover:shadow-md
        outline-none
        focus:outline-none
        mr-1
        mb-6
        ease-linear
        transition-all
        duration-150
        "
        type="button"
      >
        Order
      </button>
    </div>
  );
};

export default Footer;
