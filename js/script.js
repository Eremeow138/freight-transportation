//переменная ниже хранит json файл с услугами
let appData;
//скрываем прелоадер при загрузке документа
window.onload = function () {
    hideLoader($('body'), 1000);
};

setServiceList($('.services__content'), 'https://script.google.com/macros/s/AKfycbzs72jZeb9ykJcfQBWqndyyUXNRvdt0qQeGICvJIobTET7iIqo/exec');
//Функция для получения джейсона и заполнения блока services
function setServiceList(list, url) {
    showLoader(list);
    $.getJSON(url, function(json, status) {
        appData = json.result;

        if (status !== 'success') {
            $('.services__content').html('Произошла ошибка, обновите страницу!');
        } else {

                    for (let i = 0; i < appData.length; i++) {
                        setTemplateServiceList(list, i, appData);
                    }
                    hideLoader(list, 1000);
                }
    });

}

function setTemplateServiceList(list, index, arr) {
    list.append(`<div class="services__item js_showDetail" data-id = "`+arr[index][0]+`">
      <div class="services__logo"> <i class="icon-`+arr[index][2]+`"></i></div>
      <div class="services__name">`+arr[index][1]+`</div>
    </div>`);
}
// слик слайдер
$('.js-slider').slick({
    // setting-name: setting-value
    nextArrow: '<div class="slick-arrowBox slick-arrowBox_top"><button type="button" class="slick-next slick-btn">След</button><i class="icon-arrow-right"></i></div>',
    prevArrow: '<div class="slick-arrowBox slick-arrowBox_bottom"><i class="icon-arrow-left"></i><button type="button" class="slick-prev slick-btn">Назад</button></div>',

    speed: 700,
    fade: true,
  });

// отслеживаем изменения ширины экрана, для адаптации стрелок слайдера
  let resized = false;
  $(window).resize(function(event) {
      let ww = $(window).width();
      // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
      if (resized == ww) { return; }
      resized = ww;
      // console.log();

      replaceVehicalImage(ww);
  });

  function replaceVehicalImage(ww) {

      let slide = $('.transportation__box'), left, right, text;
      slide.each(function(index, el) {
          right = $(el).find('.transportation__right');
          left = $(el).find('.transportation__left');
          text = $(el).find('.transportation__text');
          if (ww < 751) {
              // console.log("isMobile");
              right.insertAfter(text);
          } else {
              // console.log('isDesctop');
              right.insertAfter(left);
          }
      });
  }

// replaceVehicalImage($(window).width());



$('.js_showVacancies').on('click', function(){
    showVac();
});
// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
$('a[href^="#"]').click( function(e){
    e.preventDefault();
    var scroll_el = $(this).attr('href');
    if (scroll_el == "#") {
        return false;
    }

	if ($(scroll_el).length != 0) {
        // меняю


        if (scroll_el==='#form') {

            $('.modal').animate({ scrollTop: $(scroll_el).offset().top }, 500);

        }else {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);

        }
        // конец меняю

	}
    $(this).blur();
	return false;
});

//здесь в будующем подключим json файл откуда будем брать данные для вакансий
function showVac() {

    // let template = `<div class="productModal__img">
    //         <img src="" alt="" title="">
    //     </div>
    //     <div class="productModal__content">
    //       <div class="productModal__name"></div>
    //       <div class="productModal__price">$</div>
    //       <div class="productModal__description"></div>
    //       <div class="productModal__action">
    //         <button class="btn js_buy" type="button">Buy</button>
    //       </div>
    //     </div>`;

    let modal = $('#vac');
    let body = modal.find('.modal-body');

    // body.html(template);
    modal.modal('show');
    // $('.modal-close').on('click', function(){
    //     modal.modal('hide');
    // });
}

$('.services__content').on('click', '.js_showDetail', function(){
    console.log('appData= '+appData);
    let modal = $('#detail');
    let body = modal.find('.modal-body');
    let itemID = $(this).data('id');
    console.log(itemID);

    let index = null;
    for (var i = 0; i < appData.length; i++) {
        if (appData[i][0]===itemID) {
            index = i;
            break;
        }
    }

    let title = appData[index][1];

    let logoClass ='icon-'+appData[index][2];
    let desc = appData[index][3];
    let img = appData[index][5];

    let template = `<div class="detail__wrapper">
      <h2 class="detail__title">`+ title + `<i class="detail__logo `+logoClass+`"></i></h2>
      <div class="detail__content">
        <div class="detail__description">`+desc+`</div>
        <div class="detail__image">
            <img src="img/`+appData[index][5]+`" alt="`+appData[index][5]+`"/>
            <p class="detail__price"> От `+appData[index][4]+`$</p>
        </div>
      </div>
    </div>`;
    body.html(template);
    modal.modal('show');

});

