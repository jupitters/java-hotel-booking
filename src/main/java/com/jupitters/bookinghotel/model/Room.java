package com.jupitters.bookinghotel.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Room {
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;
    private List<BookedRoom> bookings;

    public Room(){
        this.bookings = new ArrayList<>();
    }
}
