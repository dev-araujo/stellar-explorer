
### POST `/api/account/create`

- **Descrição**: Cria uma nova conta na testnet (funded via Friendbot)
- **Resposta**:
```
{
"message": "Conta criada com sucesso na testnet",
"publicKey": "GASHYKUW27HOI3QLDTTJJR67QH3N5NVXCHIVQTFCZOSTAOOOX56ZKGIS",
"secretKey": "SC3SKEKMBWUIACHWOZ3526V5VEZNOR7JKME2A3VOAHIBORWBT2RJIANG",
"explorerLink": "https://stellar.expert/explorer/testnet/account/GASHYKUW27HOI3QLDTTJJR67QH3N5NVXCHIVQTFCZOSTAOOOX56ZKGIS"
}

```

### GET `/api/account/:accountId`

- **Descrição**: Retorna detalhes de uma conta Stellar
- **Parâmetros**:
  - `accountId` (string): Endereço público da conta a `publicKey`


### GET `/api/transactions/latest`

- **Descrição**: Lista as últimas 20 transações na rede


### GET `/api/transaction/:hash`

- **Descrição**: Busca detalhes de uma transação específica



