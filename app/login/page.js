"use client"

import { AuthForm } from "../components/AuthForm/AuthForm";
import Styles from "./Login.module.css"
import { useRouter } from "next/navigation";

export default function Login() {

    const router = useRouter();

    return (
        <main className="main">
            <div className={Styles['login']}>            
                <AuthForm close={() => {router.back()}} />
            </div>
        </main>
    );
}