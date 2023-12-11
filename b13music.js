var $audio = $('#myAudio');
var $lyrics = $('#lyricsFromFile');
var $bpm = $('#bpmFromFile');

$("input[name='music']").on('change', function(e) {

   var target = e.currentTarget;
   var files2 = $('#allthree')[0].files; 
   /* var file = target.files[0]; */

   if (target.files ) {
   $.each(files2, function () {

          var file = this;

          var fileName = this.name.toLowerCase();
          var aFileSplit = fileName.split('.');
          console.log("aaaa: " + aFileSplit);
          var fileExt = aFileSplit.pop();
          var myType = aFileSplit.pop();
          console.log("name this.type myType: " + this.name + "xx " + this.type  + " xx " + myType  );

          /* audio/mpeg text/plain */ 
          /* console.log("size: " + this.size); 
          console.log("type: " + this.type); 
          console.log("ext: " + fileExt); 
          console.log("myType: " + myType); 
          */

          if(  ( myType === 'lyrics' ) || ( myType === 'bpm' ) ) { }
          else {
             console.log("on M:" + fileName );
             var reader1 = new FileReader();
             reader1.onload = function (ee) { 
                 $audio.attr('src', ee.target.result); /* $audio.play(); */ };
             reader1.readAsDataURL(file); 
          };

          if ( myType === 'lyrics' ) {
             console.log("on L:" + fileName );
             var reader2 = new FileReader();
             reader2.onload = function (e2) { 
                   $lyrics.val(e2.target.result); };
             reader2.readAsText(file);
          };

          if ( myType === 'bpm' ) {
             console.log("on B:" + fileName );
             var reader3 = new FileReader();
             reader3.onload = function (e3) { 
             $bpm.val(e3.target.result); };
             reader3.readAsText(file);
          };


   });
   };

});
