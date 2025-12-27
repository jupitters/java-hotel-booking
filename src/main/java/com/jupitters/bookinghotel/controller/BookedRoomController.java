package com.jupitters.bookinghotel.controller;

import com.jupitters.bookinghotel.dto.BookedRoomDto;
import com.jupitters.bookinghotel.exception.ResourceNotFoundException;
import com.jupitters.bookinghotel.model.BookedRoom;
import com.jupitters.bookinghotel.service.BookedRoomService;
import com.jupitters.bookinghotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try{
            BookedRoom booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookedRoomDto bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        } catch(ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/{roomId}/book")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId, @RequestBody BookedRoom bookingRequest) {
        try{
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok(
                    "Room booked successfully! Your confirmation code is: " + confirmationCode
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{bookingId}/cancel")
    public void cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }
}
