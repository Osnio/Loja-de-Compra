const userData = JSON.parse(localStorage.getItem("dados_usuario"))
        let nome = document.querySelector("#nome")
        let email = document.querySelector("#email")
        let senha = document.querySelector("#senha")
        //adicinar um novo texto no elemeto nome...
        nome.innerText+=userData.nome
        email.innerText+=userData.email
        senha.innerText+=userData.senha

        let deleteAccount = document.querySelector("#pag")
        deleteAccount.addEventListener("click",()=>{
            let conf = confirm("Quer mesmo apagar sua conta?")
            if(conf){
                try{
                    fetch(`http://localhost:3333/eraseData/${userData.id}`,{
                        method:"DELETE"
                    })
                    .then(resp =>{return resp.json()})
                    .then(data=>{
                        if(data.message==="ERROR"){
                            alert("ERRO AO APAGAR SUA CONTA")
                        }else if(data.message==="SUCESS"){
                            localStorage.removeItem("dados_usuario")
                            localStorage.clear()
                            window.location.href="../index.html"
                        }
                    })
                }catch(err){
                    alert("ERRO NO SERVIDOR")
                }
            }
        })