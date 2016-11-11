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
        //$("#species").append('<option value="' + specie.people + '">' + specie.name + '</option>');
       var link = "https://swapi.co/api/people/";
       var speciePersonas = "";
       //var speciePeople = (specie.people).replace(link , "");
       for (var i =0; i<specie.people.length; i++){
         speciePersonas += specie.people[i].replace(link,"").replace("/",",");
       };
       $("#species").append('<option value="' + speciePersonas.slice(0,-1)  + '">' + specie.name + '</option>');
     });   
   };
  
   $.getJSON("https://swapi.co/api/species/", formatResponseSpecie);
  
    $("#next").click(function(event){
      event.preventDefault();
      var url= $(this).attr("data-url" );
      $.getJSON(url, formatResponse);
    });
    $("#previous").click(function(event){
        event.preventDefault();
        var url= $(this).attr("data-url" );
        $.getJSON(url, formatResponse);

    });
  /*
    $("#people").on("click", ".about", function(event){
      event.preventDefault();
      alert("hola");
    });*/
    $(".input-field").on("change", "#species", function(event){
      //event.preventDefault();
      numSpecie = ($(this).val()).split(",");
      $("#people").html("");
      console.log($(this).val());
      for (var i = 0; i<numSpecie.length; i++){
         $.getJSON(numSpecie[i] + "/", listarPersonajes);
      };
      });
    function listarPersonajes(response){
      var template = template.replace("{{name}}", response.name);
		$("#people").append(template);
    };
});
   
   
   