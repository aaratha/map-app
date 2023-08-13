var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyYXRoYSIsImEiOiJjbGw5eWZ6anExaDJtM2VtenpuZHJ1c2FuIn0.TOfFT2m_2oDuHFgjEFYiYg';
var map = new mapboxgl.Map({
    container: 'YOUR_CONTAINER_ELEMENT_ID',
    style: 'mapbox://styles/mapbox/streets-v11'
});


