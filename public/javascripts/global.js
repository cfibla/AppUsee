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

    if(pth=="/usuari"){
    $("#llista").removeClass("active");
    $("#menjador").removeClass("active");
    $("#situ").html("Perfil d'usuari");
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
//CHECKS
    var actg = $(e.relatedTarget);
    var alumneId = actg.data('id');
    var alumneNom = actg.data('nom');
    var alumneC1 = actg.data('cognom');
    var alumneC2 = actg.data('scognom');
    var naix = actg.data('dtan');
    var segsoc = actg.data('segsoc');
    var mail = actg.data('mail');
    var tel = actg.data('tel');
    var escola = actg.data('escola');
    var nomescola = actg.data('nomescola');
    var alumneCurs = actg.data('curs');
    var atdiv = actg.data('atdiv');
    var rep = actg.data('rep');
    var ail = actg.data('ail');
    var ss = actg.data('ss');
    var obs = actg.data('obs');
    var pi = actg.data('pi');
    var curri = actg.data('curri');
    var met = actg.data('met');
    var cond = actg.data('cond');
    var cat = actg.data('cat');
    var cast = actg.data('cast');
    var mat = actg.data('mat');
    var medin = actg.data('medin');
    var medis = actg.data('medis');
    var efis = actg.data('efis');
    var art = actg.data('art');
    var mtrl = actg.data('mtrl');
    var adeq = actg.data('adeq');
    var mat2 = actg.data('mat2');
    var cat2 = actg.data('cat2');
    var med2 = actg.data('med2');
    var fder = actg.data('fder');
    var der = actg.data('der');
    var motder = actg.data('motder');
    var eeusee = actg.data('eeusee');
    var segdiv = actg.data('segdiv');
    var becaa = actg.data('beca');
    var cdm = actg.data('cdim');
    var pdm = actg.data('pdim');
    var veap = actg.data('eap');
    var aval = actg.data('anyval');
    var dict = actg.data('dic');
    var mdic = actg.data('mdic');
    var ceap = actg.data('ceap');
    var tseap = actg.data('tseap');
    var credag = actg.data('credag');
    var credv = actg.data('credv');
    var csmij = actg.data('csmij');
    var seetdic = actg.data('seetdic');
    var cdiap = actg.data('cdiap');
    var ped = actg.data('ped');
    var nped = actg.data('nped');
    var altresesp = actg.data('altresesp');
    var esp = actg.data('esp');
    var serpriv = actg.data('serpriv');


    if (der === ""){
      der = "Seleccioneu"
    };

//SELECTS
    var piAl = funcSel(pi);
    var aDiv = funcSel(atdiv);
    var repe = funcSel(rep);
    var aill = funcSel(ail);
    var sersoc = funcSel(ss);
    var mtrl = funcSel(mtrl);
    var adeq = funcSel(adeq);
    var fderiv = funcSel(fder);
    var seg = funcSeg(segdiv);
    var beca = funcSel(becaa);
    var cdim = funcSel(cdm);
    var eap = funcSel(veap);
    var dic = funcSel(dict);



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

    function funcSeg (v){
      var op1, val1, op2, val2;
      if (v===true){
        op1="Directe"; val1=true;
        op2="Indirecte"; val2=false;
      } else {
        op1="Indirecte"; val1=false;
        op2="Directe"; val2=true;        
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
    mdal.find('.modal-body #tel_alumne').val(tel);
    mdal.find('.modal-body #codi_escola').val(escola);
    mdal.find('.modal-body #nom_escola').val(nomescola);
    mdal.find('.modal-body #cursval').text(alumneCurs);
    mdal.find('.modal-body #obs_alumne').text(obs);
    mdal.find('.modal-body #ad_alumne1').text(aDiv[0]).val(aDiv[1]);
    mdal.find('.modal-body #ad_alumne2').text(aDiv[2]).val(aDiv[3]);
    mdal.find('.modal-body #rep_alumne1').text(repe[0]).val(repe[1]);
    mdal.find('.modal-body #rep_alumne2').text(repe[2]).val(repe[3]);
    mdal.find('.modal-body #aill_alumne1').text(aill[0]).val(aill[1]);
    mdal.find('.modal-body #aill_alumne2').text(aill[2]).val(aill[3]);
    mdal.find('.modal-body #ss_alumne1').text(sersoc[0]).val(sersoc[1]);
    mdal.find('.modal-body #ss_alumne2').text(sersoc[2]).val(sersoc[3]);
    mdal.find('.modal-body #pi_alumne1').text(piAl[0]).val(piAl[1]);
    mdal.find('.modal-body #pi_alumne2').text(piAl[2]).val(piAl[3]);
    mdal.find('.modal-body #curr').prop('checked', curri);
    mdal.find('.modal-body #met').prop('checked', met);
    mdal.find('.modal-body #cond').prop('checked', cond);
    mdal.find('.modal-body #cat').prop('checked', cat);
    mdal.find('.modal-body #cast').prop('checked', cast);
    mdal.find('.modal-body #mat').prop('checked', mat);
    mdal.find('.modal-body #mediN').prop('checked', medin);
    mdal.find('.modal-body #mediS').prop('checked', medis);
    mdal.find('.modal-body #efis').prop('checked', efis);
    mdal.find('.modal-body #art').prop('checked', art);
    mdal.find('.modal-body #mtr_alumne1').text(mtrl[0]).val(mtrl[1]);
    mdal.find('.modal-body #mtr_alumne2').text(mtrl[2]).val(mtrl[3]);
    mdal.find('.modal-body #adeq_alumne1').text(adeq[0]).val(adeq[1]);
    mdal.find('.modal-body #adeq_alumne2').text(adeq[2]).val(adeq[3]);
    mdal.find('.modal-body #mat2').prop('checked', mat2);
    mdal.find('.modal-body #cat2').prop('checked', cat2);
    mdal.find('.modal-body #med2').prop('checked', med2);
    mdal.find('.modal-body #fder_alumne1').text(fderiv[0]).val(fderiv[1]);
    mdal.find('.modal-body #fder_alumne2').text(fderiv[2]).val(fderiv[3]);
    mdal.find('.modal-body #motiu_derivacio').text(motder);
    mdal.find('.modal-body #seg_alumne1').text(seg[0]).val(seg[1]);
    mdal.find('.modal-body #seg_alumne2').text(seg[2]).val(seg[3]);
    mdal.find('.modal-body #beca_alumne1').text(beca[0]).val(beca[1]);
    mdal.find('.modal-body #beca_alumne2').text(beca[2]).val(beca[3]);
    mdal.find('.modal-body #cdim_alumne1').text(cdim[0]).val(cdim[1]);
    mdal.find('.modal-body #cdim_alumne2').text(cdim[2]).val(cdim[3]);
    mdal.find('.modal-body #percent_dim').val(pdm);
    mdal.find('.modal-body #eap_alumne1').text(eap[0]).val(eap[1]);
    mdal.find('.modal-body #eap_alumne2').text(eap[2]).val(eap[3]);
    mdal.find('.modal-body #any_val').val(aval);
    mdal.find('.modal-body #dic_alumne1').text(dic[0]).val(dic[1]);
    mdal.find('.modal-body #dic_alumne2').text(dic[2]).val(dic[3]);
    mdal.find('.modal-body #motiu_dic').val(mdic);
    mdal.find('.modal-body #c_eap').prop('checked', ceap);
    mdal.find('.modal-body #ts_eap').prop('checked', tseap);
    mdal.find('.modal-body #credag').prop('checked', credag);
    mdal.find('.modal-body #credv').prop('checked', credv);
    mdal.find('.modal-body #csmij').prop('checked', csmij);
    mdal.find('.modal-body #seetdic').prop('checked', seetdic);
    mdal.find('.modal-body #cdiap').prop('checked', cdiap);
    mdal.find('.modal-body #ped').prop('checked', ped);
    mdal.find('.modal-body #nped').prop('checked', nped);
    mdal.find('.modal-body #altresesp').prop('checked', altresesp);
    mdal.find('.modal-body #esp').val(esp);
    mdal.find('.modal-body #serpriv').val(serpriv);

//ALTRES
    var derivArray =[der, "Tutor", "Família", "Atenció a la diversitat"];
    var divder = $("#qui_fa_derivacio");
    $.each(derivArray, function(){
      divder.append($("<option />").val(this).text(this));
    });

    $('#alumne_dades').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/dadesUpdate/" + alumneId + "?_method=put";
      var data = $('#alumne_dades').serialize();
      
      $.ajax({
          url: urlPost, //this is the submit URL
          method: 'POST',
          data: data,
          success:function(){
            location.reload();
          }
      }).then(function(){
        $('#dadesModal').modal('toggle');
      });
      //console.log($('#alumne_dades').serialize());
    });
///////// LABEL ACTIVE ///////////////
    function checkForInput(element) {
  // element is passed to the function ^
  
      const $label = $(element).siblings('label');

      if ($(element).val().length > 0) {
        $label.addClass('active');
      } else {
        $label.removeClass('active');
      }
    }

    // The lines below are executed on page load
    $('input').each(function() {
      checkForInput(this);
    });

    // The lines below (inside) are executed on change & keyup
    $('input').on('change keyup', function() {
      checkForInput(this);  
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
        $("#divAde").fadeIn('slow');
      } else {
        $("#divAde").hide('slow');
      }
    })

    if ($('#full_derivacio').val()==='true'){
        $("#divDer").show();
      } else {
        $("#divDer").hide();
      }
    $('#full_derivacio').change(function(){
      if ($('#full_derivacio').val()==='true'){
        $("#divDer").fadeIn('slow');
      } else {
        $("#divDer").hide('slow');
        $("#qui_fa_derivacio").val('');
        $("#motiu_derivacio").val('');
      }
    });

