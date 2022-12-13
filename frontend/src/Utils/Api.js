async function get(url, jwtToken) {
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwtToken,
    },
  }).then( async (response) => {
    const resp = {success: true, text: JSON.parse( await response.text())};
    if (response.status === 200) {
      return resp;
    }
    throw new Error(resp.text);
  }).then( (response) => {
    return response;
  }).catch( (error) => {
    console.log('jest to error');
    console.log(error.message);
    if (error.message) {
      return {success: false, text: error.message};
    }
    return {success: false, text: 'There is a problem with server connection'};
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
  }).then(async (response) => {
    console.log(response);
    const resp = {success: true, text: JSON.parse( await response.text())};
    if (response.status === 200) {
      return resp;
    }
    throw new Error(resp.text);
  }).then( (response) => {
    console.log(response);
    return response;
  }).catch((error) => {
    console.log('jest to error');
    console.log(error.message);
    if (error.message) {
      return {success: false, text: error.message};
    }
    return {success: false, text: 'There is a problem with server connection'};
  });
}

export const Api = {
  get,
  post,
};
