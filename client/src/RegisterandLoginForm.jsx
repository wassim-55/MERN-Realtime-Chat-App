import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export default function RegisterandLoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
    const [isLoginOrRegister, setIsLoginOrRegister] = useState('login'); 

    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = isLoginOrRegister === 'register' ? 'register' : 'login';
        const { data } = await axios.post(url, { username, password });
        setLoggedInUsername(username);
        setId(data.id);
    }

    return (
        <div className="bg-blue-50 h-screen flex items-center mb-12">
            <form className="w-64 mx-auto" onSubmit={handleSubmit}>
                <input
                    value={username}
                    onChange={ev => setUsername(ev.target.value)}
                    type="text"
                    placeholder="username"
                    className="block w-full rounded-sm p-2 mb-2 border"
                />
                <input
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    type="password"  // Fixed type for password input
                    placeholder="password"
                    className="block w-full rounded-sm p-2 mb-2 border"
                />
                <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
                    {isLoginOrRegister === 'register' ? 'Register' : 'Login'} {/* Fixed ternary condition */}
                </button>
                <div className="text-center mt-2">
                    {isLoginOrRegister === 'register' && (
                        <div>
                            Already a member?
                            <button onClick={() => setIsLoginOrRegister('login')}>
                                Login here
                            </button>
                        </div>
                    )}
                    {isLoginOrRegister === 'login' && (
                        <div>
                            Don't have an account?
                            <button onClick={() => setIsLoginOrRegister('register')}>
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