///////// A T .  D I V E R S I T A T ///////// 
    if (eeusee===true){
        $("#divDiv").show();
      } else {
        $("#divDiv").hide();
      }
    $('#eeUsee').change(function(){
      if ($('#eeUsee').val()==='true'){
        $("#divDiv").show();
      } else {
        $("#divDiv").hide();
      }
    });

    if ($('#disminucio').val()==='true'){
        $("#divDim").show();
      } else {
        $("#divDim").hide();
      }
    $('#disminucio').change(function(){
      if ($('#disminucio').val()==='true'){
        $("#divDim").fadeIn('slow');
      } else {
        $("#divDim").hide('slow');
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
        $("#divVal").fadeIn('slow');
      } else {
        $("#divVal").hide('slow');
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
        $("#divDic").fadeIn('slow');
      } else {
        $("#divDic").hide('slow');
        $("#any_val").val('');
      }
    });

    if ($('#altresesp').is(':checked')){
      $("#espDiv").show();
    } else {
      $("#espDiv").hide();
    }
    $('#altresesp').change(function(){
      if (this.checked){
        $("#espDiv").fadeIn('slow');}
      else {
        $("#espDiv").fadeOut('slow');
      //  $("#esp").val('');
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
      mdal.find("#nomAl").text(alumneNom);
      mdal.find("#idAl").val(alumneId);
      mdal.find("#today1").val(today);
      mdal.find("#today2").val(today);
  });

//MODAL AFEGIR ALUMNES
  $('#afegirModal').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var escola = actg.data('escola');
    var curs = actg.data('curs');
    var usr = actg.data('usr');

    var mdal = $(this);
    mdal.find(".modal-body #cdEscola").val(escola);
    mdal.find(".modal-body #opcio").text(curs);
    if (usr==="tutor"){
      $("#selCurs").prop('disabled', true);
    } else {
      $("#selCurs").prop('disabled', false);
    }
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

///// USUARI /////////////
    if ($('#categoria').val()==='tutor'){
        $("#usrCurs").show();
      } else {
        $("#usrCurs").hide();
      }
    $('#categoria').change(function(){
      if ($('#categoria').val()==='tutor'){
        $("#usrCurs").fadeIn('slow');
      } else {
        $("#usrCurs").hide('slow');
      }
    });

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