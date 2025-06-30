import { setup, assign } from 'xstate'

export const browseItemsMachine = setup({}).createMachine({
  context: ({ input }) => ({
    selectedItems: [],
    totalAmount: 0,
    searchQuery: '',
    selectedCategory: 'all',
    currentService: input?.currentService || null,
    currentProvider: input?.currentProvider || null,
    availableItems: [],
  }),
  id: 'browseItemsMachine',
  initial: 'loading',
  states: {
    loading: {
      entry: assign({
        selectedItems: [],
        totalAmount: 0,
        searchQuery: '',
        selectedCategory: 'all',
      }),
      after: {
        500: 'browsing'
      }
    },
    browsing: {
      on: {
        ADD_ITEM: {
          actions: assign({
            selectedItems: ({ context, event }) => {
              const existingItem = context.selectedItems.find(
                item => item.id === event.item.id
              )
              
              if (existingItem) {
                return context.selectedItems.map(item =>
                  item.id === event.item.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              }
              
              return [...context.selectedItems, { ...event.item, quantity: 1 }]
            },
            totalAmount: ({ context, event }) => {
              const existingItem = context.selectedItems.find(
                item => item.id === event.item.id
              )
              
              if (existingItem) {
                return context.totalAmount + event.item.price
              }
              
              return context.totalAmount + event.item.price
            }
          })
        },
        REMOVE_ITEM: {
          actions: assign({
            selectedItems: ({ context, event }) => {
              return context.selectedItems.filter(item => item.id !== event.itemId)
            },
            totalAmount: ({ context, event }) => {
              const item = context.selectedItems.find(item => item.id === event.itemId)
              return context.totalAmount - (item ? item.price * item.quantity : 0)
            }
          })
        },
        UPDATE_QUANTITY: {
          actions: assign({
            selectedItems: ({ context, event }) => {
              if (event.quantity <= 0) {
                return context.selectedItems.filter(item => item.id !== event.itemId)
              }
              
              return context.selectedItems.map(item =>
                item.id === event.itemId
                  ? { ...item, quantity: event.quantity }
                  : item
              )
            },
            totalAmount: ({ context, event }) => {
              const item = context.selectedItems.find(item => item.id === event.itemId)
              if (item) {
                const oldTotal = item.price * item.quantity
                const newTotal = event.quantity > 0 ? item.price * event.quantity : 0
                return context.totalAmount - oldTotal + newTotal
              }
              return context.totalAmount
            }
          })
        },
        SEARCH: {
          actions: assign({
            searchQuery: ({ event }) => event.query
          })
        },
        FILTER_CATEGORY: {
          actions: assign({
            selectedCategory: ({ event }) => event.category
          })
        },
        CLEAR_CART: {
          actions: assign({
            selectedItems: [],
            totalAmount: 0
          })
        },
        PROCEED_TO_CHECKOUT: {
          target: 'checkout',
          guard: ({ context }) => context.selectedItems.length > 0
        }
      }
    },
    checkout: {
      initial: 'reviewOrder',
      states: {
        reviewOrder: {
          on: {
            CONFIRM_ORDER: 'processing',
            EDIT_ORDER: '#browseItemsMachine.browsing',
            CANCEL_ORDER: '#browseItemsMachine.browsing'
          }
        },
        processing: {
          after: {
            2000: 'completed'
          }
        },
        completed: {
          type: 'final',
          output: ({ context }) => ({
            selectedItems: context.selectedItems,
            totalAmount: context.totalAmount,
            service: context.currentService,
            provider: context.currentProvider
          })
        }
      }
    }
  }
}) 