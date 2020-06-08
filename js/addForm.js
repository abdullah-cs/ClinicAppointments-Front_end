
const url = 'http://localhost:8080/api/appointments';

const form = document.querySelector('form');
const name = document.querySelector('#name');
const male = document.querySelector('#male');
const female = document.querySelector('#female');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const date = document.querySelector('#date');
const address = document.querySelector('#address');
const doctor = document.querySelector('#doctor');
const sendButton = document.querySelector('#send');

const nameError = document.querySelector('.name .error');
const phoneError = document.querySelector('.phone .error');
const addressError = document.querySelector('.address .error');
const dateError = document.querySelector('.date .error');

let appointment = {
    "fullName": "",
    "gender": "",
    "phoneNumber": "",
    "email": "",
    "appointmentDate": "",
    "address": "",
    "doctor": ""
};


async function sendData() {

    return await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)
    });

};

form.onsubmit =  async function (event) {

    event.preventDefault();
    removeErrorMessages()

    appointment.fullName = name.value;
    appointment.gender = (male.checked ? 'Male' : 'Female');
    appointment.email = email.value;
    appointment.phoneNumber = phone.value;
    appointment.appointmentDate = date.value;
    appointment.address = address.value;
    appointment.doctor = doctor.options[doctor.selectedIndex].text;

    let response =  await sendData();

    if (response.ok) {
        window.location.href = "/";
    }
    else{
        let data = await response.json();
        showError(data);
    }
    
}

 function showError(data) {

    
    if (data.fullName) {
        nameError.textContent = data.fullName;
    }

    if (data.phoneNumber) {
        phoneError.textContent = data.phoneNumber;
    }

    if (data.address) {
        addressError.textContent = data.address;
    }

    if (data.appointmentDate) {
        dateError.textContent = data.appointmentDate;
    }
}

function removeErrorMessages() {

    nameError.textContent = '';
    phoneError.textContent = '';
    addressError.textContent = '';
    dateError.textContent = '';
    
}






