import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export const Autocomplete: React.FC = () => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedCity, setSelectedCity] = useState<any>("");

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  }

  const handleCity = (e: any) => {
    setSelectedCity(e.target.value);
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
    console.log(selectedCity)
    console.log(search);
    (async () => {
        const resp = await fetch(`/api/restaurant/search?city=${selectedCity}&restaurant_name=${search}`);
        const data = await resp.json();
        console.log(data);
    })();
  }, [search]);

  return (
    <>
      <div className="rounded-lg border border-green-100">
        <div className="flex items-center">
            <select className="w-40" onChange={(e) =>(handleCity(e))}>
                <option value="">Ville</option>
                {cities.map((city: any) => {
                    return <option key={city.id} value={city.id}>{city.name}</option>;
                })}
            </select>
            <Input placeholder="Rechercher un restaurant" onChange={(e) => (handleSearch(e))} />
        </div>
      </div>
    </>
  );
};
