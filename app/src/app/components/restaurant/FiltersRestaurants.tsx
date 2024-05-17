import { FC, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { City } from "../../../../types/databaseTable";

interface FiltersRestaurantsProps {
  selectedFilters: any;
  setSelectedFilters: any;
}

export const FiltersRestaurants: FC<FiltersRestaurantsProps> = ({
  selectedFilters,
  setSelectedFilters,
}) => {
  const [cities, setCities] = useState([]);
  const [frameAmbiances, setFrameAmbiances] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [cookingTypes, setCookingTypes] = useState([]);

  useEffect(() => {
    (async () => {
      const cities = await fetch("/api/city");
      const resp_cities = await cities.json();
      if (resp_cities.error) {
        console.error(resp_cities.error);
        return;
      }
      setCities(resp_cities);
      const frameAmbiances = await fetch("/api/frame_ambiance");
      const resp_frameAmbiances = await frameAmbiances.json();
      if (resp_frameAmbiances.error) {
        console.error(resp_frameAmbiances.error);
        return;
      }
      setFrameAmbiances(resp_frameAmbiances);
      const dishes = await fetch("/api/dish");
      const resp_dishes = await dishes.json();
      if (resp_dishes.error) {
        console.error(resp_dishes.error);
        return;
      }
      setDishes(resp_dishes);
      const cookingTypes = await fetch("/api/cooking_type");
      const resp_cookingTypes = await cookingTypes.json();
      if (resp_cookingTypes.error) {
        console.error(resp_cookingTypes.error);
        return;
      }
      setCookingTypes(resp_cookingTypes);
    })();
  }, []);

  const handleChangeFilter = (value: string, filterName: string) => {
    setSelectedFilters((prevState: any) => ({
      ...prevState,
      [filterName]: value,
    }));
  };

  return (
    <div>
      <Select
        onValueChange={(value: string) => handleChangeFilter(value, "city")}
      >
        <SelectTrigger className="w-[180px]">
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
      <Select onValueChange={(value: string) => handleChangeFilter(value, "frameAmbiance")}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Cadre et ambiance" />
        </SelectTrigger>
        <SelectContent>
          {frameAmbiances.map((frameAmbiances: any) => {
            return (
              <SelectItem
                value={String(frameAmbiances.id)}
                key={frameAmbiances.id}
              >
                {frameAmbiances.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Select onValueChange={(value: string) => handleChangeFilter(value, "dish")}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Plats" />
        </SelectTrigger>
        <SelectContent>
          {dishes.map((dishe: any) => {
            return (
              <SelectItem value={String(dishe.id)} key={dishe.id}>
                {dishe.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Select onValueChange={(value: string) => handleChangeFilter(value, "cookingType")}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type de cuisine" />
        </SelectTrigger>
        <SelectContent>
          {cookingTypes.map((cookingType: any) => {
            return (
              <SelectItem value={String(cookingType.id)} key={cookingType.id}>
                {cookingType.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
