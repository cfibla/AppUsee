 $(document).ready(function (){

$(":checkbox").change(function () {
   if($(this).is(':checked')){

   	alert("El checkbox con valor " + $(this).val() + " ha sido seleccionado");

   } else {

   	alert("El checkbox con valor " + $(this).val() + " ha sido deseleccionado");
   	$(this).removeAttr('checked');
   	$(this).val('false');
   }



   // alert('I have been checked');
 });

     });