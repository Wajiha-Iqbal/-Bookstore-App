import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [book, setBook] = useState({
        tittle:"",
        desc:"",
        price:null,
        cover:"",
    });

    const navigate = useNavigate()
    const handleChange = (e) => {
        setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/books", book)
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }
    console.log(book)
    return (
        <div className="whole">
        <div className="form">
            <h1>Add New Book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="tittle" />
            <input type="text" placeholder="Author Name" onChange={handleChange} name="cover" />
            <input type="text" placeholder="Description" onChange={handleChange} name="desc" />
            <input type="number" placeholder="Price" onChange={handleChange} name="price" />
            <button className="formButton" onClick={handleClick}>Add</button>
        </div></div>
    )
}

export default Add