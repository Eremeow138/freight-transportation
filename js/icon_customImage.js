ymaps.ready(function () {
    var myMap = new ymaps.Map('yandexMap', {
            center: [59.927125, 30.374860],
            zoom: 17
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Это наш офис',
            balloonContent: 'Скорее несите свои деньги'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/geometka.png',
            // Размеры метки.
            iconImageSize: [70, 70],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            // iconImageOffset: [-75, -10]
            iconImageOffset: [-70, -70]
        });

        // myPlacemarkWithContent = new ymaps.Placemark([59.927375, 30.374972], {
        //     hintContent: 'Собственный значок метки с контентом',
        //     balloonContent: 'А эта — новогодняя',
        //     iconContent: '12'
        // }, {
        //     // Опции.
        //     // Необходимо указать данный тип макета.
        //     iconLayout: 'default#imageWithContent',
        //     // Своё изображение иконки метки.
        //     iconImageHref: 'img/ball.png',
        //     // Размеры метки.
        //     iconImageSize: [48, 48],
        //     // Смещение левого верхнего угла иконки относительно
        //     // её "ножки" (точки привязки).
        //     iconImageOffset: [-24, -24],
        //     // Смещение слоя с содержимым относительно слоя с картинкой.
        //     iconContentOffset: [15, 15],
        //     // Макет содержимого.
        //     iconContentLayout: MyIconContentLayout
        // });

    myMap.geoObjects
        .add(myPlacemark);
        // .add(myPlacemarkWithContent);
});
