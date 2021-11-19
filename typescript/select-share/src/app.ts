import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = '';

type GoogleGeoCodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
  event.preventDefault();

  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeoCodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}
  `
    )
    .then((res) => {
      console.log(res);
      if (res.data.status !== 'OK') {
        throw new Error('could not fetch location');
      }
      const coords = res.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        }
      );
      const marker = new google.maps.Marker({
        position: coords,
        map: map,
      });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form?.addEventListener('submit', searchAddressHandler);
