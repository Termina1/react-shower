import React, { Component } from 'react';
import Deck from "components/Deck.react";
import Slide from "components/Slide.react";
import Code from "components/Code.react";

import vkLogo from "img/vk.svg";
import watch from "./code/watch.js"


import {} from "css/theme.css";

const TOPIC = 'Ничего ты не знаешь, Джон Сноу. Фронтенд new.vk.com.';
const SPEAKER = 'Вячеслав Шебанов';

export default () =>
  <Deck>

    <header className="caption">
      <h1>{TOPIC}</h1>
      <p>{SPEAKER}</p>
    </header>

    <Slide className="cover-slide">
      <h2>{TOPIC}</h2>
      <p>{SPEAKER}</p>
    </Slide>
    <Slide>
      Привет 577555
    </Slide>
    <Slide>
      Привет 3
    </Slide>
  </Deck>
