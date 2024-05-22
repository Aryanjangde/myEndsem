import { useContext, useEffect, useState } from "react";
import { ApiContext } from "./contextFolder/Context";
import { Carousel } from "primereact/carousel";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoModal";

function CardDashboard({ _id, thumbnail, keywords }) {
    const [isHovered, setIsHovered] = useState(false);
    const [video, setVideo] = useState(null);
    const nav = useNavigate();
  
    function handleVideo() {
      if (localStorage.getItem("user")) {
        fetch(`https://academics.newtonschool.co/api/v1/ottx/show/${_id}`, {
          method: "GET",
          headers: {
            "accept": "application/json",
            "projectID": "treoo5dhf86s",
            "Authorization": `Bearer ${localStorage.getItem("user")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.data.video_url);
            setVideo(data.data.video_url);
          });
      } else {
        nav("/login");
      }
    }
    return (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative rounded-xl flex-col justify-center items-center transition-all duration-300 ease-in-out p-4 shadow-lg transform ${
            isHovered ? "bg-violet-400 text-black scale-105 z-50 rounded-full" : "bg-black text-white scale-100"
          }`}
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          <div className="self-center rounded-xl overflow-hidden">
            <img src={thumbnail} className="rounded-xl w-full h-auto" />
          </div>
          
          {isHovered && (
            <>
            <div className="flex gap-2 p-4 flex-wrap justify-center">
            {keywords.map((item, index) => (
              <span
                key={index}
                className={`${
                  isHovered ? "bg-white text-black" : "bg-gray-700 text-white"
                } rounded-full px-3 py-1 text-sm transition-all duration-300 ease-in-out`}
              >
                {item}
              </span>
            ))}
          </div>
            <button
              className="bg-white text-black rounded-2xl px-5 py-3   mt-2 mb-2 border-2 border-blue-700 transition-colors duration-200 hover:bg-red-50"
              onClick={handleVideo}
            >
              Watch
            </button>
            </>
          )}
        </div>
        
      );
    }

export default function CarouselSpace() {
  const [categoryList, setCategoryList] = useState([]);
  const [curr, setCurr] = useState("movie");
  const value = useContext(ApiContext);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    async function fetchCategoryList() {
      let res = await fetch(
        "https://academics.newtonschool.co/api/v1/ottx/categories",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            projectID: "treoo5dhf86s",
          },
        }
      );
      let data = await res.json();
      if (data.message === "success") {
        setCategoryList(data.data);
      } else {
        navigate("/error");
      }
    }
    fetchCategoryList();
  }, []);

  const CategoryWise = {};
  if (categoryList.length !== 0) {
    categoryList.forEach((item) => {
      const List = value.data.filter((itm) => itm.type === item);
      CategoryWise[item] = List;
    });
  }
  console.log(value.data);

  const options = [
    "movie",
    "tv show",
    "web series",
    "documentary",
    "short film",
    "video song",
    "trailer",
  ];

  return (
    <div className="flex-col text-white mt-16 p-14 space-y-10">
      <div className="text-5xl font-bold">Trending Movies</div>
      <div>
        <Carousel
          value={value.data}
          numVisible={5}
          numScroll={2}
          className="custom-carousel"
          circular
          itemTemplate={CardDashboard}
        />
      </div>

      <div className="flex justify-between">
      <div className="text-5xl font-bold capitalize p-5">{curr}</div>
        <select
          onChange={(e) => {
            setCurr(e.target.value);
          }}
          className="bg-gray-700 text-white pl-3 pr-3 rounded-xl"
        >
          {options.map((option) => (
            <option key={option} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Carousel
          value={CategoryWise[curr] || []}
          numVisible={5}
          numScroll={2}
          className="custom-carousel"
          circular
          itemTemplate={CardDashboard}
        />
      </div>
    </div>
  );
}
