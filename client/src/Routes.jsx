import { useContext } from "react";
import RegisterAndLogging from "./Register"
import { UserContext } from "./UserContext";
import MainApp from "./MainApp";

//TODO: Вынести mainapp сюда
export default function Routes() {
    const {username, id} = useContext(UserContext);

    if (username){
        return <MainApp />
    }
    
    return (
        <RegisterAndLogging/>
    );
}