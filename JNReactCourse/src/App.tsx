import './style.scss';

type DataType = {
  name: string;
  ingredients: string;
  price: number;
  photoName: string;
  soldOut: boolean;
}

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

const App = () => {
  // const [data, setData] = useState<DataType[] | []>([]);

  return (
    <div className="menu">
      <header className="menu-header">
        <h1 className="menu-header--f_title">Fast React Pizza Co.</h1>
        <p className="menu-header--s_title">our menu</p>
        <p className="menu-header--info">Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.</p>
      </header>
      <main className="menu-items">
        {pizzaData.map((d) => <Items key={d.name} item={d}/>)}
      </main>
      <Footer />
    </div>
  )
}

type ItemProps = {item: DataType}

const Items = ({item}: ItemProps) => {
  return (
    <div className={item.soldOut ? "menu-items--dishes soldOut" : "menu-items--dishes"}>
          <img className='menu-items--dishes--picture' src={item.photoName} alt={item.name} />
          <div className="menu-items--dishes--content">
            <h3>{item.name}</h3>
            <p>{item.ingredients}</p>
            <span>{item.soldOut ? `Sold Out` : item.price}</span>
          </div>
      </div>
  )
}

const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  return (
      <footer className="menu-footer">
        {isOpen ? (
          <Order closeHour={closeHour} openHour={openHour} />
        ) : (
          <p>We're happy to welcome you between 12:00 and 22:00.</p>
        )}
      </footer>
  )
}

type OrderProps = {closeHour: number; openHour: number;}

const Order = ({closeHour, openHour}: OrderProps) => {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order online.
      </p>
      <button>Order</button>
    </div>
  )
}

export default App