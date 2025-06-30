export const mockData = {
  food: {
    swiggy: [
      {
        id: 'f1',
        name: 'Margherita Pizza',
        restaurant: 'Pizza Palace',
        price: 299,
        rating: 4.5,
        image: '🍕',
        description: 'Classic pizza with fresh mozzarella and basil',
        category: 'Italian',
        deliveryTime: '30-40 mins'
      },
      {
        id: 'f2',
        name: 'Chicken Biryani',
        restaurant: 'Biryani House',
        price: 399,
        rating: 4.7,
        image: '🍛',
        description: 'Aromatic basmati rice with tender chicken',
        category: 'Indian',
        deliveryTime: '25-35 mins'
      },
      {
        id: 'f3',
        name: 'Veg Burger',
        restaurant: 'Burger Junction',
        price: 199,
        rating: 4.2,
        image: '🍔',
        description: 'Crispy veg patty with fresh vegetables',
        category: 'Fast Food',
        deliveryTime: '20-30 mins'
      }
    ],
    zomato: [
      {
        id: 'f4',
        name: 'Paneer Butter Masala',
        restaurant: 'Spice Garden',
        price: 279,
        rating: 4.6,
        image: '🍛',
        description: 'Rich and creamy paneer in tomato gravy',
        category: 'Indian',
        deliveryTime: '35-45 mins'
      },
      {
        id: 'f5',
        name: 'Chocolate Cake',
        restaurant: 'Sweet Treats',
        price: 450,
        rating: 4.8,
        image: '🍰',
        description: 'Decadent chocolate cake with cream frosting',
        category: 'Dessert',
        deliveryTime: '40-50 mins'
      }
    ],
    ubereats: [
      {
        id: 'f6',
        name: 'Chicken Tacos',
        restaurant: 'Mexican Fiesta',
        price: 320,
        rating: 4.4,
        image: '🌮',
        description: 'Spicy chicken with fresh salsa and guacamole',
        category: 'Mexican',
        deliveryTime: '25-35 mins'
      }
    ]
  },
  flight: {
    indigo: [
      {
        id: 'fl1',
        from: 'Delhi',
        to: 'Mumbai',
        departure: '08:00',
        arrival: '10:30',
        duration: '2h 30m',
        price: 4500,
        flightNumber: '6E-123',
        aircraft: 'A320',
        image: '✈️',
        class: 'Economy'
      },
      {
        id: 'fl2',
        from: 'Mumbai',
        to: 'Bangalore',
        departure: '14:00',
        arrival: '15:30',
        duration: '1h 30m',
        price: 3200,
        flightNumber: '6E-456',
        aircraft: 'A320',
        image: '✈️',
        class: 'Economy'
      }
    ],
    spicejet: [
      {
        id: 'fl3',
        from: 'Delhi',
        to: 'Goa',
        departure: '11:00',
        arrival: '13:30',
        duration: '2h 30m',
        price: 5200,
        flightNumber: 'SG-789',
        aircraft: 'B737',
        image: '✈️',
        class: 'Economy'
      }
    ],
    airindia: [
      {
        id: 'fl4',
        from: 'Mumbai',
        to: 'Delhi',
        departure: '19:00',
        arrival: '21:30',
        duration: '2h 30m',
        price: 4800,
        flightNumber: 'AI-101',
        aircraft: 'A321',
        image: '✈️',
        class: 'Business'
      }
    ]
  },
  hotel: {
    oyo: [
      {
        id: 'h1',
        name: 'OYO Downtown Premium',
        location: 'Central Delhi',
        price: 2500,
        rating: 4.2,
        image: '🏨',
        amenities: ['WiFi', 'AC', 'TV', 'Breakfast'],
        roomType: 'Deluxe Room',
        checkIn: '14:00',
        checkOut: '12:00'
      },
      {
        id: 'h2',
        name: 'OYO Business Hotel',
        location: 'Connaught Place',
        price: 3200,
        rating: 4.0,
        image: '🏨',
        amenities: ['WiFi', 'AC', 'TV', 'Gym'],
        roomType: 'Executive Room',
        checkIn: '14:00',
        checkOut: '12:00'
      }
    ],
    treebo: [
      {
        id: 'h3',
        name: 'Treebo Trend Elite',
        location: 'Bandra, Mumbai',
        price: 4500,
        rating: 4.5,
        image: '🏨',
        amenities: ['WiFi', 'AC', 'TV', 'Breakfast', 'Pool'],
        roomType: 'Premium Room',
        checkIn: '14:00',
        checkOut: '12:00'
      }
    ],
    zostel: [
      {
        id: 'h4',
        name: 'Zostel Goa',
        location: 'Anjuna Beach',
        price: 1200,
        rating: 4.3,
        image: '🏨',
        amenities: ['WiFi', 'AC', 'Common Area', 'Kitchen'],
        roomType: 'Dorm Bed',
        checkIn: '14:00',
        checkOut: '11:00'
      }
    ]
  },
  travel: {
    ixigo: [
      {
        id: 't1',
        from: 'Delhi',
        to: 'Agra',
        departure: '06:00',
        arrival: '09:30',
        duration: '3h 30m',
        price: 450,
        trainNumber: '12280',
        trainName: 'Taj Express',
        image: '🚂',
        class: 'Sleeper'
      },
      {
        id: 't2',
        from: 'Mumbai',
        to: 'Pune',
        departure: '08:00',
        arrival: '11:30',
        duration: '3h 30m',
        price: 320,
        trainNumber: '12124',
        trainName: 'Deccan Queen',
        image: '🚂',
        class: 'Chair Car'
      }
    ],
    makemytrip: [
      {
        id: 't3',
        from: 'Delhi',
        to: 'Manali',
        departure: '22:00',
        arrival: '08:00+1',
        duration: '10h',
        price: 1200,
        busNumber: 'DL-1234',
        busType: 'Volvo AC',
        image: '🚌',
        class: 'Sleeper'
      }
    ],
    goibibo: [
      {
        id: 't4',
        from: 'Bangalore',
        to: 'Chennai',
        departure: '14:00',
        arrival: '19:00',
        duration: '5h',
        price: 800,
        busNumber: 'KA-5678',
        busType: 'Mercedes AC',
        image: '🚌',
        class: 'Semi-Sleeper'
      }
    ]
  },
  parcel: {
    dunzo: [
      {
        id: 'p1',
        service: 'Same Day Delivery',
        description: 'Deliver within the city',
        price: 89,
        duration: '2-4 hours',
        weight: 'Up to 10kg',
        image: '📦',
        features: ['Real-time tracking', 'SMS updates']
      },
      {
        id: 'p2',
        service: 'Express Delivery',
        description: 'Priority delivery within 1 hour',
        price: 149,
        duration: '30-60 mins',
        weight: 'Up to 5kg',
        image: '⚡',
        features: ['Live tracking', 'Priority handling']
      }
    ],
    shiprocket: [
      {
        id: 'p3',
        service: 'Standard Shipping',
        description: 'Nationwide delivery',
        price: 45,
        duration: '3-5 days',
        weight: 'Up to 0.5kg',
        image: '📦',
        features: ['Insurance', 'Tracking', 'COD available']
      }
    ],
    delhivery: [
      {
        id: 'p4',
        service: 'Next Day Delivery',
        description: 'Deliver by next day',
        price: 120,
        duration: '24 hours',
        weight: 'Up to 2kg',
        image: '🚚',
        features: ['Express handling', 'SMS alerts']
      }
    ]
  }
};