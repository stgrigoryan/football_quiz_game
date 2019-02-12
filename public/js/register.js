const btnRegister = document.getElementById('register');

btnRegister.addEventListener('click', function(){
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const xhr = new XMLHttpRequest();
        xhr.onload = function () { }; 
        xhr.open('POST', '/register', true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        const obj = {
            username : username,
            password: password,
            confirmPassword: confirmPassword
        };
        const json = JSON.stringify(obj);
        console.log(obj);
        xhr.send(json);
        //return false;

    }, true);