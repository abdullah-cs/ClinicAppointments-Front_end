
const id = localStorage.getItem('id');
const url = 'http://localhost:8080/api/appointments/' + id;

const form = document.querySelector('form');
const name = document.querySelector('#name');
const male = document.querySelector('#male');
const female = document.querySelector('#female');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const date = document.querySelector('#date');
const address = document.querySelector('#address');
const doctor = document.querySelector('#doctor');
const updateButton = document.querySelector('#update');
const deleteButton = document.querySelector('#delete');

const nameError = document.querySelector('.name .error');
const phoneError = document.querySelector('.phone .error');
const addressError = document.querySelector('.address .error');
const dateError = document.querySelector('.date .error');


const map = {
    'Dr.Ahmed': 1,
    'Dr.Nora': 2,
    'Dr.Hassan': 3,
    'Dr.Sara': 4
};

let appointment;

async function getData() {

    await fetch(url)
        .then(response => response.json())
        .then(data => appointment = data);

};

(async function fillFields() {

    await getData();

    name.value = appointment.fullName;
    appointment.gender == 'Male' ? male.checked = true : female.checked = true;
    email.value = appointment.email;
    phone.value = appointment.phoneNumber;
    date.value = appointment.appointmentDate;
    address.value = appointment.address;
    doctor.value = map[appointment.doctor];

})();


async function updateData() {

    return await fetch(url, {
        method: 'put',
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

    let response =  await updateData();

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


async function deleteData() {

    return await fetch(url, {
        method: 'delete',
    });

};

deleteButton.addEventListener('click' , async function (event) {
    
    let response =  await deleteData();

    if (response.ok) {
        window.location.href = "/";
    }
    
});
