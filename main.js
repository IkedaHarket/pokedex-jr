const btnMenuResponsive = document.querySelector('.menu-btn')
const menuDesplegableResponsive = document.querySelector('.menu-desplegable')
btnMenuResponsive.addEventListener('click',()=>{
    menuDesplegableResponsive.classList.toggle('menu-desplegable-active')
})