
let changeLoginBtns = document.getElementsByClassName('sign-up-btn');
const avtUpload = document.getElementById('upload-avt');
let files;

const reader = new FileReader();
for (let p = 0; p < changeLoginBtns.length; p++) {
    changeLoginBtns[p].addEventListener('click', () => {
        location.replace('sign-up.html');
    })
}

document.getElementById('storage-sv-link').addEventListener('click', () => {
    location.replace('cvs-user.html');
})

const logOutBtn = document.getElementById('log-out-btn');
logOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('idUser');
    location.reload();
})

const showModalChangePwBtn = document.getElementById('show-modal-change-pw');
showModalChangePwBtn.addEventListener('click', () => {
    console.log('ok')
    document.getElementById('over-flay-change-pw').style.display = 'block';
})

document.getElementById('exit-modal-change-pw').addEventListener('click', () => {
    document.getElementById('over-flay-change-pw').style.display = 'none';
})

let oldPwInput = document.getElementById('old-pw');
let newPwInput1 = document.getElementById('new-pw-1');
let newPwInput2 = document.getElementById('new-pw-2');
let changePwBtn = document.getElementById('change-pw-btn');
let messageErrChangePw = document.getElementById('message-error-change-pw');
 

let loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', () => {
    document.getElementById('over-flay-login').style.display = 'block';
})

document.getElementById('exit-modal-login').addEventListener('click', () => {
    document.getElementById('over-flay-login').style.display = 'none';
})


let msessageErrElement = document.getElementById('message-error');
let messageErrEmail = 'email Sai định dạng';
let messageNotUser = 'email hoặc mật khẩu không đúng'
let btnLoginHere = document.getElementById('btn-login-here');
let checkUser;

btnLoginHere.addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.getElementById('InputEmail').value;
    let pw = document.getElementById('InputPassword').value;
    if (!email) {
        msessageErrElement.innerText ="Vui lòng nhập email!"
    }else if (!pw) {
        msessageErrElement.innerText ="Vui lòng nhập mật khẩu"
    }else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        msessageErrElement.innerText = messageErrEmail;
    } else {
        fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/Users')
            .then(res => res.json())
            .then(listUsers => {
                for (let user of listUsers) {
                    if (user.email = email && user.pw == pw) {
                        checkUser = true;
                        localStorage.idUser = user.id;
                        break;
                    } else {
                        checkUser = false
                    }
                }
                if (checkUser) {
                    location.reload();
                } else {
                    msessageErrElement.innerText = messageNotUser;
                }

            })
    }
})


let idUser;
if (localStorage.idUser) {
    idUser = localStorage.idUser;
    fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/Users/' + idUser)
        .then(res => res.json())
        .then(user => {
            if (user.avatar) {
                let avatarHTML = `<img src="${user.avatar}"></img>`;
                document.getElementById('avatar-user').innerHTML = avatarHTML;
                document.getElementById('name-user').innerText = user.name
            }

            changePwBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let oldPw = oldPwInput.value;
                let newPw1 = newPwInput1.value;
                let newPw2 = newPwInput2.value;
                if (!oldPw || !newPw1 || !newPw2) {
                    messageErrChangePw.innerText = 'Vui lòng nhập đầy đủ thông tin!';
                }else if (newPw1 !== newPw2) {
                    messageErrChangePw.innerText = 'Nhập mật khẩu mới 2 lần phải giống nhau!';
                }else if (newPw1.length < 8 || newPw1.length > 16) {
                    messageErrChangePw.innerText = 'Mật khẩu phải từ 8 đến 16 ký tự';
                }else if (oldPw !== user.pw) {
                    messageErrChangePw.innerText = 'Mật khẩu cũ không đúng!';
                }else if (oldPw == newPw1) {
                    messageErrChangePw.innerText = 'Mật khẩu mới phải khác mật khẩu cũ của bạn'
                }else {
                    fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/Users/' + idUser,{
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            pw : newPw1
                        })
                    })
                    .then(res => {
                        location.reload();
                    })
                }
            })
        })
} else {
    idUser = 0;
}

if (idUser) {
    document.getElementById('user-login-nav').style.display = 'flex';
    document.getElementById('not-login-nav').style.display = 'none';
} else {
    document.getElementById('user-login-nav').style.display = 'none';
    document.getElementById('not-login-nav').style.display = 'block';
}

