
## Documentação da API - Stellar

Esta API fornece endpoints para interagir com a rede Stellar, permitindo recuperar informações sobre contas, transações e blocos.


### **1. Detalhes da Conta**

**Endpoint:** `/accounts/:pubKey`

**Método:** `GET`

**Descrição:** Retorna detalhes de uma conta Stellar com base na chave pública fornecida.

**Parâmetros:**

*   `pubKey` (obrigatório): A chave pública da conta Stellar.

**Exemplo de Requisição:**

```
GET /api/accounts/GD6ZSAA63VFE6DHXPVNFMGS2BIMCC4M3MUSTRUQOFHJJTFHSKVI53CH5
```

**Resposta de Sucesso (200 OK):**

```json
{
  // ... detalhes completos da conta retornados pela API da Stellar ...
  "id": "GDUKMGUGDZQK6EDROP4JBDSZQ5NZXFJSRQP6IH3FBQKHETSUUESXASJA",
  "sequence": "8589934593",
  "balances": [
    {
      "balance": "1000.0000000",
      "asset_type": "native"
    }
    // ... outros possíveis ativos ...
  ],
  // ... outros campos ...
}
```


**Controller:** `getAccountDetails`

**Service:** `StellarService.getAccountDetails`

---

### 2. Saldo da Conta

**Endpoint:** `/balance/:pubKey`

**Método:** `GET`

**Descrição:** Retorna o saldo o último saldo (`accountData.balances`) de uma conta Stellar com base na chave pública fornecida.

**Parâmetros:**

*   `pubKey` (obrigatório): A chave pública da conta Stellar.

**Exemplo de Requisição:**

```
GET /api/balance/GD6ZSAA63VFE6DHXPVNFMGS2BIMCC4M3MUSTRUQOFHJJTFHSKVI53CH5
```

**Resposta de Sucesso (200 OK):**

```json
{
  "balance": {
    "balance": "10000.0000000",
    "buying_liabilities": "0.0000000",
    "selling_liabilities": "0.0000000",
    "asset_type": "native"
  }
}
```

**Controller:** `getAccountBalance`

**Service:** `StellarService.getAccountDetails`

---

### **3. Detalhes da Transação**

**Endpoint:** `/transactions/:hash`

**Método:** `GET`

**Descrição:** Retorna os detalhes de uma transação Stellar com base no hash fornecido.

**Parâmetros:**

*   `hash` (obrigatório): O hash da transação Stellar.

**Exemplo de Requisição:**

```
GET /api/transactions/4be019e2bf48f5093e5ffc210140c8ce7afa0215521a9b51bba01f38cfde5378
```

**Resposta de Sucesso (200 OK):**

```json
{
  // ... detalhes completos da transação retornados pela API da Stellar ...
  "hash": "75a99d75275756737559d4d3d7d98f6f7559d757d7598f6d9d7598f6d759d75",
  "ledger": 12345,
  "source_account": "GDUKMGUGDZQK6EDROP4JBDSZQ5NZXFJSRQP6IH3FBQKHETSUUESXASJA",
  // ... outros campos ...
}
```


**Controller:** `getTransactionDetails`

**Service:** `StellarService.getTransactionDetails`

---

### **4. Detalhes do Bloco**

**Endpoint:** `/blocks/:seq`

**Método:** `GET`

**Descrição:** Retorna os detalhes de um bloco Stellar com base no número de sequência do bloco fornecido.

**Parâmetros:**

*   `seq` (obrigatório): O número de sequência do bloco.

**Exemplo de Requisição:**

```
GET /api/blocks/10
```

**Resposta de Sucesso (200 OK):**

```json
{
  // ... detalhes completos do ledger retornados pela API da Stellar ...
  "sequence": 12345,
  "hash": "f5b554e9a9d8e9d9f9b5e9a9f9d8e9f9b5e9d9f9a9b8e9d9f9b5e9a9f9d8e9f9",
  // ... outros campos ...
}
```


**Controller:** `getLedgerDetails`

**Service:** `StellarService.getLedgerDetails`




