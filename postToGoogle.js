/* Aditya Dhulipala */
/* Sai Center Region 8 Form, ver 0.1 */
/* 6/25 */


//totalpersonsattending
var totalcount = 0;

function countMeals(which)
{
	var lunchSat = "#lunch_sat" + which;
	var lunchSun = "#lunch_sun" + which;
	var boxSat = "#box_sat" + which;
	var boxSun = "#box_sun" + which;
	
	var meals = 0;
	
	if ($(lunchSat).prop('checked'))	meals++;
	if ($(lunchSun).prop('checked'))	meals++;
	if ($(boxSat).prop('checked'))	meals++;
	if ($(boxSun).prop('checked'))	meals++;
	
	return meals;
	
}

function addperson(which) {
	var person = "#person" + which;
	var previousremovepersonbutton = "#removepersonbutton" + (which - 1);

	var thisaddpersonbutton = "#addpersonbutton" + which;
	var thisremovepersonbutton = "#removepersonbutton" + which;
	var nextaddpersonbutton = "#addpersonbutton" + (which + 1);
	var nextremovepersonbutton = "#removepersonbutton" + (which + 1);
	
	var thisPersonName = "#nameparticipant" + which;
	var days = "#attending_sat" + which;
	
	if (!validateForm())
	{
        alert("The form is not filled out correctly. Please fix the errors marked in red.")
	    return; // don't add another person if form thus far is invalid
	}
	
	if ( countMeals(which-1) == 0 )
		alert("You did not select any meals. Please confirm your meal selection.");

	$(person).slideDown();
	
	if ($(nextremovepersonbutton).is(':hidden')) {
		$(nextaddpersonbutton).slideDown();
		$(previousremovepersonbutton).slideUp();
	}
	
	else if (which === 6) {
		$(previousremovepersonbutton).slideUp();
	}
	
	$(thisaddpersonbutton).slideUp(20, function() { 
			$(thisremovepersonbutton).slideDown();
			if ( parsleyFormInstance != null )
			{
			    $(thisPersonName).attr("required", "true");
			    $(days).attr("required", "true");
				parsleyFormInstance.reset();
			}

	});
}

function removeperson(which) {
	var person = "#person" + which;
	var previousremovepersonbutton = "#removepersonbutton" + (which - 1);
	var thisaddpersonbutton = "#addpersonbutton" + which;
	var thisremovepersonbutton = "#removepersonbutton" + which;
	var nextaddpersonbutton = "#addpersonbutton" + (which + 1);
	
	var name = "#nameparticipant" + which;
	var age = "#ageparticipant" + which;
	var childStats = "#childstats" + which;
	var sexM = "#genderM" + which;
	var sexF = "#genderF" + which;
	var days = "#attending_sat" + which;
	var attSat = "#attending_sat" + which;
	var attSun = "#attending_sun" + which;
	var child = "#ischild" + which;
	var lunchSat = "#lunch_sat" + which;
	var lunchSun = "#lunch_sun" + which;
	var boxSat = "#box_sat" + which;
	var boxSun = "#box_sun" + which;
	
	$(name).val("");
	$(age).val("");

	
	$(attSat).prop('checked',"");
	$(attSun).prop('checked',"");
	$(child).prop('checked',"");
	
	$(childStats).slideUp(10);
	
	$(lunchSat).prop('checked',"");
	$(lunchSun).prop('checked',"");
	$(boxSat).prop('checked',"");
	$(boxSun).prop('checked',"");
	
	$(sexM).prop('checked',"");
	$(sexF).prop('checked',"");
	
	$(lunchSat).prop('disabled',"true");
	$(lunchSun).prop('disabled',"true");
	$(boxSat).prop('disabled',"true");
	$(boxSun).prop('disabled',"true");
	
	$(person).slideUp();
	$(nextaddpersonbutton).slideUp();
		
	$(thisremovepersonbutton).slideUp(20, function() {
			$(previousremovepersonbutton).slideDown();
			$(thisaddpersonbutton).slideDown();
			if ( parsleyFormInstance != null )
			{
				$(name).removeAttr("required");
				$(age).removeAttr("required");
				$(sexM).removeAttr("required");
				$(sexF).removeAttr("required");
				$(days).removeAttr("required");
				
				parsleyFormInstance.destroy(name);
				parsleyFormInstance.destroy(age);
				parsleyFormInstance.destroy(sexM);
				parsleyFormInstance.destroy(sexF);
				parsleyFormInstance.destroy(days);
				parsleyFormInstance.reset();
			}

	});
	

}

