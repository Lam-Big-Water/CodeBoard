import { useState, useEffect, useRef, ReactNode } from "react";

type InitData = {
    id: number;
    title: string;
}

type IniDataArr = InitData[];


const posts = [
    { id: 1, title: 'useRef' },
    { id: 2, title: 'next' },
]


const Ref = () => {

    const useLocalStorage = (key: string, init: string): [string, (newValue: string) => void] => {

        const [value, setValue] = useState(
            localStorage.getItem(key) || init
        )

        useEffect(() => {
            localStorage.setItem(key, value);
        }, [key, value])

        return [value, setValue]

    }

    const [search, setSearch] = useLocalStorage('ref', 'f');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const filtered = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="app">
            <h1>Ref</h1>
            <LabelWithInput onSearch={handleSearch} value={search} id='search' type='text' isFocused>
                <strong>Search: </strong>
            </LabelWithInput>
            <List list={filtered}/>
        </div>
    )
}

type SearchProps = {
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    id: string;
    type: string;
    children: ReactNode;
    isFocused: boolean;
}

const LabelWithInput: React.FC<SearchProps> = ({onSearch, value, id, type, children, isFocused}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused && inputRef.current) inputRef.current.focus();
    }, [isFocused]);

    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input ref={inputRef} id={id} type={type} onChange={onSearch} value={value}/>
        </>
    )
}

type ListProps = {list: IniDataArr};

const List:React.FC<ListProps> = ({list}) => {
    return (
        <>
            <ul>
                {list.map((item) => <Item key={item.id} item={item}/>)}
            </ul>
        </>
    )
}

type ItemProps = {item: InitData};

const Item: React.FC<ItemProps> = ({item}) => {
    return (
        <>
        <li><a href="#">{item.title}</a></li>
        </>
    )
}

export default Ref