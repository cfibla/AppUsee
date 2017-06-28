$(document).ready(function (){


  //NAVBAR
  var pth = window.location.pathname; // Returns path only

  if(pth==="/list"){
    $("#llista").removeClass("active").addClass("navcolor");
    $("#situ").html("Llista d'alumnes ");
  }
  if(pth==="/assistencia"){
    $("#llista").removeClass("active");
    $("#assistencia").addClass("navcolor");
    $("#situ").html("Control d'assistència ");
  }
  if(pth==="/menjador"){
    $("#llista").removeClass("active");
    $("#menjador").addClass("navcolor");
    $("#situ").html("Control de menjador ");
  }

//TOOLTIPS
$(function () {
  $('[data-tggle="tooltip"]').tooltip();
})
$('a').click(function(){
    $(this).tooltip('dispose')
})

  //RADIOS ASSISTENCIA
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

///////////////////// M O D A L S ///////////////////// 
$('body').on('click.modal.data-api', '[data-toggle="modal"]', function(){ $($(this).data("target")+' .modal-content').load($(this).attr('href')); }); 
  $('document').on('hidden.bs.modal', function () {
    $('.modal-body .modal-footer').html("");

  });

////////////////  D A D E S   P E R S O N A L S ////////////////

  $('#dadesModal').on('shown.bs.modal', function (e) {
    //datepicker//
    $('#dataNaix .input-group.date').datepicker({
      format: "dd/mm/yyyy",
      setDate: new Date(),
      maxViewMode: 2,
      todayBtn: "linked",
      daysOfWeekDisabled: "0,6",
      autoclose: true,
      todayHighlight: true,
      language: "ca"  
    });
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneC1 = actg.data('cognom');
    var alumneC2 = actg.data('scognom');
    var naix = actg.data('dtan');
    var segsoc = actg.data('segsoc');
    var mail = actg.data('mail');
    var escola = actg.data('escola');
    var nomescola = actg.data('nomescola');
    var alumneCurs = actg.data('curs');
    var atdiv = actg.data('atdiv');
    var rep = actg.data('rep');
    var obs = actg.data('obs');
    var pi = actg.data('pi');
    var curri = actg.data('curri');
    var met = actg.data('met');
    var cond = actg.data('cond');
    var cat = actg.data('cat');
    var alumneId = actg.data('id');
//SELECTS
    var piAl = funcSel(pi);
    var aDiv = funcSel(atdiv);
    var repe = funcSel(rep);

    function funcSel (v){
      var op1, val1, op2, val2;
      if (v===true){
        op1="Si"; val1=true;
        op2="No"; val2=false;
      } else {
        op1="No"; val1=false;
        op2="Si"; val2=true;        
      }
      return[op1,val1,op2,val2]
    };

    var mdal = $(this);
    mdal.find('.modal-body #nom_alumne').val(alumneNom);
    mdal.find('.modal-body #cnom_alumne1').val(alumneC1);
    mdal.find('.modal-body #cnom_alumne2').val(alumneC2);
    mdal.find('.modal-body #data_naixement').val(naix);
    mdal.find('.modal-body #targeta_SS').val(segsoc);
    mdal.find('.modal-body #email_alumne').val(mail);
    mdal.find('.modal-body #codi_escola').val(escola);
    mdal.find('.modal-body #nom_escola').val(nomescola);
    mdal.find('.modal-body #cursval').text(alumneCurs);
    mdal.find('.modal-body #obs_alumne').text(obs);
    mdal.find('.modal-body #ad_alumne1').text(aDiv[0]).val(aDiv[1]);
    mdal.find('.modal-body #ad_alumne2').text(aDiv[2]).val(aDiv[3]);
    mdal.find('.modal-body #rep_alumne1').text(repe[0]).val(repe[1]);
    mdal.find('.modal-body #rep_alumne2').text(repe[2]).val(repe[3]);
    mdal.find('.modal-body #pi_alumne1').text(piAl[0]).val(piAl[1]);
    mdal.find('.modal-body #pi_alumne2').text(piAl[2]).val(piAl[3]);
    mdal.find('.modal-body #curr').prop('checked', curri);
    mdal.find('.modal-body #met').prop('checked', met);
    mdal.find('.modal-body #cond').prop('checked', cond);
    mdal.find('.modal-body #cat').prop('checked', cat);

    $('#alumne_dades').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/dadesUpdate/" + alumneId + "?_method=put";
      $('#dadesModal').modal('toggle');
      $.ajax({
          url: urlPost, //this is the submit URL
          type: 'POST',
          data: $('#alumne_dades').serialize(),
          success:function(){
            location.reload()
          }
      });
      //console.log($('#alumne_dades').serialize());
    });

  ////////////////// A D A P T A C I O N S ////////////////// 
    if ($('#programació_individualitzada').val()==='true'){
        $("#divPi").show();
      } else {
        $("#divPi").hide();
      }
    $('#programació_individualitzada').change(function(){
      if ($('#programació_individualitzada').val()==='true'){
        $("#divPi").fadeIn(700);
      } else {
        $("#divPi").fadeOut(700);
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
    });
  });


//////////////// S E G U I M E N T //////////////// 
// ACTUACIONS //
//MODAL ACTUACIO NEW
  $('#actuModal').on('shown.bs.modal', function (e) {
    //datepicker//
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
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var actuNum = actg.data('actunum');
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

//MODAL ACTUACIO GET
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

//MODAL ACTUACIO UPD
  $('#actuModalUpd').on('shown.bs.modal', function (e) {
    //datepicker//
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

//MODAL ACTUACIO DELETE
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

///////// CAD ////////////////
//MODAL CAD NEW
  $('#cadModal').on('shown.bs.modal', function (e) {
    // datepicker //
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

//MODAL CAD GET
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

//MODAL CAD UPD
  $('#cadModalUpd').on('shown.bs.modal', function (e) {
  // datepicker //
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

//MODAL CAD DELETE
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

///////// ALTRES COORD ////////////////
//MODAL ALTRES COORD NEW
  $('#altresCoordModal').on('shown.bs.modal', function (e) {
    // datepicker //
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

//MODAL ALTRES COORD GET
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

//MODAL ALTRES COORD UPD
  $('#altresCoordModalUpd').on('shown.bs.modal', function (e) {
    // datepicker //
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


//MODAL ALTRES COORD DELETE
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

  //////////////// DATEPICKER ASSISTENCIA.ejs //////////////// 
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


//MODAL ASSISTENCIA
  $('#assistModal').on('shown.bs.modal', function (e) {
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
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneId = actg.data('id');
    var today = actg.data('today');
    var mdal =  $(this);
      mdal.find(".form-group #nomAl").val(alumneNom);
      mdal.find(".form-group #idAl").val(alumneId);
      mdal.find("#today1").val(today);
      mdal.find("#today2").val(today);
  });

//MODAL AFEGIR ALUMNES
  $('#afegirModal').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var escola = actg.data('escola');
    var curs = actg.data('curs');
    var mdal = $(this);
    mdal.find(".form-group #codiEscola").val(escola);
    mdal.find(".form-group #curs").val(curs);
  });

//MODAL DELETE ALUMNES
  $('#deleteModal').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneId = actg.data('id');
    var alumneNom = actg.data('nom');
    var mdal = $(this);
    mdal.find(".modal-body #nomAlDel").text(alumneNom);
    $('#del_alum').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/dades_suprD/" + alumneId + "?_method=put";
      $('#deleteModal').modal('toggle');
      $.ajax({
          url: urlPost, //this is the submit URL
          type: 'POST',
          data: $('#del_alum').serialize(),
          success: function(){
            location.reload()}
      });
    });
  });
/////////// M E N J A D O R ////////////////
//DATEPICKER
    $('#mData .input-group.date').datepicker({
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
        $('#menjaD').submit();
    })

////// SEGUIMENT reload al mateix TAB /////////////////////////
/*  $('#segTabs a').click(function(e) {
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
*/
///////////// V A L I D A T O R /////////////////

  $('.modal').on('shown.bs.modal', function (e) { $(this).find('form[data-toggle=validator]').validator('destroy');
  $(this).find('form[data-toggle=validator]').validator() });
  $('.modal').on('shown.bs.modal', function (e) { $(this).find('form[data-toggle=validator]').validator() });

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