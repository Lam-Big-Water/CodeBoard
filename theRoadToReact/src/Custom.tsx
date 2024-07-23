import { useState, useEffect } from "react";

type InitData = { id: number, title: string };
type InitDataArr = InitData[];

const posts = [
    { id: 1, title: 'custom' },
    { id: 2, title: 'common' },
]

const Custom = () => {

    const useStorageState = (key: string, initial: string) => {
        const [value, setValue] = useState(
            localStorage.getItem(key) || initial
        )

        useEffect(() => {
            localStorage.setItem(key, value);
        }, [value, key])

        return [value, setValue] as const;
    }

    const [search, setSearch] = useStorageState('searchPro', 'c')


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

    const filtered = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className='app'>
            <h1>Custom</h1>
            <LabelWithInput onSearch={handleSearch} value={search} id='search' type='text'>
                <strong>Search: </strong>
            </LabelWithInput>
            <List list={filtered} />
        </div>
    )
}

type SearchProps = {
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    id: string;
    type: string;
    children: React.ReactNode;
}

const LabelWithInput: React.FC<SearchProps> = ({ onSearch, value, id, type, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input id={id} type={type} onChange={onSearch} value={value} />
        </>
    )
}

type ListProps = { list: InitDataArr };

const List: React.FC<ListProps> = ({ list }) => {
    return (
        <ul>{list.map((item) => <Item key={item.id} item={item} />)}</ul>
    )
}

type ItemProps = { item: InitData };

const Item: React.FC<ItemProps> = ({ item }) => {
    return (
        <li><a href="">{item.title}</a></li>
    )
}

export default Custom