"use client";
import { useEffect } from "react";

export const RestaurantPhotos = () => {
    useEffect(() => {
        (async () => {
            const photos = await fetch(`https://api.unsplash.com/search/photos?query=restaurant&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
            const data = await photos.json();
            console.log(data);
        })();
    }, []);

    return (
        <section className="w-full h-[calc(100vh-56px)] bg-flora-white">
        <div className="flex justify-center items-center h-full">
            <h2 className="text-3xl text-green-olive">Photos du restaurant</h2>
        </div>
        </section>
    );
};