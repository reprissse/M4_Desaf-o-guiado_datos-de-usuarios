// Función para obtener datos de usuarios aleatorios
async function fetchRandomUsers() {
    try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        if (!response.ok) {
            throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        return data.results; // Devuelve resultados de usuarios
    } catch (error) {
        console.error("Ha ocurrido un error:", error);
        return []; // Devuelve un arreglo vacío en caso de error
    }
}

// Función para crear el contenido HTML de un usuario
function createUserElement(user) {
    const userElement = document.createElement("div");
    userElement.classList.add("user-container");
    userElement.innerHTML = `
        <img src="${user.picture.medium}" alt="Foto de ${user.name.first}">
        <p>Nombre: ${user.name.first} ${user.name.last}</p>
        <p>Correo: ${user.email}</p>
        <p>Teléfono: ${user.phone}</p>
    `;
    return userElement;
}

// Función principal para cargar los usuarios
async function loadUsers() {
    const userDataDiv = document.getElementById("user-data");
    const users = await fetchRandomUsers();
    users.forEach(user => {
        const userElement = createUserElement(user);
        userDataDiv.appendChild(userElement);
    });
}

// Llama a la función principal cuando se carga la página
window.addEventListener("DOMContentLoaded", loadUsers);
