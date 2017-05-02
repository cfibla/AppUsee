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

//ALTRES ACTUACIONS MODAL
$(document).ready(function (){
  $('#altresData .input-group.date').datepicker({
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


//ALTRES ACTUACIONS MODAL UPD
$(document).ready(function (){
  $('#alDataUpd .input-group.date').datepicker({
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
$(document).ready(function (){
  $('#actuModal').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var actuNum = actg.data('actunum')
    var today = actg.data('today');

    var mdal = $(this);
    mdal.find('.modal-body #nomAl').text(alumneNom);
    mdal.find('.modal-body #cursAl').text(alumneCurs);
    mdal.find('.modal-body #actuData').attr("name", "segActuacions." + actuNum + ".date");
    mdal.find('.modal-body #actuBody').attr("name", "segActuacions." + actuNum + ".body");
    mdal.find('.modal-body #actuData').val(today);

    $('#seg_actuacions').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/post/" + alumneId + "?_method=put";
      $('#actuModal').modal('toggle');
      $.ajax({
          url: urlPost, //this is the submit URL
          type: 'POST',
          data: $('#seg_actuacions').serialize(),
          success: function(){
            location.reload()}
      });
    });
  });
});

//MODAL ACTUACIO GET
$(document).ready(function (){
    $('#actuModalGet').on('shown.bs.modal', function (e) {
      var actg = $(e.relatedTarget);
      var alumneNom = actg.data('nom');
      var alumneCurs = actg.data('curs');
      var dta = actg.data('dta');
      var body = actg.data('body');

      var mdal = $(this);
      mdal.find('.modal-body #nomAeAl').text(alumneNom);
      mdal.find('.modal-body #cursAeAl').text(alumneCurs);
      mdal.find('.modal-body #actuDataGet').text(dta);
      mdal.find('.modal-body #actuBodyGet').text(body);
    });
});

//MODAL ACTUACIO UPD
$(document).ready(function (){
  $('#actuModalUpd').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var i = actg.data('i')
    var dta = actg.data('dta');
    var body = actg.data('body');

    var mdal = $(this);
    mdal.find('.modal-body #nomAlUpd').text(alumneNom);
    mdal.find('.modal-body #cursAlUpd').text(alumneCurs);
    mdal.find('.modal-body #actuDataUpd').attr("name", "segActuacions." + i + ".date");
    mdal.find('.modal-body #actuBodyUpd').attr("name", "segActuacions." + i + ".body");
    mdal.find('.modal-body #actuDataUpd').val(dta);
    mdal.find('.modal-body #actuBodyUpd').val(body);

    $('#upd_actuacions').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/" + alumneId + "/act/" + i + "?_method=put";
      $('#actuModalUpd').modal('toggle');
      $.ajax({
          url: urlPost, //this is the submit URL
          type: 'POST',
          data: $('#upd_actuacions').serialize(),
          success:function(){
            location.reload()}
      });
    });
  });
});

//MODAL ACTUACIO DELETE
$(document).ready(function (){
  $('#actuModalDel').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneId = actg.data('id');
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneI = actg.data('i');
    var alumneDta = actg.data('dta');
    var alumneBody = actg.data('body');

    var mdal = $(this);
    mdal.find('.modal-body #nomAlDel').text(alumneNom);
    mdal.find('.modal-body #cursAlDel').text(alumneCurs);
    mdal.find('.modal-body #actuDataDel').text(alumneDta);
    mdal.find('.modal-body #actuBodyDel').text(alumneBody);

    $('#del_actuacions').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/" + alumneId + "/actDel/" + alumneI + "?_method=put";
      $('#actuModalDel').modal('toggle');
      $.ajax({
          url: urlPost, //this is the submit URL
          type: 'POST',
          data: $('#del_actuacions').serialize(),
          success: function(){
            location.reload()}
      });
    });
  });
});

