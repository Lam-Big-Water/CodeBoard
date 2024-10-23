import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { CitiesTypes } from "../App";

const BASE_URL = "http://localhost:8000";

type CitiesContextType = {
    cities: CitiesTypes[];
    isLoading: boolean;
    getCity: (id: number) => Promise<void>;
    currentCity: CitiesTypes | null;
    createCity: (newCity: NewCityType) => Promise<void>;
    deleteCity: (id: number) => Promise<void>;
}

type NewCityType = {
    cityName: string;
    country: string;
    emoji: string;
    date: Date;
    notes: string;
    position: {
        lat: number;
        lng: number;
    }
}

/*
{
    cityName: 'Puebla Tornesa',
    country: 'Spain',
    emoji: '🇪🇸',
    date: new Date('2024-10-23T02:54:58.000Z'),
    notes: 'lovesong',
    position: { lat: 40.096440469802246, lng: 0.0017381269254279632 }
  }
*/

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);



function CitiesProvider ({children}:{children: ReactNode}) {
    const [cities, setCities] = useState<CitiesTypes[] | []>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState<CitiesTypes | null>(null);
    console.log(currentCity);
    useEffect(function () {
        async function fetchCities () {
            try {
                setIsLoading(true);
                // const res = await fetch(`${BASE_URL}/cities`);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                alert("There was an error loading data...");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    async function getCity (id: number) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            alert("There was an error loading data...");
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity (newCity: NewCityType) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setCities((cities) => [...cities, data]);
        } catch {
            alert("There was an error creating city.");
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity (id: number) {
        try {
            setIsLoading(true);
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
                
            });
            setCities((cities) => cities.filter(city => city.id !== id));
        } catch {
            alert("There was an error deleting city.");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity
            }}
        >
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("CitiesContext was used outside the CitiesProvider");
        return context;
}

export {CitiesProvider, useCities}