//Proceso para mostrar los datos en la tabla(Process to display the data in the table)
let url = "http://www.raydelto.org/agenda.php" // Asigando una variable a la URL y asi poder trabajar de forma mas limpia 
//(Assigning a variable to the URL and thus be able to work more cleanly)
fetch(url)
.then(response => response.json())
.then(data => ShowData(data))
.catch(error => console.log(error))

const ShowData = (data) => {
    console.log(data)
    let body = ''
    for (let i = 0; i<data.length; i++) {
      //Creacion de la tabla con los elementos(Table creation with elements)
        body += `<tr><td>${data[i].nombre}</td><td>${data[i].apellido}</td><td>${data[i].telefono}</td></tr>`
    }
//Aqui llamamos a 'data' para que nos muestre la informacion en la tabla(Here we call 'data' to show us the information in the table)
document.getElementById('data').innerHTML = body

let form = document.getElementById('form').addEventListener('submit', sendData);
    function sendData(e){
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phone').value;

        if(name != '' && lastName != '' && phone != ''){
            let person = {
                nombre:name,
                apellido:lastName,
                telefono:phone
            }
            send(person);
            //Alerta para cuando el usuario deje un campo vacio(Alert for when the user leaves an empty field)
        }else{
            swal('!Hay campos vacios!','Por favor completar todos los campos.','warning');
        }
    }
    
    function send(contact){
        fetch(url , {
            method:'POST',
            body: JSON.stringify(contact),
        }).then( r =>{
          //Alerta de que el contacto se guardo correctamente(Alert that the contact was saved successfully)
            swal('!Felicidades!',"Contacto agregado correctamente", 'success');
            if ('ok' == true) {
              location.reload();
            }else {
            }
        }).catch(e =>{
          //Alerta que notifica el error al guardar el contacto(Alert that notifies the error when saving the contact)
            swal(`Error al guardar conctacto: ${e}`, 'error')
        })
    }
}
/*Funcion que sirve para mostrar la lista de contactos (Function used to show the contact list)*/
function show(){
  document.getElementById('table-date').style.display = 'block';
}
/*Funcion que sirve para ocultar la lista de contactos (Function used to hide the contact list)*/
function hide(){
  document.getElementById('table-date').style.display = 'none';
}

