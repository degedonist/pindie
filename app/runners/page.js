"use client"
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";
import { CardsListSection } from "../components/CardListSection/CardsListSection";

export default function Runners() {

    const runnerGames = useGetDataByCategory(endpoints.games, "runner");

    return (
      <main className="main-inner">
        {runnerGames ? <CardsListSection id="runner" title="Раннеры" data={runnerGames} /> : <Preloader />}
      </main>
    );
  }