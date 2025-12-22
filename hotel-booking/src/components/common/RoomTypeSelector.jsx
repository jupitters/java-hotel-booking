import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, [])

    useEffect(() => {
  console.log("newRoom.roomType mudou para:", newRoom.roomType);
}, [newRoom.roomType]);

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = (e) => {
        e.preventDefault()
        e.stopPropagation();
        console.log("oiii")
        if(newRoomType !== "") {
            console.log("Adicionando novo tipo:", newRoomType);
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypesInput(false)
        }
    }

    return (
        <>
        {roomTypes.length >= 0 && (
            <div>
            <select id="roomType" name='roomType' value={newRoom.roomType} onChange={
                (e) => {
                    console.log("Select onChange fired. Value:", e.target.value);
                    if(e.target.value === "Add New"){
                        setShowNewRoomTypesInput(true)
                    } else {
                        handleRoomInputChange(e)
                    }

                } 
            }>
                <option value={""}>Select a room type</option>
                <option value={"Add New"}>Add New</option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            {showNewRoomTypeInput && (
                <div className='input-group'>
                    <input className='form-control' value={newRoomType} type='text' placeholder='Enter a new room type' onChange={handleNewRoomTypeInputChange} />
                    <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
                </div>
            )}
            </div>
        )}
        </>
    )
}

export default RoomTypeSelector