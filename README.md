# Exercício Guiado: Construindo uma Página Web com Consumo de API

Este guia irá conduzi-lo passo a passo na criação de uma página web simples que exibe uma lista de cidades obtidas através de uma API. O objetivo é aprender conceitos básicos de HTML, CSS e JavaScript, além de configurar um ambiente de desenvolvimento utilizando `npm`, `git` e um servidor HTTP simples.

## Sumário

1. [Pré-requisitos](#pr)
2. [Passo 1: Configuração do Ambiente](#p1)
3. [Passo 2: Inicializando o Repositório Git](#p2)
4. [Passo 3: Criando o `.gitignore`](#p3)
5. [Passo 4: Inicializando o NPM e Instalando Dependências](#p4)
6. [Passo 5: Configurando Variáveis de Ambiente com Dotenv](#p5)
7. [Passo 6: Criando o Servidor HTTP](#p6)
8. [Passo 7: Construindo a Página HTML](#p7)
9. [Passo 8: Estilizando com CSS](#p8)
10. [Passo 9: Consumindo a API com JavaScript](#p9)
11. [Passo 10: Executando o Projeto](#p10)
12. [Recursos Adicionais](#recursos)

<a name="pr"></a>

## 1. Pré-requisitos

- **Node.js** instalado em sua máquina. [Download Node.js](https://nodejs.org/)
- Conhecimentos básicos de:
  - Terminal/linha de comando
  - Conceitos de programação (variáveis, funções)
- Editor de texto ou IDE de sua preferência (ex: Visual Studio Code)

<a name="p1"></a>

## 2. Passo 1: Configuração do Ambiente

### Crie uma pasta para o projeto

No terminal, navegue até o diretório onde deseja criar o projeto e execute:

```bash
mkdir api-call
cd api-call
```

<a name="p2"></a>

## 3. Passo 2: Inicializando o Repositório Git

Inicie um repositório Git para controlar as versões do seu projeto:

```bash
git init
```

<a name="p3"></a>

## 4. Passo 3: Criando o `.gitignore`

O arquivo `.gitignore` é utilizado para especificar quais arquivos ou pastas o Git deve ignorar, ou seja, não versionar. Isso é importante para não incluir arquivos sensíveis ou desnecessários no controle de versão.

### Por que usar um `.gitignore`?

- **Segurança**: Evita que informações sensíveis, como senhas e chaves de API (no arquivo `.env`), sejam adicionadas ao repositório.
- **Organização**: Impede que arquivos temporários ou de dependências (como `node_modules`) sejam versionados, reduzindo o tamanho do repositório e evitando conflitos.

### Criando o arquivo `.gitignore`

Na raiz do seu projeto, crie um arquivo chamado `.gitignore`:

```bash
touch .gitignore
```

### Configurando o `.gitignore`

Abra o arquivo `.gitignore` e adicione as seguintes linhas:

```
# Ignora a pasta de dependências do Node.js
node_modules/

# Ignora arquivos de variáveis de ambiente
.env

# Ignora logs
npm-debug.log
```

- **`node_modules/`**: Esta pasta contém todas as dependências instaladas via NPM e não deve ser versionada.
- **`.env`**: Contém variáveis de ambiente com informações sensíveis, como credenciais.
- **`npm-debug.log`**: Arquivos de log gerados pelo NPM em caso de erros.

### Mais sobre o `.gitignore`

- [Git - Ignoring Files](https://git-scm.com/docs/gitignore)
- [W3Schools - Git Ignore](https://www.w3schools.com/git/git_ignore.asp)

<a name="p4"></a>

## 5. Passo 4: Inicializando o NPM e Instalando Dependências

### Inicialize o NPM

Execute o comando abaixo e siga as instruções (pode pressionar `Enter` para aceitar os valores padrão):

```bash
npm init -y
```

### Atualize o `package.json`

Abra o arquivo `package.json` gerado e atualize-o para ficar assim:

```json
{
  "name": "api-call",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "server": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.4.5",
    "http-server": "^14.1.1"
  }
}
```

### Instale as dependências

Instale as dependências necessárias:

```bash
npm install dotenv http-server
```

- **dotenv**: Permite carregar variáveis de ambiente de um arquivo `.env` para `process.env`.
- **http-server**: Um servidor HTTP simples para servir os arquivos estáticos.

<a name="p5"></a>

## 6. Passo 5: Configurando Variáveis de Ambiente com Dotenv

### Crie o arquivo `.env.example`

Este arquivo serve como um modelo para as variáveis de ambiente necessárias:

```
EMAIL="exemplo@provedor.com"
PASSWORD="password"
```

### Crie o arquivo `.env`

Crie um arquivo `.env` (não deve ser versionado no Git) e preencha com suas credenciais:

```
EMAIL="seu_email@example.com"
PASSWORD="sua_senha"
```

**Importante**: Nunca compartilhe seu arquivo `.env` com informações sensíveis.

<a name="p6"></a>

## 7. Passo 6: Criando o Servidor HTTP

Crie um arquivo `server.js` na raiz do projeto. Este servidor servirá nossos arquivos estáticos.

**Nota**: Você pode copiar o código completo para este arquivo, pois faz parte da configuração do servidor.

```javascript
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8080;
const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
  };

  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found", "utf-8");
      } else {
        res.writeHead(500);
        res.end("Server Error: " + error.code);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

<a name="p7"></a>

## 8. Passo 7: Construindo a Página HTML

Crie um arquivo `index.html` na raiz do projeto.

### Estrutura Básica do HTML

Comece com a estrutura básica de um documento HTML5. Estude sobre isso em:

- [W3Schools - HTML Basic](https://www.w3schools.com/html/html_basic.asp)
- [MDN - HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)

<details>
  <summary><strong>Gabarito</strong></summary>
  <pre><code>
&lt;!DOCTYPE html&gt;
&lt;html lang="pt-BR"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Lista de Cidades&lt;/title&gt;
    &lt;link rel="preload" href="styles.css" as="style" importance="high" onload="this.rel='stylesheet'"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;table class="centered-table"&gt;
      &lt;thead&gt;
        &lt;tr&gt;
          &lt;th&gt;Cidades&lt;/th&gt;
            &lt;/tr&gt;
          &lt;/thead&gt;
          &lt;tbody&gt;
            &lt;!-- O conteúdo será adicionado via JavaScript --&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;
  &lt;script src="script.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
</details>

### Adicione a Meta Tag para Responsividade

Inclua a seguinte meta tag dentro do `<head>` para garantir que sua página seja responsiva:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Leia mais sobre em:

- [W3Schools - Viewport Meta Tag](https://www.w3schools.com/css/css_rwd_viewport.asp)

### Importando o CSS

No `<head>` do seu HTML, importe o arquivo CSS com prioridade alta:

```html
<link
  rel="preload"
  href="styles.css"
  as="style"
  importance="high"
  onload="this.rel='stylesheet'"
/>
```

Entenda mais sobre a tag `<link>` em:

- [MDN - `<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)
- [W3Schools - HTML `<link>` Tag](https://www.w3schools.com/tags/tag_link.asp)

### Criando a Tabela

No `<body>`, crie uma tabela que terá uma coluna chamada "Cidades":

<details>
<summary><strong>Gabarito</strong></summary> 
<pre><code>
&lt;table class="centered-table"&gt; 
  &lt;thead&gt; 
    &lt;tr&gt; 
      &lt;th&gt;Cidades&lt;/th&gt; 
    &lt;/tr&gt; 
  &lt;/thead&gt; 
  &lt;tbody&gt; 
      &lt;!-- O conteúdo será adicionado via JavaScript --&gt; 
  &lt;/tbody&gt; 
&lt;/table&gt; 
</code></pre> 
</details>

Estude sobre tabelas em:

- [W3Schools - HTML Tables](https://www.w3schools.com/html/html_tables.asp)
- [MDN - `<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)

### Importando o JavaScript

No final do `<body>`, importe o arquivo JavaScript:

```html
<script src="script.js"></script>
```

Entenda a importância de importar o script no final para melhorar o carregamento da página:

- [MDN - `<script>` Defer and Async](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer)
- [W3Schools - HTML Scripts](https://www.w3schools.com/html/html_scripts.asp)

<a name="p8"></a>

## 9. Passo 8: Estilizando com CSS

Crie um arquivo `styles.css` na raiz do projeto.

<details> 
<summary><strong>Gabarito</strong></summary> <pre><code>
    /* Centraliza a tabela na tela */
    body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: hsl(210, 20%, 98%);
    }

    /* Estilo da tabela */
    .centered-table {
        width: 50dvw;
        height: 30dvh;
        background-color: hsl(0, 0%, 100%);
        border-collapse: collapse;
        box-shadow: 0 0 10svh hsl(0, 0%, 80%);
    }

    /* Estilo do cabeçalho da tabela */
    .centered-table thead th {
        font-size: 2lvh;
        color: hsl(210, 50%, 40%);
        padding: 1lvh;
        text-align: left;
    }

    /* Estilo para o corpo da tabela */
    .centered-table tbody td {
        font-size: 1.8svh;
        color: hsl(210, 20%, 30%);
        padding: 1lvh;
    }
</code></pre> 
</details>

### Centralizando a Tabela

Utilize Flexbox para centralizar a tabela na tela. Estude sobre Flexbox em:

- [W3Schools - CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp)
- [MDN - Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

### Utilizando Unidades de Medida Relativas

Utilize unidades como `dvh`, `svh`, `lvh`, `dvw`, `svw`, `lvw` para tornar o layout responsivo. Essas unidades representam porcentagens da altura e largura da tela.

- [MDN - Viewport-percentage lengths](https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-percentage_lengths)

### Cores com HSL

Utilize o modelo de cores HSL para definir cores, o que permite manipular matiz, saturação e luminosidade de forma mais intuitiva.

- [W3Schools - CSS HSL Colors](https://www.w3schools.com/css/css_colors_hsl.asp)
- [MDN - hsl()](<https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl()>)

<a name="p9"></a>

## 10. Passo 9: Consumindo a API com JavaScript

Crie um arquivo `script.js` na raiz do projeto.

<details> 
<summary><strong>Gabarito</strong></summary> 
<pre><code>
// Importa as variáveis de ambiente 

  require("dotenv").config(); 

// Função para autenticar e buscar as cidades 

  async function fetchCidades() { 
    const email = process.env.EMAIL; 
    const password = process.env.PASSWORD;
    const url = "http://137.184.108.252:5000/api"
  
    try { 
      // 1. Autenticação para obter o token const 

      loginResponse = await fetch(&#96;${url}/login&#96;, { 
        method: "POST", 
        headers: { "Content-Type": "application/json", }, 
        body: JSON.stringify({ email, password }), 
      }); 
      
      if (!loginResponse.ok) { 
        throw new Error("Login failed"); 
      } 
        
      const loginData = await loginResponse.json(); 
      const token = loginData.token; 
        
      // 2. Fazer a requisição para obter as cidades 

      const cidadesResponse = await fetch(`${url}/cidades`, { 
          method: "GET", 
          headers: { 
            "Content-Type": "application/json", 
            "x-access-token": token, 
          }, 
        } 
      ); 
        
      if (!cidadesResponse.ok) { 
        throw new Error("Failed to fetch cities"); 
      } 
        
      const cidadesData = await cidadesResponse.json(); 
      
      // 3. Renderizar as cidades na tabela 

      const tbody = document.querySelector("table tbody"); 
      
      cidadesData.forEach((cidade) => { 
        const row = document.createElement("tr"); 
        const cell = document.createElement("td"); 
        cell.textContent = cidade.nome; 
        row.appendChild(cell); 
        tbody.appendChild(row); 
      }); 
    
    } catch (error) { 
      // 4. Tratamento de erro: 
      // exibir mensagem de alerta e renderizar aviso na tabela

      alert("Ops! Servidor indisponível."); 
      const tbody = document.querySelector("table tbody"); 
      const row = document.createElement("tr"); 
      const cell = document.createElement("td"); 
      cell.textContent = "Não há cidades a serem listadas."; 
      row.appendChild(cell); 
      tbody.appendChild(row); 
    } 
  } 
// Chamada da função para buscar as cidades ao carregar o script 
fetchCidades();

</code></pre> 
</details>

### Importando Variáveis de Ambiente

Para acessar as variáveis definidas no arquivo `.env`, utilize o pacote `dotenv`.

```javascript
require("dotenv").config();
```

Entenda como o `dotenv` funciona:

- [npm - dotenv](https://www.npmjs.com/package/dotenv)

### Fazendo Requisições com `fetch`

Use a função `fetch` para fazer requisições HTTP à API. Estude sobre:

- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [W3Schools - Fetch API](https://www.w3schools.com/js/js_api_fetch.asp)

### Utilizando `async/await` e `try-catch`

Para lidar com código assíncrono de forma mais legível, utilize `async/await`. Envolva suas chamadas em um bloco `try-catch` para tratar erros.

- [MDN - async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

### Manipulando o DOM

Utilize a variável global `document` e métodos como `querySelector`, `createElement`, `appendChild` para manipular o DOM e inserir as cidades na tabela.

- [W3Schools - JavaScript HTML DOM](https://www.w3schools.com/js/js_htmldom.asp)
- [MDN - Document interface](https://developer.mozilla.org/en-US/docs/Web/API/Document)

<a name="p10"></a>

## 11. Passo 10: Executando o Projeto

### Inicie o Servidor HTTP

No terminal, execute:

```bash
npm run server
```

Você deverá ver a mensagem:

```
Server running at http://localhost:8080/
```

### Acesse a Aplicação

Abra o navegador e vá para [http://localhost:8080/](http://localhost:8080/). Você deverá ver a tabela centralizada na tela, preenchida com as cidades obtidas da API.

### Possíveis Erros

- **CORS (Cross-Origin Resource Sharing)**: Se você enfrentar problemas relacionados a CORS, pode ser necessário ajustar as configurações do servidor ou usar uma extensão no navegador para testes locais.
- **Variáveis de Ambiente**: Certifique-se de que o arquivo `.env` está corretamente preenchido e que o `dotenv` está sendo configurado no seu `script.js`.

<a name="recursos"></a>

## 12. Recursos Adicionais

- **HTML e CSS**

  - [W3Schools - HTML Tutorial](https://www.w3schools.com/html/)
  - [W3Schools - CSS Tutorial](https://www.w3schools.com/css/)
  - [MDN - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
  - [MDN - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

- **JavaScript**

  - [W3Schools - JavaScript Tutorial](https://www.w3schools.com/js/)
  - [MDN - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

- **Git**

  - [Git Documentation](https://git-scm.com/doc)
  - [W3Schools - Git Tutorial](https://www.w3schools.com/git/)

- **Node.js e NPM**
  - [Node.js Official Website](https://nodejs.org/)
  - [NPM Documentation](https://docs.npmjs.com/)

---

Parabéns! Você concluiu o exercício e agora tem uma aplicação web simples que consome dados de uma API e os exibe de forma dinâmica. Este é um ótimo passo para aprofundar seus conhecimentos em desenvolvimento web.
