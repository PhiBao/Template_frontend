export const getAuth = () => {
  const auth = window.localStorage.getItem("auth");
  return typeof auth === "string" ? JSON.parse(auth) : {};
};

export const setAuthToken = (dataAuth: any) => {
  window.localStorage.setItem("auth", JSON.stringify(dataAuth.data));
};

export const setEncounterToken = (dataAuth: any) => {
  const auth = window.localStorage.getItem("auth");
  if (typeof auth === "string") {
    let newDataAuth = JSON.parse(auth);
    newDataAuth.encounterID = dataAuth.data.encounterID;
    window.localStorage.setItem("auth", JSON.stringify(newDataAuth));
  }
};

export const removeAuth = () => {
  window.localStorage.removeItem("auth");
};

export const getHeaders = (type: string) => {
  const auth = getAuth();
  if (type === "provider" && auth.providerToken) {
    return {
      Authorization: "Bearer " + auth.providerToken,
    };
  } else if (type === "user" && auth.encounterID) {
    return {
      Authorization: "Bearer " + auth.userToken,
      encounterID: auth.encounterID,
    };
  } else if (type === "user" && auth.userToken) {
    return {
      Authorization: "Bearer " + auth.userToken,
    };
  }
  return {};
};
