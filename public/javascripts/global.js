$(document).ready(function (){
   // bind to retrieve old status

    $('input[type="radio"]').mousedown(function() { 
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



    $('#data .input-group.date').datepicker({
    format: "dd/mm/yy",
    maxViewMode: 2,
    todayBtn: "linked",
    language: "ca",
    daysOfWeekDisabled: "0,6",
    autoclose: true,
    todayHighlight: true

});

});
/*
$(":radio").click(function () {
   if($(this).is(':checked')){

      $(this).prop('checked', true);


   } else {

      
      $(this).val('null');
      $(this).prop('checked', false);  

   }

 });
 */


/*$(":submit").click(function () {
   if($("#actuacionsBody").val('')){
      
      $("#actuacionsDate").val('');
   } 
   // alert('I have been checked');
 });

*/