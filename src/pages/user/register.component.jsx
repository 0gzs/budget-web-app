import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/AuthService";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const { username, email, password } = formData;

    const navigate = useNavigate();

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const submit = async e => {
        e.preventDefault();
        
        const userData = {
            username,
            email,
            password
        };

        await registerUser(userData);
        navigate("/")
    };

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center bg-dark">
            <div className="w-[320px] p-4 bg-carbon">
                <form className="flex flex-col space-y-3 text-white" onSubmit={submit}>
                    <h1 className="text-6xl text-cyan-400 font-extrabold">register</h1>
                    <div className="w-full">
                        <label className="font-bold text-sm">username:</label>
                        <input 
                            className="bg-carbonlight w-full px-3 py-2 rounded-sm text-white font-bold tracking-wide focus:outline focus:outline-3 focus:outline-cyan-300"
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange} />
                    </div>
                    <div className="w-full">
                        <label className="font-bold text-sm">email:</label>
                        <input 
                            className="bg-carbonlight w-full px-3 py-2 rounded-sm text-white font-bold tracking-wide focus:outline focus:outline-3 focus:outline-cyan-300"
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange} />
                    </div>
                    <div className="w-full">
                        <label className="font-bold text-sm">password:</label>
                        <input 
                            className="bg-carbonlight w-full px-3 py-2 rounded-sm text-white font-bold tracking-wide focus:outline focus:outline-3 focus:outline-cyan-300"
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange} />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-cyan-400 rounded-sm font-extrabold">
                        register
                    </button>
                </form>
                <p className="text-white text-center text-sm font-source font-bold mt-3 tracking-wide">
                    Already registered? 
                    <Link to="/login" className="text-cyan-300"> Log in here</Link>.
                </p>
            </div>

            <div className="w-[320px] flex items-center justify-center my-3">
                <div className="border-1 border-gray-700 w-[130px] h-0"></div>
                <p className="text-gray-400 font-bold px-[10px]">or</p>
                <div className="border-1 border-gray-700 w-[130px] h-0"></div>
            </div>

            <div>
                <button className="w-[320px] px-4 py-2 bg-cyan-400 rounded-sm font-extrabold text-white">
                    view demo
                </button>
            </div>
        </div>
    );
};

export default Register;