# Табло аэропорта

### Инструменты

- html
- css
- js 

### Описание работы

Данная программа запрашивает данные, используя API Яндекс.Расписаний, затем парсит их и показывает в удобном пользователю виде

### Ограничения
К сожалению есть ряд упрощений рабочей модели из-за ограничений функционала Яндекс.Расписаний

1. Яндекс.Расписание не дает нам информацию о задержке рейса, поэтому в программе используется рандомайзер, пытающийся иммитировать необходимый функционал
2. К сожалению, используя Яндекс.Расписание, я не могу получить одновременно все рейсы определенного аэропорта из всех точек мира и названия этих аэропортов, поэтому запрос делается по аэропорту Внуково, а все рейсы идут из Пулково

### Функционал

На главной странице есть три кнопки:

1.Отправление - запрос всех рейсов на сегодняшнее число из Внуково в Пулково

2.Прибытие - запрос всех рейсов на сегодняшнее число из Пулково во Внуково


3.Поиск рейсов - после выбора аэропортов и даты мы получаем список отправлений и прибытий по этой дате

Со всеми тремя вкладками может взаимодействовать поле поиска, достаточно ввести номер рейса или его статус