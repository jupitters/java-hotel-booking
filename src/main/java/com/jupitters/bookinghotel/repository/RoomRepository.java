package com.jupitters.bookinghotel.repository;

import com.jupitters.bookinghotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
