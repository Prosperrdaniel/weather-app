"use client";

import { format, fromUnixTime, parseISO } from "date-fns";
import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelcius";
import WeatherIcon from "@/components/weatherIcon";
import { getDayOrNightIcon } from "@/utils/dayOrNightIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/ConvertWindSpeed";
import ForecastWeatherDetail from "@/components/forecastWeatherDetail";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";
import { Key, useEffect } from "react";
import WeatherSkeleton from "./WeatherSkeleton";

// https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=0f5605ab0090c3de712745d0fbf88057&cnt=56

interface WeatherForecastResponse {
  cod: string; // API returns string e.g. "200"
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}

interface ForecastItem {
  dt: number; // Unix timestamp
  main: Main;
  weather: WeatherCondition[];
  clouds: Clouds; 
  wind: Wind;
  visibility: number;
  pop: number; // Probability of precipitation (0–1)
  sys: Sys;
  dt_txt: string; // Date string
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number; // Cloudiness %
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: "d" | "n"; // day or night
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}


export default function Home() {
  const[place, setPlace] = useAtom(placeAtom);
  const[loadingCity, setLoadingCity] = useAtom(loadingCityAtom);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["WeatherForecastResponse"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data; 
    }
  });

   useEffect(() => {
    refetch();
  }, [place, refetch]); 

const firstData = data?.list[0];


console.log('data', data  )

const uniqueDates = [
  ...new Set(
    data?.list.map(
      (entry: { dt: number; }) => new Date(entry.dt * 1000).toISOString().split("T")[0]
    )
  )
];

const firstDataForEachDate = uniqueDates.map((date) => {
  return data?.list.find((entry: { dt: number; }) => {
    const entryDate = new Date(entry.dt * 1000).toISOString().split("T") [0];
    const entryTime = new Date(entry.dt * 1000).getHours();
    return entryDate === date && entryTime >= 6;
  });
});

  if (isLoading) return <WeatherSkeleton />

  

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar location={data?.city.name}/>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4 ">
        {/* today data */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{firstData?.dt_txt ? format(parseISO(firstData.dt_txt), "EEEE") : ""}</p>
              <p className="text-lg">{firstData?.dt_txt ? format(parseISO(firstData.dt_txt), "dd.MM.yyyy") : ""}</p>
            </h2>
            <Container className=" gap-10 px-6 items-center">
              {/* temparature */}
              <div className="flex flex-col px-4">  
                <span className="text-5xl">
                  {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                </span>
                <p className="text-xs spaxe-x-1 whitespace-nowrap">
                  <span> Feels like </span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓{" "}
                  </span>
                  <span>
                    {" "}
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                  </span>
                </p>
              </div>
              {/* time and weather icon */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d: { dt_txt: string; weather: { icon: string; }[]; main: { temp: any; }; },i: Key | null | undefined)=>
                <div key={i} className="flex flex-col justify-between gap-2 items-center txt-xs font-semibold">
                  <p className="whitespace-nowrap">
                    {format(parseISO(d.dt_txt), "h:mm a")}
                  </p>
                   <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon,d.dt_txt)} />
                  <p>
                    {convertKelvinToCelsius(d?.main.temp ?? 0)}°
                  </p>
                </div>
                )}
              </div>
              
            </Container>            
          </div>
          <div className="flex gap-4">
                {/* left */}
                <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="capitalize text-center">
                    {firstData?.weather[0].description}
                  </p>
                  <WeatherIcon
                    iconName={getDayOrNightIcon(firstData?.weather[0].icon ?? "",
                      firstData?.dt_txt ?? ""
                    )} />
                </Container>
                <Container className="bg-yellow-300/80 px-4 gap-4 overflow-x-auto">
                  <div className="flex gap-4 min-w-[400px] w-full justify-between">
                    <WeatherDetails
                      visibility={metersToKilometers(firstData?.visibility ?? 1000)}
                      humidity={`${firstData?.main.humidity}%`}
                      windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
                      airPressure={`${firstData?.main.pressure} hPa`}
                      sunrise={format(fromUnixTime(data?.city.sunrise ?? 1771378263), "H:mm ")}
                      sunset={format(fromUnixTime(data?.city.sunset ?? 1771419979), "H:mm ")}
                    />
                  </div>
                </Container>              
                {/* right */}
          </div>
        </section>
        {/* 7 day forecast data */}
        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">Forecast (7 days)</p>
          {firstDataForEachDate.map((d, i) => (
            <ForecastWeatherDetail key={i} 
              description={d?.weather[0].description ?? ""}
              weatherIcon={d?.weather[0].icon ?? "01d"}
              date={format(parseISO(d?.dt_txt ?? ""), "dd.MM")}
              day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
              feels_like={d?.main.feels_like ?? 0}
              temp={d?.main.temp ?? 0}
              temp_max={d?.main.temp_max ?? 0}
              temp_min={d?.main.temp_min ?? 0}
              airPressure={`${d?.main.pressure} hPa `}
              humidity={`${d?.main.humidity}% `}
              sunrise={format(fromUnixTime(data?.city.sunrise ?? 1771378263), "H:mm ")}
              sunset={format(fromUnixTime(data?.city.sunset ?? 1771419979), "H:mm ")}
              visibility={`${metersToKilometers(d?.visibility ?? 1000)}` }
              windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
            />
          ))}          
        </section>
      </main>
    </div>
  );
}
