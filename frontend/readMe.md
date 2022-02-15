# Build

```
  yarn build

  yarn docker_deploy
```

- Descomentar o Certbot do docker-compoese.prod.yml e rodar o comando abaixo, e depois comentar novamente

```
  yarn docker_certbot
```

- Alterar o template do ngix Descomentar o que estiver comentado e comentar o redirecionamento para o servico na porta 80

- Atualizar o Web server

```
  yarn docker_webserver
```

# Atualizar API

```
  yarn docker_update
```

# Renovar Certificado

- Faltando menos de 1 mes para expirar, Descomentar o Certbot e executar o comando e depois comentar novamente

```
  yarn docker_certbot_renew
```
