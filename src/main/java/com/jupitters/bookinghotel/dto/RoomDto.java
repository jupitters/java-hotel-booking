package com.jupitters.bookinghotel.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomDto {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;
    private String photo;
    private List<BookedRoomDto> bookings;

    public RoomDto(Long id, String roomType, BigDecimal roomPrice) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }

    public RoomDto(Long id, String roomType, BigDecimal roomPrice, boolean isBooked, byte[] photoByte, List<BookedRoomDto> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoByte != null ? Base64.getEncoder().encodeToString(photoByte) : null;
        this.bookings = bookings;
    }
}
