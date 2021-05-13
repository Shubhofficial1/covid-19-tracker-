import { useState, useEffect } from 'react'
import './App.css'
import List from './components/List'
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

function App() {
  const [data, setData] = useState([])
  const [indiadata, setIndiadata] = useState([])
  const [state, setState] = useState('india')

  useEffect(() => {
    axios.get('https://api.covid19api.com/summary').then((res) => {
      setData(res.data.Countries)
    })
  }, [])

  useEffect(() => {
    axios
      .get(`https://api.covid19api.com/dayone/country/${state}`)
      .then((res) => {
        let today = res.data.length - 1
        setIndiadata(res.data[today])
      })
  }, [state])

  const handleChange = (e) => {
    e.preventDefault()
    setState(e.target.value)
  }

  return (
    <div className='App'>
      <main>
        <div className='mainbody'>
          <div className='section1'>
            <div className='overview'>
              <h1>Affected Areas</h1>
              <FormControl className='formcontrol' variant='outlined'>
                <Select
                  className='select'
                  value={state}
                  onChange={handleChange}
                >
                  {data.map((data) => (
                    <MenuItem key={data.Country} value={data.Country}>
                      {data.Country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className='map'></div>
          </div>
          <div className='section2'>
            <div className='tested'>
              <p>Active</p>

              <h1>{indiadata.Active}</h1>
            </div>
            <div className='confirmed'>
              <p>Confirmed</p>
              <h1>{indiadata.Confirmed}</h1>
            </div>
            <div className='recovery'>
              <p>Recovered</p>
              <h1>{indiadata.Recovered}</h1>
            </div>
            <div className='death'>
              <p>Death</p>
              <h1>{indiadata.Deaths}</h1>
            </div>
          </div>
          <div className='section3'>
            <h1>Global confirmed Cases </h1>
            <div className='table'>
              {data.map((data) => (
                <List data={data} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

/*

 <p>
                Till Now <i className='fas fa-chevron-down icon'></i>
              </p>

import GoogleMapReact from 'google-map-react'

<GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyC6T_BvxoLF13SDfwLLshsspuv5izX7J3c',
                }}
                defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
                defaultZoom={0}
              ></GoogleMapReact>


import { MapContainer, TileLayer } from 'react-leaflet'

  const position = [23.0707, 80.0982]

<MapContainer
                className='map1'
                center={position}
                zoom={5}
                scrollWheelZoom={true}
              >
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
              </MapContainer>

*/
