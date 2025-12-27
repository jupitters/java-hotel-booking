package com.jupitters.bookinghotel.controller;

import com.jupitters.bookinghotel.dto.BookedRoomDto;
import com.jupitters.bookinghotel.model.BookedRoom;
import com.jupitters.bookinghotel.service.BookedRoomService;
import com.jupitters.bookinghotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("${url.base}/booking")
public class BookedRoomController {
    private final BookedRoomService bookingService;

    @GetMapping("/all")
    public ResponseEntity<List<BookedRoomDto>> getAllBookings() {
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookedRoomDto> bookingsResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookedRoomDto bookingResponse = getBookingResponse(booking);
            bookingsResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingsResponses);
    }
}
