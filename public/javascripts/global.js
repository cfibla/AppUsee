$(document).ready(function (){
  //NAVBAR
  var pth = window.location.pathname; // Returns path only

  if(pth==="/list"){
    $("#llista").addClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#situ").html("Llista tutoria");
    $("#a1").html("Tutoria").attr('href', "/list");
    $("#a2").html("Assistència").attr('href', "/assistencia");
    $("#a3").html("Menjador").attr('href', "/menjador");
    $("#a1div").addClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#a3div").removeClass("navcolorside");
    $("#a4div").removeClass("navcolorside");
    $("#areasDrop").addClass("hidDrop");
  }

  if(pth==="/list_EE"){
    $("#llista").addClass("navcolor");
    //$("#horari-menu").removeClass("navcolor");
    $("#situ").html("Atenció a la diversitat");
    $("#a1").html("Tots els alumnes").attr('href', "/list_EE");
    $("#a1div").addClass("navcolorside");
    $("#areasDrop").addClass("hidDrop");
    $("#cursosDrop").removeClass("hidDrop");
    //$("#cursosDrop").addClass("navcolorside");
  }

  if(pth.match("/list_EE/")){
    var areaUrl = pth.split("/");
    var decodeUrl = decodeURIComponent(areaUrl[2]);
    $("#llista").addClass("navcolor");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    //$("#horari-menu").addClass("navcolor");
    $("#situ").html("Atenció a la diversitat");
    $("#situ2").html(decodeUrl);
    $("#a1").html("Tots els alumnes").attr('href', "/list_EE");
    $("#a2").addClass("hidBig");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").addClass("hidBig");
    $("#a3div").addClass("hidBig");
    $("#a4div").addClass("hidBig");
    $("#cursosDrop").removeClass("hidDrop");
    $("#cursosDrop").addClass("navcolorside");
  }

  if(pth==="/assistencia"){
    $("#llista").addClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#assistencia").addClass("navcolor");
    $("#situ").html("Llista assistència");
    $("#a1").html("Tutoria").attr('href', "/list");
    $("#a2").html("Assistència").attr('href', "/assistencia");
    $("#a3").html("Menjador").attr('href', "/menjador");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").addClass("navcolorside");
    $("#a3div").removeClass("navcolorside");
    $("#a4div").removeClass("navcolorside");
    $("#areasDrop").addClass("hidDrop");
  }
  if(pth==="/menjador"){
    $("#llista").addClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#situ").html("Llista menjador");
    $("#a1").html("Tutoria").attr('href', "/list");
    $("#a2").html("Assistència").attr('href', "/assistencia");
    $("#a3").html("Menjador").attr('href', "/menjador");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#a3div").addClass("navcolorside");
    $("#a4div").removeClass("navcolorside");
    $("#areasDrop").addClass("hidDrop");
  }
    if(pth==="/usuari"){
    $("#llista").removeClass("navcolor");
    $("#situ").html("El meu perfil");
    $("#a1").html("Dades personals").attr('href', "/usuari");
    $("#a2").html("Canviar contrasenya").attr('href', "/contrasenya");
    $("#a1div").addClass("navcolorside");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#areasDrop").addClass("hidDrop");
  }
  if(pth==="/contrasenya"){
    $("#llista").removeClass("navcolor");
    $("#situ").html("El meu perfil");
    $("#a1").html("Dades personals").attr('href', "/usuari");
    $("#a2").html("Canviar contrasenya").attr('href', "/contrasenya");
    $("#a2div").addClass("navcolorside");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#areasDrop").addClass("hidDrop");
  }
  if(pth.match("/reunions-pares")){
    $("#llista").removeClass("navcolor");
    $("#situ").html("Reunions pares");
  /*$("#a1").html("Dades personals").attr('href', "/usuari");
    $("#a2").html("Canviar contrasenya").attr('href', "/contrasenya");
    $("#a2div").addClass("navcolorside");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#areasDrop").addClass("hidDrop");
  */
  }
  if(pth.match("/seguiment-EE/actuacions/")){
    var areaUrl = pth.split("/");
    var id = decodeURIComponent(areaUrl[3]);
    $("#llista").removeClass("navcolor");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#situ").html("Actuacions");
    $("#a1").html("Actuacions");
    $("#a2").html("Reunions CAD").attr('href', "/seguiment-EE/cad/" + id);
    $("#a3").html("Altres Coordinacions").attr('href', "/seguiment-EE/altres/" + id);
    $("#a1div").addClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#a3div").removeClass("hidBig");
    $("#a4div").addClass("hidBig");
  }
  if(pth.match("/seguiment-EE/cad/")){
    var areaUrl = pth.split("/");
    var id = decodeURIComponent(areaUrl[3]);
    $("#llista").removeClass("navcolor");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#situ").html("Reunions CAD");
    $("#a1").html("Actuacions").attr('href', "/seguiment-EE/actuacions/" + id);
    $("#a2").html("Reunions CAD");
    $("#a3").html("Altres Coordinacions").attr('href', "/seguiment-EE/altres/" + id);
    $("#a1div").removeClass("navcolorside");
    $("#a2div").addClass("navcolorside");
    $("#a3div").removeClass("hidBig");
    $("#a4div").addClass("hidBig");
  }
  if(pth.match("/seguiment-EE/altres/")){
    var areaUrl = pth.split("/");
    var id = decodeURIComponent(areaUrl[3]);
    $("#llista").removeClass("navcolor");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#situ").html("Altres Coord.");
    $("#a1").html("Actuacions").attr('href', "/seguiment-EE/actuacions/" + id);
    $("#a2").html("Reunions CAD").attr('href', "/seguiment-EE/cad/" + id);
    $("#a3").html("Altres Coordinacions");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#a3div").removeClass("hidBig").addClass("navcolorside");
    $("#a4div").addClass("hidBig");
  }
  if(pth==="/horari-config"){
    $("#llista").removeClass("navcolor");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#horari-menu").addClass("navcolor");
    $("#situ").html("Configurar horari");
    $("#a1").html("Configuració").attr('href', "/horari-config");
    $("#a2").html("Horari diari").attr('href', "/horari-diari");
    $("#a1div").addClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#a3div").addClass("hidBig");
    $("#a4div").addClass("hidBig");
    $("#areasDrop").removeClass("hidDrop");
    $("#desaButton").removeClass("hidBig");
    $("#horariDiariPost_2").removeClass("hidDrop");
  }
    if(pth==="/horari-diari"){
    $("#llista").removeClass("navcolor");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#horari-menu").addClass("navcolor");
    $("#situ").html("Horari diari");
    $("#a1").html("Configuració").attr('href', "/horari-config");
    $("#a2").html("Horari diari").attr('href', "/horari-diari");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").addClass("navcolorside");
    $("#a3div").addClass("hidBig");
    $("#a4div").addClass("hidBig");
    $("#areasDrop").removeClass("hidDrop");
    $("#desaButton").removeClass("hidBig");
    $("#horariDiariPost_2").removeClass("hidDrop");
  }
  if(pth.match("/horari-area/")){
    var areaUrl = pth.split("/");
    var decodeUrl = decodeURIComponent(areaUrl[2]);
    $("#llista").removeClass("navcolor");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#horari-menu").addClass("navcolor");
    $("#situ").html(decodeUrl);
    $("#a1").html("Configuració").attr('href', "/horari-config");
    $("#a2").html("Horari diari").attr('href', "/horari-diari");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#areasdiv").addClass("navcolorside");
    $("#a3div").addClass("hidBig");
    $("#a4div").addClass("hidBig");
    $("#areasDrop").removeClass("hidDrop");
    $("#areasDrop").addClass("navcolorside");
    $("#desaButton").removeClass("hidBig");
    $("#areasPost_2").removeClass("hidDrop");
  }

  
///////// LABEL ACTIVE ///////////////
  function checkForInput(element) {
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

////////////////////LOGIN///////////////////////////
  $('#login-form-link').click(function(e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#formUser").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });
  $('#register-form-link').click(function(e) {
    $("#formUser").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });

///////////////////// M O D A L S ///////////////////// 
  $('body').on('click.modal.data-api', '[data-toggle="modal"]', function(){
     $($(this).data("target")+' .modal-content').load($(this).attr('href'));
   }); 
  $('document').on('hidden.bs.modal', function () {
      $('.modal-body .modal-footer').html("");
    });

///////// U S E R S //////////////
///// CREATE USER
//  $('#userModal').on('shown.bs.modal', function (e) {
    $('#formUser').on('submit', function(e){
      e.preventDefault();
      $.LoadingOverlay("show");
      var urlPost = "/usuari_crear";
      var data = $('#formUser').serialize();

      var destUrl;
      if(($('#mestres').val()) === "tutor"){
        destUrl = "/list";
      }
      if(($('#mestres').val()) === "ee"){
        destUrl = "/list_EE";
      }

      aPost(urlPost, data)
      .always(function(){
        location.href = destUrl;
      });
    });
//  });
    // USUARI CURS
    if ($('#mestres').val()==='tutor'){
        $("#curs_act").show();
      } else {
        $("#curs_act").hide().prop('required', false);
      }
    $('#mestres').change(function(){
      if ($('#mestres').val()==='tutor'){
        $("#curs_act").fadeIn('slow');
      } else {
        $("#curs_act").hide('slow').prop('required', false);
      }
    });

///// CREATE USER TUTOR EE -USEE - SIEI
/*  $('#useeModal').on('shown.bs.modal', function (e) {
    $('#formUsee').on('submit', function(e){
      e.preventDefault();
      $.LoadingOverlay("show");
      var urlPost = "/usuari_ee_crear";
      var data = $('#formUsee').serialize();
      aPost(urlPost, data).always(function(){
        location.href="/list_EE";
      });
    });
  });
*/


//UPDATE USERS
    // USUARI CURS
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

//DELETE USERS
  $('#deleteUserModal').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var userId = actg.data('id');
    var mestre = actg.data('mestre');
    var mdal = $(this);
  
    $('#del_user').on('submit', function(e){
      e.preventDefault();
      $.LoadingOverlay("show");
      if (mestre==="tutor"){
      var urlPost = "/usuariD/" + userId + "?_method=put";
      }
      if (mestre==="ee"){
      var urlPost = "/usuari_ee_D/" + userId + "?_method=put";
      }
      var data = $('#del_user').serialize();
      aPost(urlPost, data)
      });
    });


///////// A L U M N E S //////////////
//  D A D E S   P E R S O N A L S
  $('#dadesModal').on('shown.bs.modal', function (e) {
    //DISMISS
    $('#modalDiscard').click(
      function(){
        unsaved = false;
        e.preventDefault();
       location.reload();
        $('.modal').removeClass('show');
     });
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
//CHECKS
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
      $.LoadingOverlay("show");
      var urlPost = "/dadesUpdate/" + alumneId + "?_method=put";
      var data = $('#alumne_dades').serialize();
      aPost(urlPost, data);
    });

///////// LABEL ACTIVE ///////////////
    function checkForInput(element) {
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

//MODAL AFEGIR ALUMNES
  $('#afegirModal').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var escola = actg.data('escola');
    var alumneCurs = actg.data('curs');
    var usr = actg.data('usr');
    var t_use1, v_use1, t_use2, v_use2;
    if (usr === "ee") {
      t_use1 = "Si";
      v_use1 = true;
      t_use2 = "No";
      v_use2 = null;
      alumneCurs = "Seleccioneu curs";
      v_alumneCurs = null;
    } else {
      t_use1 = "No";
      v_use1 = null;
      t_use2 = "Si";
      v_use2 = true;
      v_alumneCurs = alumneCurs;
    };

    var mdal = $(this);
    mdal.find(".modal-body #cdEscola").val(escola);
    mdal.find(".modal-body #opc").text(alumneCurs).val(v_alumneCurs);
    mdal.find('.modal-body #o_use1').text(t_use1).val(v_use1);
    mdal.find('.modal-body #o_use2').text(t_use2).val(v_use2);

    $('#dadesAlumne').on('submit', function(e){
        e.preventDefault();
        $.LoadingOverlay("show");
        var urlPost = "/alumneNou";
        var data = $('#dadesAlumne').serialize();
        aPost(urlPost, data);
        });
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
      $.LoadingOverlay("show");
      var urlPost = "/dades_suprD/" + alumneId + "?_method=put";
      var data = $('#del_alum').serialize();
      aPost(urlPost, data);
    });
  });

