
const addButtons = document.querySelectorAll('.big button');
const carIcon = document.querySelector('#carIcon');

//Constante que guarda uma errow funtion que remove a classe da div carIcon
const carintervalo = () => {
    carIcon.classList.remove('endIcon');
}
//classList é um array  que possue todas as classes de um elemento  
addButtons.forEach((addButton) => {
    addButton.addEventListener('click', () => {
        carIcon.classList.add('endIcon');
        setTimeout(carintervalo, 500)
    })
});

const addButtons1 = document.querySelectorAll('.alan button');

addButtons1.forEach((Alfa) => {
    Alfa.addEventListener('click', () => {
        carIcon.classList.add('endIcon');
        setTimeout(carintervalo, 500)
    })
})

function message (){
    alert('Usuário Cadastrado');
    
}
const form = document.querySelector('form')

form.addEventListener('submit',() => {
    message()
})

var menuIcon = document.querySelector('.menu-icons');
var menuMobile = document.querySelector('.menu-mobile');
var iconClose = document.querySelector('.menu-mobile .icon-close');

menuIcon.addEventListener('click', function(){
    menuMobile.classList.add('ativo'); 
});

iconClose.addEventListener('click', function(){
    menuMobile.classList.remove('ativo'); 
});
