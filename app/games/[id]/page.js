"use client"

import Styles from "./Game.module.css";
import { GameNotFound } from "@/app/components/GamesNotFound/GameNotFound";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNormalizedGameDataById, isResponseOk, checkIfUserVoted, vote } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { useStore } from "@/app/store/app-store";

export default function GamePage(props) {

  let [game, setGame] = useState(null);
  let [preloaderVisible, setPreloaderVisible] = useState(true);
  let [isVoted, setIsVoted] = useState(false);
  const store = useStore()

  useEffect(() => {
    async function fetchData() {
      setPreloaderVisible(true);
    const game = await getNormalizedGameDataById(
      endpoints.games,
      props.params.id
    );
    isResponseOk(game) ? setGame(game) : setGame(null);
    setPreloaderVisible(false);
    }
    fetchData();
  }, []);

useEffect(() => {
      store.user && game ? setIsVoted(checkIfUserVoted(game, store.user._id)) : setIsVoted(false);
  }, [store.user, game]); 


  const router = useRouter();

  const login = () => {
    router.push('/login')
  }

  const handleVote = async () => {
      const jwt = store.token;
      let usersIdArray = game.users.length
        ? game.users.map((user) => user._id)
      : [];
      usersIdArray.push(store.user._id);
      const response = await vote(
        `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    );
    if (isResponseOk(response)) {
        setGame(() => {
          return {
            ...game,
          users: [...game.users, store.user],
        };
      });
          setIsVoted(true);
  }};


  return (
    <main className="main">
      {game ? (
          <>
            <section className={Styles['game']}>
              <iframe className={Styles['game__iframe']} src={game.link}></iframe>
            </section>
            <section className={Styles['about']}>
              <h2 className={Styles['about__title']}>{game.title}</h2>
              <div className={Styles['about__content']}>
                <p className={Styles["about__description"]}>{game.description}</p>
                <div className={Styles["about__author"]}>
                  <p>Автор: <span className={Styles["about__accent"]}>{game.developer}</span></p>
                </div>
              </div>
              <div className={Styles["about__vote"]}>
                <p className={Styles["about__vote-amount"]}>За игру уже проголосовали: <span className={Styles["about__accent"]}>{game.users.length}</span></p>
                {!store.isAuth && <p className={Styles["about__vote-amount"]}>⬇ Войдите чтобы голосовать ⬇</p>}
                <button disabled={isVoted} className={`button ${Styles["about__vote-button"]}`} onClick={store.isAuth ? handleVote : login}>
                  {isVoted ? "Голос учтён" : store.isAuth ? "Голосовать" : "Войти"}
                </button>
              </div>
            </section>
          </>
      ) : preloaderVisible ? (
            <Preloader /> 
        ) : (
          <GameNotFound />
        )};
    </main>
)};