//две функции ниже отвечают за корректную работу выпадающего списка должностей
$('.drop__wrapper').on('click', function() {

    $(this).toggleClass('active');

    $(this).closest('.drop').find('.drop__list').toggleClass('open');

});
$(document).mouseup(function (e){
    let elem  =$('.drop__wrapper');
    let elemList = $('.drop__list');
    if (!elem.is(e.target)&& elem.has(e.target).length === 0 && !elemList.is(e.target) && elemList.has(e.target).length === 0 ) {

        elem.removeClass('active');
        elem.closest('.drop').find('.drop__list').removeClass('open');

    }
});
// меняем представление импут лайбла
$('.fileDrop__input').on('change', function(e) {
    let fileName = '',
    labelVal = $('.fileDrop__label').html();

    if (this.files && this.files.length > 1) {
        console.log('true');
        fileName= 'Выбрано '+this.files.length+' файла ';

    }else {
        fileName = this.files[0].name;
    }

    if (fileName) {
        $('.fileDrop__label').html(fileName);
    }else {
        $('.fileDrop__label').html(labelVal);
    }
});
//функция заполняющая желаемую должность
function posContatation(){
    let pos = "";
    let arr = [];

    $('.drop__checkbox').on('click', function() {


        arr = [];
        $('.drop__checkbox').each(function(){

            if ($(this).prop("checked")) {

                arr.push($(this).closest('.drop__item').find('.drop__position').text());

            }

        });

        if (arr.length) {

            pos = arr[0];
            for (var i = 1; i < arr.length; i++) {
                pos+=", "+ arr[i];
            }


            $('.drop__toogle').val(pos);
            console.log(pos);
        }else {
            $('.drop__toogle').val("");
            $('.drop__toogle').attr('placeholder', 'Желаемая должность');

        }

        checkFiels($('.drop__toogle'));

    });
}
posContatation();
// функция submitForm более не используется, вместо нее send()
function submitForm() {
    // подготавливаем модальное окно с сообщением
    let modal = $('#info'),
        message = modal.find('.info__message');

    modal.on('hidden.bs.modal', function (e) {
        message.html('');
    });

    $('[type=submit]').on('click', function(e) {
        // Отменяем стандартное действие.
        // В данном случае отправку формы после нажатия унопки с type=submit
        e.preventDefault();
        // Можно отменить работу отельных библиотек и скриптов.
        // e.stopPropagination();

        // Можно почитать что входит в стандартный аргумент event срабатывающий при событии
        // console.log(e);

        // Объявляем набор переменных для того чтобы с крипт работал исключительно с формой к которому относится кнопка
        let form = $(this).closest('form'),
            // Ищем обязательные поля
            fields = form.find('[required]'),
            // Записываем значение атрибута формы action
            url = form.attr('action'),
            // // Хаписываем значения полей форм. Обязателен атрибут name у полей с уникальным значением
            // formData = form.serialize(),

            // Создаем переменную для счетчика пустых полей
            empty = 0;

            console.log(form);
            formData = new FormData();
            formData.append('firstName', $('#fName').val());
	        formData.append('lastName', $('#fLname').val());


        // console.log(url);
        console.log(formData);
        // console.log($('#fName').val());
        // Перебираем обязательные поля формы
        fields.each(function(index, el) {
            // Проверяем пустое ли поле
            // console.log("ioi");
            // console.log($(this).val());
            if ($(this).val() === '') {
                // Увеличиваем счетчик полей на 1
                empty++;
            }

            // Универсальная функция для проверки и визуализации пустых полей
            checkFiels($(this));
        });

        console.log(empty);

        if (empty > 0) {
            // hideLoader($('.eightSection'));
            // Если пустых полей больше 1, останавливаем работу скрипта
            return false;
        } else {
            // showLoader($('.eightSection'));
            // Если пустых полей нет, отправляем форму
            // Либо стандартым методом с перезагрузкой страницы
            // form.submit();
            // Либо через аякс, без перезагрузки страницы
            $.ajax({

                contentType: false, // важно - убираем форматирование данных по умолчанию
                processData: false, // важно - убираем преобразование строк по умолчанию
                // Ссылка на обработчик файла
                url: url,
                // Тип метода отправки
                type: "POST",
                // Тип данных
                dataType: "html",
                // Данные из формы
                data: formData,
                // Если все хорошо, то
                success: function (response) {
                    console.log('success');

                    // Пример с открытием окна
                    modal.modal('show');

                    // Пример с перенаправлением на другую страницу
                    // document.location.href = "js.html";

                    // Пример вывода текста в какой то блок
                    message.html('Ваша форма успешно отправлена. <br> Мы свяжемся с вами в ближайшее время.');
                    // hideLoader($('.eightSection'));
                    // Дополнительно можно удалить текст из блока спустя какое то время
                    // setTimeout(function () {
                        //     message.html('');
                        // }, 5000);

                },

                // Тут можно выполнить действия если произошла ошибка отправки
                error: function (response) {
                    console.log('error');

                    // message.text('Произошла ошибка при отправке. <br> Попробуйте отправить форму позже.');
                    modal.modal('show');

                    message.html('Произошла ошибка при отправке. <br> Попробуйте отправить форму позже.');
                    // hideLoader($('.eightSection'));
                    // setTimeout(function () {
                        //     message.html('');
                        // }, 5000);

                }
            });
        }

    });

    // Проверка заполненности полей на лету
    $('input').on('keyup', function() {
        checkFiels($(this));
    });


    // function checkFiels(el) {
    //     // При разных условиях меняем классы и внешний вид полей
    //     if (el.val() === '') {
    //         el.addClass('invalid');
    //         el.removeClass('valid');
    //     } else {
    //         el.removeClass('invalid');
    //         el.addClass('valid');
    //     }
    // }
}
// Проверка заполненности полей на лету
$('input').on('keyup', function() {
    checkFiels($(this));
});


