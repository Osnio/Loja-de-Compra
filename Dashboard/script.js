/*Essa parte do codigo busca os dados de usuários e exibi eles na nossa tabela HTML.*/

let tabela = document.querySelector("#tabela");

async function userDataFetch() {

    try {
        const response = await fetch("http://localhost:3333/allUsers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log(data)
        data.forEach(e => {
            tabela.innerHTML += `
                <tr id='${e.id}' class='item'>
                    <td>${e.nome} ${e.S_nome}</td>
                    <td>${e.email}</td>
                    <td>${e.Senha}</td>
                    <td id="buttons">
                        <button class="edit" data-id="${e.id}">Alterar</button>
                        <button class="delete" data-id="${e.id}">Deletar</button>
                    </td>
                </tr>
            `;
        });


        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', editarUsuario);
        });
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', apagarUsuario);
        });

    } catch (err) {
        alert("O SERVIDOR NÃO RESPONDE");
    }
}
userDataFetch();


async function editarUsuario(event) {
    /*Esta linha extrai o ID do usuário da propriedade dataset do alvo do evento.*/
    const userId = event.target.dataset.id;
    const row = document.getElementById(userId);
    /*Esta linha encontra todos os elementos <td> dentro da linha encontrada. */
    const cells = row.querySelectorAll('td');
    /*Estas linhas dividem o conteúdo do primeiro <td> em duas partes usando o espaço como delimitador. */
    const name = cells[0].innerText.split(' ');
    const nome = name[0];
    const apelido = name[1];
    /*Estas linhas obtêm o texto dos elementos <td> 1 e 2, que provavelmente contêm o email e a senha do usuário*/
    const email = cells[1].innerText;
    const senha = cells[2].innerText;

    /*Estas linhas exibem prompts ao usuário para inserir novos valores*/ 
    const newName = prompt("Novo nome:", nome);
    const newApelido = prompt("Novo apelido:", apelido);
    const newEmail = prompt("Novo email:", email);
    const newSenha = prompt("Nova senha:", senha);

    //Esta linha verifica se o usuário não cancelou os prompts pressionando o botão "Cancelar".
    if (newName !== null && newApelido !== null && newEmail !== null && newSenha !== null) {
    
        try {
            await fetch(`http://localhost:3333/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id":userId,
                    "novoNome": newName,
                    "snome": newApelido,
                    "pass": newSenha,
                    "email": newEmail,
                })
            })
            /*Essas linhas processam a resposta da requisição.*/
            .then(resp=>{return resp.json()})
            .then(data=>{
                if(data.message==="SUCESS"){
                    alert("DADOS ATUALIZADOS COM SUCESSO")
                }else if(data.message==="SUCESS"){
                    alert("SUCESSO AO EDITAR DADOS")
                }
            })
            
            //Estas linhas atualizam os valores exibidos na tabela com os novos valores inseridos pelo usuário.
            cells[0].innerText = `${newName} ${newApelido}`;
            cells[1].innerText = newEmail;
            cells[2].innerText = newSenha;
        } catch (error) {
            alert("Erro ao atualizar os dados do usuário.");
        }
    }
}

async function apagarUsuario(event) {
    //Vai pegar um id que esta fora do escopo dessa funcao
    const userId = event.target.dataset.id;
    const confirmation = confirm("Tem certeza que deseja excluir este usuário?");

    if (confirmation) {
        try {
            await fetch(`http://localhost:3333/eraseData/${userId}`, {
                method: "DELETE"
            })
            .then(response=>{return response.json()})
            .then(data=>{
                if(data.message==="ERROR"){
                    alert("ERRO AO APAGAR USUARIO")
                }else if(data.message==="SUCESS"){
                    alert("SUCESSO AO APAGAR USUARIO")
                }
            })
            .catch(err=>alert("O SERVIDOR NN RESPONDE TENTE MAIS TARDE"))

            // Remove a linha da tabela
            const row = document.getElementById(userId);
            row.remove();

        } catch (error) {
            alert("Erro ao excluir o usuário.");
        }
    }
}
