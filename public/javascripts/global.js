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


////////////////// A D A P T A C I O N S ////////////////// 
$(document).ready(function (){
      if ($('#programació_individualitzada').val()==='true'){
        $("#divPi").show();
      } else {
        $("#divPi").hide();
      }
    $('#programació_individualitzada').change(function(){
      if ($('#programació_individualitzada').val()==='true'){
        $("#divPi").fadeIn(500);
      } else {
        $("#divPi").hide(500);
      }
    })

    if ($('#adequacio_continguts').val()==='true'){
        $("#divAde").show();
      } else {
        $("#divAde").hide();
      }
    $('#adequacio_continguts').change(function(){
      if ($('#adequacio_continguts').val()==='true'){
        $("#divAde").fadeIn(500);
      } else {
        $("#divAde").hide(500);
      }
    })

    if ($('#full_derivacio').val()==='true'){
        $("#divDer").show();
      } else {
        $("#divDer").hide();
      }
    $('#full_derivacio').change(function(){
      if ($('#full_derivacio').val()==='true'){
        $("#divDer").fadeIn(500);
      } else {
        $("#divDer").hide(500);
        $("#qui_fa_derivacio").val('');
        $("#motiu_derivacio").val('');
      }
    })


    if ($('#disminucio').val()==='true'){
        $("#divDim").show();
      } else {
        $("#divDim").hide();
      }
    $('#disminucio').change(function(){
      if ($('#disminucio').val()==='true'){
        $("#divDim").fadeIn(500);
      } else {
        $("#divDim").hide(500);
        $("#percent_dim").val('');
      }
    })

    if ($('#valoracio_eap').val()==='true'){
        $("#divVal").show();
      } else {
        $("#divVal").hide();
      }
    $('#valoracio_eap').change(function(){
      if ($('#valoracio_eap').val()==='true'){
        $("#divVal").fadeIn(500);
      } else {
        $("#divVal").hide(500);
        $("#any_val").val('');
      }
    })

    if ($('#dictamen').val()==='true'){
        $("#divDic").show();
      } else {
        $("#divDic").hide();
      }
    $('#dictamen').change(function(){
      if ($('#dictamen').val()==='true'){
        $("#divDic").fadeIn(500);
      } else {
        $("#divDic").hide(500);
        $("#any_val").val('');
      }
    })
});

//////////////// DATEPICKER ////////////////////

//assistencia.ejs
$(document).ready(function (){
  $('#aData .input-group.date').datepicker({
      format: "dd/mm/yyyy",
      setDate: new Date(),
      maxViewMode: 2,
      todayBtn: "linked",
      daysOfWeekDisabled: "0,6",
      autoclose: true,
      todayHighlight: true,
      language: "ca"  
  })
  .on('changeDate', function(){
      $('#assisData').submit();
  })
});

//assistenciaMODAL
$(document).ready(function (){
  $('#data .input-group.date').datepicker({
      format: "dd/mm/yyyy",
      setDate: new Date(),
      maxViewMode: 2,
      todayBtn: "linked",
      daysOfWeekDisabled: "0,6",
      autoclose: true,
      todayHighlight: true,
      language: "ca"  
  });

  $('#dataP .input-group.date').datepicker({
      format: "dd/mm/yyyy",
      setDate: new Date(),
      maxViewMode: 2,
      todayBtn: "linked",
      daysOfWeekDisabled: "0,6",
      autoclose: true,
      todayHighlight: true,
      language: "ca"
  });
});

//actuacions MODAL
$(document).ready(function (){
  $('#acData .input-group.date').datepicker({
      format: "dd/mm/yyyy",
      setDate: new Date(),
      maxViewMode: 2,
      todayBtn: "linked",
      daysOfWeekDisabled: "0,6",
      autoclose: true,
      todayHighlight: true,
      language: "ca"  
  });
});

//actuacions MODAL UPD
$(document).ready(function (){
  $('#acDataUpd .input-group.date').datepicker({
      format: "dd/mm/yyyy",
      setDate: new Date(),
      maxViewMode: 2,
      todayBtn: "linked",
      daysOfWeekDisabled: "0,6",
      autoclose: true,
      todayHighlight: true,
      language: "ca"  
  });
});


