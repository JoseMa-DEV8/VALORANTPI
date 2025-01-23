    //CONEXION CON LA API ENLACE.
    const API_BASE_URL = "https://valorant-api.com/v1";

    //FUNCION QUE SOLICITA A LA API Y DEVUELVE.
    async function datosApi(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Error al consultar la API: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener datos de la API:", error);
    }}
    
    // FUNCION QUE RECIBE ELEMENTOS, VACIA EL PRINCIPAL Y GENERA LA TARJETA.
    function displayresultados(items) {
        const gridContainer = document.getElementById("grid-container");
        gridContainer.innerHTML = "";
        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <div class="item-nombre">${item.nombre}</div>
                        <img src="${item.imagen || 'https://via.placeholder.com/200'}" alt="${item.nombre}">
                    </div>
                    <div class="card-back">
                        <h3>${item.nombre}</h3>
                        <p>${item.description || ''}</p>
                    </div>
                </div>`;
            gridContainer.appendChild(card);
        });}

    //FUNCION QUE SOLICITA A LA API LA INFORMACION DE ARMAS
    async function getArmas() {
        const data = await datosApi("weapons");
        if (data && data.data) {
            const Lista_armas = data.data.map(weapon => ({
                nombre: weapon.displayName,
                imagen: weapon.displayIcon,
                description: `Categoría: ${weapon.category}`
            }));
            displayresultados(Lista_armas);
        }}

    //FUNCION QUE SOLICITA A LA API LA INFORMACION DE AGENTES
    async function getAgentes() {
        const data = await datosApi("agents");
        if (data && data.data) {
            const Lista_agentes = data.data.map(agent => ({
                nombre: agent.displayName,
                imagen: agent.displayIcon,
                description: `Rol: ${agent.role?.displayName || "Desconocido"}`
            }));
            displayresultados(Lista_agentes);
    }}

    //FUNCION QUE SOLICITA A LA API LA INFORMACION DE MAPAS
    async function getMapas() {
        const data = await datosApi("maps");
        if (data && data.data) {
            const Lista_mapas = data.data.map(map => ({
                nombre: map.displayName,
                imagen: map.splash,
                description: `Coordenadas: ${map.coordinates || "N/A"}`
            }));
            displayresultados(Lista_mapas);
    }}
    
    //FUNCION QUE SOLICITA A LA API LA INFORMACION DE MODOS DE JUEGO
    async function getGameModes() {
        const data = await datosApi("gamemodes");
        if (data && data.data) {
            const Lista_modos = data.data.map(mode => ({
                nombre: mode.displayName,
                imagen: mode.displayIcon,
                description: mode.duration ? `Duración: ${mode.duration}` : ""
            }));
            displayresultados(Lista_modos);
    }}

    //FUNCION QUE SOLICITA A LA API LA INFORMACION DE SEASONS
    async function getSeasons() {
        const data = await datosApi("seasons");
        if (data && data.data) {
            const seasonsList = data.data.map(season => ({
                nombre: season.displayName,
                imagen: season.displayIcon,
                description: `Fecha de inicio: ${season.startTime || "N/A"}`
            }));
            displayresultados(seasonsList);
    }}

    //FUNCION QUE SOLICITA A LA API LA INFORMACION DE BUDDIES
    async function getBuddies() {
        const data = await datosApi("buddies");
        if (data && data.data) {
            const buddiesList = data.data.map(buddy => ({
                nombre: buddy.displayName,
                imagen: buddy.displayIcon,
                description: buddy.description || ""
            }));
            displayresultados(buddiesList);
    }}

    //RECUPERAMOS CON EL DOM, LE AÑADIMOS UN EVENTO CLICK
    document.getElementById("fetch-armas").addEventListener("click",(event) =>{
        event.preventDefault();
        getArmas();});

    document.getElementById("fetch-agentes").addEventListener("click",(event) =>{
        event.preventDefault();
        getAgentes();});

    document.getElementById("fetch-mapas").addEventListener("click",(event) =>{
        event.preventDefault();
        getMapas();});

    document.getElementById("fetch-modos").addEventListener("click",(event) =>{
        event.preventDefault();
        getGameModes();});

    document.getElementById("fetch-temporada").addEventListener("click",(event) =>{
        event.preventDefault();
        getSeasons();});

    document.getElementById("fetch-buddies").addEventListener("click",(event) =>{
        event.preventDefault();
        getBuddies();});