function logPerson (groupfamilyname, name, age, sat, sun, satlunch, sunlunch, satdinner, sundinner, address, city, state, zip, phone, altphone, email, center, totalcost, id)
{
/*
	var params = groupfamilyname + "," + name + " " + age + " address: " + address + " " + city + " " + zip + " " + phone + " " + altphone + " " + email + " " + center + " " + totalcost;
	
	$.ajax({
		type: "POST",
		url: "http://region8saicenters.org/Conference/2014/logRetreatInfo.php",
		data: { "msg": params },
		dataType: "xml",
		async: true,
		timeout: 5000,
		success: function(data, textStatus ){
			console.log(textStatus);
		},
		error: function(xhr, textStatus, errorThrown){
			console.log(xhr);
			console.log(textStatus);
			console.log(errorThrown);
		}
	  });
*/

	var msg1 = groupfamilyname + ", " + name + " " + age + " " + phone + " " + altphone + " " + email + " " + center + " " + totalcost;
	var msg2 = groupfamilyname + ", " + name + " sat: " + sat + " sun: " + sun + " satlunch: " + satlunch + " satdinner: " + satdinner + " sunlunch: " + sunlunch + " sundinner: " + sundinner;
	var msg3 = groupfamilyname + ", " + name + " address: " + address + " " + city + " " + state + " " + zip + "\n";
	
	$.ajax({
		type: "POST",
		url: "http://region8saicenters.org/Conference/2014/logRetreatInfo.php",
		data: {
			"msg1" : msg1,
			"msg2" : msg2,
			"msg3" : msg3
			},
		dataType: "xml",
		async: true,
		timeout: 5000,
		success: function(data, textStatus ){
			console.log(textStatus);
		},
		error: function(xhr, textStatus, errorThrown){
			console.log(xhr);
			console.log(textStatus);
			console.log(errorThrown);
		}
	  });

}

function registerPerson (name, age, satp, sunp, satlunches, satboxes, sunlunches, sunboxes, id) {
    var groupfamilyname = $("#groupfamilyname").val();
    var sat = satp;
    var sun = sunp;
    
    var satlunch = satlunches;
    var satdinner = satboxes;
    var sunlunch = sunlunches;
    var sundinner = sunboxes;
	
	
    var address = $("#address1").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zip = $("#zip").val();
    var phone = $("#phone").val();
    var altphone = $("#alternatephone").val();
    var email = $("#email").val();

    var center = $("#saicenter option:selected").html();
	var totalcost = "";
	var payment = "";
	
	if ( id == 1 ) // only display cost for the group head
	{
		totalcost = $("#totalcost").html();
		payment = $("input[name=payment]:checked").val();
		totalcost += " - " + payment;
	}
	
	logPerson( groupfamilyname, name, age, sat, sun, satlunch, sunlunch, satdinner, sundinner, address, city, state, zip, phone, altphone, email, center, totalcost, id);
	
    $.ajax({
            url: "https://docs.google.com/forms/d/1QeCq3i5-yayVUalG8zULImKBt1IZpW4DN3dvWvldgbM/formResponse",
            data: {
                "entry.1028821986"  : groupfamilyname,
                "entry.1989572619"  : name,
                "entry.1455524712"  : age,
                "entry.1692495978"  : sat,
                "entry.1063897397"  : sun,
                "entry.1808741032"  : satlunch,
                "entry.28805167"    : sunlunch,
                "entry.1762204858"  : satdinner,
                "entry.2083881354"  : sundinner,
                "entry.384955973"  	: address,
                "entry.182164071"   : city,
                "entry.2144561875"  : state,
                "entry.1511475308"  : zip,
                "entry.501938484"   : phone,
                "entry.548996382"   : altphone,
                "entry.161421504"   : email,             
                "entry.1206432407"  : center, 
                "entry.1868561769"  : totalcost},
            type: "POST",
            dataType: "xml",
			async: true,
            timeout: 5000,
            success: function(data, textStatus ){
                alert('request successful');
            },
            error: function(xhr, textStatus, errorThrown){
                console.log(xhr);
                console.log(textStatus);
                console.log(errorThrown);
            }
            
        });
}


