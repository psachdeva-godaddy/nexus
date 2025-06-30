import { createMachine } from "xstate";

export const foodBookingMachine = createMachine({
  context: {},
  id: "foodBookingMachine",
  initial: "selectingProvider",
  states: {
    selectingProvider: {
      on: {
        SELECT_SWIGGY: {
          target: "swiggy",
        },
        SELECT_ZOMATO: {
          target: "zomato",
        },
        SELECT_UBEREATS: {
          target: "ubereats",
        },
      },
    },
    swiggy: {
      initial: "idle",
      on: {
        BACK: {
          target: "selectingProvider",
        },
      },
      states: {
        idle: {
          on: {
            BROWSE_ITEMS: {
              target: "browsing",
            },
          },
        },
        browsing: {
          on: {
            START_BOOKING: {
              target: "processing",
            },
            BACK_TO_IDLE: {
              target: "idle",
            },
          },
        },
        processing: {
          on: {
            CONFIRM_BOOKING: {
              target: "completed",
            },
            CANCEL_BOOKING: {
              target: "cancelled",
            },
          },
        },
        completed: {
          on: {
            START_BOOKING: {
              target: "browsing",
            },
          },
        },
        cancelled: {
          on: {
            START_BOOKING: {
              target: "browsing",
            },
          },
        },
      },
    },
    zomato: {
      initial: "idle",
      on: {
        BACK: {
          target: "selectingProvider",
        },
      },
      states: {
        idle: {
          on: {
            BROWSE_ITEMS: {
              target: "browsing",
            },
          },
        },
        browsing: {
          on: {
            START_BOOKING: {
              target: "processing",
            },
            BACK_TO_IDLE: {
              target: "idle",
            },
          },
        },
        processing: {
          on: {
            CONFIRM_BOOKING: {
              target: "completed",
            },
            CANCEL_BOOKING: {
              target: "cancelled",
            },
          },
        },
        completed: {
          on: {
            START_BOOKING: {
              target: "browsing",
            },
          },
        },
        cancelled: {
          on: {
            START_BOOKING: {
              target: "browsing",
            },
          },
        },
      },
    },
    ubereats: {
      initial: "idle",
      on: {
        BACK: {
          target: "selectingProvider",
        },
      },
      states: {
        idle: {
          on: {
            BROWSE_ITEMS: {
              target: "browsing",
            },
          },
        },
        browsing: {
          on: {
            START_BOOKING: {
              target: "processing",
            },
            BACK_TO_IDLE: {
              target: "idle",
            },
          },
        },
        processing: {
          on: {
            CONFIRM_BOOKING: {
              target: "completed",
            },
            CANCEL_BOOKING: {
              target: "cancelled",
            },
          },
        },
        completed: {
          on: {
            START_BOOKING: {
              target: "browsing",
            },
          },
        },
        cancelled: {
          on: {
            START_BOOKING: {
              target: "browsing",
            },
          },
        },
      },
    },

  },
}); 