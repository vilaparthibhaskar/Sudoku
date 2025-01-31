import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/user";
import { useNavigate } from "react-router-dom";
import { ProgressCircle } from './progresscircle';

export function Header() {
    const userName = useSelector((state) => state.user.name);
    const easy = useSelector((state) => state.user.easy);
    const medium = useSelector((state) => state.user.medium);
    const hard = useSelector((state) => state.user.hard);
    console.log(easy, medium, hard);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedin = useSelector((state) => state.user.loggedin);


    function onLogout() {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/login");
    }

    function onLogin() {
        navigate('/login')
    }

    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#344e41",
                color: "#fff",
                padding: "10px 20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderBottom: "2px solid #283618",
            }}
        >

            <div
                style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                }}
            >
                {`Welcome, ${userName}`}
            </div>


            <h1
                style={{
                    margin: 0,
                    fontSize: "2rem",
                    fontFamily: "'Roboto', sans-serif",
                    textAlign: "center",
                    flexGrow: 1,
                }}
            >
                Sudoku
            </h1>


            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span className="fw-bold" style={{ marginRight: "8px", color: '#fb6f92' }}>Easy:</span>
                    <ProgressCircle
                        levelsCompleted={easy.length}
                        totalLevels={10}
                        color="#4caf50"
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span className="fw-bold"  style={{ marginRight: "8px", color: '#fb8500' }}>Medium:</span>
                    <ProgressCircle
                        levelsCompleted={medium.length}
                        totalLevels={10}
                        color="#ffc107"
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span className="fw-bold"  style={{ marginRight: "8px", color: '#c1121f' }}>Hard:</span>
                    <ProgressCircle
                        levelsCompleted={hard.length}
                        totalLevels={10}
                        color="#f44336"
                    />
                </div>
            </div>

            {!loggedin ? 
                <button onClick={onLogin}
                    style={{
                        backgroundColor: 'green',
                        color: "#fff",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "5px",
                        padding: "8px 16px",
                        cursor: "pointer",
                    }}>
                    login
                </button> 
                : 
                <button
                    onClick={onLogout}
                    style={{
                        backgroundColor: "#e63946",
                        color: "#fff",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "5px",
                        padding: "8px 16px",
                        cursor: "pointer",
                    }}
                >
                    Log Out
                </button>}
        </header>
    );
}
