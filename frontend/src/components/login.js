import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {change_user_name, change_loggedin, update_token, load_easy, load_medium, load_hard, update_userid} from '../store/slices/user'

export function LoginPage() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get("email");
        const password = formData.get("password");


        const response = await fetch('https://sudoku-1hj0.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(change_user_name(data.user.username))
            dispatch(change_loggedin(true))
            dispatch(update_token(data.token))
            dispatch(load_easy(data.user.solved[0]))
            dispatch(load_medium(data.user.solved[1]))
            dispatch(load_hard(data.user.solved[2]))
            dispatch(update_userid(data.user._id))
            localStorage.setItem('token', data.token)
            navigate('/levels')

        } else {
            alert('Login failed.');
        }
    };


    return (
        <div 
            className="d-flex justify-content-center align-items-center vh-100"
        >
            <div 
                className="card shadow p-4"
                style={{ width: "400px", borderRadius: "10px", backgroundColor:'#a7c957', color: "#344e41" }}
            >
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn w-100 fw-bold"
                            style={{backgroundColor: "#344e41"}}
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <p>
                        Don't have an account?{" "}
                        <button onClick={() => navigate('/register')} className="text-decoration-none" style={{color:'#fb8500'}}>
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
