const biblioteca = require('./biblioteca');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {
    console.log('\n=========== Biblioteca ===========');
    console.log('|                                  |');
    console.log('| 1 - Adicionar                    |');
    console.log('| 2 - Listar                       |');
    console.log('| 3 - Buscar                       |');
    console.log('| 4 - Editar                       |');
    console.log('| 5 - Alterar Disponibilidade      |');
    console.log('| 6 - Remover                      |');
    console.log('| 0 - Sair                         |');
    console.log('|                                  |');
    console.log('|          === Bônus ===           |');
    console.log('|                                  |');
    console.log('| 7 - Filtrar livros por gênero    |');
    console.log('| 8 - Ordenar por ano de publi     |');
    console.log('| 9 - Listar livros disponiveis    |');
    console.log('| 10 - Registar empréstimo         |');
    console.log('| 11 - Gerear relatório emprestimo |');
    console.log('|                                  |');
    console.log('====================================');

rl.question('Escolha uma opção: ', (opcao) => {
    switch (opcao) {
        case '1':
            rl.question('Título: ', (titulo) => {
                rl.question('Autor: ', (autor) => {
                    rl.question('Ano: ', (ano) => {
                        rl.question('Gênero: ', (genero) => {
                            biblioteca.adicionarLivro(titulo, autor, ano, genero);
                            mostrarMenu();
                        });
                    });
                });
            });

            break;

        case '2':
            biblioteca.listarLivros();
            mostrarMenu();
            break;
        
        case '3':
            rl.question('Título do livro a buscar: ', (titulo) => {
                biblioteca.buscarLivro(titulo);
                mostrarMenu();
            });

            break;

        case '4':
            rl.question('ID do livro a editar: ', (id) => {
                rl.question('Novo título: ', (novoTitulo) => {
                    rl.question('Novo autor: ', (novoAutor) => {
                        rl.question('Novo ano: ', (novoAno) => {
                            rl.question('Novo gênero: ', (novoGenero) => {
                                biblioteca.editarLivro(parseInt(id), {
                                    titulo: novoTitulo,
                                    autor: novoAutor,
                                    ano: novoAno,
                                    genero: novoGenero
                                });
                                mostrarMenu();
                            });
                        });
                    });
                });
            });

            break;

        case '5':
            rl.question('ID do livro a alterar disponibilidade: ', (id) => {
                rl.question('Disponível (s/n): ', (disponivel) => {
                    const isDisponivel = disponivel.toLowerCase() === 's';
                    biblioteca.alterarDisponibilidade(parseInt(id), isDisponivel);
                    mostrarMenu();
                });
            });

            break;

        case '6':
            rl.question('ID do livro a remover: ', (id) => {
                biblioteca.removerLivro(parseInt(id));
                mostrarMenu();
            });

            break;

        case '7':
            rl.question('Gênero para filtrar: ', (genero) => {
                const livrosFiltrados = biblioteca.filtrarLivrosPorGenero(genero);
                if (livrosFiltrados.length === 0) {
                    console.log('Nenhum livro encontrado para este gênero.');
                } else {
                    console.log('Livros encontrados:');
                    livrosFiltrados.forEach(livro => {
                        console.log(`ID: ${livro.id}, Título: ${livro.titulo}, Autor: ${livro.autor}, Ano: ${livro.ano}, Gênero: ${livro.genero}, Disponível: ${livro.disponivel ? 'Sim' : 'Não'}`);
                    });
                }
                mostrarMenu();
            });

            break;

        case '8':
            rl.question('Ordenar por ano de publicação (crescente ou decrescente): ', (ordem) => {
                ordem = ordem.toLowerCase();
                const livrosOrdenados = biblioteca.ordenarLivrosPorAnoPublicacao(ordem);
                console.log('Livros ordenados:');
                console.log(livrosOrdenados);
                mostrarMenu();
            });

            break;

        case '9':
            biblioteca.listarLivrosDisponiveis();
            mostrarMenu();
            break;

        case '10':
            rl.question('ID do livro para registrar empréstimo: ', (id) => {
                rl.question('Nome do usuário: ', (nomeUsuario) => {
                    rl.question('Data do empréstimo: ', (dataEmprestimo) => {
                        rl.question('Data de devolução: ', (dataDevolucao) => {

                            biblioteca.registrarEmprestimo(
                                parseInt(id),
                                nomeUsuario,
                                dataEmprestimo,
                                dataDevolucao
                            );
                            mostrarMenu();
                        });
                    });
                });
            });

            break;

        case '11':
            biblioteca.gerarRelatorioEmprestimos();
            mostrarMenu();
            break;

        case '0':
            console.log('Saindo...');
            rl.close();
            break;
        
        default:
            console.log('Opção inválida!');
            mostrarMenu();
            break;

        }
    });
}

mostrarMenu();