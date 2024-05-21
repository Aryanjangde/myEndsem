import { useContext, useEffect, useState } from "react";
import { ApiContext } from "./contextFolder/Context";
import { Carousel } from "primereact/carousel";
import { useNavigate } from "react-router-dom";


function CardDashboard({ _id, thumbnail, keywords }) {
    const [isHovered, setIsHovered] = useState(false);
    const [video, setVideo] = useState(null);
    const nav = useNavigate();

    function handleVideo(){
        if(localStorage.getItem("user")){
            fetch(`https://academics.newtonschool.co/api/v1/ottx/show/${_id}`,{
            method:"GET",
            headers:{
                "accept":"application/json",
                "projectID":"treoo5dhf86s",
                "Authorization": `Bearer ${localStorage.getItem("user")}`
            }
        }).then((res)=> res.json())
        .then((data)=>{
            console.log(data.data.video_url)
            setVideo(data.data.video_url);
        })
        }
        else{
            nav("/login")
        }
        
    }
    return (
      <div onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} className={`${isHovered ? "bg-white rounded-xl" : "bg-black rounded-xl"} flex-col justify-center items-center`}>
            <div className="self-center rounded-xl ">
              <img src={thumbnail} className="text-black top-2 p-4 " />
            </div>
            <div className="flex gap-2 text-black p-4">
              {keywords.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
            {isHovered && 
            <button className="p-3 bg-white text-black rounded-2xl pl-5 pr-5 border-2 ml-4 mb-4" onClick={handleVideo}>
              Watch
            </button>
}
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
        'movie',
        'tv show',
        'web series',
        'documentary',
        'short film',
        'video song',
        'trailer',
      ];

  return (
    <div className="flex-col text-white mt-16 p-14">
      <div className="text-5xl">Trending Movies</div>
      <br />
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
      <div className="flex justify-end">
        <select onChange={(e)=>{console.log(e.target.value, 'arst');setCurr(e.target.value)}}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        </select>
      </div>
      <div>
        <div className="text-5xl">{curr}</div>
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
