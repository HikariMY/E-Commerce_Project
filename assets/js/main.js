/*========== Home Swiper ==========*/
var homeSwiper = new Swiper(".home-swiper", {
  spaceBetween: 30,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 3000,  // กำหนดเวลาระหว่างสไลด์ (1000 = 1 วินาที)
    disableOnInteraction: false,  // ให้สไลด์เลื่อนต่อไปแม้ผู้ใช้จะคลิกหรือแตะที่สไลด์
  },
});


/*========== เพิมแถบเลื่อนตอนจอหด ==========*/
function scrollHeader(){
    const header = document.getElementById('header')
    //ถ้าViewpointมากกว่า50จะเปลี่ยนส่วนของ็ำฟกำพ
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll',scrollHeader)

/*========== New Swiper ==========*/
var newSwiper = new Swiper(".new-swiper", {
  spaceBetween: 18,
  centeredSlide: true,
  slidesPerView: "auto",
  loop: true,

  autoplay: {
    delay: 3000,  // กำหนดเวลาระหว่างสไลด์ (1000 = 1 วินาที)
    disableOnInteraction: false,  // ให้สไลด์เลื่อนต่อไปแม้ผู้ใช้จะคลิกหรือแตะที่สไลด์
  },
});

/*========== Show Cart ==========*/
const cart = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close')

/*==========  Cart show ==========*/
if(cartShop){
  cartShop.addEventListener("click", () => {
    cart.classList.add('show-cart')
  })
}

/*==========  Cart close ==========*/
if(cartClose){
  cartClose.addEventListener("click", () => {
    cart.classList.remove('show-cart')
  })
}

/*========== Show login ==========*/
const login = document.getElementById('login'),
      loginButton = document.getElementById('login-toggle'),
      loginClose = document.getElementById('login-close')

/*==========  Login show ==========*/
if(loginButton){
  loginButton.addEventListener("click", () => {
    login.classList.add('show-login')
  })
}

/*==========  Cart close ==========*/
if(loginClose){
  loginClose.addEventListener("click", () => {
    login.classList.remove('show-login')
  })
}

/*==========  Show Scroll Up ==========*/
function scrollUP(){
  const scrollUp = document.getElementById('scroll-up');

  if(this.scrollY >= 350 ) scrollUP.classList.add('show-scrollup'); else scrollUP.classList.remove('show-scrollup')
}
window.addEventListener('scroll', scrollUP)

/*==========  Show Menu ==========*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*==========  Cart close ==========*/
if(navToggle){
  navToggle.addEventListener("click", () => {
    navMenu.classList.add('show-menu')
  })
}

if(navClose){
  navClose.addEventListener("click", () => {
    navMenu.classList.remove('show-menu')
  })
}
