"use client"

import { useEffect, useState } from "react"
import { getMe, getJWT, isResponseOk } from "../api/api-utils"
import { endpoints } from "../api/config"
import Styles from "./profile.module.css"
import { Preloader } from "../components/Preloader/Preloader"
import { useRouter } from "next/navigation"

export default function Profile() {

    let [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const data = await getMe(endpoints.me, getJWT());
            isResponseOk(data) ? setUserData(data) : router.push("/login");
        };
        fetchData();
        }, []);
    
    return (
        <main className="main">
            { userData ?
                <div className={Styles["data__container"]}>
                    <div className={Styles["data__part"]}>
                        <p>Никнейм:</p>
                        <p className={Styles["profile-font"]}>{`${userData.username}`}</p>
                    </div>
                    <div className={Styles["data__part"]}>
                        <p>ID:</p>
                        <p className={Styles["profile-font"]}>{`${userData._id}`}</p>
                    </div>
                    <div className={Styles["data__part"]}>
                        <p>Email:</p>
                        <p className={Styles["profile-font"]}>{`${userData.email}`}</p>
                    </div>
                </div>
                :
                <Preloader/>
            }   
        </main>
    );
}