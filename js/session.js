(function () {
  var TOKEN_KEY = "shanhe_auth_token_v1";
  var USER_KEY = "shanhe_auth_user_v1";
  var API_BASE = window.API_BASE || "http://localhost:8787/api";

  function readJSON(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch (e) {
      return null;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getToken() {
    return localStorage.getItem(TOKEN_KEY) || "";
  }

  function getUser() {
    return readJSON(USER_KEY);
  }

  function setSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    writeJSON(USER_KEY, user);
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  async function request(path, options) {
    options = options || {};
    var headers = Object.assign({ "Content-Type": "application/json" }, options.headers || {});
    var token = getToken();
    if (token) headers.Authorization = "Bearer " + token;

    var response = await fetch(API_BASE + path, Object.assign({}, options, { headers: headers }));
    var data = await response.json().catch(function () { return {}; });
    if (!response.ok) {
      var error = new Error(data.error || "REQUEST_FAILED");
      error.payload = data;
      throw error;
    }
    return data;
  }

  async function login(payload) {
    var data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    setSession(data.token, data.user);
    return data.user;
  }

  async function register(payload) {
    var data = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    setSession(data.token, data.user);
    return data.user;
  }

  async function me() {
    var data = await request("/auth/me");
    writeJSON(USER_KEY, data.user);
    return data.user;
  }

  async function loadPlans() {
    var data = await request("/plans");
    return data.plans || {};
  }

  async function savePlans(plans) {
    return request("/plans", {
      method: "PUT",
      body: JSON.stringify({ plans: plans || {} })
    });
  }

  function ensureSignedIn() {
    if (!getToken()) {
      window.location.href = "auth.html?next=" + encodeURIComponent(window.location.pathname.split("/").pop() || "index.html");
      return false;
    }
    return true;
  }

  function mountUserBadge() {
    var user = getUser();
    if (!user || document.getElementById("sessionBadge")) return;
    var badge = document.createElement("div");
    badge.id = "sessionBadge";
    badge.className = "session-badge";
    badge.innerHTML =
      "<span class='session-name'>" + (user.displayName || user.username) + "</span>" +
      "<button class='session-logout' type='button'>退出</button>";
    badge.querySelector(".session-logout").onclick = function () {
      clearSession();
      window.location.href = "auth.html";
    };
    document.body.appendChild(badge);
  }

  window.Session = {
    apiBase: API_BASE,
    getToken: getToken,
    getUser: getUser,
    setSession: setSession,
    clearSession: clearSession,
    request: request,
    login: login,
    register: register,
    me: me,
    loadPlans: loadPlans,
    savePlans: savePlans,
    ensureSignedIn: ensureSignedIn,
    mountUserBadge: mountUserBadge
  };
})();
