var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/functions/call-api.function.ts
import axios from "axios";

// src/functions/send-api-response.ts
import { AxiosError, HttpStatusCode } from "axios";
function notifyClientOfSuccess(payload = {
  statusCode: HttpStatusCode.Ok,
  message: "Your request was successful",
  data: {}
}) {
  var _a, _b;
  return {
    statusCode: (_a = payload.statusCode) != null ? _a : HttpStatusCode.Ok,
    message: (_b = payload.message) != null ? _b : "Your request was successful",
    data: payload.data
  };
}
function notifyClientOfFailure({
  data = {},
  error
}) {
  var _a, _b, _c, _d, _e;
  if (error instanceof AxiosError) {
    const scxError = (_a = error.response) == null ? void 0 : _a.data;
    return {
      statusCode: (_b = scxError == null ? void 0 : scxError.statusCode) != null ? _b : 500,
      data,
      message: (_c = scxError == null ? void 0 : scxError.message) != null ? _c : "Something went terribly wrong. Please contact support",
      error: scxError
    };
  }
  return {
    statusCode: (_d = error == null ? void 0 : error.statusCode) != null ? _d : 500,
    data,
    message: (_e = error == null ? void 0 : error.message) != null ? _e : "Something went terribly wrong. Please contact support",
    error
  };
}

// src/functions/call-api.function.ts
var ScalexAuthHeaderName = "scalexadminauthorization";
var AuthorizationHeaderName = "Authorization";
function makeHttpRequest(_0) {
  return __async(this, arguments, function* ({
    method,
    url,
    body,
    headers,
    query,
    params
  }) {
    const aggregatedHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "GET,HEAD,PUT,POST,DELETE,PATCH"
    };
    if (headers) {
      if (headers[ScalexAuthHeaderName]) {
        aggregatedHeaders[ScalexAuthHeaderName] = headers[ScalexAuthHeaderName];
      }
      if (headers[AuthorizationHeaderName]) {
        aggregatedHeaders[AuthorizationHeaderName] = headers[AuthorizationHeaderName];
      }
    }
    if (params) {
      params.forEach((p) => {
        url += `/${p}`;
      });
    }
    return axios({
      method,
      url,
      data: body,
      headers: aggregatedHeaders,
      params: query
    });
  });
}
function callApi(requestParams) {
  return __async(this, null, function* () {
    try {
      const response = yield makeHttpRequest({
        method: requestParams.endpoint.method,
        body: requestParams.body,
        query: requestParams.query,
        headers: requestParams.headers,
        params: requestParams.params,
        url: `${requestParams.serviceUri}${requestParams.endpoint.fullPath}`
      });
      return notifyClientOfSuccess(response.data);
    } catch (e) {
      throw notifyClientOfFailure({
        error: e
      });
    }
  });
}
function setBearerToken(token) {
  return {
    Authorization: `Bearer ${token}`
  };
}

// src/types/generic/endpoints.interface.ts
var HttpMethods = /* @__PURE__ */ ((HttpMethods2) => {
  HttpMethods2["Post"] = "POST";
  HttpMethods2["Put"] = "PUT";
  HttpMethods2["Get"] = "GET";
  HttpMethods2["Patch"] = "PATCH";
  HttpMethods2["Delete"] = "DELETE";
  return HttpMethods2;
})(HttpMethods || {});

// src/types/generic/api-response.type.ts
var TokenActions = /* @__PURE__ */ ((TokenActions2) => {
  TokenActions2["Login"] = "login";
  TokenActions2["DataAccess"] = "data-access";
  TokenActions2["SetPassword"] = "set-password";
  TokenActions2["Refresh"] = "refresh";
  TokenActions2["ResetPassword"] = "reset-password";
  return TokenActions2;
})(TokenActions || {});
var TokenExpiry = {
  "set-password": "15m",
  "data-access": "3h",
  refresh: "1d",
  "reset-password": "15m",
  "login": "10m"
};

// src/types/customers/endpoint-payloads/create-account.payloads.ts
var RequestOtpToRegisterEndpoint = {
  method: "POST" /* Post */,
  path: "/otps",
  fullPath: "/customers-auth/otps"
};
var VerifyOtpAndCreatePasswordEndpoint = {
  method: "POST" /* Post */,
  path: "/passwords",
  fullPath: "/customers-auth/passwords"
};
var Initiate2faEndpoint = {
  method: "POST" /* Post */,
  path: "/2fa",
  fullPath: "/customers-auth/2fa"
};
var Verify2faEndpoint = {
  method: "PATCH" /* Patch */,
  path: "/2fa",
  fullPath: "/customers-auth/2fa"
};

// src/types/customers/endpoint-payloads/account-recovery.payloads.ts
var RequestPasswordResetEndpoint = {
  method: "POST" /* Post */,
  path: "",
  fullPath: "/customers-account-recovery"
};
var ResetPasswordEndpoint = {
  method: "PATCH" /* Patch */,
  path: "",
  fullPath: "/customers-account-recovery"
};

