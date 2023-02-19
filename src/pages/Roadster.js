import useFetch from "../hooks/useFetch"
import { Loading } from "../components";
import { Link } from "react-router-dom";
import { format } from "date-fns"
import { useState } from "react";

export default function Roadster() {
    const [data] = useFetch("https://api.spacexdata.com/v4/roadster")
    const [value, setValue] = useState(0)

  return (
    <>
   {!data ? <Loading /> :  <section className="py-32 max-width">
        <h1 className="heading text-center mb-10">Elon Musk's Tesla Roadster</h1>

        <div>
            <article>
                <div className="flex flex-col">   
                   <img src={data.flickr_images[value]} alt="Elon Musk's Tesla Roadste"></img>

                    <ul className="flex items-center justify-start gap-3 flex-wrap my-5">
                        {data.flickr_images.map((image, index) =>(
                            <li key={index} onClick={() => setValue(index)} className={`cursor-pointer bg-white ${value === index && "p-1"}`}>
                                <img src={image} alt="image" className="w-20"></img>
                            </li>
                        ))}

                    </ul>


                </div>

                {/*We didnt use .map because the data that we get back is represented as an object() NOT as an array */}

                <div>
                    <p className="text-white opacity-75 ">{data.details}</p>

                    <ul className="text-white opacity-75 text-sm mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 md:mt-5">
                        <li>Launch Date:{" "}{format(new Date(data.launch_date_utc), "dd MMMM yyyy")}</li>
                        <li>Launch Mass: {data.launch_mass_kg} kg</li>
                        <li>Day Since Launch: {data.period_days} days</li>
                        <li>Speed: {data.speed_kph} kph</li>
                        <li>Distance From The Earth: {data.earth_distance_km} km</li>
                        <li>
                            <a href={data.wikipedia} target="_blank" rel="noreferrer" className="underline">Wikipedia</a>
                            
                        </li>
                        <li>
                            <a href={data.video} target="_blank" rel="noreferrer" className="underline">Youtub</a>
                            
                        </li>
                    </ul>

                </div>
            </article>
            
        </div>
    </section>}
    
    </>
  )
}

