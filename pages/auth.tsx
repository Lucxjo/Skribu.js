import Image from "next/image";
import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from '../lib/context';

export default function Auth({}) {
    const { user, username} = useContext(UserContext)
    return (
        <main>
            <h1>Sign In</h1>
            { user?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }
        </main>
    )
}

function SignInButton({}) {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    }

    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            <Image src={'/google.png'} width="90px" height="90px" alt="Google sign in"/> <span className="btn-google">Sign in with Google</span>
        </button>
    )
}

function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {return null}