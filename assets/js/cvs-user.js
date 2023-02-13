
const cvContainer = document.getElementById('products');

const avtUpload = document.getElementById('upload-avt');
let imgCvSrc, itemCV, doc, htmlContent
let idUser = localStorage.idUser;
let cvlistUser = [];

document.getElementById('sample-cv-link').addEventListener('click', () => {
    location.replace('cv.html');
})

document.getElementById('back-home').addEventListener('click', () => {
    location.replace('cv.html')
})

const logOutBtn = document.getElementById('log-out');
logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('idUser');
    localStorage.removeItem('avatar');
    localStorage.removeItem('avtSrc');
    location.replace('sign-up.html');
})

if (idUser) {
    fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/Users/' + idUser)
    .then(res => res.json())
    .then(user => {
        let avatarHTML = `<img src="${user.avatar}"></img>`;
        document.getElementById('avatar-user').innerHTML = avatarHTML;
        document.getElementById('name-user').innerHTML = user.name;
        document.getElementsByClassName('user_name')[0].innerHTML = user.name
        document.getElementById('change-img-avt-web').innerHTML = avatarHTML;
    })
    showAll();
} else {
    location.replace('sign-up.html')
}

let avtUserUpload = document.getElementById('')

function createCv() {
    location.replace('cv.html')
}

function showAll() {
    cvContainer.innerHTML = '';
    fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/cvs')
        .then(res => res.json())
        .then(cvList => {
            let parser = new DOMParser();
            for (let i = 0; i < cvList.length; i++) {
                if (cvList[i].idUser == idUser) {
                    imgCvSrc = cvList[i].imgCvSrc;
                    doc = parser.parseFromString(cvList[i].htmlContent, "text/html");
                    htmlContent = doc.body.innerHTML
                    itemCV = `<li>
                    <div class="product-item">
                        <div class="product-top">
                            <div href="" class="product-thumb">
                                <div class="overlay"></div>
                                <img src=${imgCvSrc} alt="">
                                <nav class="multi_button">
                                    <ul>
                                        <li>
                                            Đặt làm CV chính
                                            <span></span><span></span><span></span><span></span>
                                        </li>
                                        <li>
                                            Đẩy top
                                            <span></span><span></span><span></span><span></span>
                                        </li>
                                        <li>
                                            Chia sẻ
                                            <span></span><span></span><span></span><span></span>
                                        </li>
                                        <li class="download-cv">
                                            <i style="font-size: 12px;"
                                                class="fa-sharp fa-solid fa-download"></i>
                                            Tải xuống
                                            <span></span><span></span><span></span><span></span>
                                        </li>
                                        <li class="delete-cv">
                                            <i style="font-size: 12px;" class="fa-solid fa-trash"></i>
                                            Xóa
                                            <span></span><span></span><span></span><span></span>
                                        </li>
                                        <li class="edit-cv">
                                            <i style="font-size: 12px;" class="fa-solid fa-pen"></i>
                                            Xem và sửa
                                            <span></span><span></span><span></span><span></span>
                                        </li>
                                    </ul>

                                </nav>
                            </div>
                        </div>
                        <div class="join-cv">
                            ${htmlContent}
                        </div>
                    </div>
                </li>`

                    cvContainer.innerHTML += itemCV;
                    cvlistUser.push(cvList[i])
                }
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

            function changeAvtImg(i) {
                avtUpload.addEventListener('change', (event) => {
                    const files = event.target.files;
                    const reader = new FileReader();
                    reader.readAsDataURL(files[0]);
                    reader.addEventListener('load', (event) => {
                        let avtSrc = event.target.result;
                        let imgHTML = `<img src="${avtSrc}"></img>`;
                        changeAvt[i].children[0] = ''
                        changeAvt[i].innerHTML = imgHTML;
                        localStorage.avtSrc = avtSrc;
                    })
                })
            }

            function saveCv(htmlContent, avtSrc, id) {
                fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/cvs/' + id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        htmlContent: htmlContent,
                        avtSrc: avtSrc
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        location.reload()
                    })
            }


            const listCV = document.getElementsByClassName('join-cv');

            const lengthCvList = cvlistUser.length

            const changeFontDropDown = document.getElementsByClassName('change-font');

            const listFonts = document.getElementsByClassName('list-font');

            const choosesFont = document.getElementsByClassName('choose-font');

            const pickColor = document.getElementsByClassName('pick-color');

            const changeAvt = document.getElementsByClassName('change-img-avt');

            const joinCvContainer = document.getElementsByClassName('join-cv');

            const listBgColorRgba = ['rgba(254, 129, 60, .05)', 'rgba(64, 186, 119, .05)', 'rgba(93, 95, 239, .05)', 'rgb(0, 180, 216, .05)'];
            const listBgColorRgb = ['rgb(255, 130, 60)', 'rgb(64, 186, 119)', 'rgb(93, 95, 239)', 'rgb(0, 180, 216)']
            const editCvBtns = document.getElementsByClassName('edit-cv');
            
            const deleteCvBtns = document.getElementsByClassName('delete-cv');

            const listOutCvBtn = document.getElementsByClassName('out-cv-btn');

            const saveCvBtns = document.getElementsByClassName('save-cv-btn');

        

            for (let j = 0; j < lengthCvList; j++) {
                editCvBtns[j].addEventListener('click', () => {
                    joinCvContainer[j].style.display = 'block';
                    changeAvtImg(j);
                    saveCvBtns[j].addEventListener('click', (e) => {
                        e.preventDefault();
                        let htmlContent = joinCvContainer[j].innerHTML;
                        let id = cvlistUser[j].id;
                        let avtSrc = ''
                        if (localStorage.avtSrc) {
                            avtSrc = localStorage.avtSrc;
                            localStorage.removeItem('avtSr')
                        };
                        console.log(avtSrc);
                        saveCv(htmlContent, avtSrc, id)
                    })

                    listOutCvBtn[j].addEventListener('click', () => {
                        location.reload();
                    })

                    changFont(j);
                    changColor(j)
                })

                deleteCvBtns[j].addEventListener('click', (e) => {
                    e.preventDefault();
                    let id = cvlistUser[j].id;
                    fetch('https://6367c77ed1d09a8fa61a5a63.mockapi.io/cvs/' + id, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(cvDelete => location.reload());
                })

                document.getElementsByClassName('download-cv')[j].setAttribute('id', `download-cv${j}`)
                document.getElementsByClassName('profile')[j].setAttribute('id', `profile${j}`)
                let doc = new jsPDF();
                let specialElementHandlers = {
                    'abc': function(element, renderer) {
                      return true;
                     }
                  };
                let margin = {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  };


                  $(`#download-cv${j}`).click(function() {
                    console.log(j)
                    doc.fromHTML($(`#profile${j}`).html(), 15, 15,  {
                        'elementHandlers': specialElementHandlers
                    }, function(a) { console.log(a); }, margin)
    
                    doc.save('cv.pdf');
                })
            }
        })
}
