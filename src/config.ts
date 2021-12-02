let API_URL = "https://augustasandbox.reliantid.com";
const API_KEY = "LFjnml9DSY6bdUdeQy7xo8V6ks9OjoDn25NYikkQ";

if (process.env.NODE_ENV === "production") {
  API_URL = "https://augustasandbox.reliantid.com";
}

export { API_URL, API_KEY };
