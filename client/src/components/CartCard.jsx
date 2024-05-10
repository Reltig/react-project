import logo from "../assets/react.svg"

export default function CartCard({name, description, price, filename, value}) {
    
    function handleRemove(ev){
        ev.preventDefault();
        
    }
    
    return (
        <div className="bg-white rounded mb-2 p-3">
            <h1>{name}</h1>
            <img src={filename ? `http://localhost:4000/files/${filename}` :  logo}
                alt=""
                width={50}
                height={50}
                className=""
            />
            <p>{description}</p>
            <p>Количество: {value}</p>
            <p>Цена: {price}</p>
            <input type="button" onClick={handleRemove} className="bg-red-500" value="Delete"/>
        </div>
    );
}