import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from "react-router-dom";
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import moment from "moment"

const BookingForm = () => {
    const { roomId } = useParams()
    const navigate = useNavigate()
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

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate)
        const price = roomPrice ? roomPrice : 0
        return diffInDays * price
    }

    const isGuestValid = () => {
        const adultCount = parseInt(booking.numberOfAdults)
        const childrenCount = parseInt(booking.numberOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckoutDateValid = () => {
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must come before the check-in!")
            return false
        }else {
            setErrorMessage("")
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if(form.checkValidity() === false || !isGuestValid() || !isCheckoutDateValid()){
            e.stopPropagation()
        }else{
            setIsSubmited(true)
        }
        setIsValidated(true)
    }

    const handleBooking = async () => {
        try{
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmited(true)
            navigate("/", {state:{ message:confirmationCode }}) 
        }catch (error) {
            setErrorMessage(error.message)
            navigate("/", {state:{ error: errorMessage }})
        }
    }

    return (
        <div>BookingForm</div>
    )
}

export default BookingForm