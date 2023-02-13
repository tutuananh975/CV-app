const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function () {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})


let formLogin = document.getElementById('form-login')
let inputPasswordLogin = document.getElementById('login-password')
let inputEmailLogin = document.getElementById('login-email')
let btnLogin = document.getElementById('btn-login');
let btnSignup = document.getElementById('btn-signup');
let checkUserLogin = false;
let checkuserSignup = false;
let signupEmail = document.getElementById('signup-email').value
let signupPassword = document.getElementById('signup-password').value
let signupUsername = document.getElementById('signup-username').value


function login(listUsers) {
	btnLogin.addEventListener('click', (e) => {
		e.preventDefault();
		let emailLogin = inputEmailLogin.value
		let passwordLogin = inputPasswordLogin.value;

		let idUser;
		let avatar;

		if (emailLogin === "") {
			document.getElementById("error").innerHTML = "Vui lòng nhập email!"
		}
		else if (passwordLogin === "") {
			document.getElementById("error").innerHTML = "Vui lòng nhập mật khẩu!"
		}
		else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailLogin)) {
			document.getElementById("error").innerHTML = "Email không đúng định dạng!"
		} else {
			for (let i = 0; i < listUsers.length; i++) {
				if (listUsers[i].email == emailLogin && listUsers[i].pw == passwordLogin) {
					checkUserLogin = true;
					idUser = listUsers[i].id;
					avatar = listUsers[i].avatar;
					break;
				} else {
					checkUserLogin = false
				}
			}

			if (checkUserLogin) {
				localStorage.idUser = idUser;
				localStorage.avatar = avatar;
				location.replace('cv.html')
			}else {
				document.getElementById("error").innerHTML = 'Sai email hoặc mật khẩu!'
			}

		}

	})
}


fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/Users')
	.then(res => res.json())
	.then(listUsers => {
		login(listUsers);

		btnSignup.addEventListener('click', (e) => {
			e.preventDefault();
			let signupEmail = document.getElementById('signup-email').value
			let signupPassword = document.getElementById('signup-password').value
			let signupUsername = document.getElementById('signup-username').value
			// console.log(preventDefault);


			if (!signupUsername) {
				document.getElementById("error1").innerHTML = 'Vui lòng nhập username!'
			}
			else if (!signupEmail) {
				document.getElementById("error1").innerHTML = 'Vui lòng nhập email!'
			}
			else if (!signupPassword) {
				document.getElementById("error1").innerHTML = 'Vui lòng nhập password!'
			}
			else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signupEmail)) {
				document.getElementById("error1").innerHTML = 'Email không đúng định dạng!'
			}
			else if (signupPassword.length < 8 || signupPassword.length > 16) {
				document.getElementById("error1").innerHTML = 'Mật khẩu phải nhiều hơn 8 và ít hơn 16 kí tự!'
			}
			else {
				for (let user of listUsers) {
					if (signupEmail == user.email) {
						checkuserSignup = false;
						break;
					} else {
						checkuserSignup = true;
					}
				}
				if (checkuserSignup) {
					fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/Users', {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json"
						},

						body: JSON.stringify({
							email: signupEmail,
							pw: signupPassword,
							name: signupUsername
						})
					}).then(res => res.json())
						.then(data => location.reload());
				}
				else {
					document.getElementById("error1").innerHTML = "Email đã tồn tại!";
				}
			}

		})

	})



