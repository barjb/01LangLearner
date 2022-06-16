console.log('frontend js');

const loc = window.location.pathname;
const crumbs = loc.split('/');

const breadcrumbsElement = document.querySelector('ol.breadcrumb');
// console.log(window.location.pathname);
// console.log(crumbs);
let path = '/';
crumbs.forEach((e, index) => {
  let elem;
  if (e !== '' && index != crumbs.length - 1) {
    path += e;
    elem = `<li class='breadcrumb-item'><a href='${path}'>${e}</a></li>`;
    breadcrumbsElement.innerHTML += elem;
    path += '/';
  }
  if (e !== '' && index === crumbs.length - 1) {
    elem = `<li class='breadcrumb-item active' aria-current='page'>${e} </li>`;
    breadcrumbsElement.innerHTML += elem;
  }
});

// eslint-disable-next-line require-jsdoc
function setOffCanvas() {
  const settingsElements = document.querySelectorAll('a.list-group-item');
  const settings = [...settingsElements].filter(
    (e) => e.href === 'http://localhost:3000/settings',
  )[0];
  const statistics = [...settingsElements].filter(
    (e) => e.href === 'http://localhost:3000/statistics',
  )[0];
  const ranking = [...settingsElements].filter(
    (e) => e.href === 'http://localhost:3000/ranking',
  )[0];

  if (window.location.href === 'http://localhost:3000/settings') {
    settings.classList += ' active';
    settings.setAttribute('aria-current', true);
  }

  if (window.location.href === 'http://localhost:3000/statistics') {
    statistics.classList += ' active';
    statistics.setAttribute('aria-current', true);
  }

  if (window.location.href === 'http://localhost:3000/ranking') {
    ranking.classList += ' active';
    ranking.setAttribute('aria-current', true);
  }
}
setOffCanvas();

const loginButton = document.getElementById('loginButton');
if (loginButton) {
  loginButton.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const body = {
      email,
      password,
    };
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => {
      console.log({response});
      if (response.ok && response.status === 200 && response.url != null) {
        window.location.assign(response.url);
      }
    });
  });
}

const registerButton = document.getElementById('registerButton');
if (registerButton) {
  registerButton.addEventListener('click', () => {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const password2 = document.getElementById('registerPassword2').value;
    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const body = {
      email,
      password,
      password2,
      firstName,
      lastName,
    };
    fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => {
      console.log({response});
      if (response.ok && response.status === 200 && response.url != null) {
        window.location.assign(response.url);
      }
    });
  });
}

const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    console.log('clicked logout');
    fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    }).then((response) => {
      console.log({response});
      if (response.ok && response.status === 200 && response.url != null) {
        window.location.assign(response.url);
      }
    });
  });
}

const testButton = document.getElementById('testButton');
if (testButton) {
  testButton.addEventListener('click', () => {
    console.log();
    const loc = window.location.pathname;
    const crumbs = loc.split('/');
    console.log(crumbs);
    window.location.assign(
      `http://localhost:3000/test/${crumbs[2]}/${crumbs[3]}`,
    );
  });
}
