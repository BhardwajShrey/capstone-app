const initialState = {
    currentUser: null
}

export const User = (state = initialState, action) =>
{
    return {
        ...state, currentUser: action.currentUser
    }
};