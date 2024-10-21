import Spinner from "./Spinner";
import Message from "./Message";
import { CitiesTypes } from "../App";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";

type CountryListProps = {
    cities: CitiesTypes[];
    isLoading: boolean;
}

const CountryList = ({cities, isLoading}: CountryListProps) => {
   if (isLoading) return <Spinner />;

   if (!cities.length) return (
   <Message message="Add your first city by clicking on a city on the map"/>
   );

   const countries = cities.reduce((arr: any[], city) => {
    if (!arr.map((el: any) => el.country).includes(city.country))
      return [...arr, {country: city.country, emoji: city.emoji}];
      else return arr;
   }, []);

  
    return (
    <ul className={styles.countryList}>
        {countries.map((country: any) => <CountryItem country={country} key={country.country}/>)}
    </ul>
  )
}

export default CountryList