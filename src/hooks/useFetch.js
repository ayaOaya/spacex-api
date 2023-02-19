import { useState, useEffect } from "react";

{/*we place the URL because we are fetching data from the URL */}
export default function useFetch(url) {
    const [data, setData] = useState(null)

    useEffect(() =>{
        const fetchData = async() =>{
            const res = await fetch(url)
            const data = await res.json()
            setData(data)
        }
        fetchData()
    }, [url])

    return [data]
}