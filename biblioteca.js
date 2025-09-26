let livros = [];
let idContador = 1;

function adicionarLivro(titulo, autor, ano, genero) {
    if (livros.some(livro => livro.titulo.toLowerCase() === titulo.toLowerCase())) {
        console.log('Erro: Já existe um livro com este título.');
        return;
    }

    const livro = {
        id: idContador++,
        titulo,
        autor,
        ano,
        genero,
        disponivel: true,
        emprestimos: []
    };

    livros.push(livro);
    console.log('Livro adicionado com sucesso!');
}

function listarLivros() {
    if (livros.length === 0) {
        console.log('Nenhum livro cadastrado.');
        return;
    }

    console.log('Livros cadastrados:');
    livros.forEach(livro => {
        console.log(`ID: ${livro.id}, Título: ${livro.titulo}, Autor: ${livro.autor}, Ano: ${livro.ano}, Gênero: ${livro.genero}, Disponível: ${livro.disponivel ? 'Sim' : 'Não'}`);
    });
}

function buscarLivro(titulo) {
    const resultados = livros.filter(livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
    if (resultados.length === 0) {
        console.log('Nenhum livro encontrado com este título.');
        return;
    }

    console.log('Livros encontrados:');
    resultados.forEach(livro => {
        console.log(`ID: ${livro.id}, Título: ${livro.titulo}, Autor: ${livro.autor}, Ano: ${livro.ano}, Gênero: ${livro.genero}, Disponível: ${livro.disponivel ? 'Sim' : 'Não'}`);
    });
}

function editarLivro(id, novosDados) {
    const livro = livros.find(l => l.id === id);
    if (!livro) {
        console.log('Erro: Livro não encontrado.');
        return;
    }

    Object.assign(livro, novosDados);
    console.log('Livro editado com sucesso!');
}

function removerLivro(id) {
    const index = livros.findIndex(l => l.id === id);
    if (index === -1) {
        console.log('Erro: Livro não encontrado.');
        return;
    }

    const removido = livros.splice(index, 1);
    console.log(`Livro "${removido[0].titulo}" removido com sucesso!`);
}

module.exports = {
    adicionarLivro,
    listarLivros,
    buscarLivro,
    editarLivro,
    removerLivro
};