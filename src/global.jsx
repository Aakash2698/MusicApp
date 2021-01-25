import React from "react";
import moment from "moment";
const LoaderContext = React.createContext();

export default {
  config: {
    apiUrl: "https://music-player-app26.herokuapp.com/",
    // baseUrl: "http://localhost:3001/",
    apiKey: "AIzaSyA2JN9arUrX7EIMhW4WxzLoRHNFDXFtuHo",
  },

  errors: {
    error400: "Technical error!",
  },

  getToken: () => {
    return localStorage.getItem("authToken");
  },

  check_Auth: (props) => {
    let authToken = localStorage.getItem("authToken");
    if (authToken === null && props.location.pathname === "/login") {
      props.push("/login");
    } else {
      if (props.location.pathname === "/login") {
        props.goBack();
      }
    }
  },

  toCapitalize: (string) => {
    if (!string) {
      return string;
    }
    let strArray = string.split(" ");
    let newString = "";
    strArray.map((s) => {
      var word =
        s && s && s[0].toUpperCase() + s.substring(1, s.length).toLowerCase();
      if (strArray.length > 1) {
        newString += word + " ";
      } else {
        newString += word;
      }
      return null;
    });

    return newString;
  },

  LoaderContext: LoaderContext,
  timeZoneList: () => {
    let timezoneList = [];
    let timezones = moment.tz.names();
    timezones.length > 0 &&
      timezones.map((timezone) => {
        let offSet = moment().tz(timezone).format("Z");
        timezoneList = [
          ...timezoneList,
          {
            name: "(GMT " + offSet + ") " + timezone,
            value: timezone,
          },
        ];
        return timezoneList;
      });
    return timezoneList;
  },

  formatDateAndTime: (dateTime, timeZone) => {
    moment.tz.setDefault(timeZone);
    let time = dateTime.time.format("HH:mm");
    let formattedDateTime = moment(
      dateTime.date + " " + time,
      "MM/DD/YYYY HH:mm"
    ).format("YYYY-MM-DDTHH:mm:ss");
    let utc = moment(formattedDateTime).utc().format();
    return utc;
  },

  checkForTime: (fromTime, toTime) => {
    if (toTime.hour() >= fromTime.hour()) {
      if (
        toTime.hour() === fromTime.hour() &&
        toTime.minute() <= fromTime.minute()
      ) {
        // Incorrect time
        return true;
      } else {
        return false;
      }
    } else {
      // Incorrect time
      return true;
    }
  },
  positionArray: [
    { id: 0, name: "President" },
    { id: 1, name: "Treasurer" },
  ],
};
