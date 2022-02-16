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

- As portas no no proxy_pass do nginx tem que ser liberadas nos grupos de segurança para acesso pelo menos pelo proprio IP, ou para qualquer um

- Atualizar o Web server

```
  sudo openssl dhparam -out ./nginx/dhparam/dhparam-2048.pem 2048

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
