package com.jupitters.bookinghotel.controller;

import com.jupitters.bookinghotel.dto.RoomDto;
import com.jupitters.bookinghotel.model.Room;
import com.jupitters.bookinghotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    public ResponseEntity<RoomDto> addNewRoom(@RequestParam("photo") MultipartFile photo, @RequestParam("roomType") String roomType, @RequestParam("roomPrice") BigDecimal roomPrice) {
        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomDto response = new RoomDto(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }
}
