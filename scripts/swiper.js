var vertical = new Swiper(".wrap", {
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
    autoplay:{
        delay:33333333333333, //다음 슬라이드전환까지 대기시간
        disableOnInteraction:false, // 사용자 상호작용 상관없이 계속 진행
    },
    loop:true,
    slidesPerView: 1,
    on:{
        slideChangeTransitionEnd:function(){
            setTimeout(()=> ScrollTrigger.refresh() ,0)
        }
    },
    navigation: {
        nextEl: ".web_project .swiper-button-next",
        prevEl: ".web_project .swiper-button-prev",
    },
});
var DetailProject = new Swiper(".detail_aria", {
    autoplay:{
        delay:33333333333333, //다음 슬라이드전환까지 대기시간
        disableOnInteraction:false, // 사용자 상호작용 상관없이 계속 진행
    },
    loop:true,
    slidesPerView: 3,
    spaceBetween: 30,
    on:{
        slideChangeTransitionEnd:function(){
            setTimeout(()=> ScrollTrigger.refresh() ,0)
        }
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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
    autoplay:{
        delay:33333333333333, //다음 슬라이드전환까지 대기시간
        disableOnInteraction:false, // 사용자 상호작용 상관없이 계속 진행
    },
    loop:true,
    slidesPerView: 4,
    spaceBetween: 10,
    on:{
        slideChangeTransitionEnd:function(){
            setTimeout(()=> ScrollTrigger.refresh() ,0)
        }
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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
    autoplay:{
        delay:33333333333333, //다음 슬라이드전환까지 대기시간
        disableOnInteraction:false, // 사용자 상호작용 상관없이 계속 진행
    },
    loop:true,
    slidesPerView: 3,
    spaceBetween: 20,
    on:{
        slideChangeTransitionEnd:function(){
            setTimeout(()=> ScrollTrigger.refresh() ,0)
        }
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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
    autoplay:{
        delay:33333333333333, //다음 슬라이드전환까지 대기시간
        disableOnInteraction:false, // 사용자 상호작용 상관없이 계속 진행
    },
    loop:true,
    slidesPerView: 3,
    spaceBetween: 20,
    on:{
        slideChangeTransitionEnd:function(){
            setTimeout(()=> ScrollTrigger.refresh() ,0)
        }
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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