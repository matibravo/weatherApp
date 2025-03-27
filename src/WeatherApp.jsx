import React, { useEffect, useState } from 'react'

export const WeatherApp = () => {

    const [city, setCity] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchClima = async () => {
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const apiKey = import.meta.env.VITE_API_KEY;
        
        try {
            const response = await fetch(`${url}?q=${city}&appid=${apiKey}`);
            const responseJson = await response.json();

            if (!responseJson) throw new Error('Sin respuesta');
            if (responseJson.cod === '404') throw new Error('Ciudad no encontrada');
            
            setData(responseJson);

        } catch (error) {
            setError(error.message)                  
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
        <h1 className='my-5 text-center'>WeatherApp</h1>
        <form className='row mx-5 mb-5' onSubmit={handleSubmit}>
            <div className="col-6 offset-2">
                <input 
                    className="form-control"
                    type="text"
                    value={city}
                    onChange={handleChangeCity}                
                />            
            </div>
            <div className='col-4'>
                <button className='btn btn-success' type="submit">Buscar</button>
            </div>
        </form>
        {
            data && (
                <div className="card">
                    <img src="https://openweathermap.org/img/wn/10d@2x.png" className="card-img-top img-thumbnail w-50 h-50" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            )
        }
        {
            error && (
                <p>{error}</p>
            )
        }        
    </div>
  )
}
