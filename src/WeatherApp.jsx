import React, { useEffect, useState } from 'react'
import climaIcon from "./assets/icons8-clima-48.png";
import humedadIcon from "./assets/icons8-humedad-30.png";
import temperaturaIcon from "./assets/icons8-temperatura-30.png";

export const WeatherApp = () => {

    const [city, setCity] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchClima = async () => {
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const apiKey = import.meta.env.VITE_API_KEY;
        
        setError('')
        setData(null)

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
        <div className='d-flex justify-content-center align-items-center'>
            <h1 className='my-5 text-center'>WeatherApp</h1>
            <img src={climaIcon} />
        </div> 
        <form className='row mb-5' onSubmit={handleSubmit}>
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
                <div className="d-flex justify-content-center align-items-center" >
                    <div className="row g-0 mx-auto mt-5 p-5" style={{border:'solid 4px white', borderRadius: '25px'}}>
                        <div className="col-md-4">
                        <img
                            src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png `}
                            className="img-fluid rounded-start"
                            alt={data?.weather[0]?.main} />
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{data?.name} {data?.sys?.country}</h5>
                            <br />
                            <p className="card-text">Clima: {data?.weather[0]?.main}</p>
                            <p className="card-text">Descripción: {data?.weather[0]?.description}</p>
                            <p className="card-text">
                                <img src={temperaturaIcon} alt="temperatura"/>
                                {parseInt(data?.main?.temp - 273.15)}°C
                            </p>
                            <p className="card-text">
                                <img src={humedadIcon} alt="humedad" />
                                {data?.main?.humidity}%
                            </p>
                        </div>
                        </div>
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