function updateCost() {
    // Get all age fields
    // Update costfield
  
    var cost = 0;
	var adults = 0;
    
	//console.log(totalcount);
	
	var count = 0;
    var attending_sat = $("#daysattending-saturday").prop('checked');
    var attending_sun = $("#daysattending-sunday").prop('checked');
	
	if ($("#attending_sat1").prop('checked')  && $("#attending_sun1").prop('checked')) {
		count = 2;
	}
	else if ($("#attending_sat1").prop('checked') ||  $("#attending_sun1").prop('checked')) {
		count = 1;
	}
	
	if ( count )
		adults++;
	
	if ( !($("#ischild2").prop('checked')) )
	{
		adults++;
		if ($("#attending_sat2").prop('checked') )
			count++;
		
		if ( $("#attending_sun2").prop('checked'))
			count++;
	}
	
	if ( !($("#ischild3").prop('checked')) )
	{
		adults++;
		if ($("#attending_sat3").prop('checked') )
			count++;
		
		if ( $("#attending_sun3").prop('checked'))
			count++;
	}

	if ( !($("#ischild4").prop('checked')) )
	{
		adults++;
		if ($("#attending_sat4").prop('checked') )
			count++;
		
		if ( $("#attending_sun4").prop('checked'))
			count++;
	}

	if ( !($("#ischild5").prop('checked')) )
	{
		adults++;
		if ($("#attending_sat5").prop('checked') )
			count++;
		
		if ( $("#attending_sun5").prop('checked'))
			count++;
	}
	
	if ( !($("#ischild6").prop('checked')) )
	{
		adults++;
		if ($("#attending_sat6").prop('checked') )
			count++;
		
		if ( $("#attending_sun6").prop('checked'))
			count++;
	}
	
	//console.log(count);
	cost = count * 10;
	document.getElementById("test_id").value = cost;
    $("#totalcost").html("$"+cost);
	
	if ( adults > 0 )
	{
		$("#numAdults").html( "Adult Days: " + count);
	}
    
}


setInterval(updateCost, 100);

function postToGoogle() {
    
    var i;
	
    for (i = 1; i <= 6; i += 1)
	{
        var nameField = "#nameparticipant" + i;
        var age = " ";
		
		name = $(nameField).val().trim();
		if ( name == "" )
			break; // done - no more entries
		
		var issat = "#attending_sat" + i;
		var issun = "#attending_sun" + i;
		
		var satlunch = "#lunch_sat" + i;
		var sunlunch = "#lunch_sun" + i;
		
		var satbox = "#box_sat" + i;
		var sunbox = "#box_sun" + i;
		
		if ( ($("#ischild" + i).prop('checked')))
		{
			//age = $("#sex_participant" + i).val() + " ";
			age = $('input:radio[name=sex_participant'+i+']:checked').val() + " ";
			age += $("#ageparticipant" + i).children(":selected").text();
		}
		else
			age = " ";
		
		
		var sat = '';
		var sun = '';
		var satlunches = '';
		var satboxes = '';
		var sunlunches = '';
		var sunboxes = '';
		
		if ($(issat).prop('checked'))
		{
			sat = '1';
			
			if ( $(satlunch).prop('checked') )
				satlunches = '1';
			if ( $(satbox).prop('checked') )
				satboxes = '1';
		}
		
		if ($(issun).prop('checked'))
		{
			sun = '1';
			if ($(sunlunch).prop('checked'))
				sunlunches = '1';
				
			if ($(sunbox).prop('checked'))
				sunboxes = '1';
		}
		
		registerPerson(name, age, sat, sun, satlunches, satboxes, sunlunches, sunboxes, i);
    }

    /*
    
entry.1028821986:	1 Group / Family Name	
entry.1989572619:	2 Name
entry.1455524712:	3 Age
entry.1692495978:	4 Attending Saturday
entry.1063897397:	5 Attending Sunday
entry.1808741032:	6 Saturday Lunches
entry.28805167:	    7 Sunday Lunches
entry.1762204858:	8 Saturday Dinners
entry.2083881354:	9 Sunday Dinners
entry.384955973:	10 Address
entry.182164071:	11 City
entry.2144561875:	12 State
entry.1511475308:	13 Zip
entry.501938484:	14 Phone Number
entry.548996382:	15 Alt Phone
entry.161421504:	16 Email
entry.1206432407:	17 Sai Center
entry.1868561769:	18 Cost for Family



  -------------------------------  
    
    
    
    
    entry.548996382:	15
entry.501938484:	14
entry.384955973:	10
entry.28805167:	7
entry.2144561875:	12
entry.2083881354:	9
entry.1989572619:	2
entry.1868561769:	18
entry.182164071:	11
entry.1808741032:	6
entry.1762204858:	8
entry.1692495978:	4
entry.161421504:	16
entry.1511475308:	13
entry.1455524712:	3
entry.1206432407:	17
entry.1063897397:	5
entry.1028821986:	1





    
    
entry.1989572619:	2123
entry.1692495978:	213123
entry.1455524712:	213123
entry.1028821986:	
    
    
    
    
    
    */

}
