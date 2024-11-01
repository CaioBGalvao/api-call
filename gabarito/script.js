// Função para autenticar e buscar as cidades
require("dotenv").config();

async function fetchCidades() {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  try {
    // 1. Autenticação para obter o token
    const loginResponse = await fetch("http://137.184.108.252:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!loginResponse.ok) {
      throw new Error("Login failed");
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;

    // 2. Fazer a requisição para obter as cidades
    const cidadesResponse = await fetch(
      "http://137.184.108.252:5000/api/cidades",
      {
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
    // 4. Tratamento de erro: exibir mensagem de alerta e renderizar aviso na tabela
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
