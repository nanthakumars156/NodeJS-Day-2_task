# Hall Booking API task

## 1. creating room with number of seats available, amenties in room, price for 1 hour.

POST: http://localhost:3000/rooms

request:

{

    "numberOfSeats": 2,
    "amenities_in_room": [
        "Hot shower",
        "Room service"
    ],
    "pricefor1Hour": "1000"
	
}

response:

{

        "id": "_0404232",
        "numberOfSeats": 2,
        "amenities_in_room": [
            "Hot shower",
            "Room service"
        ],
        "pricefor1Hour": "1000",
        "bookings": []
		
}

## 2. Booking a room with customer name, date, start time, end time, room Id.

Post : http://localhost:3000/bookroom

request:

{

    "customerName": "Customer1",
    "date": "2024-11-14",
    "startTime": "12:00",
    "endTime": "18:00",
    "roomId": "_0404232"
	
}

response:

{

    "id": "_4056952",
    "customerName": "Customer1",
    "date": "2024-11-14",
    "startTime": "12:00",
    "endTime": "18:00",
    "roomId": "_0404232",
    "bookingDate": "2024-12-02T15:28:53.760Z",
    "bookingStatus": "confirmed"
	
}

### the same room on same date cannot be booked again

response:

  Room not found

## 3. List all rooms booked data with room name, booked status, customer name, date, start time, end time.

GET: http://localhost:3000/rooms

[

    {
        "id": "_0404232",
        "numberOfSeats": 2,
        "amenities_in_room": [
            "Hot shower",
            "Room service"
        ],
        "pricefor1Hour": "1000",
        "bookings": [
            {
                "customerName": "Customer1",
                "date": "2024-11-14",
                "startTime": "12:00",
                "endTime": "18:00",
                "bookingStatus": "confirmed"
            }
        ]
    },
    {
        "id": "_8346323",
        "numberOfSeats": 2,
        "amenities_in_room": [
            "Hot shower",
            "WIFI",
            "Intercom",
            "Room service"
        ],
        "pricefor1Hour": "1200",
        "bookings": [
            {
                "customerName": "Customer2",
                "date": "2024-11-14",
                "startTime": "12:00",
                "endTime": "18:00",
                "bookingStatus": "confirmed"
            }
        ]
    },
    {
        "id": "_8588644",
        "numberOfSeats": 3,
        "amenities_in_room": [
            "Hot shower",
            "WIFI",
            "Intercom",
            "Room service"
        ],
        "pricefor1Hour": "1500",
        "bookings": [
            {
                "customerName": "Customer3",
                "date": "2024-11-14",
                "startTime": "12:00",
                "endTime": "20:00",
                "bookingStatus": "confirmed"
            }
        ]
    },
    {
        "id": "_4760447",
        "numberOfSeats": 3,
        "amenities_in_room": [
            "Hot shower",
            "WIFI",
            "Intercom",
            "Room service"
        ],
        "pricefor1Hour": "1500",
        "bookings": []
    },
    {
        "id": "_5385495",
        "numberOfSeats": 4,
        "amenities_in_room": [
            "Hot shower",
            "WIFI",
            "Intercom",
            "Room service"
        ],
        "pricefor1Hour": "2000",
        "bookings": []
    },
    {
        "id": "_2189886",
        "numberOfSeats": 4,
        "amenities_in_room": [
            "Hot shower",
            "Room service"
        ],
        "pricefor1Hour": "1800",
        "bookings": []
    }
]

## 4. List all customers with booked data with customer name, room name, date, start time, end time.

GET: http://localhost:3000/customers

[

    {
        "customerName": "Customer1",
        "date": "2024-11-14",
        "startTime": "12:00",
        "endTime": "18:00"
    },
    {
        "customerName": "Customer2",
        "date": "2024-11-14",
        "startTime": "12:00",
        "endTime": "18:00"
    },
    {
        "customerName": "Customer3",
        "date": "2024-11-14",
        "startTime": "12:00",
        "endTime": "20:00"
    }
	
]

## 5. List how many times a customer has booked the room with details customer name, room name, date, start time, end time, booking id, booking date, booking status

GET: http://localhost:3000/bookings/Customer1

[

    {
        "customerName": "Customer1",
        "date": "2024-11-14",
        "startTime": "12:00",
        "endTime": "18:00",
        "bookingId": "_4056952",
        "bookingDate": "2024-12-02T15:28:53.760Z",
        "bookingStatus": "confirmed"
    }
	
]
  
