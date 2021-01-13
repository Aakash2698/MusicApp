import global from "../global";
// import { Base64 } from 'js-base64';
import store from "../configStore";
// import history from '../history';
import { logoutSuccess } from "../Actions";

const globalUrl = global.config.apiUrl;

export default {
  post: (url, data, headerData, version) => {
    let header =
      headerData === "header"
        ? {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        : {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: global.getToken(),
            },
            body: JSON.stringify(data),
          };
    let apiUrl = globalUrl + url;
    return fetch(apiUrl, header)
      .then((response) => {
        // if (response.ok) {
        return response
          .json()
          .then((json) => {
            if (response.status === 401) {
              // localStorage.clear();
              // history.push("/login");
              store.dispatch(logoutSuccess());
            }
            return Promise.resolve({
              responseData: json,
              response: response,
            });
          })
          .catch((err) => {
            return Promise.resolve({
              response: response,
            });
          });
      })
      .catch((err) => {
        throw err;
      });
  },
  postForm: (url, data, headerData, version) => {
    let header =
      headerData === "header"
        ? {
            method: "POST",
            body: data,
            headers: {
              "Content-Type": "application/json",
            },
          }
        : {
            method: "POST",
            headers: {
              Accept: "application/json",
              authorization: global.getToken(),
            },
            body: data,
          };

    let apiUrl = globalUrl + url;
    return fetch(apiUrl, header)
      .then((response) => {
        // if (response.ok) {
        return response
          .json()
          .then((json) => {
            if (response.status === 401) {
              // localStorage.clear();
              // history.push("/login");
              store.dispatch(logoutSuccess());
            }
            return Promise.resolve({
              responseData: json,
              response: response,
            });
          })
          .catch((err) => {
            return Promise.resolve({
              response: response,
            });
          });
      })
      .catch((err) => {
        throw err;
      });
  },
  postWithBasicAuth: (url, data, headerData) => {
    let header = {
      method: "POST",
      headers: {
        // 'Authorization': "Basic " + Base64.encode("UniversityBuddy:UniversityBuddy")
        Authorization: "Basic " + btoa("UniversityBuddy:UniversityBuddy"),
      },
      body: JSON.stringify(data),
    };
    return fetch(globalUrl + url, header)
      .then((response) => {
        // if (response.ok) {
        return response
          .json()
          .then((json) => {
            if (response.status === 401) {
              // localStorage.clear();
              // history.push("/login");
              store.dispatch(logoutSuccess());
            }
            return Promise.resolve({
              responseData: json,
              response: response,
            });
          })
          .catch((err) => {
            return Promise.resolve({
              response: response,
            });
          });
      })
      .catch((err) => {
        throw err;
      });
  },
  put: (url, data, basicAuth) => {
    // let token = "Basic " + Base64.encode("UniversityBuddy:UniversityBuddy")
    let token = "Basic " + btoa("UniversityBuddy:UniversityBuddy");
    let header = data
      ? {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              basicAuth && basicAuth.basicAuth ? token : global.getToken(),
          },
          body: JSON.stringify(data),
        }
      : {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              basicAuth && basicAuth.basicAuth ? token : global.getToken(),
          },
        };
    return fetch(globalUrl + url, header)
      .then((response) => {
        return response
          .json()
          .then((json) => {
            if (response.status === 401) {
              // localStorage.clear();
              // history.push("/login");
              store.dispatch(logoutSuccess());
            }
            return Promise.resolve({
              responseData: json,
              response: response,
            });
          })
          .catch((err) => {
            return Promise.resolve({
              response: response,
            });
          });
      })
      .catch((err) => {
        throw err;
      });
  },

  get: (url, version) => {
    // let header =
    //   noHeader && noHeader.noHeader
    //     ? {
    //         method: "GET",
    //       }
    //     : {
    //         method: "GET",
    //         headers: {
    //           Authorization: global.getToken(),
    //           "Content-Type": "audio/mpeg",
    //         },
    //       };
    let apiUrl = globalUrl + url;
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: global.getToken(),
        "Content-Type": "audio/mpeg",
      },
    })
      .then((response) => {
        // if (response.ok) {
        return response
          .json()
          .then((json) => {
            if (response.status === 401) {
              // localStorage.clear();
              // history.push("/login");
              store.dispatch(logoutSuccess());
            }
            return Promise.resolve({
              responseData: json,
              response: response,
            });
          })
          .catch((err) => {
            return Promise.resolve({
              response: response,
            });
          });
      })
      .catch((err) => {
        throw err;
      });
  },

  getWithBasicHeader: (url) => {
    let token = "Basic " + btoa("UniversityBuddy:UniversityBuddy");
    return fetch(globalUrl + url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        // if (response.ok) {
        return response
          .json()
          .then((json) => {
            if (response.status === 401) {
              // localStorage.clear();
              // history.push("/login");
              store.dispatch(logoutSuccess());
            }
            return Promise.resolve({
              responseData: json,
              response: response,
            });
          })
          .catch((err) => {
            return Promise.resolve({
              response: response,
            });
          });
      })
      .catch((err) => {
        throw err;
      });
  },

  delete: (url, data) => {
    return fetch(globalUrl + url, {
      method: "DELETE",
      headers: {
        Authorization: global.getToken(),
      },
      ...(data ? { body: data } : ""),
    })
      .then((response) => {
        return response.json().then((json) => {
          if (response.status === 401) {
            // localStorage.clear();
            // history.push("/login");
            store.dispatch(logoutSuccess());
          }
          return Promise.resolve({
            responseData: json,
            response: response,
          });
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  patch: (url, data) => {
    // let header = data ? {
    let header = {
      method: "PATCH",
      headers: {
        Authorization: global.getToken(),
      },
      ...(data && { body: JSON.stringify(data) }),
    };
    // : {
    //         method: 'PATCH',
    //         headers: {
    //             'Authorization': global.getToken()
    //         },
    //     };
    return fetch(globalUrl + url, header)
      .then((response) => {
        return response.json().then((json) => {
          if (response.status === 401) {
            // localStorage.clear();
            // history.push("/login");
            store.dispatch(logoutSuccess());
          }
          return Promise.resolve({
            responseData: json,
            response: response,
          });
        });
      })
      .catch((err) => {
        throw err;
      });
  },
};
