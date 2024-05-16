import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export const Autocomplete: React.FC = () => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  const [selectedCity, setSelectedCity] = useState<any>("");

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    setAutocompleteResults([]);
  }

  const handleCity = (e: any) => {
    setSelectedCity(e.target.value);
  }

  const handleRestaurantClick = (e: any) => {
    setSearch("");
    setAutocompleteResults([]);
  }

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/city");
      const data = await resp.json();
      setCities(data);
    })();
  }, []);
  
  useEffect(() => {
    if (search === "") return;
    (async () => {
        const resp = await fetch(`/api/restaurant/search?city=${selectedCity}&restaurant_name=${search}`);
        const data = await resp.json();
        setAutocompleteResults(data);
    })();
  }, [search]);

  return (
    <>
      <div className="rounded-lg border border-green-100">
        <div className="flex items-center">
            <select className="w-40" onChange={(e) =>(handleCity(e))}>
                <option value="">Toutes les villes</option>
                {cities.map((city: any) => {
                    return <option key={city.id} value={city.name}>{city.name}</option>;
                })}
            </select>
            <Input placeholder="Rechercher un restaurant" onChange={(e) => (handleSearch(e))} />
            <Button variant="outline" size="sm">Rechercher</Button>
        </div>
      </div>
      <div className="mt-4">
        {autocompleteResults.map((result: any) => (
          <div key={result.id} className="bg-gray-100 p-2 rounded-lg">
            <Link href={`/restaurant/${result.id}`} onClick={(e) => (handleRestaurantClick(e))}>
              {result.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
