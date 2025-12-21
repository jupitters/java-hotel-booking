package com.jupitters.bookinghotel.dto;

import java.time.LocalDate;

public class BookedRoomDto {
    private Long id;
    private LocalDate checkinDate;
    private LocalDate checkoutDate;
    private String guestFullName;
    private String guestEmail;
    private int numOfAdults;
    private int numOfChildren;
    private int totalNumOfGuests;
    private String bookingConfirmationCode;
    private RoomDto room;

    public BookedRoomDto(Long id, LocalDate checkinDate, LocalDate checkoutDate, String bookingConfirmationCode) {
        this.id = id;
        this.checkinDate = checkinDate;
        this.checkoutDate = checkoutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
