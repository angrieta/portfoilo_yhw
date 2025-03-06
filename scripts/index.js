$('.guide_btn:nth-child(1) a').mouseenter(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(1) a').css("animation","btnScaleOn 0.5s forwards")
    $('.guide_btn:nth-child(1) p').css("animation","on 0.5s forwards")    
})
$('.guide_btn:nth-child(1) a').mouseleave(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(1) a').css("animation","btnScaleOff 0.5s forwards")
    $('.guide_btn:nth-child(1) p').css("animation","off 0.5s forwards")    
})
$('.guide_btn:nth-child(1) a').click(function(e){
    e.preventDefault();
    vertical.slideTo(0, 1000);
})
/* profile */
$('.guide_btn:nth-child(2) a').mouseenter(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(2) a').css("animation","btnScaleOn 0.5s forwards")
    $('.guide_btn:nth-child(2) p').css("animation","on 0.5s forwards")    
})
$('.guide_btn:nth-child(2) a').mouseleave(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(2) a').css("animation","btnScaleOff 0.5s forwards")
    $('.guide_btn:nth-child(2) p').css("animation","off 0.5s forwards")    
})
$('.guide_btn:nth-child(2) a').click(function(e){
    e.preventDefault();
    vertical.slideTo(1, 1000);
})
/* WEB-PROJCET */
$('.guide_btn:nth-child(3) a').mouseenter(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(3) a').css("animation","btnScaleOn 0.5s forwards")
    $('.guide_btn:nth-child(3) p').css("animation","on 0.5s forwards")    
})
$('.guide_btn:nth-child(3) a').mouseleave(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(3) a').css("animation","btnScaleOff 0.5s forwards")
    $('.guide_btn:nth-child(3) p').css("animation","off 0.5s forwards")    
})
$('.guide_btn:nth-child(3) a').click(function(e){
    e.preventDefault();
    vertical.slideTo(2, 1000);
})
/* DESIGN-DETAIL */
$('.guide_btn:nth-child(4) a').mouseenter(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(4) a').css("animation","btnScaleOn 0.5s forwards")
    $('.guide_btn:nth-child(4) p').css("animation","on 0.5s forwards")    
})
$('.guide_btn:nth-child(4) a').mouseleave(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(4) a').css("animation","btnScaleOff 0.5s forwards")
    $('.guide_btn:nth-child(4) p').css("animation","off 0.5s forwards")    
})
$('.guide_btn:nth-child(4) a').click(function(e){
    e.preventDefault();
    vertical.slideTo(3, 1000);
})
/* DESIGN-SNS */
$('.guide_btn:nth-child(5) a').mouseenter(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(5) a').css("animation","btnScaleOn 0.5s forwards")
    $('.guide_btn:nth-child(5) p').css("animation","on 0.5s forwards")    
})
$('.guide_btn:nth-child(5) a').mouseleave(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(5) a').css("animation","btnScaleOff 0.5s forwards")
    $('.guide_btn:nth-child(5) p').css("animation","off 0.5s forwards")    
})
$('.guide_btn:nth-child(5) a').click(function(e){
    e.preventDefault();
    vertical.slideTo(4, 1000);
})
/* DESIGN-BANNER */
$('.guide_btn:nth-child(6) a').mouseenter(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(6) a').css("animation","btnScaleOn 0.5s forwards")
    $('.guide_btn:nth-child(6) p').css("animation","on 0.5s forwards")    
})
$('.guide_btn:nth-child(6) a').mouseleave(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(6) a').css("animation","btnScaleOff 0.5s forwards")
    $('.guide_btn:nth-child(6) p').css("animation","off 0.5s forwards")    
})
$('.guide_btn:nth-child(6) a').click(function(e){
    e.preventDefault();
    vertical.slideTo(5, 1000);
})
/* END */
$('.guide_btn:nth-child(7) a').mouseenter(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(7) a').css("animation","btnScaleOn 0.5s forwards")
    $('.guide_btn:nth-child(7) p').css("animation","on 0.5s forwards")    
})
$('.guide_btn:nth-child(7) a').mouseleave(function(){
    $('.guide_btn p').css("opacity","0")
    $('.guide_btn:nth-child(7) a').css("animation","btnScaleOff 0.5s forwards")
    $('.guide_btn:nth-child(7) p').css("animation","off 0.5s forwards")    
})
$('.guide_btn:nth-child(7) a').click(function(e){
    e.preventDefault();
    vertical.slideTo(6, 1000);
})



const popup_bg = document.querySelector('.popup_bg')
const sns = document.querySelectorAll('.sns_aria img')
const banner_aria1 = document.querySelectorAll('.banner_aria1 img')
const banner_aria2 = document.querySelectorAll('.banner_aria2 img')
const detail_aria = document.querySelectorAll('.detail_aria img')
const scrollReset = document.querySelector('.scroll_wrap')

$('.popup_bg .close').click(function(e){
    e.preventDefault();
    popup_bg.style.display = 'none'
})
$('.popup_bg').click(function(e){
    e.preventDefault();
    popup_bg.style.display = 'none'
})


popup_bg.style.display = 'none' // 팝업숨기기
for(let i of sns){
    i.addEventListener('click', () =>{
        popup_bg.style.display = 'block'
        //console.log(i.src)
        //console.log(popup_bg.children[0].children[0])
        popup_bg.children[0].children[0].src = i.src
        popup_bg.children[0].style.maxWidth = '800px'
        popup_bg.children[0].style.height = '800px'
        popup_bg.children[0].style.margin = '150px auto'
        popup_bg.children[0].style.overflow = 'inherit'
        popup_bg.children[0].style.padding = '0 20px 0 20px'
    })
}
for(let i of banner_aria1){
    i.addEventListener('click', () =>{
        popup_bg.style.display = 'block'
        //console.log(i.src)
        //console.log(popup_bg.children[0].children[0])
        popup_bg.children[0].children[0].src = i.src
        popup_bg.children[0].style.maxWidth = '1000px'
        popup_bg.children[0].style.margin = '250px auto'
        popup_bg.children[0].style.padding = '0 20px 0 20px'
    })
}
for(let i of banner_aria2){
    i.addEventListener('click', () =>{
        popup_bg.style.display = 'block'
        //console.log(i.src)
        //console.log(popup_bg.children[0].children[0])
        popup_bg.children[0].children[0].src = i.src
        popup_bg.children[0].style.maxWidth = '1000px'
        popup_bg.children[0].style.margin = '250px auto'
        popup_bg.children[0].style.padding = '0 20px 0 20px'
    })
}
for(let i of detail_aria){
    i.addEventListener('click', () =>{
        popup_bg.style.display = 'block'
        scrollReset.scrollTo(0,0)
        //console.log(i.src)
        //console.log(popup_bg.children[0].children[0])
        popup_bg.children[0].children[0].src = i.src
        popup_bg.children[0].style.maxWidth = '600px'
        popup_bg.children[0].style.margin = '100px auto'
        popup_bg.children[0].style.overflow = 'auto'
        popup_bg.children[0].style.padding = '0 20px 0 20px'
    })
}