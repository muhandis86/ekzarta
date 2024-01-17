import 'babel-polyfill';
import 'expose-loader?$!expose-loader?jQuery!jquery';
import Swiper from 'swiper-8.4.5/package/swiper-bundle.js';
import 'before-after-image-viewer/dist/beforeafter.jquery-1.0.0.min.js';
import 'expose-loader?moment!moment';
import Modal from 'modal';
import IMask from 'imask';
// import 'visually-impaired-plugin/js/uhpv-hover-full.min.js';

let header = (function () {

    const header = document.querySelector('header'),
        headerTop = document.querySelector('.header__top'),
        btnScroll = document.querySelector('#btn-scroll');

    //==========Fix header on screen scrolling =======================

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > (screen.height / 6) && screen.width > 1199) {
                header.classList.add('fixed');
                headerTop.classList.add('hide');
                btnScroll.classList.remove('hide');
            }
            else {
                header.classList.remove('fixed');
                headerTop.classList.remove('hide');
                btnScroll.classList.add('hide');
            }
        });
    }

    //=======================================================================

    const menu = document.querySelector('.header__menu-items'),
        dropdownTitle = document.querySelectorAll('.dropdown-title'),
        dropdownMenu = document.querySelectorAll('.dropdown-menu'),
        dropdownServiceTitle = document.querySelector('.dropdown__service-title'),
        dropdownServiceMenu = document.querySelector('.dropdown__service-menu'),
        overlay = document.querySelector('.menu-overlay'),

        //--------subMenu: menu in mobile view-----------------
        subMenu = document.querySelector('.submenu'),
        subMenuItem = document.querySelectorAll('.submenu__item-header'),
        subMenuContent = document.querySelectorAll('.submenu__item-content'),
        subMenuTabs = document.querySelectorAll('.submenu__tabs'),
        subMenuCols = document.querySelectorAll('.submenu__cols');

    //=================Open popup-menu ========================================

    document.addEventListener('click', e => {

        if (window.matchMedia("(min-width: 1199px)").matches) {
            if (dropdownMenu) {
                dropdownMenu.forEach(item => {
                    if (!e.target.classList.contains('dropdown-title') && !item.contains(e.target)) {
                        item.classList.add('hide');
                    }
                });
            }

            if (!e.target.classList.contains('dropdown__service-title') && dropdownServiceMenu && !dropdownServiceMenu.contains(e.target)) {
                dropdownServiceMenu.classList.add('hide');
                overlay.classList.add('hide');
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (window.matchMedia("(min-width: 1199px)").matches) {
            if (e.code === 'Escape') {
                if (dropdownMenu && dropdownServiceMenu) {
                    dropdownMenu.forEach(item => {
                        item.classList.add('hide');
                    });
                    dropdownServiceMenu.classList.add('hide');
                    overlay.classList.add('hide');
                }
            }
        }
    });

    if (menu) {
        menu.addEventListener('click', e => {

            if (window.matchMedia("(min-width: 1199px)").matches) {
                if (e.target.classList.contains('dropdown-title')) {
                    e.preventDefault();
                    dropdownTitle.forEach((item, i) => {
                        if (e.target == item) {
                            dropdownMenu[i].classList.toggle('hide');
                        } else {
                            dropdownMenu[i].classList.add('hide');
                        }
                    });
                }
                if (e.target.classList.contains('dropdown__service-title')) {
                    e.preventDefault();
                    dropdownServiceMenu.classList.toggle('hide');
                    if (dropdownServiceMenu.classList.contains('hide')) {
                        overlay.classList.add('hide');
                    } else {
                        overlay.classList.remove('hide');
                    }
                }
            } else {
                if (e.target.classList.contains('dropdown__service-title')) {
                    e.preventDefault();
                    subMenu.classList.toggle('active');
                    subMenuContent.forEach(item => {
                        item.classList.remove('active');
                    });
                    if (dropdownTitle) {
                        dropdownMenu.forEach(item => {
                            item.classList.add('hide');
                            item.classList.remove('active');
                        });
                    }
                }
                if (e.target.classList.contains('dropdown-title')) {
                    e.preventDefault();
                    dropdownTitle.forEach((item, i) => {
                        if (e.target == item) {
                            dropdownMenu[i].classList.toggle('hide');
                            dropdownMenu[i].classList.toggle('active');
                        } else {
                            dropdownMenu[i].classList.add('hide');
                            dropdownMenu[i].classList.remove('active');
                        }
                    });
                    if (dropdownServiceTitle) {
                        subMenu.classList.remove('active');
                        subMenuContent.forEach(item => {
                            item.classList.remove('active');
                        });
                    }
                }
                if (e.target.classList.contains('submenu__item-header')) {
                    subMenuItem.forEach((item, i) => {
                        if (e.target == item) {
                            subMenuContent[i].classList.toggle('active');
                            if (i != 0) {
                                subMenuTabs[i - 1].children[1].classList.remove('active');
                                subMenuCols[i].children[1].classList.remove('active');
                                subMenuTabs[i - 1].children[0].classList.add('active');
                                subMenuCols[i].children[0].classList.add('active');
                            }
                        }
                    });
                }

                const parent = e.target.parentElement;
                let tabIntex, colIndex;

                if (parent.classList.contains('submenu__tabs')) {
                    subMenuTabs.forEach((item, i) => {
                        if (item == parent) {
                            tabIntex = i;
                            for (let j = 0; j < 2; j++) {
                                if (item.children[j] == e.target) {
                                    colIndex = j;
                                }
                            }
                        }
                    });
                    for (let i = 0; i < 2; i++) {
                        subMenuTabs[tabIntex].children[i].classList.remove('active');
                        subMenuCols[tabIntex + 1].children[i].classList.remove('active');
                    }
                    subMenuTabs[tabIntex].children[colIndex].classList.add('active');
                    subMenuCols[tabIntex + 1].children[colIndex].classList.add('active');
                }
            }
        });
    }

    //=================burger button======================================

    const burger = document.querySelector('.header__burger');
    const menuMobile = document.querySelector('.header__main');

    if (burger) {
        burger.addEventListener('click', e => {

            if (subMenu) {
                subMenu.classList.remove('active');
            }
            if (dropdownMenu) {
                dropdownMenu.forEach(item => {
                    item.classList.remove('active');
                    item.classList.add('hide');
                });
            }
            if (subMenuContent) {
                subMenuContent.forEach(item => {
                    item.classList.remove('active');
                });
            }

            e.target.classList.toggle('open');

            if (e.target.classList.contains('open')) {
                menuMobile.classList.add('flex');
                document.body.classList.add('overflow-hide');
            } else {
                menuMobile.classList.remove('flex');
                document.body.classList.remove('overflow-hide');
            }
        });
    }

    window.addEventListener('resize', () => {
        if (screen.width > 1199) {
            document.body.classList.remove('overflow-hide');
        }
    });

})(),
    services__menu_tabs = (function () {
        let parent = $('.dropdown__service-menu');
        $('.tabheader__item').click(function () {
            parent.find('.tabheader__item').removeClass('tabheader__item_active');
            $(this).addClass('tabheader__item_active');

            parent.find('.tabcontent').removeClass('show').addClass('hide');
            $('#' + $(this).attr('data-target')).removeClass('hide').addClass('show');
        });

        return false;
    })(),
    modal_video = (function () {
        $('[data-modal-video]').click(function () {
            new Modal($('.jsModalVideo')).show($(this));

            return false;
        });

        return false;
    })();

