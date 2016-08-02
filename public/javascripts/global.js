 $(document).ready(function (){


 	function checkCond(id){
                  var cc='';
                  if (alumne.checks[id] === true) {
                  cc ="checked";
                  }
                  return cc;
                  }

$(":checkbox").change(function () 
   {
    alert('I have been checked');
    })

     });