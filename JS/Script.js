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
  //Datos para cada fila
  Datos.forEach((persona) => {
    tabla.innerHTML += `
    <tr>
      <td>${persona.id}</td>
      <td>${persona.nombre}</td>
      <td>${persona.apellido}</td>
      <td>${persona.edad}</td>
       <td>${persona.correo }</td> <!-- Acceso correcto a campo con espacio -->
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
  modal.showModal();
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




//Proceso para agregar  un nuevo registro
const modal = document.getElementById("modalAgregar");//Cuadro de dialogo
const btnAgregar = document.getElementById("btnAbrirModal");//Boton de abrir modal
const btnCerrar = document.getElementById("btnCerrarModal");//Boton para cerrar

//Cuando la persona le de click se abrira el modal
btnAgregar.addEventListener("click",()=>{
  modal.showModal();
});

//Cuando la persona le de click se abrira el modal
btnCerrar.addEventListener("click",()=>{
  modal.close();
});

//Agregar un nuevo integrante desde el formulari
document.getElementById("frmAgregarIntegrante").addEventListener("submit",async e => {
  e.preventDefault();//Evita que el formulario se envie
  
  //Capturamos los valores del formulario
  const nombre =document.getElementById("nombre").value.trim();
  const apellido =document.getElementById("apellido").value.trim();
  const edad =document.getElementById("edad").value.trim();
  const correo =document.getElementById("email").value.trim();
  //Validacion basico
  if(!nombre || !apellido || !edad || !correo)
  {
    alert("Complete todos los campos");
    return;//Evita que el codigo siga
  }
  //Llamamos a la API para enviarle el usuario
  const respuesta = await fetch(API_URL, {
    method: "POST", 
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({nombre,apellido,edad,correo })
  });
  if(respuesta.ok)
  {
    Swal.fire({
      title: "Se agrego a la persona",
      text: "La persona: " + nombre + " " + apellido +". Fue agregada",
      icon: "success"
    });
    //Limpiar Formulario
    document.getElementById("frmAgregarIntegrante").reset();
    //Cerrar Formulario
    modal.close();
    //Recargar la tabla
    ObtenerMiembros();
  }
  else
  {
    alert("Error al agregar")
  }
});//Fin del formulario

async function EliminarRegistros(ID)
{
  if (confirm("¿Estás seguro de eliminar a la persona con ID: " + id + "?")) {
    /*Recordar usar la pagina que usamos para crear la api para ver los comandos de api*/
    await fetch(`${API_URL}/${id}`, {
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