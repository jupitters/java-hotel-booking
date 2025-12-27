package com.jupitters.bookinghotel.service.impl;

import com.jupitters.bookinghotel.model.BookedRoom;
import com.jupitters.bookinghotel.service.BookedRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookedRoomServiceImpl implements BookedRoomService {

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return List.of();
    }

    @Override
    public void cancelBooking(Long bookingId) {

    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        return "";
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return null;
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return List.of();
    }
}
