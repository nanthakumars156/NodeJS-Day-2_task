const express = require("express");
const bodyParser = require("body-parser");
require ('dotenv').config();
const webServer = express();
const PORT = 3000;
// to convert into json
webServer.use(bodyParser.json());

// to store rooms and bookings
let rooms = [];
let bookings = [];

// Function to generate unique IDs
const generateId = () => "_" + Math.random().toString().substring(2,9);

// 1. Creating a room
webServer.post("/rooms", (req, res) => {
  const { numberOfSeats, amenities_in_room, pricefor1Hour } = req.body;
  const room = {
    id: generateId(),
    numberOfSeats,
    amenities_in_room,
    pricefor1Hour,
    bookings: [],
  };  
  rooms.push(room);
  res.status(201).json(room);
});

// 2. Booking a room
webServer.post("/bookroom", (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;
  const room = rooms.find((r) => r.id === roomId);
  if (!room) {
    return res.status(404).send("Room not found");
  }

  // Check for booking conflicts
  const conflictingBooking = room.bookings.some(
    (booking) =>
      booking.date === date &&
      ((startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime) ||
        (startTime <= booking.startTime && endTime >= booking.endTime))
  );
  if (conflictingBooking) {
    return res
      .status(400)
      .send("Room is already booked for the specified time slot");
  }

  const booking = {
    id: generateId(),
    customerName,
    date,
    startTime,
    endTime,
    roomId,
    bookingDate: new Date().toISOString(),
    bookingStatus: "confirmed",
  };
  room.bookings.push(booking);
  bookings.push(booking);
  res.status(201).json(booking);
});

// 3. List all rooms with booked data
webServer.get("/rooms", (req, res) => {
  const roomDetails = rooms.map((room) => ({
    ...room,
    bookings: room.bookings.map((booking) => ({
      customerName: booking.customerName,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookingStatus: booking.bookingStatus,
    })),
  }));
  res.json(roomDetails);
});

// 4. List all customers with booked data
webServer.get("/customers", (req, res) => {
  const customers = bookings.map((booking) => ({
    customerName: booking.customerName,
    roomName: rooms.find((room) => room.id === booking.roomId).name,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));
  res.json(customers);
});

// 5. List how many times a customer has booked a room with booking details
webServer.get("/bookings/:customerName", (req, res) => {
  const { customerName } = req.params;
  const customerBookings = bookings
    .filter((booking) => booking.customerName === customerName)
    .map((booking) => ({
      customerName: booking.customerName,
      roomName: rooms.find((room) => room.id === booking.roomId).name,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookingId: booking.id,
      bookingDate: booking.bookingDate,
      bookingStatus: booking.bookingStatus,
    }));
  res.json(customerBookings);
});

// Start server
webServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});