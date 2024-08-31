//Ligar variaveis a elementos html pelo seu selector
let pnome   = document.querySelector("#pnome")
let snome   = document.querySelector("#snome")
let email   = document.querySelector("#email")
let senha   = document.querySelector("#senha")
let form = document.querySelector('#validar')
//Funcao para validar os dados do usuario pelo click. 
form.addEventListener("click",(e)=>{
    //Abstrair o comportamento normmal de formulario no nosso componente
    e.preventDefault()
    //Funcao que capta os dados do usuario e manda para a API
    enviarDados()
})

//Funcao asincorna, e aquela que a sua nao execucao imediata nao afeta o comportamneto do nosso codigo e 
//retorna uma promessa

async function enviarDados(){
    //Pegando os valores de cada input
    await fetch("http://localhost:3333/formulario",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "p_nome":pnome.value,
            "s_nome":snome.value,
            "email":email.value,
            "senha":senha.value
        })
    })
    .then(resp=>{
        return resp.json()
    })
    .then(data => {
        if(data.message==="EXISTS"){
            return alert("IMPOSSIVEL EFETUAR CADASTRO, USARIO JA EXISTE")
        }else{
            alert("USUARIO CADASTRADO COM SUCESSO")
            if(form.innerText==="Adicionar usuário"){
                window.location.reload()
            }else{
                localStorage.setItem("dados_usuario",JSON.stringify({
                    "id":data[0].id,
                    "nome":data[0].nome,
                    "snome":data[0].S_nome,
                    "email":data[0].email,
                    "senha":data[0].Senha
                }))
                window.location.href="../perfil.html"
            }
        }
    })
    .catch(err=>alert("ERRO AO CADASTRAR USUARIO"))
    .finally(()=>{
        pnome.value = ""
        snome.value = ""
        senha.value = ""
        email.value = ""
    })
}

