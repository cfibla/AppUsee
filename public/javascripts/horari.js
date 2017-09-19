$(document).ready(function (){

var today = function(){
  var tday = new Date();
  var dd = tday.getDate();
  var mm = tday.getMonth()+1; //January is 0!
  var yyyy = tday.getFullYear();
  if(dd<10) {
      dd='0'+dd
  } 
  if(mm<10) {
      mm='0'+mm
  } 
  tday = dd+'/'+mm+'/'+yyyy;
  return tday
}
//CREAR HORARI MODAL 
  $('#creaHorariModal').on('shown.bs.modal', function (e) {
      $('#iniciHorari .input-group.date').datepicker({
        format: "dd/mm/yyyy",
        setDate: new Date(),
        maxViewMode: 2,
        todayBtn: "linked",
        daysOfWeekDisabled: "0,6",
        autoclose: true,
        todayHighlight: true,
        language: "ca"  
    });

    $('#finalHorari .input-group.date').datepicker({
        format: "dd/mm/yyyy",
        setDate: new Date(),
        maxViewMode: 2,
        todayBtn: "linked",
        daysOfWeekDisabled: "0,6",
        autoclose: true,
        todayHighlight: true,
        language: "ca"
    });
/*    var actg = $(e.relatedTarget);
    var alumneNom = actg.data('nom');
    var alumneId = actg.data('id');
    var today = actg.data('today');*/
    var mdal =  $(this);
      mdal.find("#inici").val(today);
      mdal.find("#final").val(today);

    $('#crearHorariForm').on('submit', function(e){
      e.preventDefault();
      var urlPost = "/horari-crear";
      var data = $('#crearHorariForm').serialize(); 

      $.LoadingOverlay("show");
      aPost (urlPost, data).always(function(){
        location.href="/horari-config";
      });
      });
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