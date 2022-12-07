async function get(url) {
  await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then((response) => {
    return JSON.parse(response);
  });
}

async function post(url, payload) {
  return await fetch(url, {
    crossDomain: true,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(payload),
  }).then((response) => {
    return response.text();
  }).then((response) => {
    return JSON.parse(response);
  }).catch((error) => {
    console.log(error);
  });
}

export const Api = {
  get,
  post,
};
