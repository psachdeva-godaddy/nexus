import { setup, assign } from "xstate";
import { browseItemsMachine } from "./browseItemsMachine";

export const foodBookingMachine = setup({
  actors: {
    browseItems: browseItemsMachine,
  },
}).createMachine({
  context: {
    currentProvider: null,
    browseData: null,
  },
  id: "foodBookingMachine",
  initial: "selectingProvider",
  states: {
    selectingProvider: {
      on: {
        SELECT_SWIGGY: {
          target: "swiggy",
          actions: assign({ 
            currentProvider: "swiggy",
            browseData: null 
          }),
        },
        SELECT_ZOMATO: {
          target: "zomato",
          actions: assign({ 
            currentProvider: "zomato",
            browseData: null 
          }),
        },
        SELECT_UBEREATS: {
          target: "ubereats",
          actions: assign({ 
            currentProvider: "ubereats",
            browseData: null 
          }),
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
          invoke: {
            id: 'browseItems',
            src: 'browseItems',
            input: ({ context }) => ({
              currentService: 'food',
              currentProvider: context.currentProvider,
            }),
            onDone: {
              target: 'processing',
              actions: assign({
                browseData: ({ event }) => event.output
              })
            }
          },
          on: {
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