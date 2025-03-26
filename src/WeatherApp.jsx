import React, { useState } from 'react'

export const WeatherApp = () => {

    const [city, setCity] = useState('');
    const [data, setData] = useState(null);

    const fetchClima = async () => {
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const apiKey = '72eed03bfe73d92cb0f7bb886eaf2eba'

        try {
            const response = await fetch(`${url}?q=${city}&appid=${apiKey}`);
            const responseJson = await response.json();

            if (!responseJson) throw new Error('Sin respuesta');
            console.log(responseJson);
            setData(responseJson);

        } catch (error) {
            console.error(`${error.name}: ${error.message}`)            
        }
    }

    const handleChangeCity = (e) => {
        setCity(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.length > 0) fetchClima();
    }

  return (
    <div className='container'>
        <h1>WeatherApp</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={city}
                onChange={handleChangeCity}                
            />
            <button type="submit">Buscar</button>
        </form>
    </div>
  )
}
