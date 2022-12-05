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
  const response = await fetch(url, {
    crossDomain: true,
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(payload),
  }).then((response) => {
    console.log(JSON.stringify(payload));
    return response;
  });
  return response;
}

export const Api = {
  get,
  post,
};
