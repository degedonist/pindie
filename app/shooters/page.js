"use client"
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";
import { CardsListSection } from "../components/CardListSection/CardsListSection";

export default function Shooters() {

    const shooterGames = useGetDataByCategory(endpoints.games, "shooter");

    return (
      <main className="main-inner">
        {shooterGames ? <CardsListSection id="shooter" title="Шутеры" data={shooterGames} /> : <Preloader />}
      </main>
    );
  }