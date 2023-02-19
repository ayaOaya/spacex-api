import {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom"
import { Loading } from "../components"
import useFetch from "../hooks/useFetch"

export default function Landpads() {
  const [data] = useFetch("https://api.spacexdata.com/v4/landpads")

console.log(data)
  return (
    <>
    {!data ? <Loading /> : <section className="py-32 max-width"><h1 className="heading text-center mb-10">Landpads</h1>
    
    {data && <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
       {/*we re putting a unique key cause we are returning a list. */}
      {data.map(({id, images, full_name, type, details }) =>(
       
        <Link to={`/landpads/${id}`} key={id}>
          <article>
            <img src={images.large[0]} alt={full_name} className="h-64 object-cover"></img>


            <div className="bg-zinc-800 p-5">
              <h2 className="text-white font-bold text-xl mb-5"><span className="opacity-75">{type}</span>, {full_name}</h2>
              <p className="text-white opacity-75 mb-10 ">{`${details.substring(0,200)}...`}</p>

              <Link to={`/landpads/${id}`} className="btn">Read more &rarr;</Link>
            </div>

           

          </article>
        </Link>
      ))}
      
      
      </div>}
    
    </section>}
    
    
    </>
  )
}
