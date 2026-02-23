import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelcius";
import Container from "./Container"
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails"
import WeatherIcon from "./weatherIcon"

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(props: ForecastWeatherDetailProps) {
  const {
  weatherIcon = "02d",
  date = "19.09",
  day = "Wednessday",
  temp = 0,
  feels_like = 0, 
  temp_min = 0,
  temp_max = 0,
  description
  } = props;

  return (
    <Container className="gap-4">
      {/* left */}
      <section className="flex gap-4 items-center px-4">
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>       

        {/*  */}
        <div className="flex flex-col px-4">
          <span className="text-5xl "> {convertKelvinToCelsius(Number(temp) ?? 0)}°</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span> Feels like</span>
            <span>{convertKelvinToCelsius(Number(feels_like) ?? 0)}°</span>
          </p>
        </div>
      </section>
      {/* right */}
      <section className="overflow-x-auto w-full px-4">
        <div className="flex gap-4 min-w-[400px] justify-between">
          <WeatherDetails {...props} />
        </div>
      </section>
    </Container>
  )
}