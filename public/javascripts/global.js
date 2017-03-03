//RADIOS ASSISTENCIA
$(document).ready(function (){

   // bind to retrieve old status
    $('#tradios input[type="radio"]').mousedown(function() { 
        // if it was checked before
        if(this.checked) {
            // bind event to reset state after click is completed
            $(this).mouseup(function() {  
                // bind param, because "this" will point somewhere else in setTimeout
                var radio = this;
                // apparently if you do it immediatelly, it will be overriden, hence wait a tiny bit
                setTimeout(function() { 
                    radio.checked = false; 
                }, 5); 
                // don't handle mouseup anymore unless bound again
                $(this).unbind('mouseup');
            });
        }
    });
});



//////////////// DATEPICKER ////////////////////

$('#data .input-group.date').datepicker({
    format: "dd/mm/yyyy",
    maxViewMode: 2,
    todayBtn: "linked",
    daysOfWeekDisabled: "0,6",
    autoclose: true,
    todayHighlight: true,
    language: "ca"  
});

$('#naixement .form-control').datepicker({
    format: "dd/mm/yyyy",
    maxViewMode: 2,
    todayBtn: "linked",
    daysOfWeekDisabled: "0,6",
    autoclose: true,
    todayHighlight: true,
    container: '#afegirModal modal-body',
    language: "ca"  
});

$('#dataP .input-group.date').datepicker({
    format: "dd/mm/yyyy",
    maxViewMode: 2,
    todayBtn: "linked",
    daysOfWeekDisabled: "0,6",
    autoclose: true,
    todayHighlight: true,
    language: "ca"
});    


$('#data .input-group.date')
  .datepicker()   
  .on('changeDate', function(){
      $('#assisData').submit();
});



//////////////////// M O D A L S ////////////////////

//CARREGA MODALS-REMOTE
//$('body').on('click','[data-toggle="modal"]', function(){
//jQuery($(this).data("target")+' .modal-body').load($(this).data("remote"));
//});


//MODAL ASSISTENCIA
  $(document).on("click", "#btnAssist", function () {
    var alumneNom = $(this).data('nom');
    var alumneId = $(this).data('id');
    var today = $(this).data('today');
    console.log(today);
//    $(document).ready(function (){
    $(".form-group #nomAl").val(alumneNom);
    $(".form-group #idAl").val(alumneId);
    $(".form-group #today1").val(today);
    $(".form-group #today2").val(today);
     // As pointed out in comments, 
     // it is superfluous to have to manually call the modal.
     // $('#addBookDialog').modal('show');
     })
//  });


//MODAL AFEGIR
  $(document).on("click", "#btnAfegir", function () {
    var escola = $(this).data('escola');
    var curs = $(this).data('curs');
     console.log (escola);
     console.log (curs);
     $(document).ready(function (){
     $(".form-group #codiEscola").val(escola);
     $(".form-group #curs").val(curs);
     })
  });


///////////// V A L I D A T E /////////////////
//VALIDATE LOGIN
 $('#login-form').on('submit', function(e) {
    var usrname = $('#usrname');
    var psw = $('#psw');

    // USRNAME Check if there is an entered value
    if(!usrname.val()) {
      // Add errors highlight
      usrname.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('e-warning').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      usrname.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    // PŜW Check if there is an entered value
    if(!psw.val()) {
      // Add errors highlight
      psw.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('p-warning').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      psw.closest('.form-group').removeClass('has-error').addClass('has-success');
    }
  });

//VALIDATE ESCOLA
 $('#formEscola').on('submit', function(e) {
    var nom = $('#nom_escola');
    var codi = $('#codi_escola');
    var pass = $('#password_escola');

    // NOM Check if there is an entered value
    if(!nom.val()) {
      // Add errors highlight
      nom.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('n-warning').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      nom.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    // CODI Check if there is an entered value
    if(!codi.val()) {
      // Add errors highlight
      codi.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('c-warning').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      codi.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    // PŜW Check if there is an entered value
    if(!pass.val()) {
      // Add errors highlight
      console.log('NO pass');
      pass.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('p-war').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      pass.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

  });


//VALIDATE TUTOR
 $('#formUser').on('submit', function(e) {
    var email = $('#email_user');
    var nom = $('#nom_user');
    var codi = $('#codi_esc_tutor');
    var pass = $('#password_user');
    var scurs = $('#curs_act');

    // EMAIL Check if there is an entered value
    if(!email.val()) {
      // Add errors highlight
      email.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('e-wartutor').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      email.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    // NOM Check if there is an entered value
    if(!nom.val()) {
      // Add errors highlight
      nom.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('n-wartutor').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      nom.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    // CODI Check if there is an entered value
    if(!codi.val()) {
      // Add errors highlight
      codi.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('c-wartutor').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      codi.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    // PŜW Check if there is an entered value
    if(!pass.val()) {
      // Add errors highlight
      pass.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('p-wartutor').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      pass.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    // CURS Check if there is an entered value
    if(!scurs.val()) {
      // Add errors highlight
      scurs.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('s_curs').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      scurs.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

  });


//VALIDATE TUTOR USEE
 $('#formUsee').on('submit', function(e) {
    var email = $('#email_user_usee');
    var nom = $('#nom_user_usee');
    var codi = $('#codi_esc_usee');
    var pass = $('#password_user_usee');

    // EMAIL Check if there is an entered value
    if(!email.val()) {
      // Add errors highlight
      email.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('e-warusee').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      email.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    // NOM Check if there is an entered value
    if(!nom.val()) {
      // Add errors highlight
      nom.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('n-warusee').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      nom.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    // CODI Check if there is an entered value
    if(!codi.val()) {
      // Add errors highlight
      codi.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('c-warusee').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      codi.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    // PŜW Check if there is an entered value
    if(!pass.val()) {
      // Add errors highlight
      pass.closest('.form-group').removeClass('has-success').addClass('has-error');
      document.getElementById('p-warusee').style.display = 'inline';
      // Stop submission of the form
      e.preventDefault();
    } else {
      // Remove the errors highlight
      pass.closest('.form-group').removeClass('has-error').addClass('has-success');
    }

  });

/*  $('button#assistBtn').click(function(){
    $('assistModal').modal('hide')
  });*/
    /*
$('.datepicker').datepicker({
    format: {
      
//         * Say our UI should display a week ahead,
//         * but textbox should store the actual date.
//         * This is useful if we need UI to select local dates,
//         * but store in UTC
       
        toDisplay: function (date, format, language) {
            var d = new Date(date);
            d.setDate(d.getDate() - 7);
            return d.toISOString();
        },
        toValue: function (date, format, language) {
            var d = new Date(date);
            d.setDate(d.getDate() + 7);
            return new Date(d);
        }
    },
    autoclose: true
});
   */