/* Lógica para manejar las llamadas a la API */

// Variables o funciones
const API_URL = `http://localhost:4000/clients`;

// Funciones

export const addClient = async (client) => {
  try {
    await fetch(API_URL, {
      method: `POST`,
      body: JSON.stringify(client),
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.href = `index.html`;
  } catch (error) {
    console.error(error);
  }
};

export const getClients = async () => {
  try {
    const response = await fetch(API_URL);
    const clients = await response.json();

    return clients;
  } catch (error) {
    console.error(error);
  }
};

export const deleteClient = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: `DELETE`,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getClient = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const client = await response.json();

    return client;
  } catch (error) {
    console.error(error);
  }
};

export const updateClient = async (client) => {
try {
  await fetch(`${API_URL}/${client.id}`, {
    method: `PUT`, 
    body: JSON.stringify(client),
    headers: {
      "Content-Type": "application/json",
    },
  })

  window.location.href = `index.html`;
} catch (error) {
  console.error(error);
}
}