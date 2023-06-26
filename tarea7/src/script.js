function obtenerData() {
  return new Promise((bien, mal) => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(response => {
        return response.json();
      })
      .then(data => {
        bien(data);
      })
      .catch(error => {
        mal(error);
      });
  });
}

async function mostrarData() {
  try {
    const data = await obtenerData();
    console.log(data);
    await doData(data); // Esperar a que se completen todas las solicitudes
  } catch (error) {
    console.log("Error:", error);
  }
}

async function obtenerDatosUrl(url) {
  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function doData(data) {
  try {
    for (const element of data.results) {
      const dato = await obtenerDatosUrl(element.url); // Esperar a que se resuelva la promesa
      const article = document.createRange().createContextualFragment(`
        <article>
          <h2>${element.name}</h2>
          <div class="Pokemones">
          <img src="${dato.sprites.front_default}" alt="Pokemon">
          </div>
        </article>
      `);
      const main = document.querySelector("main");
      main.append(article);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

mostrarData();
