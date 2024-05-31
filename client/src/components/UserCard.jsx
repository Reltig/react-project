import axios from "axios"

export default function UserCard({id, username}) {
    
    function handleDelete(ev){
        ev.preventDefault();
        axios.delete("/users", {id});
    }
    
    return (
        <div className="w-1/3 p-2 mx-auto bg-white rounded-sm">
            <p>Id: {id}</p>
            <p className="">Username: {username}</p>
            <input className="bg-red-500 text-white" type="button" value="Delete" onClick={handleDelete}/>
        </div>
    )
}