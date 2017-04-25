// Remove Items From Cart
$('a.remove').click(function() {
  event.preventDefault();
  $(this).parent().parent().parent().hide(400);
  var id = $(this).data('id');
  var url = '/delete/'+id;
  $.ajax({
  	url:url,
  	type:'DELETE',
  	success: function(result){
  		window.location.href='/';
  	}
  });
})

$( document ).ready(function() {
    	var Amount = document.getElementById("quantity").getAttribute("placeholder");
    	var Price = document.getElementById("price").innerHTML;
    	var parts = Price.split('$');
    	Price = parts[parts.length -1];
    	Price = parseInt(Price);
    	var Total = "$" + Amount*Price;
    	document.getElementById("total").innerHTML = Total;
});

$('#quantity').on("input", function() { 
	var id = $(this).data('id');
  	var url = '/update/'+id;
  	var number = $('#quantity').val();
  	$.ajax({
  		url:url,
  		amount:number,
  		type:'UPDATE',
  		success: function(result){
  			window.location.href='/';
  	}
  });
});
