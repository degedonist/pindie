"use client"

import Styles from "./CardsListSection.module.css";
import { CardsList } from "./CardsList";
import { CardsSlider } from "./CardsSlider";
import Toggle from "react-styled-toggle";
import { useState } from "react";

export const CardsListSection = (props) => {

  let [state, setState] = useState(true);

  return (
    <section className={Styles["list-section"]}>
      <h2 className={Styles["list-section__title"]} id={props.id}>
        {props.title}
        <Toggle backgroundColorChecked="#ffff00" backgroundColorButton="#000000" checked={state} labelRight={state ? "Disable Slider" : "Enable Slider"} onChange={() => {setState(!state)}}/>
      </h2>
      {state ? <CardsSlider data={props.data} /> : <CardsList data={props.data} />}
    </section>
  );
};