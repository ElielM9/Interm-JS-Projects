/* Importaciones */
import { dataBase } from "../utils/variables.js";

// Crear la base de datos
export function createDataBase() {
  // Abrir la base de datos con IndexedDB. Si no existe, se crea con la versión 1.
  const requestDb = window.indexedDB.open(`crm`, 1);

  requestDb.onerror = function () {
    console.error(`Error al crear la base de datos`);
  };

  requestDb.onsuccess = function () {
    dataBase.value = requestDb.result;
    console.log(`Base de datos creada correctamente`);
  };

  requestDb.onupgradeneeded = function (e) {
    const db = e.target.result;

    const objectStore = db.createObjectStore(`crm`, {
      keyPath: `id`,
      autoIncrement: true,
    });

    // Crear las tablas si no existen
    objectStore.createIndex(`name`, `name`, { unique: false });
    objectStore.createIndex(`email`, `email`, { unique: true });
    objectStore.createIndex(`phone`, `phone`, { unique: false });
    objectStore.createIndex(`company`, `company`, { unique: false });
    objectStore.createIndex(`id`, `id`, { unique: true });

    console.log(`Tablas creadas correctamente`);
  };
}

// Conectar la base de datos
export function connectDb() {
  const openConnection = window.indexedDB.open(`crm`, 1);

  openConnection.onerror = function () {
    console.error(`Error al conectar con la base de datos`);
  };

  openConnection.onsuccess = function () {
    dataBase.value = openConnection.result;
  };
}
