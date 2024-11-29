import { fetchCityByLatLng } from "./api";

export const getCity = (onSuccess: (city: string) => void, onError?: () => void) => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const city = await getCityByLatLng(position.coords.latitude, position.coords.longitude);
    onSuccess(city?.[0]?.name);
  }, onError);
}

const getCityByLatLng = async (lat: number, lng: number) => {
  try {
    const _res = await fetch(fetchCityByLatLng(lat, lng), {
      headers: {
        'Content-type': 'application/json',
      }
    });
    return await _res.json();
  } catch (e) {
    throw new Error('Failed to get location');
  }
}