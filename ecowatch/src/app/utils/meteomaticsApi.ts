export type MeteomaticsData = any;

export async function fetchMeteomaticsData(lat: number, lng: number): Promise<MeteomaticsData | null> {
  // Parâmetros relevantes para o agronegócio
  const dateStart = '2025-10-04T00:00:00Z';
  const dateEnd = '2025-10-07T00:00:00Z';
  const interval = 'PT1H';
  const parameters = [
    't_2m:C', // Temperatura do ar a 2m
    'precip_1h:mm', // Precipitação acumulada na última hora
    'rel_hum_2m:p', // Umidade relativa do ar
    'wind_speed_10m:ms', // Velocidade do vento a 10m
    'soil_temp_0cm:C', // Temperatura do solo na superfície
    'soil_moisture_0_10cm:kgm2', // Umidade do solo (0–10cm)
    'evapotranspiration_24h:mm', // Evapotranspiração acumulada 24h
    'uv_index:idx', // Índice ultravioleta
    'global_rad:W/m2', // Radiação solar global
    'heat_index:C', // Índice de calor
    'windchill:C', // Sensação térmica pelo vento
  ].join(',');
  const url = `https://api.meteomatics.com/${dateStart}--${dateEnd}:${interval}/${parameters}/${lat},${lng}/json`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Basic ' + btoa('jnior_jos:M4PGX0wo8751BiXXBxlo'),
      },
    });
    if (!response.ok) throw new Error('Erro na requisição Meteomatics');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados da Meteomatics:', error);
    return null;
  }
}
