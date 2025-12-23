package com.jupitters.bookinghotel.controller;

import com.jupitters.bookinghotel.dto.BookedRoomDto;
import com.jupitters.bookinghotel.dto.RoomDto;
import com.jupitters.bookinghotel.model.BookedRoom;
import com.jupitters.bookinghotel.model.Room;
import com.jupitters.bookinghotel.service.BookedRoomService;
import com.jupitters.bookinghotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequiredArgsConstructor
@RequestMapping("${url.base}/room")
public class RoomController {
    private final RoomService roomService;
    private final BookedRoomService bookingService;

    @PostMapping("/add")
    public ResponseEntity<RoomDto> addNewRoom(
        @RequestParam("photo") MultipartFile photo, 
        @RequestParam("roomType") String roomType, 
        @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        
            Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomDto response = new RoomDto(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/room-types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    public ResponseEntity<List<RoomDto>> getAllRooms() throws SQLException {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomDto> roomsResponses = new ArrayList<>();

        for(Room room : rooms){
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            if(photoBytes != null && photoBytes.length > 0){
                String base64Photo = Base64.getEncoder().encodeToString(photoBytes);
                RoomDto roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(base64Photo);
                roomsResponses.add(roomResponse);
            }
        }

        return ResponseEntity.ok(roomsResponses);
    }

    private RoomDto getRoomResponse(Room room) {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());
        List<BookedRoomDto> bookingResponse = bookings
                .stream()
                .map(booking -> new BookedRoomDto(booking.getId(),
                        booking.getCheckinDate(),
                        booking.getCheckoutDate(),
                        booking.getBookingConfirmationCode()))
                .toList();
        byte[] photoBytes = null;
        Blob photoBlob = room.getPhoto();
        if(photoBlob != null) {
            try{
                photoBytes = photoBlob.getBytes(1, (int)photoBlob.length());
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return new RoomDto(room.getId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                photoBytes,
                bookingResponse);
    }

    private List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return bookingService.getAllBookingsByRoomId(id);
    }
}