//MODAL alta ALUMNES
  $('#altaModal').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneId = actg.data('id');
    var alumneNom = actg.data('nom');
    var mdal = $(this);
    mdal.find(".modal-body #nomAlAl").text(alumneNom);
    $('#alt_alum').on('submit', function(e){
      e.preventDefault();
      $.LoadingOverlay("show");
      var urlPost = "/dades_alta/" + alumneId + "?_method=put";
      var data = $('#alt_alum').serialize();
      aPost(urlPost, data);
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

///////////// REUNIONS /////////
//CREATE MODAL
  $('#reuParesModal').on('shown.bs.modal', function (e) {
    //DISMISS
    $('#modalDiscard').click(
      function(){
        unsaved = false;
        e.preventDefault();
       location.reload();
        $('.modal').removeClass('show');
     })
    //datepicker//
    $('#rData .input-group.date').datepicker({
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
    var creat = actg.data('creat');
    var mail = actg.data('mail');
    var i = actg.data('i');
    var today = actg.data('today');

    if (typeof(i)=== "undefined"){
      i = 0;
    }

    var mdal = $(this);
    mdal.find('.modal-body #nomAl').text(alumneNom);
    mdal.find('.modal-body #cursAl').text(alumneCurs)
    mdal.find('.modal-body #cursAlVal').val(alumneCurs).attr("name", "reunionsPares." + i + ".curs");
    mdal.find('.modal-body #reuMestre').text(creat)
    mdal.find('.modal-body #reuMestreVal').val(creat).attr("name", "reunionsPares." + i + ".creat");
    mdal.find('.modal-body #email').val(mail).attr("name", "reunionsPares." + i + ".userMail");
    mdal.find('.modal-body #reuData').attr("name", "reunionsPares." + i + ".date");
    mdal.find('.modal-body #reuConv').attr("name", "reunionsPares." + i + ".convocada");
    mdal.find('.modal-body #reuComp').attr("name", "reunionsPares." + i + ".composicio");
    mdal.find('.modal-body #reuAssist').attr("name", "reunionsPares." + i + ".assistencia");
    mdal.find('.modal-body #reuBody').attr("name", "reunionsPares." + i + ".body");
    mdal.find('.modal-body #reuConcl').attr("name", "reunionsPares." + i + ".conclusions");
    mdal.find('.modal-body #reuData').val(today);
    $('#reunions_Pares').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/reunions-pares/post/" + alumneId + "?_method=put";
      var data = $('#reunions_Pares').serialize();
 
      $.LoadingOverlay("show");
      aPost (urlPost, data);
      });
    });

//READ MODAL
    $('#reuParesModalGet').on('shown.bs.modal', function (e) {
      var actg = $(e.relatedTarget);
      var alumneNom = actg.data('nom');
      var alumneCurs = actg.data('curs');
      var dta = actg.data('dta');
      var mestre = actg.data('creat');
      var convo = actg.data('convo');
      var assist = actg.data('assist');
      var compo = actg.data('compo');
      var body = actg.data('body');
      var conclu = actg.data('concl');
      var mdal = $(this);
      mdal.find('.modal-body #nomAeAl').text(alumneNom);
      mdal.find('.modal-body #cursAeAl').text(alumneCurs);
      mdal.find('.modal-body #reuDataGet').text(dta);
      mdal.find('.modal-body #reuMestreGet').text(mestre);
      mdal.find('.modal-body #reuConvGet').text(convo);
      mdal.find('.modal-body #reuAssistGet').text(assist);
      mdal.find('.modal-body #reuCompoGet').text(compo);
      mdal.find('.modal-body #reuBodyGet').text(body);
      mdal.find('.modal-body #reuConclGet').text(conclu);
    });

//UPDATE MODAL
  $('#reuParesModalUpd').on('shown.bs.modal', function (e) {
    //DISMISS
    $('#modalDiscard').click(
      function(){
        unsaved = false;
        e.preventDefault();
       location.reload();
        $('.modal').removeClass('show');
     })
    //datepicker//
    $('#rDataUpd .input-group.date').datepicker({
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
    var convo = actg.data('convo');
    var comp = actg.data('comp');
    var assist = actg.data('assist');
    var body = actg.data('body');
    var concl = actg.data('concl');

    var mdal = $(this);
    mdal.find('.modal-body #nomAlUpd').text(alumneNom);
    mdal.find('.modal-body #cursAlUpd').text(alumneCurs);
    mdal.find('.modal-body #reuDataUpd').val(dta);
    mdal.find('.modal-body #reuDataUpd').attr("name", "reunionsPares." + i + ".date");
    mdal.find('.modal-body #reuConvUpd').val(convo);
    mdal.find('.modal-body #reuConvUpd').attr("name", "reunionsPares." + i + ".convocatoria");
    mdal.find('.modal-body #reuAssistUpd').val(assist);
    mdal.find('.modal-body #reuAssistUpd').attr("name", "reunionsPares." + i + ".assistencia");
    mdal.find('.modal-body #reuCompUpd').val(comp);
    mdal.find('.modal-body #reuCompUpd').attr("name", "reunionsPares." + i + ".composicio");
    mdal.find('.modal-body #actuBodyUpd').val(body);
    mdal.find('.modal-body #actuBodyUpd').attr("name", "reunionsPares." + i + ".body");
    mdal.find('.modal-body #reuConclUpd').val(concl);
    mdal.find('.modal-body #reuConclUpd').attr("name", "reunionsPares." + i + ".conclusions");

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

    $('#reunions_pares_upd').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/reunions-pares/upd/" + i +"/" + alumneId + "?_method=put";
      var data = $('#reunions_pares_upd').serialize();
      
      $.LoadingOverlay("show");
      aPost (urlPost, data);
      });
    });


//DELETE MODAL (ACTUACIONS)
  $('#reuParesModalDel').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneId = actg.data('id');
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var i = actg.data('i');
    var alumneDta = actg.data('dta');
    var alumneBody = actg.data('body');
    var alumneConcl = actg.data('concl');

    var mdal = $(this);
    mdal.find('.modal-body #nomAlDel').text(alumneNom);
    mdal.find('.modal-body #cursAlDel').text(alumneCurs);
    mdal.find('.modal-body #reuDataDel').text(alumneDta);
    mdal.find('.modal-body #reuBodyDel').text(alumneBody);
    mdal.find('.modal-body #reuConclDel').text(alumneConcl);
    $('#reunions_pares_del').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/reunions-pares/del/" + i +"/" + alumneId + "?_method=put";
      var data = $('#reunions_pares_del').serialize(); 

      $.LoadingOverlay("show");
      aPost (urlPost, data);
      });
    });

///ALERT UNSAVED CHANGES///
    var unsaved = false;
    //Anula el efecto en el Login
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
    if(pth.match("horari-diari")|| pth.match("horari-config") || pth.match("horari-area")){
      window.onbeforeunload = function () {
        $(document).on('change', ':input', function(){ //triggers change in all input fields including text type
          unsaved = true;
        });
      };
    }
    //Algoritmo
    $(window).bind('beforeunload', function() {
        if(unsaved){
            return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
        }
    });
    //Alert unsaved changes
    $('.modal').on('hide.bs.modal', function(e) {
        if(unsaved){
          e.preventDefault();
          $("#alertaDades").removeClass("hidDrop");
          $('.modal').animate({
          scrollTop: $("#alertaDades").offset().top
          }, 2000);
        }
    });
    // Monitor dynamic inputs
    $(document).on('change', ':input', function(){ //triggers change in all input fields including text type
        unsaved = true;
    });


///AJAX FUNCTIONS///
   function aPost(path, obj){
     return   $.ajax({
         url: path, //this is the submit URL
         type: 'POST',
         data: obj
     }).done(function(){
       location.reload();
        $.LoadingOverlay("hide");
        $('.modal').removeClass('show');
     });
   }


});
