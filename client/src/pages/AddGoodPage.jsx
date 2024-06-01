import { useState, useEffect } from "react";
import axios from "axios";

export default function AddGoodPage() {
    const [goodName, setGoodName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        axios.get("/categories").then(res => setCategories(res.data));
    }, [])

    async function handleSubmit(ev){
        ev.preventDefault()
        let data = new FormData();
        data.append("name", goodName);
        data.append("description", description);
        data.append("price", price);
        data.append("image", selectedImage);
        console.log(await axios.post("/add-good", data, {headers: { 'content-type': 'multipart/form-data' }}));
    }
    
    return (
        <div className="bg-blue-200 py-2 h-screen">
            <form className="w-80 mx-auto mt-40" onSubmit={handleSubmit}>
                <p>Название товара</p>
                <input type="text" 
                    value={goodName}
                    onChange={ev=>setGoodName(ev.target.value)} 
                    placeholder="Название" 
                    className="block w-full p-2 mb-2 border-s-4"/>
                <p>Описание товара</p>
                <input type="text" 
                    value={description}
                    onChange={ev => setDescription(ev.target.value)} 
                    placeholder="Описание" 
                    className="block w-full p-2 mb-2 border-s-4"/>
                <p>Цена товара</p>
                <input type="number" 
                    value={price}
                    onChange={ev => setPrice(ev.target.value)} 
                    placeholder="password" 
                    className="block w-full p-2 mb-2 border-s-4"/>
                <input 
                    type="file" 
                    name=""
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                      }}/>
                Категория:&nbsp;
                <select name="" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    {categories.map(category => 
                        <option key={category._id} value={category.name}>{category.name}</option>
                    )}
                </select>
                <button className="bg-blue-700 block w-full p-2">Добавить товар</button>
            </form>
        </div>
    );
}