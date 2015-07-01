function objectToQuery(obj, prefix) {
  let query = [];

  for (let prop of Object.keys(obj)) {
    let val = obj[prop],
        key = prefix ? `${prefix}[${prop}]` : prop;

    if (Array.isArray(val)) {
      for (let v of val) {
        query.push(`${encodeURIComponent(key + '[]')}=${encodeURIComponent(v)}`);
      }
    } else {
      query.push((typeof val === 'object') ?
                objectToQuery(val, key) :
                `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    }
  }

  return query.join('&');
}

export default function ajax(options, callback) {
  if (typeof options === 'string') {
    options = {
      method:  'get',
      url:     options,
      success: callback
    };
  }

  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function(e) {
    if (options.success)
      options.success(JSON.parse(xhr.response), xhr, e);
  });
  xhr.addEventListener('error', function(e) {
    if (options.failure)
      options.failure(xhr, e);
  });
  xhr.addEventListener('abort', function(e) {
    if (options.aborted)
      options.aborted(xhr, e);
  });

  xhr.open(options.method, options.url, true);

  let params = null;
  if (options.method.toLowerCase() != 'get' && options.data) {
    params = objectToQuery(options.data);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }

  xhr.send(params);
}
