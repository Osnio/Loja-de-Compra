/*Essa parte do codigo busca os dados de usuários e exibi eles na nossa tabela HTML.*/

//Selecionamos a tabela e o armazenamos na variavel tabela
let tabela = document.querySelector("#tabela");

/* definimos uma funcao assincrona chamada de userDataFetch para que possamos utilizar o await*/
async function userDataFetch() {

    /* O bloco try-catch é usado para capturar e lidar com erros  que podem ocorrer durante a execução do código dentro do bloco try.*/
    try {
        /*
         faz a requisicao HTTP para essa url usando o metodo get para pegar os dados dos usuarios
        */
        const response = await fetch("http://localhost:3333/allUsers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        /*esse comando usa o await para esperar que a resposta de uma reqiisicao http  seja convertida para um objecto javaScript.
         o metodo response.json() retorna uma promessa que quando resolvida, fornece dados no formato JSON*/
        const data = await response.json();
        /* imprime os dados recebidos*/
        console.log(data)
        /* esse bloco itera siobre cada item do array data. Para cada item 'e' no array ele executa a funcao passada como argumento*/
        data.forEach(e => {
            /* innerHTML += adiciona o HTML gerado à estrutura existente, em vez de substituir todo o conteúdo. 
            O uso de crase (`) permite a interpolação de strings, o que facilita a inserção de variáveis diretamente no HTML*/

            /*tr cria uma linha definido como(id) td cria uma celula contendo. Na primeira celula 
            temos a concatenaao de e.nome e.S_nome */
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


        // Adiciona event listener para botões de editar e excluir
        /*Seleciona todos os elementos que têm a classe CSS "edit". Ele retorna uma NodeList contendo esses elementos */
        document.querySelectorAll('.edit').forEach(button => {
            /*para cada elemento , adiciona um evento de listener que escuta o evento de clique, quando ele e clicado ele chama
            a funcao a funcao aditarUsuario
            */
            button.addEventListener('click', editarUsuario);
        });
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', apagarUsuario);
        });

    } catch (err) {
        alert("O SERVIDOR NÃO RESPONDE");
        //Se ocorrer um erro dentro d try, ele exibirá essa mensagem de erro
    }
}
userDataFetch();
/*Chama a função userDataFetch().Esta função é responsável por buscar os dados do usuário, e isso  acontece quando a página é carregada.*/

/*Esta linha define uma função assíncrona chamada editarUsuario que aceita um parâmetro event. 
  A palavra-chave async indica que a função retornará uma promessa*/
async function editarUsuario(event) {
    /*Esta linha extrai o ID do usuário da propriedade dataset do alvo do evento.Isso porque o evento está relacionado 
    a uma interação do usuário, como clicar em um botão de edição em uma tabela.*/
    const userId = event.target.dataset.id;
    /*Esta linha encontra o elemento HTML com o ID extraído anteriormente. */
    const row = document.getElementById(userId);
    /*Esta linha encontra todos os elementos <td> dentro da linha encontrada. */
    const cells = row.querySelectorAll('td');
    /*Estas linhas dividem o conteúdo do primeiro <td> em duas partes usando o espaço como delimitador. 
     o primeiro <td> contém o nome e o sobrenome do usuário, e essas partes são armazenadas em nome e apelido. */
    const name = cells[0].innerText.split(' ');
    const nome = name[0];
    const apelido = name[1];
    /*Estas linhas obtêm o texto dos elementos <td> 1 e 2, que provavelmente contêm o email e a senha do usuário, */
    const email = cells[1].innerText;
    const senha = cells[2].innerText;

    // Aqui você pode usar modal ou formulário para editar os dados
    /*Estas linhas exibem prompts ao usuário para inserir novos valores para o nome, sobrenome, email e senha. 
    /*Os valores padrão são os valores extraídos anteriormente.*/
    const newName = prompt("Novo nome:", nome);
    const newApelido = prompt("Novo apelido:", apelido);
    const newEmail = prompt("Novo email:", email);
    const newSenha = prompt("Nova senha:", senha);

    //Esta linha verifica se o usuário não cancelou os prompts pressionando o botão "Cancelar".
    if (newName !== null && newApelido !== null && newEmail !== null && newSenha !== null) {
        //Esta linha inicia um bloco de código que será monitorado para erros.
        try {
            /*Esta parte envia uma requisição HTTP PUT para http://localhost:3333/update, passando os novos dados do usuário 
            em formato JSON no corpo da requisiçao*/
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
            /*Essas linhas processam a resposta da requisição. Se a mensagem retornada for "SUCESS", uma mensagem de alerta 
              é exibida indicando sucesso na atualização ou edição dos dados.*/
            .then(resp=>{return resp.json()})
            .then(data=>{
                if(data.message==="SUCESS"){
                    alert("DADOS ATUALIZADOS COM SUCESSO")
                }else if(data.message==="SUCESS"){
                    alert("SUCESSO AO EDITAR DADOS")
                }
            })

            // Atualiza os dados na tabela
            //Estas linhas atualizam os valores exibidos na tabela com os novos valores inseridos pelo usuário.
            cells[0].innerText = `${newName} ${newApelido}`;
            cells[1].innerText = newEmail;
            cells[2].innerText = newSenha;
        //Este bloco é executado caso ocorra algum erro durante o processo de atualização dos dados do usuário, exibindo uma mensagem de alerta ao usuário.
        } catch (error) {
            alert("Erro ao atualizar os dados do usuário.");
        }
    }
}

async function apagarUsuario(event) {
    const userId = event.target.dataset.id;
    //Esta linha exibe uma janela de confirmação ao usuário com a mensagem 
    const confirmation = confirm("Tem certeza que deseja excluir este usuário?");

    if (confirmation) {
        try {
            //Esta linha envia uma requisição DELETE para o servidor para excluir os dados do usuário com o ID especificado.
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
            }) //Esta linha trata erros ocorridos durante a requisição. O método .catch() é usado para lidar com erros de Promises rejeitadas. 
            .catch(err=>alert("O SERVIDOR NN RESPONDE TENTE MAIS TARDE"))

            // Remove a linha da tabela
            const row = document.getElementById(userId);
            row.remove();

        } catch (error) {
            alert("Erro ao excluir o usuário.");
        }
    }
}
