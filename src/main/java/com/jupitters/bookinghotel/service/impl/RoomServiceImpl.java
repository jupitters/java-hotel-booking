package com.jupitters.bookinghotel.service.impl;

import com.jupitters.bookinghotel.model.Room;
import com.jupitters.bookinghotel.repository.RoomRepository;
import com.jupitters.bookinghotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    @Override
    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) {

    }
}
