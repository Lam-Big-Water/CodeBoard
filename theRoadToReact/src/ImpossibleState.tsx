import {useReducer, useEffect} from 'react';

type InitDataType = {id: number; name: string;}

const initData = [
    {id: 1, name: 'Sam'},
    {id: 2, name: 'HaiZhen'},
];

const getAsyncData = (): Promise<{data: InitDataType[]}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({data: initData})
        }, 2000);
    })
}

type PostsState = {
    data: InitDataType[];
    isLoading: boolean;
    isError: boolean;
};

type PostsFetchInitAction = {type: 'POSTS_FETCH_INIT'};

type PostsFetchSuccessAction = {type: 'POSTS_FETCH_SUCCESS'; payload: InitDataType[];};

type PostsFetchFailureAction = {type: 'POSTS_FETCH_FAILURE';};

type PostsRemoveAction = {type: 'REMOVE_STORY'; payload: InitDataType;};

type PostsAction = 
    | PostsFetchInitAction
    | PostsFetchSuccessAction
    | PostsFetchFailureAction
    | PostsRemoveAction;

const postReducer = (state: PostsState, action: PostsAction) => {
    switch (action.type) {
        case 'POSTS_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'POSTS_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'POSTS_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter(
                    (post) => action.payload.id !== post.id
                ),
            };
        default:
            throw new Error();
    }
};

const App = () => {
    const [posts, dispatchPosts] = useReducer(postReducer, {data: [], isLoading: false, isError: false});

    useEffect(() => {
        dispatchPosts({type: 'POSTS_FETCH_INIT'});

        getAsyncData()
            .then((result) => {
                dispatchPosts({
                    type: 'POSTS_FETCH_SUCCESS',
                    payload: result.data,
                });
            })
            .catch(() => dispatchPosts({type: 'POSTS_FETCH_FAILURE'}));
    }, []);

    const handleRemoveStory = (item: InitDataType) => {
        dispatchPosts({
            type: 'REMOVE_STORY',
            payload: item,
        })
    }

    return (
        <div>
            <LabelWithInput />
            {posts.isError && <p>Something went wrong ...</p>}
            {posts.isLoading ? (<p>Loading ...</p>) : <List list={posts.data} onRemoveItem={handleRemoveStory}/>}
        </div>
    )
}

const LabelWithInput = () => {
    return (
        <>
            <label htmlFor=""></label>
            <input type="text" />
        </>
    )
}
type ListProps = {list: InitDataType[]; onRemoveItem: (item: InitDataType) => void};
const List = ({list, onRemoveItem}: ListProps) => {
    return (
        <>
            <ul>
                {list.map((item) => <Item key={item.id} item={item} onRemoveItem={onRemoveItem}/>)}
            </ul>
        </>
    )
}

type ItemProps = {item: InitDataType; onRemoveItem: (item: InitDataType) => void;};
const Item = ({item, onRemoveItem}: ItemProps) => {
    return (
        <>
            <li>{item.name} <button onClick={() => onRemoveItem(item)}>Remove</button></li>
        </>
    )
}

export default App