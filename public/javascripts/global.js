$(document).ready(function (){
///////// LABEL ACTIVE ///////////////
  function checkForInput(element) {
    let $label = $(element).siblings('label');
    let labelOBj = JSON.stringify($label);
    if ($(element).val().length > 0) {

      $label.addClass('active');

    } else {

      $label.removeClass('active');
      
    }
  }

// The lines below are executed on page load
  $('input').each(function() {
    checkForInput(this);
    console.log('Check input: ' + JSON.stringify($(this)));
  });

  // The lines below (inside) are executed on change & keyup
  $('input').on('change keyup', function() {
    checkForInput(this);  
    console.log('Check keyup: ' + $(this).val());
  });

  //NAVBAR
  let pth = window.location.pathname; // Returns path only
  let userMestre = localStorage.getItem('userMestre');

  if(pth==="/admin"){
    //$("#llista").addClass("navcolor");
    //$("#horari-menu").removeClass("navcolor");
    $("#situ").html("ADMIN");
    $("#a1").html("General").attr('href', "/admin");
    $("#a2").html("Usuaris").attr('href', "/admin-users");
    $("#a3").html("Escoles").attr('href', "/admin-escoles");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#a3div").removeClass("navcolorside");
    $("#a4div").removeClass("navcolorside");
    $("#form-nav").addClass("hidden");
  }

  if(pth==="/admin-users"){
    //$("#llista").addClass("navcolor");
    //$("#horari-menu").removeClass("navcolor");
    $("#situ").html("ADMIN");
    $("#a1").html("General").attr('href', "/admin");
    $("#a2").html("Usuaris").attr('href', "/admin-users");
    $("#a3").html("Escoles").attr('href', "/admin-escoles");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").addClass("navcolorside");
    $("#a3div").removeClass("navcolorside");
    $("#a4div").removeClass("navcolorside");
    $("#form-nav").addClass("hidden");
  }

  if(pth==="/list"){
    $("#llista").addClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#situ").html("Llista");
    $("#a1tutor").html("Tutoria").attr('href', "/list").addClass("navcolorside");
    $("#a2tutor").html("Assistència").attr('href', "/assistencia");
    $("#a3tutor").html("Menjador").attr('href', "/menjador");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#a3div").removeClass("navcolorside");
    $("#a4div").removeClass("navcolorside");
    $("#areasDrop").addClass("hidDrop");
  }
  if(pth==="/assistencia"||pth==="/assisData"){
    $("#llista").addClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#assistencia").addClass("navcolor");
    $("#situ").html("Llista");
    $("#a1tutor").html("Tutoria").attr('href', "/list");
    $("#a2tutor").html("Assistència").attr('href', "/assistencia").addClass("navcolorside");
    $("#a3tutor").html("Menjador").attr('href', "/menjador");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#a3div").removeClass("navcolorside");
    $("#a4div").removeClass("navcolorside");
    $("#areasDrop").addClass("hidDrop");
  }
  if(pth==="/menjador"){
    $("#llista").addClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#situ").html("Llista");
    $("#a1tutor").html("Tutoria").attr('href', "/list");
    $("#a2tutor").html("Assistència").attr('href', "/assistencia");
    $("#a3tutor").html("Menjador").attr('href', "/menjador").addClass("navcolorside");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#a3div").removeClass("navcolorside");
    $("#a4div").removeClass("navcolorside");
    $("#areasDrop").addClass("hidDrop");
  }

  if(pth==="/list_EE"||pth==="/list-valorats"){
    $("#llista").addClass("navcolor");
    //$("#horari-menu").removeClass("navcolor");
    $("#situ").html("Atenció a la diversitat");
    $("#a1ee").html("Alumnes SIEI").attr('href', "/list_EE");
    $("#a2ee").html("Valorats").attr('href', "/list-valorats");
    $("#a1div").addClass("navcolorside");
    $("#areasDrop").addClass("hidDrop");
    $("#cursosDrop").removeClass("hidDrop");
  }

  if(pth === "/cerca-cognom") {
    if (userMestre == '"tutor"'){
      $("#llista").addClass("navcolor");
      $("#horari-menu").removeClass("navcolor");
      $("#situ").html("Llista tutoria");
      $("#a1tutor").html("Tutoria").attr('href', "/list");
      $("#a2tutor").html("Assistència").attr('href', "/assistencia");
      $("#a3tutor").html("Menjador").attr('href', "/menjador");
      $("#a1div").removeClass("navcolorside");
      $("#a2div").removeClass("navcolorside");
      $("#a3div").removeClass("navcolorside");
      $("#a4div").removeClass("navcolorside");
      $("#areasDrop").addClass("hidDrop");
    }
    if (userMestre == '"ee"') {
      $("#llista").addClass("navcolor");
      $("#situ").html("Atenció a la diversitat");
      $("#a1ee").html("Alumnes SIEI").attr('href', "/list_EE");
      $("#a2ee").html("Valorats").attr('href', "/list-valorats");
      $("#a1div").addClass("navcolorside");
      $("#areasDrop").addClass("hidDrop");
      $("#cursosDrop").removeClass("hidDrop");
    }
  }

  if(pth.match("/list_EE/")){
    let areaUrl = pth.split("/");
    let decodeUrl = decodeURIComponent(areaUrl[2]);
    $("#llista").addClass("navcolor");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    //$("#horari-menu").addClass("navcolor");
    $("#situ").html("Atenció a la diversitat");
    $("#situ2").html(decodeUrl);
    $("#a1ee").html("Alumnes SIEI").attr('href', "/list_EE");
    $("#a2ee").html("Valorats").attr('href', "/list-valorats");
    $("#a2").addClass("hidBig");
    $("#a1div").addClass("hidBig hidden");
    $("#a2div").addClass("hidBig");
    $("#a3div").addClass("hidBig");
    $("#a4div").addClass("hidBig");
    $("#cursosDrop").removeClass("hidDrop");
    $("#cursosDrop").addClass("navcolorside");
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
    $("#form-nav").addClass("hidden");
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
    $("#form-nav").addClass("hidden");
  }
  if(pth.match("/reunions-pares")){
    $("#llista").removeClass("navcolor");
    $("#situ").html("Reunions pares");
  }
  if(pth.match("/seguiment-EE/actuacions/")){
    let areaUrl = pth.split("/");
    let id = decodeURIComponent(areaUrl[3]);
    $("#llista").removeClass("navcolor");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#situ").html("Actuacions");
    $("#a1ee").html("Actuacions");
    $("#a2ee").html("Reunions CAD").attr('href', "/seguiment-EE/cad/" + id);
    $("#a3ee").html("Altres Coordinacions").attr('href', "/seguiment-EE/altres/" + id);
    $("#a1div").addClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#a3div").removeClass("hidBig");
    $("#a4div").addClass("hidBig");
    $("#a1nav").html("Actuacions");
    $("#a2nav").html("Reunions CAD").attr('href', "/seguiment-EE/cad/" + id);
    $("#a3nav").html("Altres Coordinacions").attr('href', "/seguiment-EE/altres/" + id);
    $("#a1divnav").addClass("navcolorside").removeClass("hidDrop");
    $("#a2divnav").removeClass("navcolorside hidDrop");
    $("#a3divnav").removeClass("hidBig hidDrop");
  }
  if(pth.match("/seguiment-EE/cad/")){
    let areaUrl = pth.split("/");
    let id = decodeURIComponent(areaUrl[3]);
    $("#llista").removeClass("navcolor");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#situ").html("Reunions CAD");
    $("#a1ee").html("Actuacions").attr('href', "/seguiment-EE/actuacions/" + id);
    $("#a2ee").html("Reunions CAD");
    $("#a3ee").html("Altres Coordinacions").attr('href', "/seguiment-EE/altres/" + id);
    $("#a1div").removeClass("navcolorside");
    $("#a2div").addClass("navcolorside");
    $("#a3div").removeClass("hidBig");
    $("#a4div").addClass("hidBig");
    $("#a1nav").html("Actuacions").attr('href', "/seguiment-EE/actuacions/" + id);
    $("#a2nav").html("Reunions CAD");
    $("#a3nav").html("Altres Coordinacions").attr('href', "/seguiment-EE/altres/" + id);
    $("#a1divnav").removeClass("navcolorside hidDrop");
    $("#a2divnav").addClass("navcolorside").removeClass("hidDrop");
    $("#a3divnav").removeClass("hidBig hidDrop");
  }
  if(pth.match("/seguiment-EE/altres/")){
    let areaUrl = pth.split("/");
    let id = decodeURIComponent(areaUrl[3]);
    $("#llista").removeClass("navcolor");
    $("#assistencia").removeClass("navcolor");
    $("#menjador").removeClass("navcolor");
    $("#horari-menu").removeClass("navcolor");
    $("#situ").html("Altres Coord.");
    $("#a1ee").html("Actuacions").attr('href', "/seguiment-EE/actuacions/" + id);
    $("#a2ee").html("Reunions CAD").attr('href', "/seguiment-EE/cad/" + id);
    $("#a3ee").html("Altres Coordinacions");
    $("#a1div").removeClass("navcolorside");
    $("#a2div").removeClass("navcolorside");
    $("#a3div").removeClass("hidBig").addClass("navcolorside");
    $("#a4div").addClass("hidBig");
    $("#a1nav").html("Actuacions").attr('href', "/seguiment-EE/actuacions/" + id);
    $("#a2nav").html("Reunions CAD").attr('href', "/seguiment-EE/cad/" + id);
    $("#a3nav").html("Altres Coordinacions");
    $("#a1divnav").removeClass("navcolorside hidDrop");
    $("#a2divnav").removeClass("navcolorside hidDrop");
    $("#a3divnav").removeClass("hidBig hidDrop").addClass("navcolorside");
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
    $("#desaButton").removeClass("hidBig").attr('form', "horari_post");
    $("#horariDiariPost_2").removeClass("hidDrop");
    $("#form-nav").addClass("hidden");
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
    $("#desaButton").removeClass("hidBig").attr('form', "horari_diari_post");
    $("#horariDiariPost_2").removeClass("hidDrop");
    $("#form-nav").addClass("hidden");
  }
  if(pth.match("/horari-area/")){
    let areaUrl = pth.split("/");
    let decodeUrl = decodeURIComponent(areaUrl[2]);
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
    $("#desaButton").removeClass("hidBig").attr('form', "areas_post");
    $("#areasPost_2").removeClass("hidDrop");
    $("#form-nav").addClass("hidden");
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
              let radio = this;
              // apparently if you do it immediatelly, it will be overriden, hence wait a tiny bit
              setTimeout(function() { 
                  radio.checked = false; 
              }, 5); 
              // don't handle mouseup anymore unless bound again
              $(this).unbind('mouseup');
          });
      }
  });