// src/types/customers/endpoint-payloads/login.payloads.ts
var RequestOtpForLoginEndpoint = {
  method: "POST" /* Post */,
  path: "/login",
  fullPath: "/customers-auth/login"
};
var VerifyOtpAndPasswordForLoginEndpoint = {
  method: "PATCH" /* Patch */,
  path: "/login",
  fullPath: "/customers-auth/login"
};
var Verify2faForLoginEndpoint = {
  method: "PATCH" /* Patch */,
  path: "/login/2fa",
  fullPath: "/customers-auth/login/2fa"
};

// src/sdks/internal/modules/customers.sdk.ts
var ScalexCustomersSdk = class {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }
  requestOtpToRegister(payload) {
    return __async(this, null, function* () {
      return callApi({
        serviceUri: this.apiUrl,
        endpoint: RequestOtpToRegisterEndpoint,
        body: payload
      });
    });
  }
  verifyOtpAndCreatePassword(payload, authToken) {
    return __async(this, null, function* () {
      return callApi({
        serviceUri: this.apiUrl,
        endpoint: VerifyOtpAndCreatePasswordEndpoint,
        body: payload,
        headers: __spreadValues({}, setBearerToken(authToken))
      });
    });
  }
  initiate2faRegistration(authToken) {
    return __async(this, null, function* () {
      return callApi({
        serviceUri: this.apiUrl,
        endpoint: Initiate2faEndpoint,
        headers: __spreadValues({}, setBearerToken(authToken))
      });
    });
  }
  verify2faToken(payload, authToken) {
    return __async(this, null, function* () {
      return callApi({
        serviceUri: this.apiUrl,
        endpoint: Verify2faEndpoint,
        body: payload,
        headers: __spreadValues({}, setBearerToken(authToken))
      });
    });
  }
  requestPasswordReset(payload) {
    return __async(this, null, function* () {
      return callApi({
        serviceUri: this.apiUrl,
        endpoint: RequestPasswordResetEndpoint,
        body: payload
      });
    });
  }
  resetPassword(payload, authToken) {
    return __async(this, null, function* () {
      return callApi({
        serviceUri: this.apiUrl,
        endpoint: ResetPasswordEndpoint,
        body: payload,
        headers: __spreadValues({}, setBearerToken(authToken))
      });
    });
  }
  requestOtpToLogin(payload) {
    return __async(this, null, function* () {
      return callApi({
        serviceUri: this.apiUrl,
        endpoint: RequestOtpForLoginEndpoint,
        body: payload
      });
    });
  }
  verifyOtpAndPasswordForLogin(payload, authToken) {
    return __async(this, null, function* () {
      return callApi({
        serviceUri: this.apiUrl,
        endpoint: VerifyOtpAndPasswordForLoginEndpoint,
        body: payload,
        headers: __spreadValues({}, setBearerToken(authToken))
      });
    });
  }
  verify2faForLogin(payload, authToken) {
    return __async(this, null, function* () {
      return callApi({
        serviceUri: this.apiUrl,
        endpoint: Verify2faForLoginEndpoint,
        body: payload,
        headers: __spreadValues({}, setBearerToken(authToken))
      });
    });
  }
};

// src/sdks/internal/internal.sdk.ts
var ScalexInternalEnvironments = /* @__PURE__ */ ((ScalexInternalEnvironments2) => {
  ScalexInternalEnvironments2["local"] = "local";
  ScalexInternalEnvironments2["dev"] = "dev";
  ScalexInternalEnvironments2["prod"] = "prod";
  return ScalexInternalEnvironments2;
})(ScalexInternalEnvironments || {});
var ScalexInternalApiVersions = /* @__PURE__ */ ((ScalexInternalApiVersions2) => {
  ScalexInternalApiVersions2["v1"] = "/v1";
  return ScalexInternalApiVersions2;
})(ScalexInternalApiVersions || {});
var InternalEnvironmentUrls = {
  local: "http://localhost:8500",
  dev: "https://scalex-api-gateway-dev.up.railway.app",
  prod: "https://scalex-api.up.railway.app"
};
var ScalexInternalAPI = class {
  constructor(environment = "dev" /* dev */, version = "/v1" /* v1 */) {
    this.apiUrl = InternalEnvironmentUrls[environment] + version;
    this.customers = new ScalexCustomersSdk(this.apiUrl);
  }
};
export {
  HttpMethods,
  Initiate2faEndpoint,
  RequestOtpForLoginEndpoint,
  RequestOtpToRegisterEndpoint,
  RequestPasswordResetEndpoint,
  ResetPasswordEndpoint,
  ScalexInternalAPI,
  ScalexInternalApiVersions,
  ScalexInternalEnvironments,
  TokenActions,
  TokenExpiry,
  Verify2faEndpoint,
  Verify2faForLoginEndpoint,
  VerifyOtpAndCreatePasswordEndpoint,
  VerifyOtpAndPasswordForLoginEndpoint
};
//# sourceMappingURL=index.js.map