///////// MODALS CAD ////////////////
//MODAL CAD NEW
$(document).ready(function (){
  $('#cadModal').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var actuNum = actg.data('actunum')
    var today = actg.data('today');

    var mdal = $(this);
    mdal.find('.modal-body #nomCnAl').text(alumneNom);
    mdal.find('.modal-body #cursCnAl').text(alumneCurs);
    mdal.find('.modal-body #cnData').attr("name", "segInformacioCAD." + actuNum + ".date");
    mdal.find('.modal-body #cnBody').attr("name", "segInformacioCAD." + actuNum + ".body");
    mdal.find('.modal-body #cnData').val(today);

    $('#info_CAD').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/post/" + alumneId + "?_method=put";
      $('#cadModal').modal('toggle');
      $.ajax({
          url: urlPost, //this is the submit URL
          type: 'POST',
          data: $('#info_CAD').serialize(),
          success: function(){
            location.reload()}
      });
    });
  });
});

//MODAL CAD GET
$(document).ready(function (){
  $('#cadModalGet').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var dta = actg.data('dta');
    var body = actg.data('body');

    var mdal = $(this);
    mdal.find('.modal-body #nomCgAl').text(alumneNom);
    mdal.find('.modal-body #cursCgAl').text(alumneCurs);
    mdal.find('.modal-body #cadDataGet').text(dta);
    mdal.find('.modal-body #cadBodyGet').text(body);
  });
});


//MODAL CAD UPD
$(document).ready(function (){
  $('#cadModalUpd').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var i = actg.data('i');
    var dta = actg.data('dta');
    var body = actg.data('body');

    var mdal = $(this);
    mdal.find('.modal-body #nomCuAl').text(alumneNom);
    mdal.find('.modal-body #cursCuAl').text(alumneCurs);
    mdal.find('.modal-body #cDataUpd').attr("name", "segInformacioCAD." + i + ".date");
    mdal.find('.modal-body #cadBodyUpd').attr("name", "segInformacioCAD." + i + ".body");
    mdal.find('.modal-body #cDataUpd').val(dta);
    mdal.find('.modal-body #cadBodyUpd').val(body);

    $('#upd_CAD').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/" + alumneId + "/act/" + i + "?_method=put";
      $('#cadModalUpd').modal('toggle');
      $.ajax({
          url: urlPost, //this is the submit URL
          type: 'POST',
          data: $('#upd_CAD').serialize(),
          success: function(){
            location.reload()}
      });
    });
  });
});

//MODAL CAD DELETE
$(document).ready(function (){
  $('#cadModalDel').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneId = actg.data('id');
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneI = actg.data('i');
    var alumneDta = actg.data('dta');
    var alumneBody = actg.data('body');

    var mdal = $(this);
    mdal.find('.modal-body #nomCdAl').text(alumneNom);
    mdal.find('.modal-body #cursCdAl').text(alumneCurs);
    mdal.find('.modal-body #cadDataDel').text(alumneDta);
    mdal.find('.modal-body #cadBodyDel').text(alumneBody);

    $('#del_CAD').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/" + alumneId + "/cadDel/" + alumneI + "?_method=put";
      $('#cadModalDel').modal('toggle');
      $.ajax({
          url: urlPost, //this is the submit URL
          type: 'POST',
          data: $('#del_CAD').serialize(),
          success: function(){
            location.reload()}
      });
    });
  });
});

