import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { City } from "../../../../types/databaseTable";
import Link from "next/link";
import { Salad } from "lucide-react";

export const Autocomplete: React.FC = () => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedCity, setSelectedCity] = useState<any>("");
  const [resultSearch, setResultSearch] = useState<any>([]);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleCity = (e: any) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/city");
      const data = await resp.json();
      setCities(data);
    })();
  }, []);

  useEffect(() => {
    if (search === "") return;
    console.log(selectedCity);
    console.log(search);
    (async () => {
      const resp = await fetch(
        `/api/restaurant/search?city=${selectedCity}&restaurant_name=${search}`
      );
      const data = await resp.json();
      console.log(data);
      if (data.length > 0) {
        setResultSearch(data);
      }
    })();
  }, [search]);

  return (
    <>
      <div className="rounded-lg bg-whisper-white border border-skyline-border px-0.5">
        <div className="flex items-center">
          <Select onValueChange={(e) => handleCity(e)}>
            <SelectTrigger className="w-[230px] bg-whisper-white">
              <SelectValue placeholder="Ville" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city: City) => {
                return (
                  <SelectItem value={String(city.id)} key={city.id}>
                    {city.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <div className="relative">
            <div className="flex items-center bg-whisper-white rounded-r-lg p-0.5">
              <Input
                placeholder="Rechercher un restaurant"
                onChange={(e) => handleSearch(e)}
                className="bg-whisper-white border-transparent"
              />
              <Button size="sm" className="bg-sunshine-yellow text-midnight-black font-semibold">
                Rechercher
              </Button>
            </div>
            {resultSearch.length > 0 && search.length > 0 && (
              <div className="absolute w-full bg-flora-white rounded-b-lg shadow-lg">
                <div className="bg-ecalyptus-green rounded-lg p-2">
                  <Link href={"/restaurants"} className="flex ,items-center space-x-3">
                    <Salad />
                    <h4>Retrouvez tous les restaurants</h4>
                  </Link>
                </div>
                {resultSearch.map((restaurant: any) => {
                  return (
                    <>
                      <div
                        key={restaurant.id}
                        className="p-2 min-h-8 hover:bg-gray-200 text-midnight-black"
                      >
                        <Link
                          href={`/restaurant/${restaurant.id}`}
                          className="flex flex-col space-y-2"
                        >
                          <h4 className="font-semibold">{restaurant.name}</h4>
                          <p className="font-normal text-sm text-dark-black">
                            {resultSearch.address}
                          </p>
                        </Link>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