//здесь мы прверяем форму и если какое то поле не заполенно - отменяем submit
$('[type=submit]').on('click', function(e) {
    // Отменяем стандартное действие.
    // В данном случае отправку формы после нажатия унопки с type=submit
    // e.preventDefault();
    let fields = $('#form').find('[required]'),
    // // Создаем переменную для счетчика пустых полей
    empty = 0;

    fields.each(function(index, el) {
        // Проверяем пустое ли поле
        if ($(this).val() === '') {
            // Увеличиваем счетчик полей на 1
            empty++;
            // console.log(this);
        }
        checkFiels($(this));
    });
    if (empty>0) {
        e.preventDefault();
    }



});
function send(event, php){

showLoader($('#form'), true);

        // подготавливаем модальное окно с сообщением
        let modal = $('#info'),
            message = modal.find('.info__message');

        modal.on('hidden.bs.modal', function (e) {
            message.html('');
        });
        console.log(event.preventDefault);
        // event.preventDefault ? event.preventDefault() : event.returnValue = false;
        if (event.preventDefault) {
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
        var req = new XMLHttpRequest();
        req.open('POST', php, true);
        req.onload = function() {
        	if (req.status >= 200 && req.status < 400) {
        	json = JSON.parse(this.response); // Ебанный internet explorer 11
            	console.log(json);

            	// ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
            	if (json.result == "success") {
            		// Если сообщение отправлено
            		// alert("Сообщение отправлено");
                    // Пример с открытием окна
                    hideLoader($('#form'));
                    modal.modal('show');
                    message.html('Ваша форма успешно отправлена. <br> Мы свяжемся с вами в ближайшее время.');
            	} else {
            		// Если произошла ошибка
            		// alert("Ошибка. Сообщение не отправлено");
                    // Пример с открытием окна
                    hideLoader($('#form'));
                    modal.modal('show');
                    message.html('Ошибка. Сообщение не отправлено');
            	}
            // Если не удалось связаться с php файлом
            // } else {alert("Ошибка сервера. Номер: "+req.status);}};
            } else {hideLoader($('#form')); modal.modal('show'); message.html('Ошибка сервера. Номер: '+req.status);}};

        // Если не удалось отправить запрос. Стоит блок на хостинге
        // req.onerror = function() {alert("Ошибка отправки запроса");};
        req.onerror = function() {hideLoader($('#form')); modal.modal('show'); message.html('Ошибка отправки запроса');};
        // console.log(event.target);
        // console.log($('#form').submit());
        req.send(new FormData(event.target));
        // req.send(new FormData($('#form')));
    // }

}

function modalClose(){
    $('.modal-close').on('click', function() {
        $(this).closest('.modal').modal('hide');
        if ($('.modal.in').length > 0) {

            $('body').addClass('modal-open');
        }
        // console.log($('.modal.in'));
    } );
}
modalClose();
// функция смены внешнего вида полей
function checkFiels(el) {
    // При разных условиях меняем классы и внешний вид полей
    if (el.val() === '') {
        el.addClass('invalid');
        el.removeClass('valid');
    } else {
        el.removeClass('invalid');
        el.addClass('valid');
    }
}

// Показать лоадер при загрузке товаров
function showLoader(el, background) {

    let backg = '';
    if (background) {
        backg='banter-loader_background';
    }
    el.append(`<div class="banter-loader banter-loader_targeting `+backg+`">
      <div class="banter-loader__wrapper">
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
          <div class="banter-loader__box"></div>
      </div>
    </div>`);
}



// Скрыть лоадер при загрузке товаров
function hideLoader(el, time = 10) {
    console.log('hide is run');
    console.log(el.children('.banter-loader'));
    el.children('.banter-loader').addClass('loaded');
    setTimeout(function () {
        el.children('.banter-loader').addClass('loaded_hide');
    }, time);
}

setInterval(function () {
 date = new Date(),
 h = date.getHours(),
 m = date.getMinutes(),
 s = date.getSeconds(),
 h = (h < 10) ? '0' + h : h,
 m = (m < 10) ? '0' + m : m,
 s = (s < 10) ? '0' + s : s,
 document.getElementById('time').innerHTML = h + ':' + m + ':' + s;
}, 1000);
