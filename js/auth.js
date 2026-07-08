(function () {
  var mode = "login";
  var loginTab = document.getElementById("loginTab");
  var registerTab = document.getElementById("registerTab");
  var displayNameField = document.getElementById("displayNameField");
  var displayNameInput = document.getElementById("displayNameInput");
  var usernameInput = document.getElementById("usernameInput");
  var passwordInput = document.getElementById("passwordInput");
  var authSubmit = document.getElementById("authSubmit");
  var authHint = document.getElementById("authHint");

  function syncMode() {
    var isRegister = mode === "register";
    displayNameField.style.display = isRegister ? "block" : "none";
    loginTab.classList.toggle("primary", !isRegister);
    registerTab.classList.toggle("primary", isRegister);
    authSubmit.textContent = isRegister ? "注册并进入" : "登录";
  }

  loginTab.onclick = function () {
    mode = "login";
    syncMode();
  };

  registerTab.onclick = function () {
    mode = "register";
    syncMode();
  };

  document.getElementById("authForm").onsubmit = async function (event) {
    event.preventDefault();
    authHint.textContent = "正在连接山河账号...";
    try {
      if (mode === "register") {
        await window.Session.register({
          username: usernameInput.value.trim(),
          displayName: displayNameInput.value.trim(),
          password: passwordInput.value
        });
      } else {
        await window.Session.login({
          username: usernameInput.value.trim(),
          password: passwordInput.value
        });
      }
      var params = new URLSearchParams(window.location.search);
      window.location.href = params.get("next") || "punch.html";
    } catch (error) {
      authHint.textContent = "操作失败：" + (error.message || "请稍后再试");
    }
  };

  syncMode();
})();
