firebase.auth().onAuthStateChanged(user =>{
    if(user){
        window.location.href = "pages/home/home.html";
    }
})
function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}
function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErros();

}
//login
function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
        hideLoading();
        window.location.href = "pages/home/home.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
    
}
//erro login
function getErrorMessage(error) {
    if (error.code === "auth/user/not-found") {
        return "Usuario não encontrado";
    } else if (error.code === "auth/wrong-password") {
        return "Senha Incoreta";
    } else if (error.code === "auth/invalid-login-credentials") {
        return "Usuário ou Senha Incorretas!";
    }
    return error.message;
}
//registrar
function register() {
    window.location.href = "pages/register/register.html";
}
//recuperar senha
function recoverPassword(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() =>{
        hideLoading();
        alert("Email enviado com sucesso");
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}
//verificação email valido
function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}
function togglePasswordErros() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;

    const password = isPasswordValid();
    form.loginButton().disabled = !password || !emailValid;
}

function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;
}

const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPassword: () => document.getElementById("recover-password-button")
}