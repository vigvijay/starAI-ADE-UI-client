$(document).ready(function() {
  $("#search2").hide();
  $("#search2Label").hide();
  $('#form1')
      .ajaxForm({
          url : '/q', // or whatever
          dataType : 'json',
          success : function (response) {
              //console.log("The server says: " + response);
              $('#textarea').text((response));
          }
      });
  $("#select2").change(function () {
        var end = this.value;
        //var firstDropVal = $('#pick').val();
        if(end != "ts"){
          $("#search2").hide();
          $("#search2Label").hide();
          if(end != "fda"){
            $("#radio_grp").hide();
          }
          else{
            $("#radio_grp").show();
          }
        }
        else {
          $("#search2").show();
          $("#search2Label").show();
        }
    });

  $("#copy").click(function (){
//holdtext.innerText = copytext.innerText;
var copyTextarea = document.querySelector('.js-copytextarea');
 copyTextarea.select();
 console.log(copyTextarea);
 try {
   var successful = document.execCommand('copy');
   var msg = successful ? 'successful' : 'unsuccessful';
   console.log('Copying text command was ' + msg);
 } catch (err) {
   console.log('Oops, unable to copy');
 }
 });
});
