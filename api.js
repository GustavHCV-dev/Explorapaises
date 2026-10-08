const API_PAISES = 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json';

const REGIONES = {
  Africa: 'África',
  Americas: 'América',
  Asia: 'Asia',
  Europe: 'Europa',
  Oceania: 'Oceanía',
  Antarctic: 'Antártida',
};

export async function obtenerPaises() {
  const respuesta = await fetch(API_PAISES);
  if (!respuesta.ok) throw new Error('Error al consultar la API');
  const datos = await respuesta.json();

  return datos
    .map((pais) => ({
      codigo: pais.cca3,
      nombre: pais.translations.spa.common,
      oficial: pais.translations.spa.official,
      capital: pais.capital.join(', ') || 'Sin capital',
      region: REGIONES[pais.region] ?? pais.region,
      area: pais.area,
      idiomas: Object.values(pais.languages ?? {}).join(', ') || 'No disponible',
      bandera: `https://flagcdn.com/w320/${pais.cca2.toLowerCase()}.png`,
    }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
}
