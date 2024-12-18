export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  orders: [],
}

export const Reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        basket: state.basket.map((item) => {
          const addonsMatch =
            (!item.addons && !action.item.addons) || // Both addons are null/undefined
            (item.addons &&
              action.item.addons &&
              item.addons.length === action.item.addons.length &&
              item.addons.every((addon) =>
                action.item.addons.some(
                  (actionAddon) => addon.id === actionAddon.id
                )
              ))

          return item.title === action.item.title &&
            item.size === action.item.size &&
            addonsMatch
            ? { ...item, quantity: action.item.quantity }
            : item
        }),
      }

    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter((item) => {
          const addonsMatch =
            !action.addons ||
            (!item.addons && !action.addons) ||
            (item.addons &&
              item.addons.every(
                (addon, index) =>
                  action.addons && addon.id === action.addons[index]?.id
              ) &&
              item.addons.length === action.addons?.length)
          return !(
            item.title === action.title &&
            (item.size === action.size || item.size === "") &&
            addonsMatch
          )
        }),
      }

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      }

    case "UPDATE_QUANTITY_WITH_TITLE_NAMES": {
      const { title, size, addonTitles, quantity } = action.item
      return {
        ...state,
        basket: state.basket.map((item) => {
          const addonMatch =
            addonTitles.length === 0
              ? !item.addons || item.addons.length === 0
              : item.addons &&
                addonTitles.length === item.addons.length &&
                addonTitles.every((addon) =>
                  item.addons.some(
                    (itemAddon) => itemAddon.translation.title === addon
                  )
                )

          if (item.title === title && item.size === size && addonMatch) {
            return { ...item, quantity }
          }
          return item
        }),
      }
    }

    case "REMOVE_FROM_BASKET_WITH_TITLE": {
      const { title, size, addonTitles } = action

      // Convert addonTitles (comma-separated string) into an array
      const addonTitlesArray = addonTitles ? addonTitles.split(",") : []

      return {
        ...state,
        basket: state.basket.filter((item) => {
          const isTitleMatch = item.title === title
          const isSizeMatch = item.size === size

          const isAddonMatch =
            addonTitlesArray.length === 0
              ? !item.addons || item.addons.length === 0
              : item.addons &&
                item.addons.length === addonTitlesArray.length &&
                item.addons.every((addon) =>
                  addonTitlesArray.includes(addon.translation.title)
                )
          return !(isTitleMatch && isSizeMatch && isAddonMatch)
        }),
      }
    }

    default:
      return state
  }
}

export default Reducer
