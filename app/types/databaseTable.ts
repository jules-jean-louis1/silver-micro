export type Restaurant = {
  id: number;
  name: string;
  seat: number;
  description: string;
  close_monday: boolean;
  close_tuesday: boolean;
  opening_time: string;
  closing_time: string;
  address: string;
  restaurant_menus: Menu[];
  cooking_types: CookingType[];
  frame_ambiences: FrameAmbience[];
  dishes: Dish[];
  cities: City[];
};
export type Menu = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  status: string | null;
  restaurant_id: number;
};

export type CookingType = {
  id: number;
  name: string;
};

export type FrameAmbience = {
  id: number;
  name: string;
  frame_ambience_restaurant: {
    restaurant_id: number;
    frame_ambience_id: number;
  };
};

export type Dish = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  name: string;
  city_restaurant: {
    restaurant_id: number;
    city_id: number;
  };
};
