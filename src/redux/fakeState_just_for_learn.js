import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'


let store = {
    _state: {
        profilePage: {
            postData: [
                {
                    id: 1,
                    post: "asdd",
                    likesCount: 34
                },
                {
                    id: 2,
                    post: "df",
                    likesCount: 323345
                },
                {
                    id: 3,
                    post: "11111",
                    likesCount: 312
                },
            ],
            textAreaUpdate: '',
        },
        messagePage: {
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
            textAreaUpdate: '',
        },
    },
    getState() {
        return this._state;
    },
    _renderEntireTree() {
        console.log('state changed')
    },

    dispatch(action) {

        this._state.profilePage =  profileReducer(this._state.profilePage, action)
        this._state.messagePage =  dialogsReducer(this._state.messagePage, action)
        this._renderEntireTree(this._state)
        
    },

    subscribe(observer) {
        this._renderEntireTree = observer
    },

}





export default store
window.store = store