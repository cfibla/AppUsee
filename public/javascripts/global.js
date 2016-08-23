$(document).ready(function (){


$(":submit").click(function () {
   if($("actuacionsBody").val('')){

   	
   	$("actuacionsDate").val('');


   } 

	

   // alert('I have been checked');
 });



/*
$(":radio").change(function () {
   if($(this).is(':checked')){

   	alert("El checkbox con valor " + $(this).val() + " ha sido seleccionado");
   	$(this).prop('checked', true);

   } else {

   	alert("El checkbox con valor " + $(this).val() + " ha sido deseleccionado");

   	$(this).val('null');
   	$(this).prop('checked', false);
   }



   // alert('I have been checked');
 });


*/
});