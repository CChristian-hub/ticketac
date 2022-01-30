const messageSuccess = document.getElementById('msg_success');
const msgSuccessBool = document.getElementById('msg_sucess_bool').textContent;

if (msgSuccessBool == false) {
    messageSuccess.style.display = 'none';
} else {
    messageSuccess.textContent = 'Votre compte a bien été crée ! AWESOME '
    setTimeout(() => {
        messageSuccess.style.display = 'none';
    }, 3000)
}