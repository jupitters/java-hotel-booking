import React, { useState } from 'react'
import { getRoomById } from '../utils/ApiFunctions'

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmited, setIsSubmited] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const [booking, setBooking] = useState({
        guestName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren: "",
    })
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: "",
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setBooking({...booking, [name]:value})
        setErrorMessage("")
    }

    const getRoomPriceById = async (roomId) => {
        try{
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <div>BookingForm</div>
    )
}

export default BookingForm