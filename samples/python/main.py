import sys
import requests
from datetime import timedelta
from datetime import datetime


def get_city_arg():
    city_fallback = 'manhattan'

    city = (city_fallback if len(sys.argv) < 2 else sys.argv[1]).strip()
    return city if len(city) > 0 else city_fallback


def get_weather_info_of(city):
    res = requests.get(f'https://goweather.herokuapp.com/weather/{city}').json()
    forecast = [dict(day='0', temperature=res['temperature'], wind=res['wind']), *res['forecast']]

    return [
        dict(day=int(forc['day']), temp=forc['temperature'], wind=forc['wind'])
        for forc in forecast
    ]


def get_date(days_to_add=0):
    date = datetime.now()
    if days_to_add > 0:
        date += timedelta(days=days_to_add)

    return date.strftime('%Y-%m-%d')


def main():
    city = get_city_arg()
    print(f'Weather forecast for {city.capitalize()} city\n')

    try:
        forecast = get_weather_info_of(city)
        for weather in forecast:
            print(f' | {get_date(weather["day"])} ~ {weather["temp"]}, {weather["wind"]}')

    except Exception:
        print('Unknown')


if __name__ == '__main__':
    main()
