let logout = document.querySelector("#kkk")

logout.addEventListener("click",()=>{
    let valid = confirm("Quer mesmo terminar sessao")
    if(valid){
        localStorage.removeItem("dados_usuario")
        localStorage.clear()
        window.location.href="./index.html"
    }
})

const userData = JSON.parse(localStorage.getItem("dados_usuario"))
console.log(userData)
if(!userData){
    window.location.href="./index.html"
}