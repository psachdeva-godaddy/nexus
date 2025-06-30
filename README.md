# Nexus Booking App

A modern React application built with XState for managing complex booking flows across multiple services including food delivery, flight booking, hotel booking, travel booking, and parcel delivery.

## Features

- **Multi-Service Booking**: Support for 5 different booking services
- **State Management**: Built with XState for predictable state transitions
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Provider Selection**: Multiple providers for each service type
- **Real-time State Visualization**: See current state transitions in the UI

## Services & Providers

### 🍕 Food Delivery
- Swiggy
- Zomato
- Uber Eats

### ✈️ Flight Booking
- IndiGo
- SpiceJet
- Air India

### 🏨 Hotel Booking
- OYO
- Treebo
- Zostel

### 🚆 Travel Booking
- Ixigo
- MakeMyTrip
- Goibibo

### 📦 Parcel Delivery
- Dunzo
- Shiprocket
- Delhivery

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Project Structure

```
src/
├── components/
│   ├── ServiceSelector.jsx    # Main service selection
│   ├── BookingService.jsx     # Service-specific booking container
│   ├── ProviderSelector.jsx   # Provider selection for each service
│   └── BookingFlow.jsx        # Booking state flow (idle → processing → completed/cancelled)
├── machines/
│   ├── bookingMachine.js      # Main booking state machine
│   ├── foodBookingMachine.js  # Food delivery state machine
│   ├── flightBookingMachine.js # Flight booking state machine
│   ├── hotelBookingMachine.js # Hotel booking state machine
│   ├── parcelBookingMachine.js # Parcel delivery state machine
│   └── travelBookingMachine.js # Travel booking state machine
├── App.jsx                    # Main application component
└── main.jsx                   # Application entry point
```

## State Machine Architecture

Each service follows a consistent state machine pattern:

1. **selectingProvider**: Choose from available providers
2. **[provider]**: Provider-specific states
   - **idle**: Ready to start booking
   - **processing**: Booking in progress
   - **completed**: Booking successful
   - **cancelled**: Booking cancelled
3. **completed**: Final success state

## Technologies Used

- **React 18**: Modern React with hooks
- **XState**: State management and state machines
- **@xstate/react**: React integration for XState
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 