///////// MODALS ALTRES COORD ////////////////
//MODAL ALTRES COORD NEW
$(document).ready(function (){
  $('#altresCoordModal').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var altresNum = actg.data('altresnum');
    var today = actg.data('today');

    var mdal = $(this);
    mdal.find('.modal-body #nomAlnAl').text(alumneNom);
    mdal.find('.modal-body #cursAlnAl').text(alumneCurs);
    mdal.find('.modal-body #altresData').attr("name", "segAltresCoord." + altresNum + ".date");
    mdal.find('.modal-body #altresBody').attr("name", "segAltresCoord." + altresNum + ".body");
    mdal.find('.modal-body #altresData').val(today);

    $('#altres_coord').on('submit', function(e){
        e.preventDefault();
        var urlPost = "/seguiment-EE/post/" + alumneId + "?_method=put";
        $('#altresCoordModal').modal('toggle');
        $.ajax({
            url: urlPost, //this is the submit URL
            type: 'POST',
            data: $('#altres_coord').serialize(),
            success: function(){
              location.reload()}
        });
      });
    });
  });

//MODAL ALTRES COORD GET
$(document).ready(function (){
  $('#altresCoordModalGet').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var dta = actg.data('dta');
    var body = actg.data('body');
    var mdal = $(this);
    mdal.find('.modal-body #nomAlgAl').text(alumneNom);
    mdal.find('.modal-body #cursAlgAl').text(alumneCurs);
    mdal.find('.modal-body #altresDataGet').text(dta);
    mdal.find('.modal-body #altresBodyGet').text(body);
  });
});

//MODAL ALTRES COORD UPD
$(document).ready(function (){
  $('#altresCoordModalUpd').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var i = actg.data('i');
    var dta = actg.data('dta');
    var body = actg.data('body');
    var mdal = $(this);
    mdal.find('.modal-body #nomAluAl').text(alumneNom);
    mdal.find('.modal-body #cursAluAl').text(alumneCurs);
    mdal.find('.modal-body #altresDataUpd').attr("name", "segAltresCoord." + i + ".date");
    mdal.find('.modal-body #altresBodyUpd').attr("name", "segAltresCoord." + i + ".body");
    mdal.find('.modal-body #altresDataUpd').val(dta);
    mdal.find('.modal-body #altresBodyUpd').val(body);

    $('#upd_altres').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/" + alumneId + "/act/" + i + "?_method=put";
      $('#altresCoordModalUpd').modal('toggle');
      $.ajax({
          url: urlPost, //this is the submit URL
          type: 'POST',
          data: $('#upd_altres').serialize(),
          success: function(){
            location.reload()}
      });
    });
  });
});

//MODAL ALTRES COORD DELETE
$(document).ready(function (){
  $('#altresCoordModalDel').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneId = actg.data('id');
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneI = actg.data('i');
    var alumneDta = actg.data('dta');
    var alumneBody = actg.data('body');
    var mdal =  $(this);
    mdal.find('.modal-body #nomAldAl').text(alumneNom);
    mdal.find('.modal-body #cursAldAl').text(alumneCurs);
    mdal.find('.modal-body #altresDataDel').text(alumneDta);
    mdal.find('.modal-body #altresBodyDel').text(alumneBody);

    $('#del_altres').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/" + alumneId + "/altresDel/" + alumneI + "?_method=put";
      $('#altresCoordModalDel').modal('toggle');
      $.ajax({
          url: urlPost, //this is the submit URL
          type: 'POST',
          data: $('#del_altres').serialize(),
          success: function(){
            location.reload()}
      });
    });
  });
});
//////////////////////////////////////////////////
/// reload al mateix TAB /////////////////////////
$('#segTabs a').click(function(e) {
  e.preventDefault();
  $(this).tab('show');
});

// store the currently selected tab in the hash value
$("ul.nav-tabs > li > a").on("shown.bs.tab", function(e) {
  var id = $(e.target).attr("href").substr(1);
  window.location.hash = id;
});

// on load of the page: switch to the currently selected tab
var hash = window.location.hash;
$('#segTabs a[href="' + hash + '"]').tab('show');

//////////////////////////////////////////////////

//MODAL ASSISTENCIA

$(document).on("click", "#btnAssist", function () {
  var alumneNom = $(this).data('nom');
  var alumneId = $(this).data('id');
  var today = $(this).data('today');

$("#assistModal").ready(function (){
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