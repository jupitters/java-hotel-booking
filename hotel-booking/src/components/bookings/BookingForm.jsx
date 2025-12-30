import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from "react-router-dom";
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import moment from "moment"
import BookingSummary from './BookingSummary';
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

const BookingForm = () => {
    const { roomId } = useParams()
    const navigate = useNavigate()
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmited, setIsSubmited] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const [booking, setBooking] = useState({
        guestFullName: "",
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
        const diffInDays = checkOutDate.diff(checkInDate, "days")
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
        <>
        <div className='container mb-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card card-body mt-5'>
                        <h4 className='card card-title'>Reserve Room</h4>
                        <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormLabel htmlFor="guestFullName">
                                    Full Name: 
                                </FormLabel>
                                <FormControl required type="text" id="guestFullName" name="guestFullName" value={booking.guestFullName} placeholder="Enter your full name" onChange={handleInputChange} />
                                <FormControl.Feedback type="invalid">
                                    Please, enter your full name.
                                </FormControl.Feedback>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="guestEmail">
                                    Email: 
                                </FormLabel>
                                <FormControl required type="email" id="guestEmail" name="guestEmail" value={booking.guestEmail} placeholder="Enter your email" onChange={handleInputChange} />
                                <FormControl.Feedback type="invalid">
                                    Please, enter your email.
                                </FormControl.Feedback>
                            </FormGroup>
                            <fieldset style={{border: "2px"}}>
                                <legend>Loading period</legend>
                                <div className='row'>
                                    <div className='col-6'>
                                        <FormLabel htmlFor="checkInDate">
                                            Check-In Date: 
                                        </FormLabel>
                                        <FormControl required type="date" id="checkInDate" name="checkInDate" value={booking.checkInDate} placeholder="Check-In Date" onChange={handleInputChange} />
                                        <FormControl.Feedback type="invalid">
                                            Please, select a check-in date.
                                        </FormControl.Feedback>
                                    </div>
                                    <div className='col-6'>
                                        <FormLabel htmlFor="checkOutDate">
                                            Check-Out Date: 
                                        </FormLabel>
                                        <FormControl required type="date" id="checkOutDate" name="checkOutDate" value={booking.checkOutDate} placeholder="Check-In Date" onChange={handleInputChange} />
                                        <FormControl.Feedback type="invalid">
                                            Please, select a check-out date.
                                        </FormControl.Feedback>
                                    </div>
                                    {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Number of Guests</legend>
                                <div className='row'>
                                    <div className='col-6'>
                                        <FormLabel htmlFor="numberOfAdults">
                                            Adults: 
                                        </FormLabel>
                                        <FormControl required type="number" id="numberOfAdults" name="numberOfAdults" value={booking.numberOfAdults} placeholder="0" min={1} onChange={handleInputChange} />
                                        <FormControl.Feedback type="invalid">
                                            Please, select at least 1 adult.
                                        </FormControl.Feedback>
                                    </div>
                                    <div className='col-6'>
                                        <FormLabel htmlFor="numberOfChildren">
                                            Children: 
                                        </FormLabel>
                                        <FormControl type="number" id="numberOfChildren" name="numberOfChildren" value={booking.numberOfChildren} placeholder="0" onChange={handleInputChange} />
                                    </div>
                                </div>
                            </fieldset>
                            <div className='form-group mt-2 mb-2'>
                                <button type='submit' className='btn btn-hotel'>Continue</button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className='col-md-6'>
                    {isSubmited && (
                        <BookingSummary booking={booking} payment={calculatePayment} isFormValid={isValidated} onConfirm={handleBooking} />
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default BookingForm