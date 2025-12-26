import {useEffect, useState} from "react";
import {getRoomById, updateRoom} from "../utils/ApiFunctions.jsx";
import {useParams} from "react-router-dom";

const EditRoom = () => {
    const [room, setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    const { roomId } = useParams()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setRoom({...room, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setRoom({ ...room, [name]:value} )
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try{
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
            } catch (error) {
                console.error(error)
            }
        }

        fetchRoom()
    }, [roomId]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await updateRoom(roomId, room)
            if(response.status === 200) {
                setSuccessMessage("Room updated successfully!")
                const updatedRoomData = await getRoomById(roomId)
                setRoom(updatedRoomData)
                setImagePreview(updatedRoomData.photo)
                setErrorMessage("")
            }else {
                setErrorMessage("Error updating room!")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    }

    return (
        <>
        </>
    )
}

export default EditRoom