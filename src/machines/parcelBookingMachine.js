import { setup } from "xstate";

export const parcelBookingMachine = setup({}).createMachine({
  context: {},
  id: "parcelBookingMachine",
  initial: "selectingProvider",
  states: {
    selectingProvider: {
      on: {
        SELECT_DUNZO: {
          target: "dunzo",
        },
        SELECT_SHIPROCKET: {
          target: "shiprocket",
        },
        SELECT_DELHIVERY: {
          target: "delhivery",
        },
      },
    },
    dunzo: {
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
    shiprocket: {
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
    delhivery: {
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