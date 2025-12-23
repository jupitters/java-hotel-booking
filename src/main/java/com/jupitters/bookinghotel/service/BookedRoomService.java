package com.jupitters.bookinghotel.service;

import com.jupitters.bookinghotel.model.BookedRoom;

import java.util.List;

public interface BookedRoomService {
    List<BookedRoom> getAllBookingsByRoomId(Long id);
}
