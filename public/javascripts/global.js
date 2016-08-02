 $(document).ready(function (){

$(":checkbox").change(function () 
   {
   

    if('input[type=checkbox]').is(':checked')){
   $(this).prop('checked',true);
 }else{
   $(this).prop('checked',false);



   // alert('I have been checked');
    })

     });