const API_URL = 'https://restcountries.eu/rest/v2/';
export default function (searchQuery) {
  return fetch(`${API_URL}name/${searchQuery}`).then(response => {
    const { ok, url, status, statusText } = response;
    if (!ok) {
      throw `${url} status: ${status} ${statusText}`;
    }
    return response.json();
  });
}
