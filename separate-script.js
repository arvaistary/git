$(document).ready(function(){
    dataLink();
    backButtonShowHide();
    addMenuActive();
    backToTop();
    mobileMenuSlide();
    textFix();
    // mailForm();
});


function backButtonShowHide() {
    "use strict";
    $(window).scroll(function () {
        if ($(document).scrollTop() > 800) {
            $("#back_to_top").removeClass('off')
            $("#back_to_top").addClass('on')
        } else {
            $("#back_to_top").removeClass('on')
            $("#back_to_top").addClass('off')
        }
    });
};

function addMenuActive() {
    var pathname = window.location.pathname;
    if (pathname == "/") {
        $('nav>ul>li:first').addClass("active");
        console.log($(window).path);
    }
};

function backToTop() {
    "use strict";
    $(document).on("click", "#back_to_top", function (e) {
        e.preventDefault(), $("body,html").animate({
            scrollTop: 0
        }, 1000);
    });
};

function mobileMenuSlide(){
    $(".hamburger").click(function () {
        $(this).toggleClass("is-active");
        $("nav>ul").slideToggle();
    })
};

function mailForm(){
    $('body').on('click', '.js-send', function (e) {
        e.preventDefault();//-отменяем действие по умолчанию
        var el = $(this);
        el.hide();
        el.after('<img class="ajax-load" src="/website/img/general/ajax-loader.gif"');
        $.ajax({
            cache: false,
            url: "/feedback",
            type: "POST",
            data: $(this).parents('form').serialize(),
            success: function (data) {
                $('.ajax-load').remove();
                el.show();
                if (data.status == "success") {
                    $('.fancybox-close-small').click();
                    swal('Спасибо', 'Ваша заявка принята', 'success');
                } else {
                    if (data.error !== undefined) swal('Ошибка', data.error, 'error');
                    else swal('Спасибо', 'Ваша заявка принята', 'success');
                }
            },
            error: function (data) {
                $('.ajax-load').remove();
                el.show();
                swal('Ошибка', 'Повторите попытку чуть позже', 'error');
                console.log(data);
            }
        });
    });
};

function dataLink(){
    $('body').on('click','[data-href]',function(){
        var href = $(this).attr("data-href");
        window.open(href);
    })
};
function textFix() {
    var size = 120,
    newsContent= $('.text-fix'),
    newsText = newsContent.text();
    if(newsText.length > size){
        newsContent.text(newsText.slice(0, size) + ' ...');
    }
};

