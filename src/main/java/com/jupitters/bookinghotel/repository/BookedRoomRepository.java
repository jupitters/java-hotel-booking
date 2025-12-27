package com.jupitters.bookinghotel.repository;

import com.jupitters.bookinghotel.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookedRoomRepository extends JpaRepository<BookedRoom, Long> {
}
