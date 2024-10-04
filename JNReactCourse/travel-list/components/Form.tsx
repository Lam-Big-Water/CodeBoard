import {ChangeEvent, FormEvent, useState} from "react";

 const Form = () => {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!description) return

        const newItem = {description, quantity, packed: false, id: Date.now()};

        setDescription("")
        setQuantity(1);
    }
 }



export default Form