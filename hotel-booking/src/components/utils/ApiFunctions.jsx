import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:9192"
})

async function addRoom(photo, roomType, roomPrice){
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

async function getRoomTypes(){
    try{
        const response = await axios.get("/room/room-types")
        return response.data
    } catch(e) {
        throw new Error("Error fetching room types!")
    }
}

export default {api, addRoom, getRoomTypes}