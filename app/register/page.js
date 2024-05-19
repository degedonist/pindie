"use client"

import { RegForm } from "../components/RegForm/RegForm";
import Styles from "./Login.module.css"
import { useRouter } from "next/navigation";

export default function Register() {

    const router = useRouter();

    return (
        <main className="main">
            <div className={Styles['login']}>            
                <RegForm close={() => {router.push("/profile")}} />
            </div>
        </main>
    );
}