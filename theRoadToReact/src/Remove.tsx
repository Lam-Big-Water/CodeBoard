import { useState, useEffect, useRef, ChangeEvent, ReactNode } from 'react';

type InitData = { id: number; title: string; }

const posts = [
    { id: 1, title: 'remove' },
    { id: 2, title: 'un-remove' }
]

const getDataByAsyncWay = (): Promise<{ data: InitData[] }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: posts })
        }, 2000)
    })
}

const useLocalStorage = (key: string, init: string): [string, (v: string) => void] => {
    const [value, setValue] = useState(
        localStorage.getItem(key) || init
    )
    useEffect(() => {
        localStorage.setItem(key, value)
    }, [key, value])

    return [value, setValue]
}

const Remove = () => {

    const [asyncData, setAsyncData] = useState<InitData[]>([]);

    const [search, setSearch] = useLocalStorage('remove', 'r');


    useEffect(() => {
        getDataByAsyncWay().then((result) => {
            setAsyncData(result.data);
        })
    }, [])


    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const filtered = asyncData.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

    const handleRemovePost = (item: InitData) => {
        const newPosts = asyncData.filter(
            (post) => item.id !== post.id
        );
        setAsyncData(newPosts);
    }

    return (
        <div className='app'>
            <h1>Remove</h1>
            <LabelWithInput onSearch={handleSearch} value={search} id='id' type='text' isFocused>
                <strong>Search: </strong>
            </LabelWithInput>
            <List list={filtered} onRemoveItem={handleRemovePost} />
        </div>
    )
}

type InputProps = {
    onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    id: string;
    type: string;
    children: ReactNode;
    isFocused: boolean;
}

const LabelWithInput: React.FC<InputProps> = ({ onSearch, value, id, type, children, isFocused }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused])

    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input ref={inputRef} id={id} type={type} value={value} onChange={onSearch} />
        </>
    )
}

type ListProps = {
    list: InitData[];
    onRemoveItem: (item: InitData) => void;
};

const List: React.FC<ListProps> = ({ list, onRemoveItem }) => {
    return (
        <>
            <ul>{list.map((item) => <Item key={item.id} item={item} onRemoveItem={onRemoveItem} />)}</ul>
        </>
    )
}

type ItemProps = {
    item: InitData;
    onRemoveItem: (item: InitData) => void;
};

const Item: React.FC<ItemProps> = ({ item, onRemoveItem }) => {
    return (
        <>
            <li>
                <a href="#">{item.title}</a>
                <span>
                    <button type='button' onClick={() => onRemoveItem(item)}>
                        Dismiss
                    </button>
                </span>
            </li>
        </>
    )
}

export default Remove