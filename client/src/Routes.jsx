import RegisterandLoginForm from "./RegisterandLoginForm";
import Chat from './Chat'
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Routes() {
    const {username, id} = useContext(UserContext);
    if (username) {
        return( <Chat/>) ;
    }
    return(
        <RegisterandLoginForm/>
    );
}