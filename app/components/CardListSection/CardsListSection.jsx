"use client"

import Styles from "./CardsListSection.module.css";
import { CardsList } from "./CardsList";
import { CardsSlider } from "./CardsSlider";
import Toggle from "react-styled-toggle";
import { useStore } from '@/app/store/app-store.js';
import { useEffect, useState } from "react";

export const CardsListSection = (props) => {
  
  const store = useStore();

  let [sliderState, setSliderState] = useState(store.slider);

  const change = () => {
    setSliderState(!sliderState);
  }

  useEffect(() => {
    store.changeSlider(sliderState);
  }, [sliderState]);

  return (
    <section className={Styles["list-section"]}>
      <h2 className={Styles["list-section__title"]} id={props.id}>
        {props.title}
        <Toggle backgroundColorChecked="#ffff00" backgroundColorButton="#000000" checked={sliderState} labelRight={sliderState ? "Disable Slider" : "Enable Slider"} onChange={change}/>
      </h2>
      {sliderState ? <CardsSlider data={props.data} /> : <CardsList data={props.data} />}
    </section>
  );
};