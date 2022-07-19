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
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    return JSON.parse(response);
  });
}

export const Api = {
  get,
  post,
};
