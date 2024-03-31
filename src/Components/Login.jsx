import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.init";
import { useState } from "react";
const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app)
    console.log(app)
    const provider = new GoogleAuthProvider()
    const providerGit = new GithubAuthProvider()
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user
                console.log(loggedInUser)
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGithubSingIn= ()=> {
        signInWithPopup(auth, providerGit)
        .then(result =>{
            const loggedUser = result.user
            console.log(loggedUser)
            setUser(loggedUser)
        })
        .catch(error =>{
            console.log(error.message)
        })

    }
    return (
        <div>
            {user ?
                <button onClick={handleSignOut} className="btn">Sign Out</button> :
                <div>
                    <button className="btn" onClick={handleGoogleSignIn}>Google Login</button>
                    <button className="btn" onClick={handleGithubSingIn}>Git Sign in</button>
                </div>
            }
            {user && <div>
                <h3>User: {user.displayName}</h3>
                <h3>User Email: {user.email}</h3>
            </div>}
        </div>
    );
};

export default Login;