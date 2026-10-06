const main1 = document.querySelector('.sell_container .main_bg')
const sub1 = document.querySelector('.sub_menu .sub_view1')
const sub2 = document.querySelector('.sub_menu .sub_view2')
const sub3 = document.querySelector('.sub_menu .sub_view3')
const sub4 = document.querySelector('.sub_menu .sub_view4')
const sub5 = document.querySelector('.sub_menu .sub_view5')
sub1.addEventListener('mouseenter',()=>{
    main1.innerHTML = '<img src="./images/sell_page/seb_menu_001.jpg" alt="">'
})
sub2.addEventListener('mouseenter',()=>{
    main1.innerHTML = '<img src="./images/sell_page/seb_menu_002.jpg" alt="">'
})
sub3.addEventListener('mouseenter',()=>{
    main1.innerHTML = '<img src="./images/sell_page/seb_menu_003.jpg" alt="">'
})
sub4.addEventListener('mouseenter',()=>{
    main1.innerHTML = '<img src="./images/sell_page/seb_menu_004.jpg" alt="">'
})
sub5.addEventListener('mouseenter',()=>{
    main1.innerHTML = '<img src="./images/sell_page/main_bg.jpg" alt="">'
})

$('.select_color .select_menu a').click(function(e){
    e.preventDefault()
    $('.select_color .select_menu a').removeClass('active');
    $(this).addClass('active');  
})
$('.select_size .size_aria a').click(function(e){
    $('.select_size .size_aria a').removeClass('active');
    $(this).addClass('active');  
})
$('.item_information a').click(function(e){
    $('.item_information a').removeClass('active');
    $(this).addClass('active');  
})
$('.details_page').click(function(e){
    e.preventDefault()
})
$('.size_page').click(function(e){
    e.preventDefault()
})
$('.search_close').click(function(){
    $('.search_aria').hide();
    }
)
const valueMath = document.querySelector('#num');
const numPlus = document.querySelector('#numPlus');
const numMinus = document.querySelector('#numMinus');
const totalPrice = document.querySelector('#total_price_math');
console.log(valueMath, numPlus);
numPlus.addEventListener('click',function(){
    valueMath.value = Number(valueMath.value)+1 
    console.log(typeof(num.value));
    totalPrice.innerHTML = valueMath.value*50400
})
numMinus.addEventListener('click',function(){
    if (valueMath.value > 1) {
        valueMath.value = Number(valueMath.value)-1
    }
    totalPrice.innerHTML = valueMath.value*50400
})


