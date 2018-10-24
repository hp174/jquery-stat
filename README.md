Скрипт отправки лидов в популярные системы статистики

## Описание

Включение файла создает глобальный объект Stat (с большой буквы) и методами, которые отправляют лиды в различные системы статитики (Яндекс Метрика, Гугл Аналитика, dataLevel, Facebook Pixel, roistat).

### Методы объекта Stat

*ga(eventCategory, eventAction, eventLabel, eventValue)*  - отправка данных в Гугл Аналитику методом `ga('send', pars)`, где `pars` - объект `{eventCategory, eventAction, eventLabel, eventValue}` с одноименными значениями. Все параметры метода опциональны.

*ga2(eventCategory = '', eventAction = '', eventLabel = '', eventValue = 1)*  - отправка данных в Гугл Аналитику методом `ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue)`, где `eventCategory`, `eventAction`, `eventLabel`, `eventValue` - одноименные параметры метода `ga` Гугл Аналитики. Все параметры метода опциональны.
Если функции `ga` не обнаружено в окружении, метод ничего не делает.

*fbq(track, Lead)* - отправка данных в Facebook Pixel. Параметры метода идентичный параметрам функции `fbq(track, Lead)`.
Если функции `fbq` не обнаружено в окружении, метод ничего не делает.

*reachGoal(goal, params)* - отправка данных в Яндекс Метрику. Параметры метода идентичный параметрам функции `[yaCounter].reachGoal(goal, params)`.
yaCounter - ID счетчика, можно задать через `window.yaCounter = "Номер счетчика"`. Если на задан номер, он ищется в пуле счетчиков метрики. Если Метрики нет на сайте, метод ничего не делает.

*roistat(goal)* - отправка данных в Ройстат. Транслятор метода `roistat.event.send(goal)`.
Если объект `roistat` не обнаружен в окружении, метод ничего не делает.

*dataLayer(e)* - отправка данных в dataLayer. Транслятор метода `dataLayer.push(e)`.
Если объект `dataLayer` не обнаружен в окружении, метод ничего не делает.

*send($o)* - метод автоматической отправки целей на основе аттрибутов `data-*` у DOM объекта $o в jquery обертке.
В методе `send` проверяются следующие аттрибуты `data-*`:
*`data-goal-common` и `data-goal` - для отправки в Яндекс Метрику
*`data-ga-common` и `data-ga` - для отправки в Гугл Аналитику
*`data-fbq` - для отправки в Facebook Pixel
*`data-roistat` - для отправки в Ройстат
*`data-datalayer-common` и `data-datalayer` - для отправки в dataLayer

Значение аттрибута может содержать несколько целей одновременно. Для этого их нужно отделить точкой с запятой ";".
Для Гугл Аналитики и Facebook Pixel цели могут представлять набор параметров согласно методам `ga`, `ga2` и `fbq`. Параметры отделаются запятой.

Например, для следующего DOM элемента
    <a id="goalLink" href="#" data-goal="yaGoal" data-ga="eventCategory,eventAction,eventLabel,eventValue">Ссылка с целями</a>
Можно укзать следующий обработчик
   $("#goalLink").on("click", function() {
     Stat.send($(this));
   });
В результате будут отправлены цели в Яндекс Метрику ("yaGoal") и в Гугл Аналитику (с параметрами `eventCategory,eventAction,eventLabel,eventValue`).

Результаты отработки методов пишутся в консоль браузера, которую можно посмотреть в режиме отладки.

