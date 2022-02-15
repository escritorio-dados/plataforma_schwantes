# Criar Api Key

- Criar uma API KEY e Salvar o id, api_key, encoded

```
  curl --user elastic:pass -PUT "http://127.0.0.1:9200/_security/api_key" -H 'Content-Type: application/json' -d'{ "name": "api_key" }'
```

- Utilização do Token (encoded) (curl e axios por exemplo)

```
  Authorization: ApiKey api_key_encoded
```

- O id e a api_key é utilizado pelo client python do elastic por exemplo

# Configurar o total de fields maping (Caso necessario)

```
  PUT docentes/_settings
  {
    "index.mapping.total_fields.limit": 2000
  }
```

# Build 

```
  yarn build

  yarn docker_deploy
```

# Atualizar API

```
  yarn docker_update
```