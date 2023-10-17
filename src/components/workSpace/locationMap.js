import { MapContainer, TileLayer, Popup,Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'


 function SpaceMap (props){

    const {name,lat,lng} = props
    console.log(lat,lng)
    const customIcon = new Icon({
        // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        iconUrl: require("../Payment/placeholder.png"),
        iconSize: [38, 38] // size of the icon
      })
    return (
    
            <MapContainer style={{ width: '100%', height: '600px' }} center={[lat,lng]} zoom={15} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[lat,lng]} icon={customIcon}>
      <Popup>
        {name}
      </Popup>
    </Marker>
  </MapContainer>
        
    )
 }

 export default SpaceMap