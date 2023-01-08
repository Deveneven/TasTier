async function get(url) {
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('TastierToken'),
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

async function remove(url, payload) {
  return await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('TastierToken'),
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(payload),
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
      'Authorization': 'Bearer ' + localStorage.getItem('TastierToken'),
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

async function postImage(url, payload) {
  return await fetch(url, {
    crossDomain: true,
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('TastierToken'),
      'Accept': 'multipart/form-data',
    },
    referrerPolicy: 'no-referrer',
    body: payload,
  }).then(async (response) => {
    console.log(response);
    const resp = {success: true, text: await response.text()}; // zamienic na response.json()
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
  postImage,
  remove,
};
