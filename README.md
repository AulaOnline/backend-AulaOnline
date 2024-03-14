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

---

## Recupera um Usuario (GET /userById/:id)
Este endpoint é usado para buscar um usuario no sistema.
### Parâmetros - (queryParam)
- `ID`: O nome de usuário do novo usuário.

---

## Registra um Usuario (POST /register)
Este endpoint é usado para registrar um novo usuário no sistema.
### Parâmetros - (Body)
- `username`: O nome de usuário do novo usuário.
- `password`: A senha do novo usuário.

---
## Recupera um Atributo do usuario pelo ID (GET /getUserAttributeByID)
Este endpoint é usado para recuperar um atributo do usuario pelo ID
### Parâmetros - (Body)
- `id`: O id do usuario.
- `atributo`: atributo que deseja retornar.
---

## Checa login e senha do usuario (POST /checkCredentials)
Este endpoint é usado para verificar as credenciais de um usuário, para fazer o login do mesmo, ele confere no banco de dados se o usuario e senha sao compativeis.

### Parâmetros - (Body)

- `username`: O nome de usuário do usuário a ser verificado.
- `password`: A senha do usuário a ser verificado.
---

## Registra um novo Vídeo ao Histórico do Usuário (POST//postNewVideoInHistoric/:idUser)
Este endpoint é usado para registrar um novo vídeo acessado pelo usuário em seu histórico.

### Parâmetros 

### - (queryParam)
- `idUser`: O ID do usuário que está acessando o vídeo.
### - (body)
- `video_link`: O link do vídeo do YouTube que o usuário quer acessar e adicionar ao seu histórico
---
## Recupera Todos os Vídeos acessados por um Usuário no Hisórico(GET//getVideosInHistoric/:idUser)
Este endpoint é usado para recuperar todos os vídeo já acessados pelo usuário em seu histórico.

### Parâmetros  - (queryParam)
- `idUser`: O ID do usuário que está acessando.
---
## Deleta Todos os Vídeos acessados por um Usuário no Hisórico(DELETE//deleteVideoInHistoric/:idUser)
Este endpoint é usado para apagar todos os vídeo já acessados pelo usuário em seu histórico, no caso do usuário ser excluído.

### Parâmetros  - (queryParam)
- `idUser`: O ID do usuário que está acessando.
---

## Recupera Todos os Vídeos correspondentes ao um título especificado por um Usuário que estão em seu Hisórico(GET//getVideoByTittle/:idUser)
Este endpoint é usado para acessar todos os vídeo no histórico de um usuário dado um título específico,faz uma busca.

### Parâmetros  
### - (queryParam)
- `idUser`: O ID do usuário que está acessando.
### - (body)
- `tittle`: O nome do vídeo do YouTube que o usuário quer procurar em  seu histórico
---





