// START
// site loader
const bodyEl = document.querySelector('body');
const siteLoaderEl = document.querySelector('.site-loader');
// header slider
const headerEl = document.getElementById('header');
const websiteLogoEl = document.querySelector('.website-logo');
const parts = document.querySelectorAll('.part');
const menuItemsLink = document.querySelectorAll('.menu-item-link');
const homeEl = document.getElementById('home');
// show menu
const menuHamburgerEl = document.querySelector('.menu-hamburger');
const menuEl = document.querySelector('.menu');
const menuHamburgerIcon = document.querySelector('.icon-menu');
// home background
const homeBg = document.querySelector('#home .bg-attachment');
// background attachment custom
const bgAttachments = document.querySelectorAll('.bg-attachment');
// show element
const showElementsScale = document.querySelectorAll('.show-element_scale');
const showElementsPosition = document.querySelectorAll('.show-element_position');
// show element delay
const galleryImgs = document.querySelectorAll('.gallery-img');
// modal
const modalEl = document.querySelector('.modal');
const modalImgEl = document.querySelector('.modal-img');
const modalBtnClose = document.querySelector('.modal-btn_close');
const modalBtnPerv = document.querySelector('.modal-btn_perv');
const modalBtnNext = document.querySelector('.modal-btn_next');
const imgName = document.getElementById('img-name');
const imgNum = document.getElementById('img-num');
// form
const formItems = document.querySelectorAll('.form-item:not(.input_submit)');
// scroll up page show
const scrollUpEl = document.querySelector('.scroll-up-page');

// site loader
document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        bodyEl.style.visibility = "hidden";
        siteLoaderEl.style.display = "block";
        siteLoaderEl.style.visibility = "visible";
    } else {
        siteLoaderEl.style.opacity = "0";
        siteLoaderEl.style.visibility = "hidden";
        bodyEl.style.visibility = "visible";
    };
};

window.addEventListener('scroll',()=>{
    // change slider
    if (window.scrollY - headerEl.offsetHeight >= 0){
        headerEl.classList.add('header-light');
        websiteLogoEl.setAttribute('src','Images/logo-restaurant.png');
    } else {
        headerEl.classList.remove('header-light');
        websiteLogoEl.setAttribute('src','Images/logo-restaurant_white.png');
    };

    // menu item target
    parts.forEach((part)=>{
        if (part.getBoundingClientRect().top - headerEl.offsetHeight <= 0){
            menuItemsLink.forEach((menuItemLink)=>{
                if (menuItemLink.getAttribute('href').includes(part.id)){
                    menuItemLink.classList.add('target');
                } else {
                    menuItemLink.classList.remove('target');
                };
            });
        };
    });
});

// header set min-width:768
const headerFix = ()=>{
    window.addEventListener('scroll',()=>{
        headerEl.style.top = '0';
    });
};
// header set max-width:768
const headerSlide = ()=>{
    let primaryScroll = window.scrollY;

    window.addEventListener('scroll',()=>{
        const scrollNow = window.scrollY;
    
        if (scrollNow >= homeEl.offsetHeight - headerEl.offsetHeight){
            if (scrollNow >= primaryScroll){
                headerEl.style.top = `-${headerEl.offsetHeight}px`;
            } else {
                headerEl.style.top = '0';
            };

            primaryScroll = scrollNow;
        };

        // debug
        if (menuEl.classList.contains('show-menu')){
            headerEl.style.top = '0';
        };
    });
};
// by responsive
if (window.innerWidth > 768){
    headerFix();
} else if (window.innerWidth <= 768){
    headerSlide();
};
// by resize
window.addEventListener('resize',()=>{
    if (window.innerWidth > 768){
        headerFix();
    };
    if (window.innerWidth <= 768){
        headerSlide();
    };
});

// show menu
const showMenu = element => {
    element.addEventListener('click',()=>{
        menuEl.classList.toggle('show-menu');
        // change menu hamburger icon
        menuHamburgerIcon.classList.toggle('icon-close');
    });
};
showMenu(menuHamburgerEl);
showMenu(menuEl);

