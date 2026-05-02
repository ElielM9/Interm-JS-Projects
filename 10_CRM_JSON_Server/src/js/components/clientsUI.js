/* Componente UI para mostrar clientes  */

// Importaciones
import { getClients } from "../api/clientsAPI.js";
import { deleteClient } from "../api/clientsAPI.js";

// Funciones
export async function showClients() {
  const clientsList = document.querySelector(`#clients-list`);
  const clients = await getClients();
  clientsList.addEventListener(`click`, confirmDelete);

  clients.forEach((client) => {
    const { name, email, phone, company, id } = client;

    const row = document.createElement(`tr`);
    row.classList.add(`hover:bg-gray-50`, `transition-colors`, `duration-200`);
    row.innerHTML = `
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div
                          class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold border border-purple-200"
                        >
                            ${name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          ${name}
                        </div>
                        <div class="text-sm text-gray-500">
                          ${email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${phone}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                      ${company}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a
                      href="edit.html?id=${id}"
                      class="text-purple-600 hover:text-purple-900 mr-3" 
                      >Editar</a
                    >
                    <a href="#" class="text-red-600 hover:text-red-900 delete-client" data-id="${id}"
                      >Eliminar</a
                    >
                  </td>
    `;
    clientsList.appendChild(row);
  });
}

async function confirmDelete(e) {
  const btnDelete = e.target.classList.contains(`delete-client`);

  if (!btnDelete) {
    console.error(
      `Error: No se ha hecho clic en el botón de eliminar cliente.`,
    );

    return;
  }

  const idClient = e.target.getAttribute(`data-id`);
  const confirmDelete = confirm(`¿Estás seguro de eliminar este cliente?`);

  if (confirmDelete) {
    await deleteClient(idClient);
    window.location.reload();
  }
}
