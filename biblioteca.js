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

function alterarDisponibilidade(id, disponivel) {
    const livro = livros.find(l => l.id === id);
    if (!livro) {
        console.log('Erro: Livro não encontrado.');
        return;
    }
    livro.disponivel = disponivel;
}

function filtrarLivrosPorGenero(genero) {
    return livros.filter(livro => livro.genero.toLowerCase() === genero.toLowerCase());
}

function ordenarLivrosPorAnoPublicacao(ordem) {
    return livros.slice().sort((a, b) => {
        if (ordem === 'crescente') {
            return a.ano - b.ano;
        } else if (ordem === 'decrescente') {
            return b.ano - a.ano;
        } else {
            return 0;
        }
    });
}

function listarLivrosDisponiveis() {
    const livrosDisponiveis = livros.filter(livro => livro.disponivel === true);

    if (livrosDisponiveis.length === 0) {
        console.log('Nenhum livro disponível no momento.');
    } else {
        console.log('Livros disponíveis:');
        livrosDisponiveis.forEach(livro => {
            console.log(`ID: ${livro.id}, Título: ${livro.titulo}, Autor: ${livro.autor}, Ano: ${livro.ano}, Gênero: ${livro.genero}`);
        });
    }

    return livrosDisponiveis;

}

function registrarEmprestimo(id, nomeUsuario, dataEmprestimo, dataDevolucao) {
    const livro = livros.find(l => l.id === id);
    if (!livro) {
        console.log('Erro: Livro não encontrado.');
        return;
    } else {
        if (!livro.disponivel) {
            console.log('Erro: Livro não está disponível para empréstimo.');
            return;
        }

        livro.emprestimos.push({
            nomeUsuario,
            dataEmprestimo,
            dataDevolucao
        });

        livro.disponivel = false;
        console.log('Empréstimo registrado com sucesso!');
    }
}

function gerarRelatorioEmprestimos() {
    let totalEmprestimos = 0;

    livros.forEach(livro => {
        livro.emprestimos.forEach(emprestimo => {
            console.log(`Livro: ${livro.titulo}, Usuário: ${emprestimo.nomeUsuario}, Data de Empréstimo: ${emprestimo.dataEmprestimo}, Data de Devolução: ${emprestimo.dataDevolucao}`);
            totalEmprestimos++;
        });
    });

    if (totalEmprestimos === 0) {
        console.log('Nenhum empréstimo registrado.');
    } else {
        console.log(`Total de empréstimos registrados: ${totalEmprestimos}`);
    }
}

module.exports = {
    adicionarLivro,
    listarLivros,
    buscarLivro,
    editarLivro,
    removerLivro,
    alterarDisponibilidade,
    filtrarLivrosPorGenero,
    ordenarLivrosPorAnoPublicacao,
    listarLivrosDisponiveis,
    registrarEmprestimo,
    gerarRelatorioEmprestimos
};