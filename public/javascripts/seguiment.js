
//////////////// S E G U I M E N T //////////////// 
$(document).ready(function() {
  localStorage.setItem('changeData','false');
  var changeData = localStorage.getItem('changeData');

  if ( $("#seg").length > 0 ) {

// ACTUACIONS //
//CREATE MODAL (ACTUACIONS)
  $('#actuModal').on('shown.bs.modal', function (e) {
    //DISMISS
    $('#modalDiscard').click(
      function(){
        unsaved = false;
        e.preventDefault();
       location.reload();
        $('.modal').removeClass('show');
     });
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
    }).on('change', function(e){
      unsaved = false;
      localStorage.setItem('changeData','true');
      //console.log('CHANGEDATA datepicker change: ' + localStorage.getItem('changeData'));
      //e.preventDefault();
      //console.log('datepicker change');
      //console.log('UNSAVED datepicker: ' + unsaved)
    });
    
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var actuNum = actg.data('actunum');
    var today = actg.data('today');
    location.hash='';
    var url = location.href;
    var mdal = $(this);
    mdal.find('.modal-body #nomAl').text(alumneNom);
    mdal.find('.modal-body #cursAl').text(alumneCurs);
    mdal.find('.modal-body #actuData').attr("name", "segActuacions." + actuNum + ".date");
    mdal.find('.modal-body #actuBody').attr("name", "segActuacions." + actuNum + ".body");
    mdal.find('.modal-body #actuData').val(today);
    $('#seg_actuacions').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/post/" + alumneId + "?_method=put";
      var data = $('#seg_actuacions').serialize();
      var anchor = 'actuacions';
      $.LoadingOverlay("show");
      ajaxPost (url, urlPost, data, anchor);
      });
    });


//READ MODAL (ACTUACIONS)
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

//UPDATE MODAL (ACTUACIONS)
  $('#actuModalUpd').on('shown.bs.modal', function (e) {
    //DISMISS
    $('#modalDiscard').click(
      function(){
        unsaved = false;
        e.preventDefault();
       location.reload();
        $('.modal').removeClass('show');
     });
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
    }).on('change', function(e){
      unsaved = false;
      localStorage.setItem('changeData','true');
      console.log('CHANGEDATA datepicker change: ' + localStorage.getItem('changeData'));
    });

    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var i = actg.data('i')
    var dta = actg.data('dta');
    var body = actg.data('body');
    location.hash='';
    var url = location.href;
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
      var data = $('#upd_actuacions').serialize();
      var anchor = 'actuacions';
      $.LoadingOverlay("show");
      ajaxPost (url, urlPost, data, anchor);
      });
    });


//DELETE MODAL (ACTUACIONS)
  $('#actuModalDel').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneId = actg.data('id');
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneI = actg.data('i');
    var alumneDta = actg.data('dta');
    var alumneBody = actg.data('body');
    location.hash='';
    var url = location.href;
    var mdal = $(this);
    mdal.find('.modal-body #nomAlDel').text(alumneNom);
    mdal.find('.modal-body #cursAlDel').text(alumneCurs);
    mdal.find('.modal-body #actuDataDel').text(alumneDta);
    mdal.find('.modal-body #actuBodyDel').text(alumneBody);
    $('#del_actuacions').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/" + alumneId + "/actDel/" + alumneI + "?_method=put";
      var data = $('#del_actuacions').serialize(); 
      var anchor = 'actuacions';
      $.LoadingOverlay("show");
      ajaxPost (url, urlPost, data, anchor);
      });
    });

///////// CAD ////////////////
//CREATE MODAL (CAD)
  $('#cadModal').on('shown.bs.modal', function (e) {
    //DISMISS
    $('#modalDiscard').click(
      function(){
        unsaved = false;
        e.preventDefault();
       location.reload();
        $('.modal').removeClass('show');
     });

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
    }).on('change', function(e){
      unsaved = false;
      localStorage.setItem('changeData','true');
      console.log('CHANGEDATA datepicker change: ' + localStorage.getItem('changeData'));
    });

    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var actuNum = actg.data('actunum')
    var today = actg.data('today');
    location.hash='';
    var url = location.href;
    
    var mdal = $(this);
    mdal.find('.modal-body #nomCnAl').text(alumneNom);
    mdal.find('.modal-body #cursCnAl').text(alumneCurs);
    mdal.find('.modal-body #cnData').attr("name", "segInformacioCAD." + actuNum + ".date");
    mdal.find('.modal-body #cnBody').attr("name", "segInformacioCAD." + actuNum + ".body");
    mdal.find('.modal-body #cnData').val(today);
    $('#info_CAD').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/post/" + alumneId + "?_method=put";
      var data = $('#info_CAD').serialize();
      var anchor = 'informacions';
      $.LoadingOverlay("show");
      ajaxPost (url, urlPost, data, anchor);

      });
    });

//READ MODAL (CAD)
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

//UPDATE MODAL (CAD)
  $('#cadModalUpd').on('shown.bs.modal', function (e) {
    //DISMISS
    $('#modalDiscard').click(
      function(){
        unsaved = false;
        e.preventDefault();
       location.reload();
        $('.modal').removeClass('show');
     });
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
    }).on('change', function(e){
      unsaved = false;
      localStorage.setItem('changeData','true');
      console.log('CHANGEDATA datepicker change: ' + localStorage.getItem('changeData'));
    });

    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var i = actg.data('i');
    var dta = actg.data('dta');
    var body = actg.data('body');
    location.hash='';
    var url = location.href;
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
      var data = $('#upd_CAD').serialize();
      var anchor = 'informacions';
      $.LoadingOverlay("show");
      ajaxPost (url, urlPost, data, anchor);
    });
  });

