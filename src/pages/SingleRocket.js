import useFetch from "../hooks/useFetch"
import { Loading } from "../components";
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";


export default function SingleRocket() {
  const [singleRocket, setSingleRocket] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    const fetchSingleRocket = async() => {
      const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
      const data = await res.json()
      setSingleRocket(data)
    }
    fetchSingleRocket()
  }, [id])



  return (
    <>
    {!singleRocket ? <Loading /> : <section className="py-32 max-width grid grid-cols-1 gap-8 md:grid-cols-2">
      <article>
        <h1 className="heading">{singleRocket.name}</h1>
        <h2 className="capitalize text-3xl opacity-75 text-white font-bold">Type: {singleRocket.type}</h2>
        <h2 className="capitalize text-3xl opacity-75 text-white font-bold mb-8">First Flight Date: {singleRocket.first_flight}</h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 text-white opacity-75">
          <ul>
            <li> Cost per launch: {singleRocket.cost_per_launch} USD</li>
            <li>Company: {singleRocket.company}</li>
            <li>Success Rate: {singleRocket.success_rate_pct} %</li>
            {singleRocket.active ? <li className="text-emerald-500">Active</li> : <li className="text-rose-500">Inactive</li>}
          </ul>

          <ul>
            <li>Country: {singleRocket.country}</li>
            <li>Stages: {singleRocket.stages}</li>
            <li>Height: {singleRocket.height.meters}m</li>
            <li>Diameter: {singleRocket.diameter.meters}m</li>
            <li>Mass: {singleRocket.mass.kg}kg</li>
            
            {/*

            <li>Height: {singleRocket.height.feet}ft</li>
            <li>Diameter: {singleRocket.diameter.feet}ft</li>
            <li>Mass: {singleRocket.mass.lb}</li>
             */}
          </ul>
        </div>

        <p className="text-white opacity-75 mt-5">{singleRocket.description}</p>

        <ul className="flex items-center justify-start gap-3 mt-5">
          <li><a href={singleRocket.wikipedia} target="_blank" rel="noreferrer" className="btn">Wikipedia</a></li>
        
          <li><Link to="/rockets" className="text-white opacity-75 text-sm hover:opacity-100">&larr; Back</Link></li>
        </ul>
      </article>
      
      <article>
        <img src={singleRocket.flickr_images[0]} alt={singleRocket.name}></img>

       
      </article>
      
      
      </section>}
    
    </>
  )
}
