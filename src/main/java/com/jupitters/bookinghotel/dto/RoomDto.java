package com.jupitters.bookinghotel.dto;

import java.math.BigDecimal;
import java.util.List;

public class RoomDto {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;
    private String photo;
    private List<BookedRoomDto> bookings;
}
