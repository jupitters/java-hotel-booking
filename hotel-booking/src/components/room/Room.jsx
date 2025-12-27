import {useState} from "react";

const Room = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage, setRoomsPerPage] = useState(6)
    const [filteredData, setFilteredData] = useState([])



    return (
        <>
        </>
    )
}

export default Room