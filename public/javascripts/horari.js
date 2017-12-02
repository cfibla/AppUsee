$(document).ready(function (){

  var today;
    var tday = new Date();
    var dd = tday.getDate();
    var mm = tday.getMonth()+1; //January is 0!
    var yyyy = tday.getFullYear();
    if(tday.getDay() == 6 && dd < 26){
      dd = dd + 2;
    }
    if(tday.getDay() == 6 && dd >= 26){
      dd = dd - 1;
    }
    if(tday.getDay() == 0 && dd < 26){
      dd = dd + 1;
    }
    if(tday.getDay() == 0 && dd >= 26){
      dd = dd - 2;
    }
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    today = dd+'/'+mm+'/'+yyyy;

//CREATE HORARI MODAL 
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
      })
      console.log('DATA JQUERY: '+data);
    });
  });
//UPDATE HORARI
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
  //TimePICKER

//HORARI DIARI
  //Textarea dinamica
    $('.horaritext').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });

  //scroll
    if($("#horariMain").length){
    var tooday = today.replace(/\//g, "");
    console.log("#div_"+tooday);
            $("html, body").animate({
            scrollTop: $("#div_"+tooday).offset().top - 80
        }, 2000);
    }

//HORARI ÀREES
  //Textarea dinamica
    $('.areestext').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });

  //scroll
    if($("#areesMain").length){
    var tooday = today.replace(/\//g, "");
    console.log("#div_"+tooday);
            $("html, body").animate({
            scrollTop: $("#div_"+tooday).offset().top - 80
        }, 2000);
    }

    //POST
/*    $('#horariDiariPost').on('click', function(){
      var urlPost = "/horari-diari-post?_method=put";
      var data = $('#horari_post').serialize();
      aPost(urlPost, data);
    })
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