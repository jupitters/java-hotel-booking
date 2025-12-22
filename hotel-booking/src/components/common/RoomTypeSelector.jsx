import React, { useEffect, useState } from 'react'
import {getRoomTypes} from '../utils/ApiFunctions'

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const [roomTypes, setRoomTypes] = useState([])
    const [showNewRoomTypesInput, setShowNewRoomTypesInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, [])

    const handleNewRoomInputChange = (e) => {
        setNewRoomType(e.target.value)
    }

    const handleAddNewRoomType = () => {
        if(newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypesInput(false)
        }
    }

    return (
        <>
        {roomTypes.length > 0 && (
            <div>
            <select id="roomType" name='roomType' value={newRoom.roomType} onChange={
                (e) => {
                    if(e.target.value === "Add New"){
                        setShowNewRoomTypesInput(true)
                    } else {
                        handleRoomInputChange(e)
                    }
                }
            }>

            </select>
            </div>
        )}
        </>
    )
}

export default RoomTypeSelector