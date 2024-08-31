let coment = document.querySelector("#coment")
let avaliar = document.querySelector("#avaliar")
let enviar = document.querySelector("#enviar")

enviar.addEventListener("submit", (e)=>{
    e.preventDefault()
    enviarcomentario()
})

async function enviarcomentario(){
    await fetch("http://localhost:3333/comentario",{
        method:"get",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "coment": coment.value,
            "avaliar": avaliar.value
        })
    })
    .then(resp=>{
        return resp.json()
    })

}


