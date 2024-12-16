import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

function CreateCustomer() {
    const [fullName, setFullName] = useState("");
    const [nationalId, setNationalId] = useState("");

    const dispatch = useDispatch();

    function handleClick() {
        if (!fullName || !nationalId) return;
        dispatch(createCustomer(fullName, nationalId));
    }

    return (
        <div className="flex flex-col gap-6">
            <h2>Create new customer</h2>
            <div>
                <div className="flex flex-col">
                    <label>Customer full name</label>
                    <input className="w-32 border-solid border-2 border-sky-500" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>

                <div className="flex flex-col">
                    <label>National ID</label>
                    <input className="w-32 border-solid border-2 border-sky-500" type="text" value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
                </div>

                <button onClick={handleClick} className="border-0 p-2 bg-amber-300 text-black rounded-sm">
                    Create new customer
                </button>
            </div>
        </div>
    )
}

export default CreateCustomer;