//======================= Sliders ===============================

let sliders = (function () {
    const swiper = new Swiper('.diseases__slider', {
        autoHeight: true,
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                spaceBetween: 20
            },
            1199: {
                spaceBetween: 30
            }
        }
    });

    const swiper2 = new Swiper('.awards__slider', {
        autoHeight: true,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    const swiper3 = new Swiper('.equipment__slider', {
        autoHeight: true,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    const swiper4 = new Swiper('.reviews__slider', {
        autoHeight: true,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    const swiper5 = new Swiper('.reviews__slider-text', {
        autoHeight: true,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }

    });

    const swiper6 = new Swiper('.gallery__slider', {
        autoHeight: true,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    const swiper7 = new Swiper('.allcenter-gallery__slider', {
        autoHeight: true,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    const swiper8 = new Swiper('.nn_center-gallery__slider', {
        autoHeight: true,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    const swiper9 = new Swiper('.stages__steps-mobile', {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    const swiper10 = new Swiper('.reviews__video-mobile', {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    const swiper11 = new Swiper('.promotion__sale-mobile', {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    const swiper12 = new Swiper('.articles__swiper', {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    const swiper13 = new Swiper('.stages__steps-btn__mobile', {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    const sliderFraction = document.querySelectorAll('.swiper-pagination-fraction');
    sliderFraction.forEach(item => {
        if (item) {
            item.childNodes[1].textContent = '/';
        }
    });

})();

//==================================================================

let accordion = (function () {

    document.querySelectorAll('.accordion__item-header').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            parent.classList.toggle('active');
        });
    });
})();

//==================================================================

let tabsContact = (function () {

    const tabsParent = document.querySelector('.contacts-tabheader__items'),
        tabs = document.querySelectorAll('.contacts-tabheader__item'),
        tabsContent = document.querySelectorAll('.contacts-tabcontent');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('contacts-tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('contacts-tabheader__item_active');
    }

    if (tabsParent) {
        hideTabContent();
        showTabContent();
    }

    if (tabsParent) {
        tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('contacts-tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    }

})();

// let tabsFamily = (function () {
//
//     const tabsParent = document.querySelector('.tabs-tabheader__items'),
//         tabs = document.querySelectorAll('.tabs-tabheader__item'),
//         tabsContent = document.querySelectorAll('.tabs-tabcontent');
//
//     function hideTabContent() {
//         tabsContent.forEach(item => {
//             item.classList.add('hide');
//             item.classList.remove('show');
//         });
//
//         tabs.forEach(item => {
//             item.classList.remove('tabs-tabheader__item_active');
//         });
//     }
//
//     function showTabContent(i = 0) {
//         tabsContent[i].classList.add('show');
//         tabsContent[i].classList.remove('hide');
//         tabs[i].classList.add('tabs-tabheader__item_active');
//     }
//
//
//     if (tabsParent) {
//         hideTabContent();
//         showTabContent();
//     }
//
//     if (tabsParent) {
//         tabsParent.addEventListener('click', (event) => {
//             const target = event.target;
//
//             if (target && target.classList.contains('tabs-tabheader__item')) {
//                 tabs.forEach((item, i) => {
//                     if (target == item) {
//                         hideTabContent();
//                         showTabContent(i);
//                     }
//                 });
//             }
//         });
//     }
//
// })();
//
// let tabsFamilyFull = (function () {
//
//     const tabsParent = document.querySelector('.tabsfull-tabheader__items'),
//         tabs = document.querySelectorAll('.tabsfull-tabheader__item'),
//         tabsContent = document.querySelectorAll('.tabsfull-tabcontent');
//
//     function hideTabContent() {
//         tabsContent.forEach(item => {
//             item.classList.add('hide');
//             item.classList.remove('show');
//         });
//
//         tabs.forEach(item => {
//             item.classList.remove('tabsfull-tabheader__item_active');
//         });
//     }
//
//     function showTabContent(i = 0) {
//         tabsContent[i].classList.add('show');
//         tabsContent[i].classList.remove('hide');
//         tabs[i].classList.add('tabsfull-tabheader__item_active');
//     }
//
//     if (tabsParent) {
//         hideTabContent();
//         showTabContent();
//     }
//
//     if (tabsParent) {
//         tabsParent.addEventListener('click', (event) => {
//             const target = event.target;
//
//             if (target && target.classList.contains('tabsfull-tabheader__item')) {
//                 tabs.forEach((item, i) => {
//                     if (target == item) {
//                         hideTabContent();
//                         showTabContent(i);
//                     }
//                 });
//             }
//         });
//     }
//
// })();

//=================================================================

let buttons = (function () {

    const moreBtn = document.querySelector('#btn-more');

    if (moreBtn) {

        const texts = document.querySelector('.specialists__text').children;
        moreBtn.addEventListener('click', e => {

            let spanText = e.target.children[0].textContent;

            if (spanText == 'Читать дальше') {
                for (let i = 2; i < texts.length; i++) {
                    texts[i].style.display = 'block';
                }
                e.target.children[0].textContent = 'Свернуть';
            } else {
                for (let i = 2; i < texts.length; i++) {
                    texts[i].style.display = 'none';
                }
                e.target.children[0].textContent = 'Читать дальше';
            }
        });
    }

})();

let fileInput = (function () {

    let inputFile = document.getElementById('file-input');
    let fileNameField = document.getElementById('file-name');

    if (inputFile) {
        inputFile.addEventListener('change', (e) => {
            let uploadedFileName = e.target.files[0].name;
            fileNameField.textContent = uploadedFileName
        })
    }
})();

let inputPhoneMask = (function () {

    var inputPhone = document.querySelectorAll('input[placeholder="Телефон"]');
    if (inputPhone) {
        const maskOptions = {
            mask: '+{7} (000) 000-00-00'
        };
        inputPhone.forEach(item => {
            const mask = new IMask(item, maskOptions);
        });
    }

})();


let visuallyImpaired = (function () {

    const html = document.querySelector('html');

    html.addEventListener('click', () => {
        if (html.classList.contains('special')) {

            const specialImages = html.querySelector('.special-images');
            const button = specialImages.querySelector('button');

            button.addEventListener('click', () => {
                if (button.getAttribute('value') == '1') {
                    html.classList.add('special-images-1');
                    html.classList.remove('special-images-0');
                } else {
                    html.classList.add('special-images-0');
                    html.classList.remove('special-images-1');
                }
            });
        }
    });


})();