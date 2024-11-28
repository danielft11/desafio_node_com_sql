# Desafio Full Cycle - Node with NgInx and MySQL

Este projeto imprime na tela "Full Cycle Rocks!" e uma lista de usuários pré-cadastrados usando uma aplicação Node, que faz a persistência dos usuários em um
banco de dados MySQL. O projeto também utiliza NgInx para proxy reverso.

## Como Usar:

1. Execute o comando "docker compose up -d" para download das imagens e execução dos containers.
2. Acesse a aplicação no navegador na URL http://localhost:8080/users.

Observação: se ocorrer o erro "Error querying the database" ao acessar a URL mencionada, aguarde um pouco, pois pode ser que não deu tempo do banco ou tabela ainda
não terem sido criados, ou os dados não inseridos na tabela.

## Resultado Esperado:
   - Imprimir o console a frase "Full Cycle Rocks!" e uma lista com 3 usuários cadastrados previamente.


