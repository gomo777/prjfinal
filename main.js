function displayTextHistoria(tabName) {

    const displayElement = document.getElementById('display-text');

    displayElement.innerHTML = '';

    let paragraphs = ['Joey bateu na porta do apartamento de Monica, empolgado para o jantar de Ação de Graças. Para sua surpresa, a voz de Monica ecoou de trás da porta: "E aí, Joey! Transformamos isso em um esconde-esconde de Ação de Graças. Você precisa nos encontrar antes de podermos jantar!"', 'Perplexo, mas disposto ao desafio, Joey entrou no apartamento, vasculhando cada cômodo em busca de qualquer sinal de seus amigos. Risadas surgiam de cantos diversos, provocando-o enquanto ele navegava pelo espaço familiar. Mônica, Ross, Rachel, Chandler e Phoebe tinham se escondido estrategicamente, deixando Joey determinado a descobrir suas localizações.', 'A atmosfera festiva do feriado misturava-se com a diversão do jogo, criando uma experiência única de Ação de Graças. Joey, com seu espírito otimista, enfrentava o desafio com entusiasmo, transformando o labirinto em uma comédia interativa, onde cada recomeço adicionava mais risadas à celebração.', 'No final, depois de várias tentativas, Joey desvendou o caminho certo, encontrando seus amigos e celebrando a vitória no jogo de labirinto de Ação de Graças, tornando esse feriado memorável para todos.'];

    let paragraphIndex = 0;
    let charIndex = 0;

    const typingInterval = setInterval(() => {
        if (charIndex === 0) {
            displayElement.innerHTML += '<p>'; // Inicia um novo parágrafo
        }

        displayElement.innerHTML += paragraphs[paragraphIndex][charIndex];
        charIndex++;

        if (charIndex === paragraphs[paragraphIndex].length) {
            charIndex = 0;
            paragraphIndex++;

            if (paragraphIndex === paragraphs.length) {
                displayElement.innerHTML += '</p>';
                clearInterval(typingInterval);
            } else {
                displayElement.innerHTML += '</p><p>'; // Finaliza o parágrafo atual e inicia um novo
            }
        }
    }, 50);
}

function displayCommand(command) {
    document.getElementById('command-display').innerText = command;
}

function cadastrarJogo() {
    const name = document.getElementById('Name').value;
    const genero = document.getElementById('Genero').value;
    const descricao = document.getElementById('Descricao').value;
    const integrantes = document.getElementById('Integrantes').value;
    const squad = document.getElementById('Squad').value;
    let website = document.getElementById('Website').value;
    let thumbnail = document.getElementById('Thumbnail').value;
    // Remover o prefixo "http://"
    website = website.replace(/^https?:\/\//, '');
    thumbnail = thumbnail.replace(/^https?:\/\//, '');

    const requestBody = {
        name,
        genero,
        descricao,
        integrantes,
        squad,
        website,
        thumbnail
    };

    fetch('http://localhost:8080/jogos/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then(data => {
            alert('Jogo cadastrado com sucesso!');
            document.getElementById('cadastroForm').reset();
            location.reload();
        })
        .catch(error => {
            console.error('Erro ao cadastrar jogo:', error);
        });
}

function ListarJogos() {
    fetch(`http://localhost:8080/jogos`)
        .then(response => {
            if (response.status === 404) {
                return Promise.reject('Lista de Jogos não encontrada');
            }
            return response.json();
        })
        .then(data => {

            const tbodyElement = document.getElementById('jogos-tabela').querySelector('tbody');
            tbodyElement.innerHTML = '';

            // Preenche a tabela com os resultados da pesquisa
            data.forEach(jogo => {
                const linhaJogo = document.createElement('tr');
                linhaJogo.innerHTML = `
                   <td>${jogo.id}</td>
                   <td>${jogo.name}</td>
                   <td>${jogo.genero}</td>
                   <td>${jogo.descricao}</td>
                   <td>${jogo.integrantes}</td>
                   <td>${jogo.squad}</td>
                   <td>${jogo.website}</td>
                   <td><a href="https://${jogo.thumbnail}">Acesse a imagem</a></td>
               `;
                tbodyElement.appendChild(linhaJogo);
            });
        })
        // Trata os Erros
        .catch(error => {
            console.error('Erro ao pesquisar funcionário:', error);
            const resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = 'Jopo não encontrado.';
        });
}