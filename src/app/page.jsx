"use client";
import { useEffect, useState } from "react";
export default function Home() {
  const [cities, setCities] = useState([]);
  const [searched, setSearched] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [city, setcity] = useState("Ulaanbaatar");

  const [weather, setweather] = useState([]);
  // search data
  async function getData() {
    const result = await fetch("https://countriesnow.space/api/v0.1/countries");
    const data = await result.json();
    let incomeCities = data.data.map((country) => {
      return country.cities;
    });
    incomeCities = incomeCities.flat();
    setCities(incomeCities);
  }

  const searchHandler = (e) => {
    getData();
    const search = e.target.value;
    setSearchValue(search);
    const filtered = cities.filter((city) => {
      if (e.target.value == 0) {
        return 0;
      } else {
        return city.toLowerCase().includes(search.toLowerCase());
      }
    });
    setSearched(filtered);
  };

  function selectcite(city) {
    getCiteData(city);
    setweather(city);
    setcity(city);
    setSearchValue("");
    setSearched([]);
  }

  async function getCiteData(city) {
    const okey = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=a474d239e7984b44bf320539250801&q=${city}`
    );
    const data = await okey.json();
    console.log(data.forecast.forecastday[0].day.maxtemp_c);
    setweather([
      {
        temp: data.forecast.forecastday[0].day.maxtemp_c,
        text: data.forecast.forecastday[0].hour[13].condition.text,
        time: data.current.last_updated,
      },
      {
        temp: data.forecast.forecastday[0].day.mintemp_c,
        text: data.forecast.forecastday[0].hour[23].condition.text,
        time: data.current.last_updated,
      },
    ]);
  }

  const daytypeimg = () => {
    if (!weather[0]?.text) return null; // Guard clause
    const t = weather[0]?.text.toLowerCase();
    switch (true) {
      case t.includes("sun"):
        return <img src="Sun.png" alt="" />;
      case t.includes("rain"):
        return <img src="Rain.png" alt="" />;
      case t.includes("cloud"):
        return <img src="Clouds.png" alt="" />;
      case t.includes("mist"):
        return <img src="Clouds.png" alt="" />;
      case t.includes("snow"):
        return <img src="Snow.png" alt="" />;
      case t.includes("freez"):
        return <img src="Snow.png" alt="" />;
      case t.includes("wind"):
        return <img src="Clouds.png" alt="" />;
      case t.includes("overcast"):
        return <img src="Clouds.png" alt="" />;
      case t.includes("thunder"):
        return <img src="thunder.png" alt="" />;
    }
  };
    const renderWeatherIcon = () => {
      if (!weather[1]?.text) return null; // Guard clause
      const res = weather[1]?.text.toLowerCase();

      switch (true) {
        case res.includes("clear"):
          return <img src="clearnight.png" alt="" />;
        case res.includes("rain"):
          return <img src="rainnight.png" alt="" />;
        case res.includes("cloud"):
          return <img src="cloudnight.png" alt="" />;
        case res.includes("mist"):
          return <img src="cloudnight.png" alt="" />;
        case res.includes("snow"):
          return <img src="snownight.png" alt="" />;
        case res.includes("freez"):
          return <img src="snownight.png" alt="" />;
        case res.includes("wind"):
          return <img src="windnight.png" alt="" />;
        case res.includes("overcast"):
          return <img src="windnight.png" alt="" />;
        case res.includes("thunder"):
          return <img src="thunderstormnight.png" alt="" />;
      }
    };

  useEffect(() => {
    getCiteData(city);
    // console.log(weather);
  }, []);
  // console.log(weather[0]?.time);
  // getCiteData()

  return (
    <div className="relative bg-[#F3F4F6] h-[100vh] w-[100vw]  overflow-hidden">
      <div className="absolute w-full h-full flex">
        <div className="w-full h-full flex">
          <div className="w-1/2 h-full bg-[#F3F4F6]"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="1200"
            viewBox="0 0 800 1200"
            fill="none"
          >
            <path
              d="M800 0H0V497C0 510.807 11.4776 521.604 24.5822 525.953C55.6155 536.25 78 565.511 78 600C78 634.489 55.6155 663.75 24.5822 674.047C11.4776 678.396 0 689.193 0 703V1150C0 1177.61 22.3858 1200 50 1200H800V0Z"
              fill="#0F141E"
            />
          </svg>
        </div>
        <div className="absolute h-full w-[500px] bg-[#0F141E] right-0"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[140px] h-[140px] right-[47vw] top-[530px]"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[340px] h-[340px] right-[950px] top-[430px]"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[540px] h-[540px] right-[850px] top-[330px]"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[940px] h-[940px] right-[650px] top-[130px]"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[1340px] h-[1340px] right-[450px] top-[-70px]"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[1740px] h-[1740px] right-[250px] top-[-270px]"></div>
        <img src="sun.svg" className="absolute left-[280px] top-[127px]" />

        <div className="absolute w-1/2 h-full left-0 top-0 flex justify-center items-center">
          <div className="w-[414px] h-[828px] backdrop-blur-[12px] shadow-2xl bg-[rgba[10,10,10,1]] rounded-[48px]">
            <p className="text-gray-400 ml-[40px] mt-[56px]">
              {weather[0]?.time}
            </p>
            <h2 className=" ml-[40px] mt-[5px] text-[#111827] text-5xl font-extrabold">
              {city}
            </h2>
            <div className="w-[100%] flex justify-center mt-12">
              {daytypeimg()}
            </div>
            <div className="flex justify-center ">
              <p className="text-transparent bg-clip-text font-extrabold text-[110px] -mt-10 bg-gradient-to-b from-black to-white">
                {weather[0]?.temp}˚
              </p>
            </div>
            <p className="font-extrabold mb-12 h-6 text-[#FF8E27]">
              {weather[0]?.text}
            </p>
          </div>
        </div>

        <div className="absolute w-1/2 h-full right-0 top-0 flex justify-center items-center">
          <div className="w-[414px] h-[828px] backdrop-blur-[12px] shadow-2xl bg-[rgba[10,10,10,1]] rounded-[48px]">
            <p className="text-gray-400 ml-[40px] mt-[56px]">
              {weather[1]?.time}
            </p>
            <h2 className=" ml-[40px] mt-[5px] text-[#ffffff] text-5xl font-extrabold">
              {city}
            </h2>
            <div className="w-[100%] flex justify-center mt-12">
              {renderWeatherIcon()}
            </div>
            <div className="flex justify-center ">
              <p className="text-transparent bg-clip-text font-extrabold text-[110px] -mt-10 bg-gradient-to-b from-black to-white">
                {weather[1]?.temp}˚
              </p>
            </div>
            <p className="font-extrabold mb-12 h-6 text-[#FF8E27]">
              {weather[1]?.text}
            </p>
          </div>
        </div>

        {/* cart */}
        <div className="absolute top-[90px] left-[200px]">
          <div className=" w-[567px] h-[80px] bg-[#FFF] rounded-[48px] flex items-center">
            <img
              src="/search.svg"
              alt=""
              className="w-[48px] h-[48px] ml-[24px]"
            />
            <input
              value={searchValue}
              type="text"
              className="border-none text-black"
              onChange={searchHandler}
            />
          </div>
          <div className="w-[512px] mt-[10px] bg-gray-100/75 backdrop-blur-[12px]">
            {searched.length > 0 &&
              searched.slice(0, 4).map((city) => (
                <p
                  className="text-black h-[80px] p-[20px] ml-[15px] text-[20px]"
                  onClick={() => {
                    selectcite(city);
                  }}
                >
                  {city}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
