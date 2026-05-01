import { CloudRain, Droplets, Thermometer, Wind, Gauge } from 'lucide-react'

// Souřadnice: Zadní Podskalí 773, 375 01 Týn nad Vltavou
const LAT = 49.2234;
const LON = 14.4178;

async function getWeatherData() {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,wind_gusts_10m,pressure_msl&timezone=Europe%2FBerlin`,
      { next: { revalidate: 900 } } // Revalidace každých 15 minut pro větší přesnost
    );
    if (!res.ok) throw new Error('Chyba při načítání počasí');
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function WeatherWidget() {
  const weatherData = await getWeatherData();

  if (!weatherData || !weatherData.current) {
    return null;
  }

  const current = weatherData.current;
  const lastUpdate = new Date(current.time).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl text-white shadow-2xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-sm leading-tight">Aktuální podmínky u vody</h3>
          <p className="text-[10px] text-gray-300">Týn n. Vltavou • V {lastUpdate}</p>
        </div>
        <CloudRain className="w-5 h-5 text-blue-300" />
      </div>

      <div className="flex items-end gap-2 mb-6">
        <span className="text-4xl font-black leading-none">{Math.round(current.temperature_2m)}°C</span>
        <span className="text-[10px] text-gray-300 mb-1 leading-none">Pocitově {Math.round(current.apparent_temperature)}°C</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-2xl">
          <Wind className="w-4 h-4 text-blue-300 shrink-0" />
          <div className="min-w-0">
            <p className="text-[8px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1 truncate">Vítr (náraz)</p>
            <p className="text-xs font-semibold leading-none truncate">{Math.round(current.wind_speed_10m)} ({Math.round(current.wind_gusts_10m)}) km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-2xl">
          <Gauge className="w-4 h-4 text-green-300 shrink-0" />
          <div className="min-w-0">
            <p className="text-[8px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1 truncate">Tlak (MSL)</p>
            <p className="text-xs font-semibold leading-none truncate">{Math.round(current.pressure_msl)} hPa</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-2xl">
          <Droplets className="w-4 h-4 text-blue-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-[8px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1 truncate">Vlhkost</p>
            <p className="text-xs font-semibold leading-none truncate">{current.relative_humidity_2m} %</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-2xl">
          <Thermometer className="w-4 h-4 text-red-300 shrink-0" />
          <div className="min-w-0">
            <p className="text-[8px] uppercase tracking-wider text-gray-400 font-bold leading-none mb-1 truncate">Srážky</p>
            <p className="text-xs font-semibold leading-none truncate">{current.precipitation} mm/h</p>
          </div>
        </div>
      </div>
    </div>
  )
}
