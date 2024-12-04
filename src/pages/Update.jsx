import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
    const [book, setBook] = useState({
        tittle:"",
        desc:"",
        price:null,
        cover:"",
    });

    const navigate = useNavigate()
    const location = useLocation()

    const bookId = location.pathname.split("/")[2]

    const handleChange = (e) => {
        setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick = async e => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8800/books/"+ bookId, book)
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }
    console.log(book)
    return (
        <div className="whole">
        <div className="form">
            <h1>Update the Book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="tittle" />
            <input type="text" placeholder="Author Name" onChange={handleChange} name="cover" />
            <input type="text" placeholder="Description" onChange={handleChange} name="desc" />
            <input type="number" placeholder="Price" onChange={handleChange} name="price" />
            <button className="formButton" onClick={handleClick}>Update</button>
        </div></div>
    )
}

export default Update