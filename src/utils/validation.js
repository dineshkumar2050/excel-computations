export function validateEmail(mail) {
    // var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(mail)) {
        return (true)
    }
    return false;
}

export function validatePassword(inputtxt) { 
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    if(inputtxt.match(passw)) {
        return true;
    }
    return false;
}

export function checkValidName(name){
    // var nameRegex = /^\S*$/;     // checks for available white spaces
    // var numberRegex = /^([^0-9]*)$/;  // checks for available numbers
    var alphabetsRegex = /^[A-Za-z]+$/;   // checks for available alphabets
    if(alphabetsRegex.test(name)){
        return true
    }
    return false;
}
