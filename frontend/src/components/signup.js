import React from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const age = formData.get("age");
        const gender = formData.get("gender");

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }


        const response = await fetch('https://sudoku-1hj0.onrender.com/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username:name, password, email, age, gender }),
        });

        if (response.ok) {
            navigate('/login')
        } else {
            alert('user not created');
        }

    };

    return (
        <div 
            className="d-flex justify-content-center align-items-center vh-100"
        >
            <div 
                className="card shadow p-4"
                style={{ width: "400px", borderRadius: "10px", backgroundColor: '#a7c957' }}
            >
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">
                            Email Address
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
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label fw-bold">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="form-control"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    {/* Two fields in a row */}
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label fw-bold">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    id="age"
                                    className="form-control"
                                    placeholder="Enter your age"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label fw-bold">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    id="gender"
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-success w-100 fw-bold"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <p>
                        Already have an account?{" "}
                        <a href="/login" className="text-decoration-none" style={{color:'#fb8500'}}> 
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
