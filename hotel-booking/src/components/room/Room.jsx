import {useEffect, useState} from "react";
import {getAllRooms} from "../utils/ApiFunctions.jsx";

const Room = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage, setRoomsPerPage] = useState(6)
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getAllRooms().then((data) => {
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        }).catch((error) => {
            setError(error.message)
            setIsLoading(false)
        })
    }, []);

    if(isLoading){
        return <div>Loading rooms...</div>
    }
    if(error){
        return <div className="text-danger">Error: {error}</div>
    }

    return (
        <>
        </>
    )
}

export default Room