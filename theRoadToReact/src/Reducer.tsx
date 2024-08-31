import {useState, useEffect, useReducer, MouseEvent} from 'react';

type InitData = {
    id: number;
    title: string;
}

const posts = [
    {id: 1, title: 'state'},
    {id: 2, title: 'action'}
];

const getAsyncData = (): Promise<{data: InitData[]}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({data: posts})
        }, 2000);
    });
};

type PostsState = InitData[];

type PostsSetAction = {
    type: 'SET_POSTS';
    payload: InitData[];
}

type PostsRemoveAction = {
    type: 'REMOVE_POSTS';
    payload: InitData;
}

type PostsAction = PostsSetAction | PostsRemoveAction;

const postsReducer = (state: PostsState, action: PostsAction) => {
    switch (action.type) {
        case 'SET_POSTS':
            return action.payload;
        case 'REMOVE_POSTS':
            return state.filter((post: InitData) => action.payload.id !== post.id);
        default:
            throw new Error();
    };
};

const Reducer = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [posts, dispatchPosts] = useReducer(postsReducer, []);

    const handleRemove = (item: InitData) => {
        dispatchPosts({
            type: 'REMOVE_POSTS',
            payload: item,
        })
    }

    useEffect(() => {
        setIsLoading(true);
        
        getAsyncData()
            .then((result) => {
                dispatchPosts({
                    type: 'SET_POSTS',
                    payload: result.data,
                });
                setIsLoading(false);
            })
    }, [])

    return (
        <div className="app">
            <LabelWithInput />
            {isLoading ? <p>Loading...</p> : <List list={posts} onRemoveItem={handleRemove}/>}
        </div>
    )
};


const LabelWithInput = () => {
    return (
        <>
            <label htmlFor=""></label>
            <input type="text" />
        </>
    )
}

type ListProps = {
    list: InitData[];
    onRemoveItem: (item: InitData) => void;
}

const List = ({list, onRemoveItem}: ListProps ) => {
    return (
        <>
            <ul>
                {list.map((item) => <Item key={item.id} item={item} onRemoveItem={onRemoveItem}/>)}
            </ul>
        </>
    )
}
type ItemProps = {
    item: InitData;
    onRemoveItem: (item: InitData) => void;
}

const Item = ({item, onRemoveItem}: ItemProps) => {
    return (
        <>
            <li>{item.title}<button onClick={(event: MouseEvent<HTMLButtonElement>) => {event.preventDefault(), onRemoveItem(item)}}>Delete</button></li>
        </>
    )
}

export default Reducer