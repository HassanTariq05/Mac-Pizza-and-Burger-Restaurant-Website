export const initialState = {
    basket: JSON.parse(localStorage.getItem('basket')) || [],
    orders: [],
};

export const Reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],  
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                basket: state.basket.map(item =>
                    item.title === action.item.title && (item.size === action.item.size || item.size === '')
                        ? { ...item, quantity: action.item.quantity }
                        : item
                ),
            };
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => !(item.title === action.title && (item.size === action.size || item.size === ''))),
            };
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: [],
            };
        default:
            return state;
    }
};

export default Reducer;
