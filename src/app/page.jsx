"use client";
import { useState } from "react";
export default function Home() {
  const [cities, setCities] = useState([]);
  const [searched, setSearched] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [daytype, setdaytype] = useState("");
  const [temp, settemp] = useState("");
  const [city, setcity] = useState("Ulaanbaatar");
  
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
    console.log(getCiteData());
    setcity(city);
    setSearchValue("");
    setSearched([]);
  }
  async function getCiteData() {
    const okey = await fetch("https://api.weatherapi.com/v1/forecast.json?key=a474d239e7984b44bf320539250801&q=Ulaanbaatar");
    const data = await okey.json();
    settemp(data.current.temp_c);
    setdaytype(data.current.condition.text);
    };


  return (
    <div className="relative bg-[#F3F4F6] h-[100vh] w-[100vw]  overflow-hidden">
      <div className="absolute w-full h-full flex">
        <div className="w-full h-full flex">
          <div className="w-1/2 h-full bg-[#F3F4F6]"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200" fill="none">
            <path d="M800 0H0V497C0 510.807 11.4776 521.604 24.5822 525.953C55.6155 536.25 78 565.511 78 600C78 634.489 55.6155 663.75 24.5822 674.047C11.4776 678.396 0 689.193 0 703V1150C0 1177.61 22.3858 1200 50 1200H800V0Z" fill="#0F141E" />
          </svg>
        </div>
        <div className="absolute h-full w-[500px] bg-[#0F141E] right-0"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[140px] h-[140px] right-[47vw] top-[530px]"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[340px] h-[340px] right-[950px] top-[430px]"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[540px] h-[540px] right-[850px] top-[330px]"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[940px] h-[940px] right-[650px] top-[130px]"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[1340px] h-[1340px] right-[450px] top-[-70px]"></div>
        <div className="absolute border border-gray-500/50 rounded-full w-[1740px] h-[1740px] right-[250px] top-[-270px]"></div>
        {/* <div> <img src={sun} alt="loading..." /></div>
        <div> <img src={moon} alt="loading..." /></div> */}
        <div className="absolute w-1/2 h-full left-0 top-0 flex justify-center items-center">
          <div className="w-[414px] h-[828px] backdrop-blur-[12px] drop-shadow-2xl bg-white">
            <p>{Date()}</p>
            <h2 className="text-black">{city}</h2>
            <p>{daytype}</p>
            <p>{temp}</p>
          </div>
        </div>
        <div className="absolute top-[90px] left-[200px]">
          <div className=" w-[567px] h-[80px] bg-[#FFF] rounded-[48px] flex items-center">
            <img src="/search.svg" alt="" className="w-[48px] h-[48px] ml-[24px]"/>
            <input value={searchValue} type="text" className="border-none text-black" onChange={searchHandler}/>
          </div>
          <div className="">
            {searched.length > 0 && searched.slice(0, 10).map((city) => (
              <p className="text-black" onClick={() => {selectcite(city)}}>{city}</p>))}
          </div>
        </div>
      </div>
    </div>
  );
}
