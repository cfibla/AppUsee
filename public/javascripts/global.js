 $(document).ready(function (){

$(":checkbox").change(function () 
   {
    alert('I have been checked');
    })

     });

 function checkCond(id){
                  var cc='';
                  if (alumne.checks[id] === true) {
                  cc ="checked";
                  }
                  return cc;
                  }