# Documentação dos Endpoints
Este arquivo contém informações sobre os endpoints disponíveis na API.

# Padrao De Resposta
Nesta API todas as requisições vem com uma Resposta Padrão, todas as requisições devolvem um json com o seguinte formato 

    {
	      "statusCode": o status da requisição  ,
	      "message": uma mensagem sobre a requisicao ,
	      "data": quando for um get, retorna um ou mais objetos, quando for um post retorna null. 
	  }


## Recupera Todos os Usuarios (GET /getUsers)
Este endpoint é usado para buscar todos os usuários registrados no sistema.
### Parâmetros
Nenhum.

## Registra um Usuario (POST /register)
Este endpoint é usado para registrar um novo usuário no sistema.
### Parâmetros
- `username`: O nome de usuário do novo usuário.
- `password`: A senha do novo usuário.

## Checa login e senha dos usuarios (POST /checkCredentials)
Este endpoint é usado para verificar as credenciais de um usuário, para fazer o login do mesmo, ele confere no banco de dados se o usuario e senha sao compativeis.

### Parâmetros

- `username`: O nome de usuário do usuário a ser verificado.
- `password`: A senha do usuário a ser verificado.


