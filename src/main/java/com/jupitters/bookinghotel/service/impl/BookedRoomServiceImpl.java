package com.jupitters.bookinghotel.service.impl;

import com.jupitters.bookinghotel.model.BookedRoom;
import com.jupitters.bookinghotel.model.Room;
import com.jupitters.bookinghotel.repository.BookedRoomRepository;
import com.jupitters.bookinghotel.service.BookedRoomService;
import com.jupitters.bookinghotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookedRoomServiceImpl implements BookedRoomService {
    private final BookedRoomRepository bookingRepository;
    private final RoomService roomService;

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return bookingRepository.findByRoomId(id);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if (bookingRequest.getCheckoutDate().isBefore(bookingRequest.getCheckinDate())) {
            throw new RuntimeException("Check-in date must come before checkout!");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> bookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, bookings);
        if (roomIsAvailable) {
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }else {
            throw new RuntimeException("This room is already booked for this date!");
        }
        return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode);
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> bookings) {
        return bookings.stream()
                .noneMatch(booking ->
                        bookingRequest.getCheckinDate().equals(booking.getCheckinDate())
                || bookingRequest.getCheckoutDate().isBefore(booking.getCheckoutDate())
                || (bookingRequest.getCheckinDate().isAfter(booking.getCheckinDate())
                && bookingRequest.getCheckinDate().isBefore(booking.getCheckoutDate()))
                || (bookingRequest.getCheckinDate().isBefore(booking.getCheckinDate())

                && bookingRequest.getCheckoutDate().equals(booking.getCheckoutDate()))
                || (bookingRequest.getCheckinDate().isBefore(booking.getCheckinDate())

                && bookingRequest.getCheckoutDate().isAfter(booking.getCheckoutDate()))

                || (bookingRequest.getCheckinDate().equals(booking.getCheckoutDate())
                && bookingRequest.getCheckoutDate().equals(booking.getCheckinDate()))

                || (bookingRequest.getCheckinDate().equals(booking.getCheckoutDate())
                && bookingRequest.getCheckoutDate().equals(bookingRequest.getCheckinDate()))
                );
    }
}
