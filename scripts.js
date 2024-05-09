function showForgotPassword () {
  document.querySelector('.login-container').style.display = 'none';
  document.getElementById('resetContainer').style.display = 'block';
}

function showRegister () {
  document.querySelector('.login-container').style.display = 'none';
  document.getElementById('registerContainer').style.display = 'block';
}

function showLogin () {
  document.querySelector('.login-container').style.display = 'block';
  document.getElementById('registerContainer').style.display = 'none';
  document.getElementById('resetContainer').style.display = 'none';
}

async function login (event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      username,
      password
    })
  });

  const data = await response.json();

  if (data.status === 'success') {
    alert(data.message);
    localStorage.setItem('username', username); // Store username in localStorage
    window.location.href = 'home/index.html';
  } else {
    alert(data.message);
  }
}

async function register (event) {
  event.preventDefault();
  const username = document.getElementById('reg_username').value;
  const password = document.getElementById('reg_password').value;

  const response = await fetch('register.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      username,
      password
    })
  });

  const data = await response.json();

  if (data.status === 'success') {
    alert(data.message);
    showLogin();
  } else {
    alert(data.message);
  }
}

async function resetPassword (event) {
  event.preventDefault();
  const username = document.getElementById('reset_username').value;

  const response = await fetch('reset_password.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      username
    })
  });

  const data = await response.json();

  if (data.status === 'success') {
    alert(data.message);
    showLogin();
  } else {
    alert(data.message);
  }
}