//DELETE MODAL (CAD)
  $('#cadModalDel').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneId = actg.data('id');
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneI = actg.data('i');
    var alumneDta = actg.data('dta');
    var alumneBody = actg.data('body');
    location.hash='';
    var url = location.href;
    var mdal = $(this);
    mdal.find('.modal-body #nomCdAl').text(alumneNom);
    mdal.find('.modal-body #cursCdAl').text(alumneCurs);
    mdal.find('.modal-body #cadDataDel').text(alumneDta);
    mdal.find('.modal-body #cadBodyDel').text(alumneBody);
    $('#del_CAD').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/" + alumneId + "/cadDel/" + alumneI + "?_method=put";
      var data = $('#del_CAD').serialize();
      var anchor = 'informacions';
      $.LoadingOverlay("show");
      ajaxPost (url, urlPost, data, anchor);
    });
  });


///////// ALTRES COORD ////////////////
//CREATE MODAL (ALTRES COORD)
  $('#altresCoordModal').on('shown.bs.modal', function (e) {
    //DISMISS
    $('#modalDiscard').click(
      function(){
        unsaved = false;
        e.preventDefault();
       location.reload();
        $('.modal').removeClass('show');
     });
    // datepicker //
    $('#altresCoordData .input-group.date').datepicker({
        format: "dd/mm/yyyy",
        setDate: new Date(),
        maxViewMode: 2,
        todayBtn: "linked",
        daysOfWeekDisabled: "0,6",
        autoclose: true,
        todayHighlight: true,
        language: "ca"  
    }).on('change', function(e){
      unsaved = false;
      localStorage.setItem('changeData','true');
      console.log('CHANGEDATA datepicker change: ' + localStorage.getItem('changeData'));
    });

    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var altresNum = actg.data('altresnum');
    var today = actg.data('today');
    location.hash='';
    var url = location.href;
    var mdal = $(this);
    mdal.find('.modal-body #nomAlnAl').text(alumneNom);
    mdal.find('.modal-body #cursAlnAl').text(alumneCurs);
    mdal.find('.modal-body #altresData').attr("name", "segAltresCoord." + altresNum + ".date");
    mdal.find('.modal-body #altresBody').attr("name", "segAltresCoord." + altresNum + ".body");
    mdal.find('.modal-body #altresData').val(today);
    $('#altres_coord').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/post/" + alumneId + "?_method=put";
      var data =  $('#altres_coord').serialize();
      var anchor = 'coordinacions';
      $.LoadingOverlay("show");
      ajaxPost (url, urlPost, data, anchor);
    });
  });

//READ MODAL (ALTRES COORD)
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

//UPDATE MODAL (ALTRES COORD)
  $('#altresCoordModalUpd').on('shown.bs.modal', function (e) {
    //DISMISS
    $('#modalDiscard').click(
      function(){
        unsaved = false;
        e.preventDefault();
       location.reload();
        $('.modal').removeClass('show');
     });
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
    }).on('change', function(e){
      unsaved = false;
      localStorage.setItem('changeData','true');
      console.log('CHANGEDATA datepicker change: ' + localStorage.getItem('changeData'));
    });
    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneId = actg.data('id');
    var i = actg.data('i');
    var dta = actg.data('dta');
    var body = actg.data('body');
    location.hash='';
    var url = location.href;
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
      var data =  $('#upd_altres').serialize();
      var anchor = 'coordinacions';
      $.LoadingOverlay("show");
      ajaxPost (url, urlPost, data, anchor);
    });
  });


//DELETE MODAL (ALTRES COORD)
  $('#altresCoordModalDel').on('shown.bs.modal', function (e) {
    var actg = $(e.relatedTarget);
    var alumneId = actg.data('id');
    var alumneNom = actg.data('nom');
    var alumneCurs = actg.data('curs');
    var alumneI = actg.data('i');
    var alumneDta = actg.data('dta');
    var alumneBody = actg.data('body');
    location.hash='';
    var url = location.href;
    var mdal =  $(this);
    mdal.find('.modal-body #nomAldAl').text(alumneNom);
    mdal.find('.modal-body #cursAldAl').text(alumneCurs);
    mdal.find('.modal-body #altresDataDel').text(alumneDta);
    mdal.find('.modal-body #altresBodyDel').text(alumneBody);
    $('#del_altres').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/seguiment-EE/" + alumneId + "/altresDel/" + alumneI + "?_method=put";
      var data = $('#del_altres').serialize();
      var anchor = 'coordinacions';
      $.LoadingOverlay("show");
      ajaxPost (url, urlPost, data, anchor);
      });
    });

///AJAX FUNCTION///
   function ajaxPost(ur, path, obj, anchor){
     return   $.ajax({
         url: path, //this is the submit URL
         type: 'POST',
         data: obj
     }).done(function(){
        var urlLong = ur+anchor;
       window.location.href = urlLong;
       location.reload();
        $.LoadingOverlay("hide");
        $('.modal').removeClass('show');
     });
   }
  }
});