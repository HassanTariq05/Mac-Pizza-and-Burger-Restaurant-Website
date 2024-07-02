import $ from 'jquery';
/* Style Changer */

$(document).ready(function(){ 


	$('#stlChanger').hover(function(){
	    $(this).toggleClass("open");
	});
	
});
