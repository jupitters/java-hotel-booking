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