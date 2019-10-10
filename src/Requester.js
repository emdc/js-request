import {HttpMethod, HttpStatus, Protocol} from './Network';
import Cookies from 'js-cookie';
import {measurePerformance} from './decoratos';
import normalizeUrl from 'normalize-url';
import 'isomorphic-fetch';


const getFormattedURL = (url, query = {}) => {
  const formattedQS = Object.keys(query)
    .filter((key) => query[key] !== null && typeof query[key] !== 'undefined')
    .map((key) => {
      let value = null;

      if (Array.isArray(query[key])) {
        value = query[key].map((item) => encodeURIComponent(item));
      } else {
        value = encodeURIComponent(query[key]);
      }
      return `${encodeURIComponent(key)}=${value}`;
    })
    .join('&');

  if (formattedQS.length) {
    return normalizeUrl(`${url}?${formattedQS}`);
  }

  return normalizeUrl(url);
};

class Requester {
  constructor (
    host = '/',
    protocol = Protocol.HTTPS,
    timeout = 10000,
    useAuthorization = false
  ) {
    this._baseUrl = host;
    this._timeout = timeout;
    this._checkPerformance = false;
    this._checkPerformanceCallback = () => null;

    this._useAuthorization = useAuthorization;
    this._authHeaderName = 'Authorization';

    /* eslint-disable quote-props */
    this._headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8'
    };
    /* eslint-enable quote-props */
  }

  get checkPerformance () {
    return this._checkPerformance;
  }

  set checkPerformance (value) {
    this._checkPerformance = Boolean(value);
  }

  get checkPerformanceCallback () {
    return this._checkPerformanceCallback;
  }

  set checkPerformanceCallback (cb) {
    this._checkPerformanceCallback = cb;
  }

  setHeader (name, value) {
    this._headers[name] = value;
  }

  setAuthorizationHeaderName (name) {
    this._authHeaderName = name;
  }

  getRequestParams (config) {
    const headers = {...this._headers};

    if (this._useAuthorization) {
      const token = Cookies.get('token');

      if (token) {
        headers[this._authHeaderName] = `${token}`;
      }
    }

    if (config.formData) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    const url = normalizeUrl(`${this._baseUrl}/${config.url}`);

    return {
      url: getFormattedURL(url, config.query),
      params: {
        method: config.method,
        body: config.body,
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrer: 'no-referrer',
        headers
      }
    };
  }

  @measurePerformance()
  async request (url, params) { // eslint-disable-line complexity, class-methods-use-this
    const response = await fetch(url, params);

    switch (response.status) {
      case HttpStatus.Forbidden:
      case HttpStatus.Unauthorized:
        window.location.href = '/logout';
        break;
      case HttpStatus.Ok:
        let data = null;

        try {
          data = await response.clone().json();
        } catch (e) {
          data = await response.text();
        }

        return data;
      case HttpStatus.NotFound:
        throw new Error(`Url "${url}" not found. Error code: ${response.status}, ${response.statusText}`);
      default:
        throw new Error(`Can't get data from url "${url}". Error code: ${response.status}, ${response.statusText}`);
    }

    return response.text();
  }

  get (url, query = {}) {
    const {url: resultUrl, params} = this.getRequestParams({
      method: HttpMethod.GET,
      url,
      query
    });

    return this.request(resultUrl, params);
  }

  post (url, body = {}, query = {}) {
    const {url: resultUrl, params} = this.getRequestParams({
      method: HttpMethod.POST,
      url,
      query,
      body: JSON.stringify(body)
    });

    return this.request(resultUrl, params);
  }

  put (url, body = {}, query = {}) {
    const {url: resultUrl, params} = this.getRequestParams({
      method: HttpMethod.PUT,
      url,
      query,
      body: JSON.stringify(body)
    });

    return this.request(resultUrl, params);
  }

  delete (url, query = {}) {
    const {url: resultUrl, params} = this.getRequestParams({
      method: HttpMethod.DELETE,
      url,
      query
    });

    return this.request(resultUrl, params);
  }
}

export default Requester;
