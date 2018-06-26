///ALERT UNSAVED CHANGES///
$(document).ready(function (){

  var pth = window.location.pathname; 
  var unsaved = false;//FALSE no pide confirmación para cerrar
  var changeData = localStorage.getItem('changeData');
  console.log('CHANGEDATA alert-changes INIT: ' + changeData);

  //Anula el efecto en el login
  $('.noSave').click(function() {
    unsaved = false;
  });

  //Anula el efecto en vistas sin save
  if(pth.match("/"||"/list_EE/"||"list")){
    window.onbeforeunload = function () {
      unsaved = false;
    };
  }

  //True en vistas con save
  if(pth.match("horari-diari") || pth.match("horari-config") || pth.match("horari-area")){
    window.onbeforeunload = function () {
      $(document).on('change', ':input', function(){ 
      //triggers change in all input fields including text type -- console.log('Horari SI save');
        unsaved = true;
      });
    };
  }

  // Monitor dynamic inputs
  $(document).on('change', ':input', function(){
    $('#loginModal').on('shown', function () {
    console.log('LOGIN-MODAL');
})

    //PARA LOGIN MIRAR POR AQUI PARA EL CHANGE EN LOS INPUTS
    
    console.log('CHANGEDATA alert-changes CHANGE: ' + localStorage.getItem('changeData'));
    //triggers change in all input fields including text type
    if (localStorage.getItem('changeData') === 'true') {
      console.log('changeData ES TRUE');
      localStorage.setItem('changeData','false');
    } else {
      unsaved = true;
      console.log('UNSAVED Monitor dynamic inputs: ' + unsaved);
    }
  });

  //Algoritmo cerrar ventana
  $(window).bind('beforeunload', function() {
    if(unsaved){
      return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
    }
  });

//HAY QUE RECONOCER EL MODAL DEL LOGIN PARA HACER EL UNSAVED=TRUE
  $('#loginModal').on('shown', function () {
    console.log('login modal abierto');
  });

  $('.modal').on('hide.bs.modal', function(e) {
    if(unsaved==true && localStorage.getItem('changeData') === 'false'){
      if('loginModal'){
        unsaved = false;
        changeData = false;
        console.log('login modal abierto')
      } else {
        e.preventDefault();
        $("#alertaDades").removeClass("hidDrop");
      //console.log('cerrando modal');
      $('.modal').animate({
        scrollTop: $("#alertaDades").offset().top
      }, 2000);
      console.log('on hide.bs.modal unsaved: ' + unsaved); 
      console.log('on hide.bs.modal changeData: ' + changeData);
      changeData =false;
      }
      
    }
  });

  // Monitor dynamic inputs horari -- CORREGIR!!!!!
  $("#finalHorari").change(function() {
    $("#finalHorari").data("changed",true);
      console.log('CANVI DATA');
  });
  if ($("#finalHorari").data("changed")) {
    unsaved = false;
    console.log('CAMBIOOOOO');
  } else {
    console.log('NOOO CAMBIOOOOO');
  }
});


  //Para que no salte con DatePicker
/*  $('#acData .input-group.date').datepicker({
    onSelect: function() {
      console.log("Select");
    }
  }).on("change", function(e) {
    e.preventDefault();
    console.log("Change event");
    unsaved =false;
  console.log('UNSAVED 2: ' + unsaved);
  });
*/

/*
  if ($('.textcenter').datepicker().change()) {
    console.log('DatePicker CHANGES');
    unsaved =false;
  } else {
    //e.preventDefault();
    $("#alertaDades").removeClass("hidDrop");
    $('.modal').animate({
    scrollTop: $("#alertaDades").offset().top
    }, 2000);
    console.log('UNSAVED 1: ' + unsaved); 
*/