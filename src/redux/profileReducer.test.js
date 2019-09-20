import profileReducer, {addPostActionCreator, deletePost} from './profileReducer'
import expectExport from 'expect';

let state = {
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
    ]
}


it('length of post should be incremented', () => {
    let action = addPostActionCreator('some action')
    

    let newState = profileReducer(state, action)

    expectExport(newState.postData.length).toBe(4)
   
});

it('value of post should be correct', () => {
    let action = addPostActionCreator('some action')
    

    let newState = profileReducer(state, action)

    
    expectExport(newState.postData[3].post).toBe('some action')
});

it('length of post should be decremented', () => {
    let action = deletePost(1)
    

    let newState = profileReducer(state, action)

    
    expectExport(newState.postData.length).toBe(2)
});

