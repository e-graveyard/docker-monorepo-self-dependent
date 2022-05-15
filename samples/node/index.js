const axios = require('axios')
const dayjs = require('dayjs')

const capitalize = s => s && s[0].toUpperCase() + s.slice(1)

const getDate = (daysToAdd = 0) => dayjs().add(daysToAdd, 'days').format('YYYY-MM-DD')

function getCityArg() {
    const fallback = 'manhattan'

    const city = (process.argv.length < 3 ? fallback : process.argv[2]).trim()
    return city.length > 0 ? city : fallback
}

async function getWeatherInfoOf(city) {
    const { data } = await axios.get(`https://goweather.herokuapp.com/weather/${city}`)
    const forecast = [{ day: '0', temperature: data.temperature, wind: data.wind }, ...data.forecast]

    return forecast.map((f) => ({ day: parseInt(f.day), temp: f.temperature, wind: f.wind }))
}

async function main() {
    const city = getCityArg()
    console.log(`Weather forecast for ${capitalize(city)} city\n`)

    try {
        const forecast = await getWeatherInfoOf(city)

        for (const weather of forecast) {
            console.log(` | ${getDate(weather.day)} ~ ${weather.temp}, ${weather.wind}`)
        }
    } catch (e) {
        console.log('Unknown')
    }
}

main().catch((e) => console.error(e))
