const ADD_MESSAGE = 'ADD_MESSAGE';

const initialState = {
    dialogData: [
        {
            id: 1,
            name: "Dasd1"
        },
        {
            id: 2,
            name: "Dasd3"
        },
        {
            id: 3,
            name: "DI3"
        },
        {
            id: 4,
            name: "DIasdasd"
        },
    ],
    messageData: [
        {
            id: 1,
            message: "asdas"
        },
        {
            id: 2,
            message: "aasdasdsd"
        },
        {
            id: 3,
            message: "dfdf3"
        },
    ],
    
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 4,
                message: action.newMessage,
            };
            return {
                ...state,
                messageData: [...state.messageData, newMessage],
            };
        default:
            return state;
    }
}

export const addMessageActionCreator = (newMessage) => {
    return {
        type: ADD_MESSAGE,
        newMessage
    }
}

export default dialogsReducer;