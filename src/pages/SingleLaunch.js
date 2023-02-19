import {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom"
import { Loading } from "../components"
import { format } from "date-fns"


export default function SingleLaunch() {
  const [singleLaunch, setSingleLaunch] = useState(null)
  const {id} = useParams()

  useEffect(() =>{
    const fetchSingleLaunch = async () => {
      const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`)
      const data = await res.json()
      setSingleLaunch(data)
    }
    fetchSingleLaunch()
  }, [id])

  return (
    <>
    {!singleLaunch ? <Loading /> : 
    <section className="py-32 max-width grid grid-cols-1 gap-10 md:grid-cols-2">
      <article>


        {/*AS A NOTE:
        if we want the default image to display  when we clicke it we do the following:
        {links.patch.large ? <img src={singleLaunch.links.patch.large} alt={singleLaunch.name}></img>} : <img src={links.patch.large} alt={name} : 
            <img src="URL" alt=""} */}



        <img src={singleLaunch.links.patch.large} alt={singleLaunch.name}></img>
      </article>

      <article>
        <h1 className="heading">{singleLaunch.name}</h1>
        <h2 className="text-white opacity-75 font-bold text-2xl mt-2">Launch date: {format(new Date(singleLaunch.date_local), "dd MMMM yyyy")},{" "}{singleLaunch.success ? <span className="text-emerald-500">Successful</span> : <span className="text-rose-500">Failed</span> }</h2>

        <p className="text-white opacity-75 my-8">{singleLaunch.details}</p>

        <ul className="text-white text-sm opacity-75 mb-8">

          {/* ///////////////////////////// */}

          <li className="mb-3">`${singleLaunch.fairings.reused ? "Reused" : "Not Reused"}`</li>
          <li>{singleLaunch.fairings.recovered  || singleLaunch.fairings.reused === null ? "Recovered" : "Not Recovered"}</li>
        </ul>

         {/* ///////////////////////////// */}

        <ul className="flex flex-wrap items-center gap-8 justify-start">
          <li><a href={singleLaunch.links.article} target="_blank" rel="noreferrer" className="btn">Read Article</a></li>
          <li  href={singleLaunch.links.presskit} target="_blank" rel="noreferrer" className="btn">Presskit</li>
          <li  href={singleLaunch.links.webcast} target="_blank" rel="noreferrer" className="btn">Live</li>
          <li><Link to="/launches" className="text-white opacity-75 text-sm hover:opacity-100 ">&larr; Back</Link></li>
        </ul>
      </article>

    </section>
    }
    
    
    </>
  )
}



  

 