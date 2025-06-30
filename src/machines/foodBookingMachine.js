import { createMachine, assign } from "xstate";
import { browseItemsMachine } from "./browseItemsMachine";

export const foodBookingMachine = createMachine({
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
            src: browseItemsMachine,
            data: (context) => ({
              currentService: 'food',
              currentProvider: context.currentProvider,
            }),
            onDone: {
              target: 'processing',
              actions: assign({
                browseData: (context, event) => event.data
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