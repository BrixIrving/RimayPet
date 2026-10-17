import { configurar } from "./configurar.js";

const { controlador, publicador } = configurar();
const respuesta = await controlador.postAlerta({
  cuerpo: { idMascota: "m-1", nombreMascota: "Canela", descripcion: "Perra mestiza, collar rojo", latitud: -13.1588, longitud: -74.2232, radioKm: 3 },
});
console.log("POST /alertas →", respuesta);
console.log("Evento publicado →", publicador.publicados[0]);
console.log("GET /alertas/{id}/estado →", await controlador.getEstado({ parametros: { id: respuesta.cuerpo.id } }));
