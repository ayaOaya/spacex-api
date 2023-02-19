import useFetch from "../hooks/useFetch"
import { Loading } from "../components";
import { Link } from "react-router-dom"

export default function Launches() {
  const [data] = useFetch("https://api.spacexdata.com/v4/launches")


  return (
    <>
    {!data ? <Loading /> : <section className="py-32 max-width">
      <h1 className="heading text-center mb-10">Launches</h1>

      <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
        {data.map(({ id, name, links, details}) =>(
          <Link to={`/launches/${id}`} key={id} className="p-5 bg-zinc-800">

            {/*AS A NOTE:
            {links.patch.large ? 
            <img src={links.patch.large} alt={name} : 
            <img src="URL" alt=""} */}
            

            <img src={links.patch.large} alt={name}></img>
            <h2 className="font-bold mt-5 mb-3 text-white text-xl">{name}</h2>

            {/*When details == true display the <p> */}

            {details && <p className="text-white opacity-75">{`${details.substring(0,50)}...`}</p>}
          </Link>
        ))}

      </div>
    </section> }
    
    </>
  )
}