////////////////////LOGIN MODAL///////////////////////////
  $('#loginModal').on('shown.bs.modal', function (e) {
    let actg = $(e.relatedTarget);
    //let userId = actg.data('id');
    //let mestre = actg.data('mestre');
    let mdal = $(this);

    $('#loginModal #login-form-link').click(function(e) {
      console.log('login-form');
      $("#login-form").delay(100).fadeIn(100);
      $("#formUser").fadeOut(100);
      $('#register-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
  $('#loginModal #register-form-link').click(function(e) {
    console.log('register-form');
    $("#formUser").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });
//LOGIN FORM -- Validación
  $('#login-form').on('submit', function(e){
    let name = $("#usrname").val();
    let pwd = $("#psw").val();
    let loginData ={'email': name, 'password': pwd};
    console.log('LOGINDATA: ' + JSON.stringify (loginData));

    if( name =='' || pwd ==''){
      e.preventDefault();
      $('#login-alert').removeClass('hidDrop');
      $('#login-alert').html("Heu d'omplir tots els apartats");
    } else {
      e.preventDefault();
      $.ajax({
        type : 'POST',
        url : '/login',
        data : loginData,
        success: function(text){
          if(text == "error login"){
            $('#login-alert').removeClass('hidDrop').fadeIn('slow');;
            $('#login-alert').html('Usuari o contrasenya incorrectes');
          } else {
            $.LoadingOverlay("hide");
            $('.modal').removeClass('show');
            location.href = text;
          }
        }
      });
    }
  });
///// CREATE USER -- Registro
    $('#formUser').on('submit', function(e){
      console.log('formUser');
      e.preventDefault();
      $.LoadingOverlay("show");
      let urlPost = "/usuari_crear";
      let data = $('#formUser').serialize();

      let destUrl;
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
});

//LOGIN DEMO
  $('#login-mestre').on('submit', function(e){
    let name = 'demo@demo.cat';
    let pwd = 'demo';
    let loginData ={'email': name, 'password': pwd};
    console.log('LOGINDATA: ' + JSON.stringify (loginData));
    e.preventDefault();
    $.ajax({
      type : 'POST',
      url : '/login',
      data : loginData,
      success: function(text){
          location.href = text;
      }
    });
  });

//LOGIN DEMO-EE
  $('#login-ee').on('submit', function(e){
    let name = 'demoee@demo.cat';
    let pwd = 'demo';
    let loginData ={'email': name, 'password': pwd};
    console.log('LOGINDATA: ' + JSON.stringify (loginData));
    e.preventDefault();
    $.ajax({
      type : 'POST',
      url : '/login',
      data : loginData,
      success: function(text){
          location.href = text;
      }
    });
  });

///////////////////// M O D A L S ///////////////////// 
  $('body').on('click.modal.data-api', '[data-toggle="modal"]', function(){
     $($(this).data("target")+' .modal-content').load($(this).attr('href'));
   }); 
  $('document').on('hidden.bs.modal', function () {
      $('.modal-body .modal-footer').html("");
    });

///////// U S E R S //////////////

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
    let actg = $(e.relatedTarget);
    let userId = actg.data('id');
    let mestre = actg.data('mestre');
  
    $('#del_user').on('submit', function(e){
      e.preventDefault();
      $.LoadingOverlay("show");
      if (mestre==="tutor"){
      let urlPost = "/usuariD/" + userId + "?_method=put";
      }
      if (mestre==="ee"){
      let urlPost = "/usuari_ee_D/" + userId + "?_method=put";
      }
      let data = $('#del_user').serialize();
      aPost(urlPost, data);
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

    let actg = $(e.relatedTarget);
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
    var valorat = actg.data('valorat');
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
    var valorat = funcSel(valorat);
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
      let op1, val1, op2, val2;
      if (v===true){
        op1="Si"; val1=true;
        op2="No"; val2=false;
      } else {
        op1="No"; val1=false;
        op2="Si"; val2=true;        
      }
      return[op1, val1, op2, val2]
    };

    function funcSeg (v){
      let op1, val1, op2, val2;
      if (v===true){
        op1="Directe"; val1=true;
        op2="Indirecte"; val2=false;
      } else {
        op1="Indirecte"; val1=false;
        op2="Directe"; val2=true;        
      }
      return[op1, val1, op2, val2]
    };

    let mdal = $(this);
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
    mdal.find('.modal-body #val_ad_alumne1').text(valorat[0]).val(valorat[1]);
    mdal.find('.modal-body #val_ad_alumne2').text(valorat[2]).val(valorat[3]);
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
    let derivArray =[der, "Tutor", "Família", "Atenció a la diversitat"];
    let divder = $("#qui_fa_derivacio");
    $.each(derivArray, function(){
      divder.append($("<option />").val(this).text(this));
    });

    $('#alumne_dades').on('submit', function(e){
      e.preventDefault();
      $.LoadingOverlay("show");
      let urlPost = "/dadesUpdate/" + alumneId + "?_method=put";
      let data = $('#alumne_dades').serialize();
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
      /*
    $('#eeUsee').change(function(){
      if ($('#eeUsee').val()==='true'){
        $("#divDiv").show();
      } else {
        $("#divDiv").hide();
      }
    });
    */

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

//MODAL NOU ALUMNE
  $('#afegirModal').on('shown.bs.modal', function (e) {
    console.log('HOLA 1');
    let actg = $(e.relatedTarget);
    let mdal = $(this);
    let escola = actg.data('escola');
    let alumneCurs = actg.data('curs');
    let usr = actg.data('usr');
    let v_alumneCurs;
    if (usr === "ee") {
      mdal.find(".modal-body #val-1").text('Si').val(true);
      mdal.find(".modal-body #val-2").text('No').val(false);
      mdal.find(".modal-body #ad-1").text('Si').val(true);
      mdal.find(".modal-body #ad-2").text('No').val(false);
      alumneCurs = "Seleccioneu curs";
      v_alumneCurs = null;
      if(pth==="/list-valorats"){
        mdal.find(".modal-body #val-1").text('Si').val(true);
        mdal.find(".modal-body #val-2").text('No').val(false);
        mdal.find(".modal-body #ad-1").text('No').val(false);
        mdal.find(".modal-body #ad-2").text('False').val(true);
      }
    } else {
      mdal.find(".modal-body #val-1").text('No').val(false);
      mdal.find(".modal-body #val-2").text('Si').val(true);
      mdal.find(".modal-body #ad-1").text('No').val(false);
      mdal.find(".modal-body #ad-2").text('Si').val(true);
      v_alumneCurs = alumneCurs;
    };

    mdal.find(".modal-body #cdEscola").val(escola);
    mdal.find(".modal-body #opc").text(alumneCurs).val(v_alumneCurs);

//NOU ALUMNE -- Validación
  $('#dadesAlumne').on('submit', function(e){
    let nom = $("#nom_alumne").val();
    let cognom1 = $("#cognom1_alumne").val();
    let cognom2 = $("#cognom2_alumne").val();
    let alumneData = $('#dadesAlumne').serialize();

    if( !nom|| !cognom1){
      e.preventDefault();
      $('#nouAlumne-alert').removeClass('hidDrop');
      $('#nouAlumne-alert').html("Falta el nom o el cognom!");
    } else {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/alumneNou',
        data: alumneData,
        success: function(text){
          if(text == "existeix"){
            $('#nouAlumne-alert').removeClass('hidDrop').fadeIn('slow');;
            $('#nouAlumne-alert').html('Aquest alumne ja existeix. Feu la cerca pel cognom en la barra superior i podreu modificar les seves dades');
          } else {
           $.LoadingOverlay("hide");
           $('.modal').removeClass('show');
           location.href = text;
          }
        }
      });
    }
  });
});
//comprova si existeix l'alumne
/*
    $(function(){
        $('#dadesAlumne').on('submit', function(e) {
            e.preventDefault();
            let data =  $(this).serialize();
            $.get('/localLogin', data, function(result) {
                if(result.valid == true)
                {
                    window.location.href = '/profile';
                }
                else
                {
                    $('#loginPopup').html(result);
                }
            });
        });
    });
*/
/*
    $('#dadesAlumne').on('submit', function(e){
        e.preventDefault();
        $.LoadingOverlay("show");
        let urlPost = "/alumneNou";
        let data = $('#dadesAlumne').serialize();
        aPost(urlPost, data);
    });
*/


//MODAL DELETE ALUMNES
  $('#deleteModal').on('shown.bs.modal', function (e) {
    let actg = $(e.relatedTarget);
    let alumneId = actg.data('id');
    let alumneNom = actg.data('nom');
    let mdal = $(this);
    mdal.find(".modal-body #nomAlDel").text(alumneNom);
    $('#del_alum').on('submit', function(e){
      e.preventDefault();
      $.LoadingOverlay("show");
      let urlPost = "/dades_suprD/" + alumneId + "?_method=put";
      let data = $('#del_alum').serialize();
      aPost(urlPost, data);
    });
  });

//MODAL alta ALUMNES
  $('#altaModal').on('shown.bs.modal', function (e) {
    let actg = $(e.relatedTarget);
    let alumneId = actg.data('id');
    let alumneNom = actg.data('nom');
    let mdal = $(this);
    mdal.find(".modal-body #nomAlAl").text(alumneNom);
    $('#alt_alum').on('submit', function(e){
      e.preventDefault();
      $.LoadingOverlay("show");
      let urlPost = "/dades_alta/" + alumneId + "?_method=put";
      let data = $('#alt_alum').serialize();
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
    let actg = $(e.relatedTarget);
    let alumneNom = actg.data('nom');
    let alumneId = actg.data('id');
    let today = actg.data('today');
    let mdal =  $(this);
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
    let actg = $(e.relatedTarget);
    let alumneNom = actg.data('nom');
    let alumneCurs = actg.data('curs');
    let alumneId = actg.data('id');
    let creat = actg.data('creat');
    let mail = actg.data('mail');
    let i = actg.data('i');
    let today = actg.data('today');

    if (typeof(i)=== "undefined"){
      i = 0;
    }

    let mdal = $(this);
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
      let urlPost = "/reunions-pares/post/" + alumneId + "?_method=put";
      let data = $('#reunions_Pares').serialize();
 
      $.LoadingOverlay("show");
      aPost (urlPost, data);
      });
    });

//READ MODAL
    $('#reuParesModalGet').on('shown.bs.modal', function (e) {
      let actg = $(e.relatedTarget);
      let alumneNom = actg.data('nom');
      let alumneCurs = actg.data('curs');
      let dta = actg.data('dta');
      let mestre = actg.data('creat');
      let convo = actg.data('convo');
      let assist = actg.data('assist');
      let compo = actg.data('compo');
      let body = actg.data('body');
      let conclu = actg.data('concl');
      let mdal = $(this);
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
    let actg = $(e.relatedTarget);
    let alumneNom = actg.data('nom');
    let alumneCurs = actg.data('curs');
    let alumneId = actg.data('id');
    let i = actg.data('i')
    let dta = actg.data('dta');
    let convo = actg.data('convo');
    let comp = actg.data('comp');
    let assist = actg.data('assist');
    let body = actg.data('body');
    let concl = actg.data('concl');

    let mdal = $(this);
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
      let urlPost = "/reunions-pares/upd/" + i +"/" + alumneId + "?_method=put";
      let data = $('#reunions_pares_upd').serialize();
      
      $.LoadingOverlay("show");
      aPost (urlPost, data);
      });
    });


//DELETE MODAL (ACTUACIONS)
  $('#reuParesModalDel').on('shown.bs.modal', function (e) {
    let actg = $(e.relatedTarget);
    let alumneId = actg.data('id');
    let alumneNom = actg.data('nom');
    let alumneCurs = actg.data('curs');
    let i = actg.data('i');
    let alumneDta = actg.data('dta');
    let alumneBody = actg.data('body');
    let alumneConcl = actg.data('concl');

    let mdal = $(this);
    mdal.find('.modal-body #nomAlDel').text(alumneNom);
    mdal.find('.modal-body #cursAlDel').text(alumneCurs);
    mdal.find('.modal-body #reuDataDel').text(alumneDta);
    mdal.find('.modal-body #reuBodyDel').text(alumneBody);
    mdal.find('.modal-body #reuConclDel').text(alumneConcl);
    $('#reunions_pares_del').on('submit', function(e){
      e.preventDefault();
      let urlPost = "/reunions-pares/del/" + i +"/" + alumneId + "?_method=put";
      let data = $('#reunions_pares_del').serialize(); 

      $.LoadingOverlay("show");
      aPost (urlPost, data);
      });
    });


  //Control dates
  /*
  let inici = $('#inici'),
      final = $('#final');
      $(document).on('change', '#final', function(){
        unsaved = false;
        console.log('INICI'+inici);
        console.log('FINAL'+JSON.stringify(final));/*
        console.log(final.diff(inici, 'days'));
        if (final.diff(inici, 'days')<13){
          console.log("ERROR: MENOS DE DOS SEMANAS");
          $('#alertaDades').removeClass('hidDrop')
          final = moment(inici).add(14,'days');
        }
      });
*/

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
