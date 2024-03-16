# Documentação dos Endpoints
Este arquivo contém informações sobre os endpoints disponíveis na API.

# Padrao De Resposta
Nesta API todas as requisições vem com uma Resposta Padrão, todas as requisições devolvem um json com o seguinte formato 

    {
	      "statusCode": o status da requisição  ,
	      "message": uma mensagem sobre a requisicao ,
	      "data": quando for um get, retorna um ou mais objetos, quando for um post retorna null. 
    }

# /login

---

### - Recupera Todos os Usuários (GET /getUsers)
> Este endpoint é usado para buscar todos os usuários registrados no sistema.
> #### Parâmetros
> Nenhum.

### - Recupera um Usuário (GET /userById/:id)
> Este endpoint é usado para buscar um usuário no sistema.
> #### Parâmetros - (queryParam)
> - `ID`: O ID do usuário a ser recuperado.

### - Registra um Usuário (POST /register)
> Este endpoint é usado para registrar um novo usuário no sistema.
> #### Parâmetros - (Body)
> - `username`: O nome de usuário do novo usuário.
> - `password`: A senha do novo usuário.

### - Recupera um Atributo do Usuário pelo ID (GET /getUserAttributeByID)
> Este endpoint é usado para recuperar um atributo do usuário pelo ID.
> #### Parâmetros - (Body)
> - `id`: O id do usuário.
> - `atributo`: Atributo que deseja retornar.

### - Checa Login e Senha do Usuário (POST /checkCredentials)
> Este endpoint é usado para verificar as credenciais de um usuário, para fazer o login do mesmo. Ele confere no banco de dados se o usuário e senha são compatíveis.
> #### Parâmetros - (Body)
> - `username`: O nome de usuário a ser verificado.
> - `password`: A senha do usuário a ser verificado.


# /video

---

### - Adiciona um Novo Vídeo (POST /postNewVideo/:idUser)
> Adiciona um novo vídeo ao histórico de um usuário específico.
> #### Parâmetros - (queryParam)
> - `idUser`: O ID do usuário.
> #### Parâmetros - (Body)
> - `video_link`: O link do vídeo a ser adicionado.
> #### Resposta
> - **Status 201**: `Vídeo adicionado com sucesso`. Retorna os detalhes do vídeo adicionado.

### - Recupera Vídeos de um Usuário (GET /getVideosOfUser/:idUser)
> Busca todos os vídeos relacionados a um usuário específico.
> #### Parâmetros - (queryParam)
> - `idUser`: O ID do usuário.
> #### Resposta
> - **Status 200**: `Busca Feita Com Sucesso`. Retorna uma lista dos vídeos do usuário.

### - Deleta Todos os Vídeos de um Usuário (DELETE /deleteAllVideoInHistoric/:idUser)
> Apaga todos os vídeos do histórico de um usuário específico.
> #### Parâmetros - (queryParam)
> - `idUser`: O ID do usuário.
> #### Resposta
> - **Status 204**: `Vídeos deletados Com Sucesso`. Retorna detalhes da operação de deleção.

### - Deleta um Vídeo Específico do Histórico de um Usuário (DELETE /deleteOneVideoInHistoric/:idUser)
> Remove um vídeo específico do histórico de um usuário.
> #### Parâmetros - (queryParam)
> - `idUser`: O ID do usuário.
> #### Parâmetros - (Body)
> - `video_link`: O link do vídeo a ser deletado.
> #### Resposta
> - **Status 204**: `Vídeo deletado Com Sucesso`. Retorna detalhes da operação de deleção.


# /annotation

---

### - Adiciona uma Nova Anotação (POST /postNewNotation/:userId)
> Permite a criação de uma nova anotação associada a um usuário e a um vídeo específico, obrigatoriamente.
> #### Parâmetros - (queryParam)
> - `userId`: O ID do usuário ao qual a anotação será associada.
> #### Parâmetros - (Body)
> - `title`: O título da anotação.
> - `body`: O corpo ou conteúdo da anotação.
> - `videoLink`: O link do vídeo relacionado à anotação.
> #### Resposta
> - **Status 201**: `Anotação Cadastrada Com Sucesso`. Retorna os detalhes da anotação cadastrada.


