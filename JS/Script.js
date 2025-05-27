//URL de la API - endpoint
const API_URL = "https://retoolapi.dev/NpMxcM/EXPOT"; //Link de la API

//Funcion para llamar a la API y al JSON
async function ObtenerMiembros() {
    //Obtener respuesta del server
    const Res = await fetch(API_URL); //Obtener los datos de la API
    //Conertir al respuesta al formato JSON
    const Data = await Res.json();// Llamamos a nuestro "Res" con el que creamos el JSON
    CrearTabla(Data);
}

//Funcion que creara las filas de la tabla en base a los registros que vienen de la API
function CrearTabla(Datos)
{
    //Datos qe representan al JSON que viene de la API
    //Se le llama "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");
    // para inyectar codigo HTML usamos "innerHTML"
  tabla.innerHTML = ""; // Vaciamos  el contenido de la tabla
  //Datos apra cada fila
  Datos.forEach((persona) => {
    tabla.innerHTML += `
    <tr>
      <td>${persona.id}</td>
      <td>${persona.edad}</td>
      <td>${persona.nombre}</td>
      <td>${persona["correo "]}</td> <!-- Acceso correcto a campo con espacio -->
      <td>${persona.apellido}</td>
      <td>
        <button onclick="editar(${persona.id})">Editar</button>
        <button onclick="eliminar(${persona.id})">Eliminar</button>
      </td>
    </tr>
    `;
  });
}

// Función para editar (a futuro puedes mostrar un formulario para actualizar)
function editar(id) {
  alert("Función para editar a la persona con ID: " + id);
}
// Función para eliminar un registro
function eliminar(id) {
  if (confirm("¿Estás seguro de eliminar a la persona con ID: " + id + "?")) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      alert("Registro eliminado correctamente");
      ObtenerMiembros(); // recargar la tabla
    })
    .catch(error => {
      console.error("Error al eliminar:", error);
    });
  }
}

// Llamamos la función para que cargue los datos apenas se cargue la página
ObtenerMiembros();