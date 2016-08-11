$(document).ready(function (){


//$(":radio").change(function () {
   if($("input:radio[name = radios.2]").val('true')){

   	
   	$("input:text[name = percentDim]").prop('disabled', false);
   	$("input:text[name = percentDim]").val('');

   } 

	if($("input:radio[name = radios.3]").val('false')){

   	
   	$("input:text[name = motiuDic]").prop('disabled', true);
   	$("input:text[name = motiuDic]").val('');

   } 


   // alert('I have been checked');
 //});



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