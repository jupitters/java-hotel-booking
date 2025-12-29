import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:9192/api/v1"
})

export async function addRoom(photo, roomType, roomPrice){
    const formData = new FormData()

    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/room/add", formData)
    if(response.status === 201){
        return true
    } else {
        return false
    }
}

export async function getRoomTypes(){
    try{
        const response = await api.get("/room/room-types")
        return response.data
    } catch(e) {
        console.error(e)
        throw new Error("Error fetching room types: ")
    }
}

export async function getAllRooms(){
    try {
        const response = await api.get("/room/all")
        return response.data
    } catch (error) {
        throw new Error("Error fetching rooms!")
    }
}

export async function deleteRoom(roomId) {
    try{
        const response = await api.delete(`/room/${roomId}/delete`)
        return response.data
    } catch (error) {
        throw new Error(`Error deleting room: ${error.message}`)
    }
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)

    const response = await api.put(`/room/${roomId}/update`)
    return response
}

export async function getRoomById(roomId){
    try {
        const result = await api.get(`/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}

export async function bookRoom(roomId, booking){
    try{
        const response = await api.post(`/booking/${roomId}/book`, booking)
        return response.data
    } catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error booking room: ${error.message}`)
        }
    }
}

export async function getAllBookings() {
    try{
        const result = await api.get("/booking/all")
        return result.data
    }catch(error){
        throw new Error(`Error fetching bookings: ${error.message}`)
    }
}

export async function getBookingByConfirmationCode(confirmationCode) {
    try{
        const result = await api.get(`/booking/confirmation/${confirmationCode}`)
        return result.data
    }catch(error){
        if(error.response && error.message.data){
            throw new Error(error.response.data)
        }
    }
}