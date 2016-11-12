var template = '<div class="col s12 m4">' +
		    '<div class="card horizontal hoverable">' +
		      	'<div class="card-stacked">' +
		        	'<div class="card-content amber white-text">' +
		          		'<p>Hi, my name is <strong>{{name}}</strong></p>' +
		        	'</div>' +
			        '<div class="card-action">' +
			          	'<a data-show-url="{{url}}" class="about" >See more about me</a>' +
			        '</div>' +
			    '</div>' +
	    	'</div>' +
	  	'</div>';
$(document).ready(function(){
  /*
  var formatResponse = function (response){
  //$.getJSON("http://swapi.co/api/people/", function(response){
   // console.log(response);
    //$("#total").text(response.count);
    $("#total").text(response.results.length);
    var personajes = "";
    $.each(response.results, function(i, personaje){
      personajes += template
        .replace("{{name}}", personaje.name)
        .replace("{{url}}", personaje.url);
    });
    $("#people").html(personajes);
    $("#next").attr("data-url", response.next);
    $("#previous").attr("data-url", response.previous);
    

    if(!response.previous){
            $("#previous").fadeOut();
            }else{
              $("#previous").fadeIn();
            };
   if(!response.next){
          $("#next").fadeOut();
          }else{
            $("#next").fadeIn();
          };
};
            
    $.getJSON("http://swapi.co/api/people/", formatResponse);*/

   var formatResponseSpecie = function (response){
     $.each(response.results, function(i, specie){
       var numPeople = "";
       var url = "http://swapi.co/api/people/";
       $.each(specie.people, function(i, link){
				numPeople += link.replace(url, "").replace("/",",");
			});
      $("#species").append('<option value = "' + numPeople.slice(0,-1) + '">' + specie.name + '</option>');
     });   
   };
  
   $.getJSON("https://swapi.co/api/species/", formatResponseSpecie);
  
    var cards = function (response){
         var personaje  = "";
         personaje += template.replace("{{name}}", response.name);
         $("#people").append(personaje);
        console.log(response.name);
      
       };
  
    $("#species").change(function(event){
      console.log($(this).val());
      var numEsp = $(this).val().split(",");
      $("#people").html("");
      for(var i=0; i< numEsp.length; i++){
        var nuevoLink = "https://swapi.co/api/people/" + numEsp[i] + "/" ; 
        $.getJSON(nuevoLink, cards);
      };
    });
});
   
   
   