//cad MODAL
$(document).ready(function (){
  $('#cadData .input-group.date').datepicker({
      format: "dd/mm/yyyy",
      setDate: new Date(),
      maxViewMode: 2,
      todayBtn: "linked",
      daysOfWeekDisabled: "0,6",
      autoclose: true,
      todayHighlight: true,
      language: "ca"  
  });
});


//cad MODAL UPD
$(document).ready(function (){
  $('#cadDataUpd .input-group.date').datepicker({
      format: "dd/mm/yyyy",
      setDate: new Date(),
      maxViewMode: 2,
      todayBtn: "linked",
      daysOfWeekDisabled: "0,6",
      autoclose: true,
      todayHighlight: true,
      language: "ca"  
  });
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

$(document).ready(function (){
  $('document').on('hidden.bs.modal', function () {
    $('.modal-body .modal-footer').html("");

  });
});
///////// MODALS ACTUACIONS ////////////////
//MODAL ACTUACIO NEW
$("#btnActuAfegir").on("click", function (e) {
  e.preventDefault()
  var alumneNom = $(this).data('nom');
  var alumneCurs = $(this).data('curs');
  var alumneId = $(this).data('id');
  var actuNum = $(this).data('actunum')
  var today = $(this).data('today');

  $(document).ready(function (){
    $("#nomAl").text(alumneNom);
    $("#cursAl").text(alumneCurs);
    $("#actuData").attr("name", "segActuacions." + actuNum + ".date");
    $("#actuBody").attr("name", "segActuacions." + actuNum + ".body");
    $("#actuData").val(today);

    $(function(){
      $('#seg_actuacions').on('submit', function(e){
        e.preventDefault();
        var urlPost = "/seguiment-EE/post/" + alumneId + "?_method=put";
        $('#actuModal').modal('toggle');
        $.ajax({
            url: urlPost, //this is the submit URL
            type: 'POST',
            data: $('#seg_actuacions').serialize()
        });
        location.reload();
      });
    });
  });
});

//MODAL ACTUACIO UPD
$(document).on("click", "#btnActuUpd", function (e) {
  e.preventDefault()
  var alumneNom = $(this).data('nom');
  var alumneCurs = $(this).data('curs');
  var alumneId = $(this).data('id');
  var i = $(this).data('i')
  var dta = $(this).data('dta');
  var body = $(this).data('body');

  $(document).ready(function (){
    $("#nomAlUpd").text(alumneNom);
    $("#cursAlUpd").text(alumneCurs);
    $("#actuDataUpd").attr("name", "segActuacions." + i + ".date");
    $("#actuBodyUpd").attr("name", "segActuacions." + i + ".body");
    $("#actuDataUpd").val(dta);
    $("#actuBodyUpd").val(body);

    $(function(){
      $('#upd_actuacions').on('submit', function(e){
        e.preventDefault();
        var urlPost = "/seguiment-EE/" + alumneId + "/act/" + i + "?_method=put";
        $('#actuModalUpd').modal('toggle');
        $.ajax({
            url: urlPost, //this is the submit URL
            type: 'POST',
            data: $('#upd_actuacions').serialize()
        });
        location.reload();
      });
    });
  });
});

//MODAL ACTUACIO DELETE
$(document).on("click", "#btnActuDel", function (e) {
  e.preventDefault()
  var alumneId = $(this).data('id');
  var alumneNom = $(this).data('nom');
  var alumneCurs = $(this).data('curs');
  var alumneI = $(this).data('i');
  var alumneDta = $(this).data('dta');
  var alumneBody = $(this).data('body');

  $(document).ready(function (){
    $("#nomAlDel").text(alumneNom);
    $("#cursAlDel").text(alumneCurs);
    $("#actuDataDel").text(alumneDta);
    $("#actuBodyDel").text(alumneBody); 

    $(function(){
      $('#del_actuacions').on('submit', function(e){
        e.preventDefault();
        var urlPost = "/seguiment-EE/" + alumneId + "/actDel/" + alumneI + "?_method=put";
        $('#actuModalDel').modal('toggle');
        $.ajax({
            url: urlPost, //this is the submit URL
            type: 'POST',
            data: $('#del_actuacions').serialize()
        });
        location.reload();
      });
    });

  });
});

///////// MODALS CAD ////////////////
//MODAL CAD NEW
$("#btnCadAfegir").on("click", function (e) {
  e.preventDefault()
  var alumneNom = $(this).data('nom');
  var alumneCurs = $(this).data('curs');
  var alumneId = $(this).data('id');
  var actuNum = $(this).data('actunum')
  var today = $(this).data('today');

  $(document).ready(function (){
    $("#nomAl").text(alumneNom);
    $("#cursAl").text(alumneCurs);
    $("#actuData").attr("name", "segInformacioCAD." + actuNum + ".date");
    $("#actuBody").attr("name", "segInformacioCAD." + actuNum + ".body");
    $("#actuData").val(today);

    $(function(){
      $('#info_CAD').on('submit', function(e){
        e.preventDefault();
        var urlPost = "/seguiment-EE/post/" + alumneId + "?_method=put";
        $('#cadModal').modal('toggle');
        $.ajax({
            url: urlPost, //this is the submit URL
            type: 'POST',
            data: $('#info_CAD').serialize()
        });
        location.reload();
      });
    });
  });
});

//MODAL CAD UPD
$(document).on("click", "#btnCadUpd", function (e) {
  e.preventDefault()
  var alumneNom = $(this).data('nom');
  var alumneCurs = $(this).data('curs');
  var alumneId = $(this).data('id');
  var i = $(this).data('i')
  var dta = $(this).data('dta');
  var body = $(this).data('body');

  $(document).ready(function (){
    $("#nomAlUpd").text(alumneNom);
    $("#cursAlUpd").text(alumneCurs);
    $("#cadDataUpd").attr("name", "segInformacioCAD." + i + ".date");
    $("#cadBodyUpd").attr("name", "segInformacioCAD." + i + ".body");
    $("#cadDataUpd").val(dta);
    $("#cadBodyUpd").val(body);

    $(function(){
      $('#upd_CAD').on('submit', function(e){
        e.preventDefault();
        var urlPost = "/seguiment-EE/" + alumneId + "/act/" + i + "?_method=put";
        $('#cadModalUpd').modal('toggle');
        $.ajax({
            url: urlPost, //this is the submit URL
            type: 'POST',
            data: $('#upd_CAD').serialize()
        });
        location.reload();
      });
    });
  });
});

//MODAL CAD DELETE
$(document).on("click", "#btnActuDel", function (e) {
  e.preventDefault()
  var alumneId = $(this).data('id');
  var alumneNom = $(this).data('nom');
  var alumneCurs = $(this).data('curs');
  var alumneI = $(this).data('i');
  var alumneDta = $(this).data('dta');
  var alumneBody = $(this).data('body');

  $(document).ready(function (){
    $("#nomAlDel").text(alumneNom);
    $("#cursAlDel").text(alumneCurs);
    $("#actuDataDel").text(alumneDta);
    $("#actuBodyDel").text(alumneBody); 

    $(function(){
      $('#del_actuacions').on('submit', function(e){
        e.preventDefault();
        var urlPost = "/seguiment-EE/" + alumneId + "/actDel/" + alumneI + "?_method=put";
        $('#actuModalDel').modal('toggle');
        $.ajax({
            url: urlPost, //this is the submit URL
            type: 'POST',
            data: $('#del_actuacions').serialize()
        });
        location.reload();
      });
    });

  });
});

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


//MODAL DELETE

$(document).on("click", "#btnDelete", function () {
  var alumneId = $(this).data('id');
  var alumneNom = $(this).data('nom');
   $(document).ready(function (){
    $("#del").attr("href", "/dades_suprD/" + alumneId)
    $("#nom").text(alumneNom);
   });
});

    $('#deleteModal').on('hidden.bs.modal', function () {
    /*  $('a').attr("href","");*/
      $.ajax({
        type: "GET",
        url:"/list"
      })


});

/*  $('button#assistBtn').click(function(){
    $('assistModal').modal('hide')
  });*/

///////////// V A L I D A T E /////////////////

$('.modal').on('shown.bs.modal', function (e) { $(this).find('form[data-toggle=validator]').validator('destroy'); $(this).find('form[data-toggle=validator]').validator() });
$('.modal').on('shown.bs.modal', function (e) { $(this).find('form[data-toggle=validator]').validator() });