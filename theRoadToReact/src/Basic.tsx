import { useState } from "react";

type InitData = { id: number, title: string };
type InitDataArr = InitData[];

const posts = [
    { id: 1, title: 'react' },
    { id: 2, title: 'redux' },
]

const Basic = () => {

    const [search, setSearch] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    };

    const filtered = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <h1>Basic</h1>
            <LabelWithInput onSearch={handleSearch} />
            <List list={filtered} />
        </>
    )
}

type SearchProps = { onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void }

const LabelWithInput: React.FC<SearchProps> = ({ onSearch }) => {
    return (
        <>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={onSearch} />
        </>
    )
}

type ListProps = { list: InitDataArr }

const List: React.FC<ListProps> = ({ list }) => {
    return (
        <>
            <ul>{list.map((item) => <Item key={item.id} item={item} />)}</ul>
        </>
    )
}

type ItemProps = { item: InitData }

const Item: React.FC<ItemProps> = ({ item }) => {
    return (
        <>
            <li><a href="">{item.title}</a></li>
        </>
    )
}

export default Basic