
const url = 'http://localhost:8080/api/appointments';


const table = document.querySelector('.table');

const row = document.querySelector('.row:nth-child(2)');

row.parentNode.removeChild(row);

let appointments;


async function getData() {
     
    await fetch( url)
  .then(response => response.json())
  .then(data => appointments = data);

};

(async function fillTable() {
    
    await getData();

    appointments.forEach(appointment => {

        let clone = row.cloneNode(true);
        clone.id = appointment.id;
        let children = clone.children;
        children[0].textContent = appointment.fullName;
        children[1].textContent = appointment.phoneNumber;
        children[2].textContent = appointment.appointmentDate;
        children[3].textContent = appointment.doctor;
        table.appendChild(clone);     
    });
})();

table.addEventListener('click', function (event) {

    let row = event.target.parentNode;
    if(!row.classList.contains('header')){
        console.log(row);
        localStorage.setItem('id',row.id);
        window.location.href = "/appointment.html";
    }
    

  });










