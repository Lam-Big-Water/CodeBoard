import { useState, useEffect, useRef, ChangeEvent, ReactNode } from "react";

type InitData = {id: number; title: string;}

const posts = [
    {id: 1, title: 'async'},
    {id: 2, title: 'sync'},
];



const getDataByAsyncWay = (): Promise<{data: InitData[]}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({data:posts})
        }, 2000)
    })
}

const useLocalStorage = (key: string, init: string): [string, (v: string) => void] => {
    const [value, setValue] = useState(localStorage.getItem(key) || init);

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue];

}

const Async = () => {

    const [search, setSearch] = useLocalStorage('async', 'a');

    const [asyncData, setAsyncData] = useState<InitData[]>([]);

    useEffect(() => {
        getDataByAsyncWay().then((result) => {
            setAsyncData(result.data);
        })
    }, [])

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const filtered = asyncData.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
    
  return (
    <div className="app">
        <h1>Asynchronous</h1>
        <LabelWithInput onSearch={handleSearch} id='search' type='text' value={search} isFocused>
            <strong>Search: </strong>
        </LabelWithInput>
        <List list={filtered}/>
    </div>
  )
}

type SearchProps = {
    onSearch(event:ChangeEvent<HTMLInputElement>): void;
    id: string;
    type: string;
    value: string;
    children: ReactNode;
    isFocused: boolean;

}

const LabelWithInput: React.FC<SearchProps> = ({onSearch, id, type, value, children, isFocused}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused])


    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input ref={inputRef} onChange={onSearch} id={id} type={type} value={value}/>
        </>
    )
}

type ListProps = {list: InitData[]};

const List: React.FC<ListProps> = ({list}) => {
    return (
        <>
            <ul>
                {
                    list.map((item) => <Item key={item.id} item={item}/>)
                }
            </ul>
        </>
    )
}

type ItemProps = {item: InitData}

const Item: React.FC<ItemProps> = ({item}) => {
    return (
        <>
            <li><a href="#">{item.title}</a></li>
        </>
    )
}

export default Async