// home background
const backgrounds = ['burger-1500x1000.jpg','coffee-1500x1000.jpg','fruit-1500x1000.jpg','pasta-1500x1000.jpg'];
let num = 0;
homeBg.style.backgroundImage = `url(Images/${backgrounds[num]})`;
const changBackground = setInterval(()=>{
    num++;
    if (num === backgrounds.length){
        num = 0;
    };
    homeBg.style.backgroundImage = `url(Images/${backgrounds[num]})`;
},5000);

// background attachment custom
bgAttachments.forEach((bgAttachment)=>{
    let num = 0;
    window.addEventListener('scroll',()=>{
        if (bgAttachment.parentElement.getBoundingClientRect().top <= window.innerHeight && bgAttachment.parentElement.getBoundingClientRect().bottom >= 0 ){
            let numScroll = Math.round(window.scrollY) - bgAttachment.parentElement.offsetTop - bgAttachment.parentElement.getBoundingClientRect().top;
            num = numScroll / 10;
        };

        bgAttachment.style.transform=`matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${num}, 0, 1)`;
    });
});

// show element scale/position
function show(element,className) {
    element.forEach((showElement)=>{
        showElement.classList.add(className);
        window.addEventListener('scroll',()=>{
            if (showElement.parentElement.getBoundingClientRect().top <= window.innerHeight){
                showElement.style.display = 'block';
            };
        });
    });
};
show(showElementsScale,'show_scale');
show(showElementsPosition,'show_position');

// show element delay
for (let num = 0; num < galleryImgs.length;) {
    num++;

    let galleryImg = document.querySelector(`.parent-img:nth-child(${num}) .gallery-img`);

    galleryImg.style.animationDelay = `0.${num}s`;
};

// modal
galleryImgs.forEach((galleryImg,index)=>{
    galleryImg.addEventListener('click',()=>{
        // show modal
        modalEl.classList.add('show-modal');
        modalImgEl.setAttribute('src',galleryImg.getAttribute('src'));

        imgName.textContent = galleryImg.getAttribute('alt');
        imgNum.textContent = `${index+1} / ${galleryImgs.length}`;

        // show img
        const showImg = ()=>{
            modalImgEl.style.opacity = '0';
            setTimeout(()=>{
                modalImgEl.setAttribute('src',galleryImgs[index].getAttribute('src'));

                modalImgEl.style.opacity = '1';

                imgName.textContent = galleryImgs[index].getAttribute('alt');
                imgNum.textContent = `${index+1} / ${galleryImgs.length}`;
            },400);
        };
        
        // chang img
        modalBtnPerv.addEventListener('click',(e)=>{
            e.stopPropagation();
            index--;
            if (index < 0){
                index = galleryImgs.length - 1;
            };

            showImg();
        });
        modalBtnNext.addEventListener('click',(e)=>{
            e.stopPropagation();
            index++;
            if (index > galleryImgs.length - 1){
                index = 0;
            };

            showImg();
        });
    });
});
// hide modal
const hideModal = (target)=>{
    target.addEventListener('click',()=>{
        modalBtnClose.classList.add('active-btn_close');
        setTimeout(()=>{
            modalEl.classList.remove('show-modal');
        },500);
        setTimeout(()=>{
            modalBtnClose.classList.remove('active-btn_close');
        },1000);
    });
}
hideModal(modalBtnClose);
hideModal(modalEl);
// debug
modalImgEl.addEventListener('click',(e)=>{
    e.stopPropagation();
});

// form
formItems.forEach((formItem)=>{
    formItem.addEventListener('keyup',()=>{
        formItem.classList.add('input-target');
    });
});

// scroll up page show
scrollUpEl.style.display = 'none';
window.addEventListener('scroll',()=>{
    if (homeEl.getBoundingClientRect().bottom - headerEl.offsetHeight >= 0){
        scrollUpEl.style.display = 'block';
        scrollUpEl.classList.add('scroll-up-hide');
    } else {
        scrollUpEl.style.display = 'block';
        scrollUpEl.classList.remove('scroll-up-hide');
    };
});
// THE END