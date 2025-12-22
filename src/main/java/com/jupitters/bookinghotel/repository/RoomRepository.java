package com.jupitters.bookinghotel.repository;

import com.jupitters.bookinghotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<String> findDistinctRoomTypes();
}
