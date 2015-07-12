import superagent from 'superagent';

function formatUrl(path) {
  return `/api/${path}`;
}

class Client {
  get(...args)   { return this.request('get', ...args); }
  post(...args)  { return this.request('post', ...args); }
  put(...args)   { return this.request('put', ...args); }
  patch(...args) { return this.request('patch', ...args); }
  del(...args)   { return this.request('del', ...args); }

  request(method, path, options) {
    return new Promise((resolve, reject) => {
      let request = superagent[method](formatUrl(path));

      if (options && options.params) {
        request.query(options.params);
      }
      if (options && options.data) {
        request.send(options.data);
      }

      request.end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
    });
  }
}

const client = new Client();
export default client;
