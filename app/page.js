"use client"
import { Banner } from "./components/Banner/Banner.jsx";
import { Promo } from "./components/Promo/Promo.jsx";
import { endpoints } from "./api/config.js";
import { useGetDataByCategory } from "./api/api-hooks.js";
import { CardsListSection } from "./components/CardListSection/CardsListSection.jsx";
import { Preloader } from "./components/Preloader/Preloader.jsx";

export default function Home() {

  const popularGames = useGetDataByCategory(endpoints.games, 'popular');
  const newGames = useGetDataByCategory(endpoints.games, 'new');

  return (
    <main className="main">
      { (popularGames != null) & (newGames != null) ?
        <>
          <Banner />
          <CardsListSection title="Популярные" id="popular" data={popularGames}/>
          <CardsListSection title="Новинки" id="new" data={newGames} />
          <Promo />
        </>
        :
        <Preloader/>
      }
    </main>
  );
}
