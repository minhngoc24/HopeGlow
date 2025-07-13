export async function getLatLngFromAddress(address) {
    const apiKey = 'AIzaSyC2Vn4ENdEM--w0MWkQ0N1H1o5bp1ceX9o'
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
  
    return null;
  }