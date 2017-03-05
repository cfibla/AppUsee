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

$('#data .input-group.date')
  .datepicker()   
  .on('changeDate', function(){
      $('#assisData').submit();
});

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



//////////////////// M O D A L S ////////////////////

//MODAL ASSISTENCIA
  $(document).on("click", "#btnAssist", function () {
    var alumneNom = $(this).data('nom');
    var alumneId = $(this).data('id');
    var today = $(this).data('today');
    $(document).ready(function (){
    $(".form-group #nomAl").val(alumneNom);
    $(".form-group #idAl").val(alumneId);
    $("#today1").val(today);
    $("#today2").val(today);
    });
  });


//MODAL AFEGIR
  $(document).on("click", "#btnAfegir", function () {
    var escola = $(this).data('escola');
    var curs = $(this).data('curs');
     $(document).ready(function (){
     $(".form-group #codiEscola").val(escola);
     $(".form-group #curs").val(curs);
     });
  });

/*  $('button#assistBtn').click(function(){
    $('assistModal').modal('hide')
  });*/


///////////// V A L I D A T E /////////////////

$('.modal').on('shown.bs.modal', function (e) { $(this).find('form[data-toggle=validator]').validator('destroy'); $(this).find('form[data-toggle=validator]').validator() });
$('.modal').on('shown.bs.modal', function (e) { $(this).find('form[data-toggle=validator]').validator() });
