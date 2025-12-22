package com.jupitters.bookinghotel.controller;

import com.jupitters.bookinghotel.dto.RoomDto;
import com.jupitters.bookinghotel.model.Room;
import com.jupitters.bookinghotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${url.base}/room")
public class RoomController {
    private final RoomService roomService;

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
}