document.getElementById('up-load-avt-user').addEventListener('click', () => {
    avtUpload.addEventListener('change', (e) => {
        e.preventDefault();
        files = e.target.files;
        reader.readAsDataURL(files[0]);
        reader.addEventListener('load', (event) => {
            event.preventDefault();
            avatar = event.target.result;
            fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/Users/' + idUser, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    avatar: avatar
                })
            })
            .then(res => {
                location.reload();
            })
        })
    })
})

    const listBgColorRgba = ['rgba(254, 129, 60, .05)', 'rgba(64, 186, 119, .05)', 'rgba(93, 95, 239, .05)', 'rgb(0, 180, 216, .05)'];
    const listBgColorRgb = ['rgb(255, 130, 60)', 'rgb(64, 186, 119)', 'rgb(93, 95, 239)', 'rgb(0, 180, 216)']

    fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/cvBase')
        .then(res => res.json())
        .then(datas => {
            let parser = new DOMParser();
            let itemCv
            for (let data of datas) {
                itemCv = parser.parseFromString(data.htmlContentBase, "text/html");
                document.getElementById('list-cv').innerHTML += itemCv.body.innerHTML;
            }

            const imgCVs = document.getElementsByClassName('image-cv-img');

            const changeFontDropDown = document.getElementsByClassName('change-font');

            const listFonts = document.getElementsByClassName('list-font');

            const choosesFont = document.getElementsByClassName('choose-font');

            const pickColor = document.getElementsByClassName('pick-color');

            const changeAvt = document.getElementsByClassName('change-img-avt')



            // list btn open and out cv 1,2,3
            const listBtnOpenCv = document.getElementsByClassName('open-cv-btn');
            const listOutCvBtn = document.getElementsByClassName('out-cv-btn');

            let listJoinCV = document.getElementsByClassName('join-cv')

            let listBtnSaveCV = document.getElementsByClassName('save-cv-btn');

            // title cv : mau cv 1,2,3
            let listtitleCV = document.getElementsByClassName('title-cv');

            let listCV = document.getElementsByClassName('join-cv');

            let listColor;



            let lengthListCV = listBtnOpenCv.length;

            function saveCV(nameCV, htmlContent, imgCvSrc) {
                let avtSrc = '';
                if (localStorage.avtSrc) {
                    avtSrc = localStorage.avtSrc;
                    localStorage.removeItem('avtSrc');
                }
                sessionStorage.avtSrc = '';
                fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/cvs', {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nameCV: nameCV,
                        htmlContent: htmlContent,
                        avtSrc: avtSrc,
                        imgCvSrc: imgCvSrc,
                        idUser: idUser
                    })
                }).then(res => {

                    window.location.replace('cvs-user.html')
                });
            }

            function changFont(i) {
                changeFontDropDown[i].addEventListener('click', () => {
                    if (listFonts[i].style.display === 'none' || !listFonts[i].style.display) {
                        listFonts[i].style.display = 'block';
                    } else {
                        listFonts[i].style.display = 'none';
                    }
                    let fontItems = listFonts[i].children;
                    for (let j = 0; j < fontItems.length; j++) {
                        fontItems[j].addEventListener('click', () => {
                            listFonts[i].style.display = 'none';
                            fontItems[j].classList.add('active-choose');
                            let font = fontItems[j].innerText;
                            choosesFont[i].innerText = font;
                            listCV[i].style.fontFamily = font;

                            for (let k = 0; k < fontItems.length; k++) {
                                if (fontItems[k].className === 'active-choose' && (k !== j)) {
                                    fontItems[k].classList.remove('active-choose');
                                }
                            }
                        })
                    }
                })
            }

            function changColor(i) {
                listColor = pickColor[i].children;
                let titlePro = document.getElementsByClassName('profile')[i].getElementsByClassName('title-pro');
                let circleWraperIcon = document.getElementsByClassName('profile')[i].getElementsByClassName('circle-wrapper-icon');
                for (let j = 0; j < listColor.length; j++) {
                    listColor[j].addEventListener('click', () => {
                        if (listColor[j].innerHTML === '') {
                            for (let k = 0; k < listColor.length; k++) {
                                if (listColor[k].innerHTML !== '' && (k !== j)) {
                                    listColor[j].innerHTML = listColor[k].innerHTML;
                                    listColor[k].innerHTML = '';
                                } else {
                                    continue
                                }
                            }
                        }

                        if (document.getElementsByClassName('circle')[i]) {
                            document.getElementsByClassName('circle')[i].style.backgroundColor = listBgColorRgba[j];
                        }

                        if (document.getElementsByClassName('right-pro')[i].style.backgroundColor) {
                            document.getElementsByClassName('right-pro')[i].style.backgroundColor = listBgColorRgba[j];
                        }
                        for (let g = 0; g < titlePro.length; g++) {
                            if (titlePro[g].style.color) {
                                titlePro[g].style.color = listBgColorRgb[j]
                            }
                            if (titlePro[g].style.backgroundColor) {
                                titlePro[g].style.backgroundColor = listBgColorRgb[j]
                            }
                        }
                        for (let l = 0; l < circleWraperIcon.length; l++) {
                            if (circleWraperIcon[l].style.backgroundColor) {
                                circleWraperIcon[l].style.backgroundColor = listBgColorRgb[j];
                            }
                        }
                    })
                }
            }

            function changeAvtImgCv(i) {
                avtUpload.addEventListener('change', (event) => {
                    event.preventDefault();
                    files = event.target.files;
                    reader.readAsDataURL(files[0]);
                    reader.addEventListener('load', (event) => {
                        event.preventDefault()
                        const avtSrc = event.target.result;
                        let imgHTML = `<img src="${avtSrc}"></img>`;
                        changeAvt[i].innerHTML = imgHTML;
                        localStorage.avtSrc = avtSrc;
                    })
                })
            }

            for (let i = 0; i < lengthListCV; i++) {

                // open modal-cv
                listBtnOpenCv[i].addEventListener('click', () => {
                    if (idUser) {
                        listJoinCV[i].style.display = 'block';
                    } else {
                        document.getElementById('no-user').style.display = 'block';
                    }
                    changeAvtImgCv(i);
                    listBtnSaveCV[i].addEventListener('click', (e) => {
                        e.preventDefault
                        let htmlContent = listJoinCV[i].innerHTML;
                        let nameCV = listtitleCV[i].innerText;
                        let imgCvSrc = imgCVs[i].getAttribute('src');
                        saveCV(nameCV, htmlContent, imgCvSrc);
                    })
                    changFont(i);

                    changColor(i);
                });

                // out modal-cv
                listOutCvBtn[i].addEventListener('click', () => {
                    location.reload();
                })

            }

            let exitModalNoUserBtn = document.getElementById('exit-modal-no-user');
            exitModalNoUserBtn.addEventListener('click', () => {
                document.getElementById('no-user').style.display = 'none';
            })

            let changeLoginBtn = document.getElementById('change-login');
            changeLoginBtn.addEventListener('click', () => {
                location.replace('sign-up.html');
            })
        })












