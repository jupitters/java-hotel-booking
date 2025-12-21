package com.jupitters.bookinghotel.controller;

import com.jupitters.bookinghotel.dto.RoomDto;
import com.jupitters.bookinghotel.model.Room;
import com.jupitters.bookinghotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {
    private final RoomService roomService;

    @PostMapping("/add")
    public ResponseEntity<RoomDto> addNewRoom(@RequestParam("photo") MultipartFile photo, @RequestParam("roomType") String roomType, @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomDto response = new RoomDto(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }
}
