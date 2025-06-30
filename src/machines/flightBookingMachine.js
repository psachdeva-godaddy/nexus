import { setup } from "xstate";

export const flightBookingMachine = setup({}).createMachine({
  context: {},
  id: "flightBookingMachine",
  initial: "selectingProvider",
  states: {
    selectingProvider: {
      on: {
        SELECT_INDIGO: {
          target: "indigo",
        },
        SELECT_SPICEJET: {
          target: "spicejet",
        },
        SELECT_AIRINDIA: {
          target: "airindia",
        },
      },
    },
    indigo: {
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
    spicejet: {
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
    airindia: {
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