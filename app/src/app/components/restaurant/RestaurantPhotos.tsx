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
        <section className="w-full h-[calc(100vh-72px)] bg-flora-white">
        <div className="flex flex-col justify-start h-full">
            <div className="bg-whisper-white rounded-lg h-[700px] w-full"></div>
            <div className="flex space-x-2 w-full pt-3">
                <div className="w-1/2 bg-whisper-white h-52 rounded-lg"></div>
                <div className="w-1/2 bg-whisper-white h-52 rounded-lg"></div>
            </div>
        </div>
        </section>
    );
};