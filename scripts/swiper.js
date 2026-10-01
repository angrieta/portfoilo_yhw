var slideSpeed = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350;
var vertical = new Swiper(".wrap", {
    speed: slideSpeed,
    direction: "vertical",
    mousewheel: true,
    pagination: {
    el: ".swiper-pagination",
    clickable: true,
    },
    on:{
        slideChangeTransitionEnd:function(){
            setTimeout(()=> ScrollTrigger.refresh() ,0)
        }
    },
});

var webProject = new Swiper(".web_contents", {
    speed: slideSpeed,
    autoHeight: false,
    nested: true,
    autoplay: false,
    loop:true,
    slidesPerView: 1,
    on:{
        slideChangeTransitionEnd:function(){
            setTimeout(()=> ScrollTrigger.refresh() ,0)
        }
    },
    navigation: {
        nextEl: "#publish_aria .swiper-button-next",
        prevEl: "#publish_aria .swiper-button-prev",
    },
});
var DetailProject = new Swiper(".detail_aria", {
    speed: slideSpeed,
    autoplay: false,
    loop:true,
    slidesPerView: 3,
    spaceBetween: 30,
    on:{
        slideChangeTransitionEnd:function(){
            setTimeout(()=> ScrollTrigger.refresh() ,0)
        }
    },
    navigation: {
        nextEl: "#detail_page .swiper-button-next",
        prevEl: "#detail_page .swiper-button-prev",
    },
    breakpoints: {
        1920: {
            slidesPerView: 3, //1920이하 일때
        },
        1200: {
            slidesPerView: 3,  //1024이하 일때
        },
        660: {
            slidesPerView: 2, //768이하 일때
        },
        0: {
          slidesPerView: 1, //768이하 일때
        },
    }    
});

var snsProject = new Swiper(".sns_aria", {
    speed: slideSpeed,
    autoplay: false,
    loop:true,
    slidesPerView: 4,
    spaceBetween: 10,
    on:{
        slideChangeTransitionEnd:function(){
            setTimeout(()=> ScrollTrigger.refresh() ,0)
        }
    },
    navigation: {
        nextEl: ".sns_project .swiper-button-next",
        prevEl: ".sns_project .swiper-button-prev",
    },
    breakpoints: {
        1920: {
            direction: "horizontal",
            slidesPerView: 4, //1920이하 일때
        },
        751: {
            slidesPerView: 3,  //1024이하 일때
        },
        500: {
            slidesPerView: 2, //768이하 일때
        },
        0: {
            slidesPerView: 1, //768이하 일때
        },
    }    
});

var bannerProject1 = new Swiper(".banner_aria1", {
    speed: slideSpeed,
    autoplay: false,
    loop:true,
    slidesPerView: 3,
    spaceBetween: 20,
    on:{
        slideChangeTransitionEnd:function(){
            setTimeout(()=> ScrollTrigger.refresh() ,0)
        }
    },
    navigation: {
        nextEl: ".banner_text .swiper-button-next",
        prevEl: ".banner_text .swiper-button-prev",
    },
    breakpoints: {
        1920: {
            slidesPerView: 3, //1920이하 일때
        },
        1000: {
            slidesPerView: 2,  //1024이하 일때
        },
        0: {
            slidesPerView: 1, //768이하 일때
        },
    }    
});
var bannerProject2 = new Swiper(".banner_aria2", {
    speed: slideSpeed,
    autoplay: false,
    loop:true,
    slidesPerView: 3,
    spaceBetween: 20,
    on:{
        slideChangeTransitionEnd:function(){
            setTimeout(()=> ScrollTrigger.refresh() ,0)
        }
    },
    navigation: {
        nextEl: ".banner_text .swiper-button-next",
        prevEl: ".banner_text .swiper-button-prev",
    },
    breakpoints: {
        1920: {
            slidesPerView: 3, //1920이하 일때
        },
        1000: {
            slidesPerView: 2,  //1024이하 일때
        },
        0: {
            slidesPerView: 1, //768이하 일때
        },
    }    
});
