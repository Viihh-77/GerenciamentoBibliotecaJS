const biblioteca = require('./biblioteca');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {
    console.log('\n=== Biblioteca ===');
    console.log('| 1 - Adicionar     |');
    console.log('| 2 - Listar        |');
    console.log('| 3 - Buscar        |');
    console.log('| 4 - Editar        |');
    console.log('| 5 - Remover       |');
    console.log('| 0 - Sair          |');
    console.log('===================');

rl.question('Escolha uma opção: ', (opcao) => {
    switch (opcao) {
        case '1':
            rl.question('Título: ', (titulo) => {
                rl.question('Autor: ', (autor) => {
                    rl.question('Ano: ', (ano) => {
                        rl.question('Gênero: ', (genero) => {
                            biblioteca.adicionarLivro(titulo, autor, ano, genero);
                            console.log('Livro adicionado com sucesso!');
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
            rl.question('ID do livro a remover: ', (id) => {
                biblioteca.removerLivro(parseInt(id));
                mostrarMenu();
            });

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