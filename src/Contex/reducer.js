export let authuser={
    restid :  null,
};
export function reducer(state, action) {
    switch (action.type) {
        case "AUTH-USER": {
            return {
                ...state,
                authuser:action.payload
            }
        }
        case "FOOD_MENU": {
            return {
                ...state,
                restid:action.payload
            }
        }
        default:
            return state;
            
        }
    }