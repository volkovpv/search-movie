#Тестовое задание для Frontend-разработчика  
  
##Кратко  
Разработать web-приложение “Поиск фильма”, используя API сервиса themoviedb.org в качестве
источника базы фильмов.  

##При решении задачи
- использовать возможности HTML, CSS, JS и связанные с ними фреймворки/библиотеки/плагины  
- обеспечить максимально возможную динамичность интерфейса и отзывчивость на действия пользователя  
- показать, как хорошо ты умеешь работать над “красотой” кода  
- продемонстрировать своё “чувство прекрасного” в отношении проектирования интерфейсов  
  
##Ожидаемый функционал интерфейса:  
- отображение позиций на странице в плиточном виде (картинка, название и год)  
- поиск по имени  
- динамическая подгрузка (скроллинг или пагинация)  
- выбор определенной позиции и отображение максимально возможной информации в отдельном окне или специально отведенной части страницы    

##themoviedb.org
- ознакомиться с документацией API можно [здесь](http://docs.themoviedb.apiary.io/ "API themoviedb.org")  
- ключ ---  
- можно использовать готовые js-библиотеки для работы с этим api  

##Критерии оценки задания:  
- верстка не съезжает в любых состояниях страницы  
- кроссбраузерность Chrome/Firefox/Opera/Safari последних версий  
- обеспечено минимальное количество действий со стороны пользователя для выполнения нужного поиска  
- разумное использование того или иного фреймворка/библиотеки/плагина, отсутствие спагеттикода  
- не объективные или просто будет плюсом:   
    - импровизация над интерфейсом; ощущение, что автор вложил свою душу :)
    - учтены разрешения мобильных устройств
    - сохранение состояний поиска / возможность вернуться на пару шагов назад
    - предусмотрено N-ное количество исключительных ситуаций в поведении пользователя на странице (где, чем больше N, тем лучше)
    
###Желательно, но не обязательно, предложить решение на базе Ember.js и Embercli, чтобы:  
- ознакомиться с концепциями и возможностями фреймворка, если еще не было опыта знакомства с ними  
- определить для себя нет ли отторжения на “уровне организма” от такой технологии. Это важно, т.к. в командной разработке нет места холиварам и излишним дискуссиям  
  
==========================================================================  
  
#Start  
  
##Prod start  
- git clone https://github.com/volkovpv/search-movie.git  
- npm start  
  
##Develop start  
- git clone https://github.com/volkovpv/search-movie.git  
- npm install -g gulp  
- npm install    
- gulp watch  
  
#Решение задачи  

##Кодастаил
Кодастаил был взят согласно [данному соглашению](https://github.com/johnpapa/angular-styleguide/blob/master/i18n/ru-RU.md "johnpapa Руководство по стилям для AngularJS")  
Архитектура была взята из [данного описания](http://www.johnpapa.net/angular-app-structuring-guidelines/ "Angular App Structuring Guidelines")  

##Вёрстка  
Особого внимания вёрстке не уделял.  
Примеры работы с версткой можете посмотреть [тут](https://github.com/volkovpv/1bit.zz "Вёрстка по потерну smacss"). 

##Описание кода  
Описания js сделано в формате JSDoc  

##Примечания
Ни скролинг ни пагенацию не использовал, т.к., и у того, и у того есть свои недостатки с точки зрения пользователя. В замен этого была сделан подгруздка по кнопке, в конце списка.
  
##Дизайн  
Особого внимания не уделялось, но была сдеана ставка на самое необходимое, что может быть интересно пользователю.
  
##Особенности  
Для правильной последовательности сборки js файлов как для gulp так и для node.js пришлось вынести их в конфиг файл `config-js.json`    
  
##Проблемы, которые не удалось решить    
При запуске через `npm start` не удалось сделать правильную минификацию js.  
Для сервера `Apache`  не удалось правильно настроить роутинг.  
Из-за подключённого видео с YouTube в консоль вылезают ошибки, которые пока устранить не удалось.