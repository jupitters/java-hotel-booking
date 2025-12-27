package com.jupitters.bookinghotel.repository;

import com.jupitters.bookinghotel.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookedRoomRepository extends JpaRepository<BookedRoom, Long> {
    List<BookedRoom> findByRoomId(Long id);
    BookedRoom findByBookingConfirmationCode(String confirmationCode);
}
