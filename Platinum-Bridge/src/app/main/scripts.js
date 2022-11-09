
function funcion1(){
    document.getElementById("vent").style.display="block";
  }

  function funcion2(){
    document.getElementById("vent").style.display="none";
  }


  
  function funcion3(){
    var inputs = document.getElementsByClassName("formulario__input");
    console.log("hola")
    for(var i=0; i<inputs.length; i++) {
      if(this.value.length >= 1) {
        this.nextElementSibling.classList.add('fijar');
        console.log("h1")
      }	else {
        this.nextElementSibling.classList.remove('fijar');
      }
    }
  }

function Function4() {
    var inputs = document.getElementsByClassName('formulario__input');
    for(var i=0; i<inputs.length; i++){
      if(inputs[i].value == ""){
        alert("Complete todos los campos");
        return false;
      }
    }
    alert("Formulario enviado");
    return true;
  }
