async function get(url) {
  await fetch(url, {
    crossDomain: true,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response;
  });
  return response;
}

async function post(url, payload) {
  const response = await fetch(url, {
    crossDomain: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    console.log(response);
    return {value: response.text( (text) => {
      return text.value;
    }), status: response.status, ok: response.ok};
  });
  return response;
}

export const Api = {
  get,
  post,
};
