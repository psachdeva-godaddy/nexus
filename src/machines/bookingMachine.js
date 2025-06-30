import { createMachine, assign } from "xstate";

export const bookingMachine = createMachine({
  context: {
    cart: [],
    totalAmount: 0,
  },
  id: "bookingMachine",
  initial: "queryingBooking",
  on: {
    RESET: {
      target: "#bookingMachine.queryingBooking",
      actions: assign({
        error: undefined,
        bookingDetails: undefined,
        selectedService: undefined,
        selectedProvider: undefined,
        cart: [],
        totalAmount: 0,
      }),
    },
    ADD_TO_CART: {
      actions: assign({
        cart: (context, event) => {
          const existingItem = context.cart.find(item => item.id === event.item.id);
          if (existingItem) {
            return context.cart.map(item =>
              item.id === event.item.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...context.cart, { ...event.item, quantity: 1 }];
        },
        totalAmount: (context, event) => {
          const existingItem = context.cart.find(item => item.id === event.item.id);
          if (existingItem) {
            return context.totalAmount + event.item.price;
          }
          return context.totalAmount + event.item.price;
        },
      }),
    },
    REMOVE_FROM_CART: {
      actions: assign({
        cart: (context, event) => {
          return context.cart.filter(item => item.id !== event.itemId);
        },
        totalAmount: (context, event) => {
          const item = context.cart.find(item => item.id === event.itemId);
          return context.totalAmount - (item ? item.price * item.quantity : 0);
        },
      }),
    },
    UPDATE_CART_QUANTITY: {
      actions: assign({
        cart: (context, event) => {
          return context.cart.map(item =>
            item.id === event.itemId
              ? { ...item, quantity: event.quantity }
              : item
          );
        },
        totalAmount: (context, event) => {
          const item = context.cart.find(item => item.id === event.itemId);
          if (item) {
            const oldTotal = item.price * item.quantity;
            const newTotal = item.price * event.quantity;
            return context.totalAmount - oldTotal + newTotal;
          }
          return context.totalAmount;
        },
      }),
    },
  },
  states: {
    queryingBooking: {
      initial: "selectingService",
      states: {
        selectingService: {
          on: {
            SELECT_FOOD_BOOKING: {
              target: "foodBooking",
              actions: assign({ selectedService: "food" }),
            },
            SELECT_PARCEL_BOOKING: {
              target: "parcelBooking",
              actions: assign({ selectedService: "parcel" }),
            },
            SELECT_TRAVEL_BOOKING: {
              target: "travelBooking",
              actions: assign({ selectedService: "travel" }),
            },
            SELECT_FLIGHT_BOOKING: {
              target: "flightBooking",
              actions: assign({ selectedService: "flight" }),
            },
            SELECT_HOTEL_BOOKING: {
              target: "hotelBooking",
              actions: assign({ selectedService: "hotel" }),
            },
          },
        },
        foodBooking: {
          on: {
            BACK: {
              target: "selectingService",
              actions: assign({ selectedService: undefined }),
            },
          },
        },
        parcelBooking: {
          on: {
            BACK: {
              target: "selectingService",
              actions: assign({ selectedService: undefined }),
            },
          },
        },
        travelBooking: {
          on: {
            BACK: {
              target: "selectingService",
              actions: assign({ selectedService: undefined }),
            },
          },
        },
        flightBooking: {
          on: {
            BACK: {
              target: "selectingService",
              actions: assign({ selectedService: undefined }),
            },
          },
        },
        hotelBooking: {
          on: {
            BACK: {
              target: "selectingService",
              actions: assign({ selectedService: undefined }),
            },
          },
        },
      },
    },
  },
}); 