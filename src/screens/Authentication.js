import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import "./Authentication.css"
import {useUser} from '../context/useUser'

import  "./Authentication.css"

export const AuthenticationMode = Object.freeze({
    Login: "Login",
    Register: "Register"
})

export default function Authentication({authenticationMode}) {
    const {user,setUser, signUp, signIn} = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (authenticationMode === AuthenticationMode.Register) {
                await signUp()
                navigate("/signin")
            } 
            else {
                await signIn()
                navigate("/")
            }
        } catch(error) {
            const message = error.response && error.response.data ? error.response.data.error:error
            alert(message)
        }
    }

    return (
        <div className="auth-container">
            <h3 className="auth-header">
                {authenticationMode === AuthenticationMode.Login ? "Sign in" : "Sign up"}
            </h3>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={user.email} 
                        onChange={e => setUser({ ...user, email: e.target.value })} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={user.password} 
                        onChange={e => setUser({ ...user, password: e.target.value })} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <button type="submit">
                        {authenticationMode === AuthenticationMode.Login ? "Login" : "Submit"}
                    </button>
                </div>
                <div className="form-group">
                    <Link to={authenticationMode === AuthenticationMode.Login ? "/signup" : "/signin"}>
                        {authenticationMode === AuthenticationMode.Login 
                            ? "No account? Sign up" 
                            : "Already signed up? Sign in"}
                    </Link>
                </div>
            </form>
        </div>
    );
    }

//     return (
//         <div className={styles["auth-container"]}>
//             <h3 className={styles["auth-header"]}> {authenticationMode === AuthenticationMode.Login ? "Sign in" : "Sign up"}</h3>
//             <form onSubmit={handleSubmit} className={styles["auth-form"]}>
//                 <div className={styles["form-group"]}>
//                     <label>Email</label>
//                     <input type="email" value={user.email} onChange={ e => setUser({...user, email:e.target.value})}/>
//                 </div>
//                 <div className={styles["form-group"]}>
//                     <label>Password</label>
//                     <input type ="password" value={user.password} onChange={ e => setUser({...user,password:e.target.value})}/>
//                 </div>
//                 <div className={styles["form-group"]}>
//                     <button> {authenticationMode === AuthenticationMode.Login ? "Login": "Submit"}</button>
//                 </div>
//                 <div className={styles["form-group"]}>
//                     <Link to={ authenticationMode === AuthenticationMode.Login ? "/signup": "/signin"}>
//                         {authenticationMode === AuthenticationMode.Login ? "No account ? Sign up": "Already signed up? Sign in"}
//                     </Link>
//                 </div>
//             </form>
//         </div>
//     )
// }
    