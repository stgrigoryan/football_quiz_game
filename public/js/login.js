let btnSignUp = document.getElementById('signup');

btnSignUp.onclick = function () {
    console.log('Clicked');
    window.location.assign('/register');
};

const btnLogin = document.getElementById('login');

btnLogin.addEventListener('click', function(){
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const xhr = new XMLHttpRequest();
        xhr.onload = function () { }; 
        xhr.open('POST', '/login', true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        const obj = {
            username : username,
            password: password
        };
        const json = JSON.stringify(obj);
        console.log(obj);
        xhr.send(json);
        //return false;

    }, true);