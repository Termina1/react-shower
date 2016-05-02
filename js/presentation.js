import React, { Component } from 'react';
import Deck from "./components/Deck.react";
import Slide from "./components/Slide.react";
import Code from "./components/Code.react";

import vkLogo from "../img/vk.svg";
import paperLogo from "../img/paper.svg";
import spbfront from "../img/spb-front.jpg";
import jon2 from "../img/jon2.jpg";
import newvk from "../img/new.vk.png";
import ie from "../img/ie.jpg";
import frame from "../img/frame.png";
import feature from "../img/feature.jpg";
import staticScheme from "../img/static.png";
import graph from "../img/graph.png";
import ladder from "../img/ladder.png";

import gulp from "raw!../code/gulp.js";
import watch from "raw!../code/watch.js";

import {} from "../css/theme.css";
import {} from "../css/prism.css";

const TOPIC = 'Ничего ты не знаешь, Джон Сноу. Фронтенд new.vk.com.';
const SPEAKER = 'Вячеслав Шебанов';

export default class Presentation extends Component {

  render() {
    return (
      <div>
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
          <h2>Привет, меня зовут Слава</h2>
          <ul>
            <li className="sparse-item">
              <img className="work-logo" src={vkLogo} /> Разработчик «ВКонтакте»
              (<a href="https://vk.com" target="_blank">vk.com</a>)
            </li>
            <li className="sparse-item">
              <img className="work-logo work-logo_paper" src={paperLogo} /> Сооснователь интернет-газеты «Бумага»
              (<a href="http://paperpaper.ru" target="_blank">paperpaper.ru</a>)
            </li>
            <li className="sparse-item">
              <img className="work-logo" src={spbfront} /> Один из организаторов SPB Frontend
            </li>
          </ul>
        </Slide>
        <Slide className="center full white">
          <img src={newvk} alt="" style={{marginTop: -30}}/>
        </Slide>
        <Slide>
          <h2 className="shout"><a target="_blank" href="http://lesscss.org/">LESS</a></h2>
        </Slide>
        <Slide>
          <h2>Правила</h2>
          <ol>
            <li>Никаких id</li>
            <li>1 раздел = 1 js + 1 css + libs</li>
            <li>Классы для JS начинаются с «_»</li>
            <li>Отдельный файл с less-переменными</li>
          </ol>
        </Slide>
        <Slide>
          <h2 className="shout smaller">CSS-методология</h2>
        </Slide>
        <Slide>
          <h2>Иконки</h2>
          <ul>
            <li>Пока растр, подставляются через миксины</li>
            <li>Начинаем внедрять SVG, был негативный опыт</li>
          </ul>
        </Slide>
        <Slide>
          <h2 className="shout smaller">Sketch & Zeplin</h2>
        </Slide>
        <Slide>
          <img src={ie} alt="" />
        </Slide>
        <Slide>
          <h2>Поддержка браузеров</h2>
          <ol>
            <li>IE8+</li>
            <li>Последние 10 версий (Autoprefixer)</li>
          </ol>
          <p>IE8 + IE9 = 1%</p>
        </Slide>
        <Slide>
          <h2 className="smaller shout">Библиотека компонентов?</h2>
        </Slide>
        <Slide>
          <h2 className="smaller shout">Frame-транспорт</h2>
        </Slide>
        <Slide className="center white full">
          <img src={frame} alt="" />
        </Slide>
        <Slide>
          <h2>Менеджер статики</h2>
          <ol>
            <li>Подгрузка js/css</li>
            <li>Учитывает актуальные версии, загружает новое</li>
            <li>Инициирует перезагрузку при переходе, если нужно</li>
          </ol>
        </Slide>
        <Slide className="center">
          <h2>Как запилить фичу для ВК</h2>
          <img alt="" src={feature} />
        </Slide>
        <Slide>
          <h2 className="shout">Сборка</h2>
        </Slide>
        <Slide>
          <h2>Начнем сначала</h2>
          <ol>
            <li>LESS уже работал</li>
            <li>PHP -> JS -> PHP</li>
            <li>Watcher</li>
          </ol>
        </Slide>
        <Slide>
          <h2>Минусы сборки на PHP</h2>
          <ol>
            <li>Это медленно</li>
            <li>Нет экосистемы</li>
            <li>Нельзя сделать нормальный watcher</li>
          </ol>
        </Slide>
        <Slide>
          <h2>Первый подход</h2>
          <Code code={gulp} />
        </Slide>
        <Slide>
          <h2 className="shout smaller">Время работы: 1,5 минуты</h2>
        </Slide>
        <Slide className="full center black">
          <img src={jon2} alt="" className="cover" />
        </Slide>
        <Slide>
          <h2>Кэш</h2>
          <figure>
            <blockquote><p>There are only two hard things in Computer Science: cache invalidation and naming things.</p></blockquote>
            <figcaption>Phil Karlton</figcaption>
          </figure>
        </Slide>
        <Slide>
          <h2 className="shout smaller">Прошло два дня...</h2>
        </Slide>
        <Slide>
          <h2>Кэш</h2>
          <p>Кэш заработал, но собираться быстрее не стало. Зато собирать все уже не надо было.</p>
          <p>Ну и ладно.</p>
        </Slide>
        <Slide>
          <h2>Live reload</h2>
          <Code code={watch} />
          <p>А что если сборщик не успеет?</p>
        </Slide>
        <Slide className="center full white">
          <img alt="" src={staticScheme} />
        </Slide>
        <Slide>
          <h2 className="shout smaller">Watcher + Reload</h2>
        </Slide>
        <Slide className="center">
          <h2>Обновление по частичному графу</h2>
          <img alt="" src={graph} />
        </Slide>
        <Slide className="center">
          <h2>Лесенка</h2>
          <img alt="" src={ladder} />
        </Slide>
        <Slide className="full center black">
          <img src={jon2} alt="" className="cover" />
        </Slide>
        <Slide>
          <h2 className="shout smaller">Прошло еще два дня...</h2>
        </Slide>
        <Slide>
          <h2>Node Cluster API</h2>
          <ol>
            <li>CSS отдается в 3 раза быстрее, чем в старой версии</li>
            <li>Watcher все собирает параллельно</li>
            <li>Полная сборка примерно 16 секунд (сейчас 30)</li>
          </ol>
        </Slide>
        <Slide>
          <h2 className="shout"><a target="_blank" href="https://facebook.github.io/fb-flo/">fb-flo</a></h2>
        </Slide>
        <Slide>
          <h2 className="shout smaller">Кэш :(</h2>
        </Slide>
        <Slide className="center">
          <img alt="" src={feature} />
        </Slide>
        <Slide>
          <h2>Стек сборки</h2>
          <ol>
            <li>less</li>
            <li>autoprefixer</li>
            <li>cssnano</li>
            <li>rtlcss</li>
          </ol>
        </Slide>
        <Slide>
          <h2 className="shout smaller"><a href="https://twitter.com/andrey_sitnik" target="_blank">#СитникДавайЕще</a></h2>
        </Slide>
        <Slide>
          <h2>Webpack</h2>
          <ol>
            <li>babel</li>
            <li>ES6 modules</li>
            <li>Uglify</li>
          </ol>
        </Slide>
        <Slide>
          <h2>Контакты</h2>
          <ul>
            <li>Twitter: <a href="https://twitter.com/thought_sync">thought_sync</a></li>
            <li>Github: <a href="https://github.com/Termina1">Termina1</a></li>
            <li>VK: <a href="https://vk.com/bysoul">/id245216</a></li>
          </ul>
        </Slide>

        <Slide className="center">
          <h2 className="shout smaller"><a target="_blank" href="https://bit.ly/pitercss-vk">bit.ly/pitercss-vk</a></h2>
          <h2>Вопросы?</h2>
        </Slide>
      </Deck>
      </div>
    );
  }
}
