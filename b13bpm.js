var $bpmfile = $('#bpmPasted');
var $bpmfromfile = $('#bpmFromFile');

$("input[name='bpmbpm']").on('change', function(e) {
   var target = e.currentTarget;
   var file = (target.files[0]);
   var reader = new FileReader();
   var sizef = file.size;
   $bpmfile.html(" ");
   if (target.files && file && sizef < 3) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $bpmfromfile.val(e.target.result);
        }

        reader.readAsText(file);
    }
});