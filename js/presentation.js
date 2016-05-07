import React, { Component } from 'react';
import Deck from "components/Deck.react";
import Slide from "components/Slide.react";

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
      Привет 5
    </Slide>
    <Slide>
      Привет 3
    </Slide>
  </Deck>
