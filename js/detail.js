var id;

$(document).bind('pagebeforecreate', function(event) {
    console.log('in');
    console.log("pagebeforecreate");
    id = getUrlVars()["id"];
    $.getJSON('data/leads.json', displayEmployee);
//    getLeadsList();
});


//$('#detailsPage').live('pageshow', function(event) {
//});

function displayEmployee(data) {
    var lead = data.items[id];
    console.log(lead);
    
    var htm = '<div data-role="collapsible"><h3>Personal Details</h3><p><span class="detailLabel">Name:</span>';
    htm = htm + lead.lastName +', ' + lead.firstName;
    htm = htm + '<br/><span class="detailLabel">Date:</span>'+ lead.created +'<br/><span class="detailLabel">Email:</span>'+ lead.email +'<br/>';
    htm = htm + '<span class="detailLabel">Ref. No.:</span>'+ lead.referenceNo +'<br/><span class="detailLabel">Contact:</span>'+ lead.contact +'<br/>';
    htm = htm + '<span class="detailLabel">Cell:</span>'+ lead.cell +'<br/><span class="detailLabel">Fax:</span>'+ lead.fax +'</p></div>';
    htm = htm + '<div data-role="collapsible"><h3>Request Details</h3><p><span class="detailLabel">Max Price:</span>'+ lead.maxPrice +'<br/>';
    htm = htm + '<span class="detailLabel">Pre-approved finance:</span>'+ lead.preApproved +'<br/><span class="detailLabel">Looking to:</span>'+ lead.buy + lead.rent + lead.furnished + lead.unFurnished ;
    htm = htm + '<br/><span class="detailLabel">Selling own property:</span>'+ lead.isSelling +'<br/><span class="detailLabel">Looking for:</span>'+ lead.house_ok +', '+lead.flat_ok +', '+lead.complex_ok +', '+lead.security_estate_ok +', '+lead.golf_ok +', '+lead.farm_ok +', '+lead.vacant_ok +', '+lead.retail_ok +', '+lead.industrial_ok ;
    htm = htm + '<br/><span class="detailLabel">Bedrooms:</span>'+ lead.bedrooms +'<br/><span class="detailLabel">Bathrooms:</span>'+ lead.bathrooms +'<br/></p></div>';
    htm = htm + '<div data-role="collapsible"><h3>Location</h3><p><span class="detailLabel">City:</span>' + lead.city +'<br/><span class="detailLabel">Suburbs:</span>'+ lead.suburbs;
    htm = htm + '<br/><span class="detailLabel">Include Surrounding Areas:</span>'+ lead.includeSurrounding +'<br/></p></div>';
    htm = htm + '<div data-role="collapsible"><h3>Extras</h3><p><span class="detailLabel">Notes:</span>'+ lead.otherCriteria +'</p></div>';


    $('#lead_detail').append(htm);
   
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
