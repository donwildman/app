$(document).bind("mobileinit", function(){
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;

});
var leads;
document.addEventListener( "touchend", function(event){
    //this function is used to prevent duplicate "tap" events
    var target = $( event.target )
    if (target.get(0).nodeName.toUpperCase() != "INPUT" && target.get(0).nodeName.toUpperCase() != "TEXTAREA") {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
});



$(document).bind('pagebeforecreate', function(event) {
    console.log("pagebeforecreate");
    getLeadsList();
});



function getLeadsList(){

    $.getJSON('data/leads.json').success(function(data) {
        $('#leadsList li').remove();
        leads = data.items;
        $.each(leads, function(i, item) {
//            $('#leadsList').append('<li> <a href="detail.html?id='+ i +'"><img src="img/' + item.closed + '.png" alt="Request Status" class="ui-li-icon">' + item.lastName + ', ' + item.firstName + '<span class="ui-li-count">' + item.created + '</span></a></li>');
            $('#leadsList').append('<li><a href="#lead-items?lead='+ i +'"><img src="img/' + item.closed + '.png" alt="Request Status" class="ui-li-icon"> ' + item.lastName + ', ' + item.firstName + '<span class="ui-li-count">' + item.created + '</span></a></li>');
        });
        $('#leadsList').listview('refresh');
//        $.mobile.initializePage;
    });


}


function showLead( urlObj, options )
{
    var lead_id = urlObj.hash.replace( /.*lead=/, "" ),

    // Get the object that represents the lead we
    // are interested in. Note, that at this point we could
    // instead fire off an ajax request to fetch the data, but
    // for the purposes of this sample, it's already in memory.
        lead = leads[ lead_id ],

    // The pages we use to display our content are already in
    // the DOM. The id of the page we are going to write our
    // content into is specified in the hash before the '?'.
        pageSelector = urlObj.hash.replace( /\?.*$/, "" );

    if ( lead ) {
        // Get the page we are going to dump our content into.
        var $page = $( pageSelector ),

        // Get the header for the page.
            $header = $page.children( ":jqmData(role=header)" ),

        // Get the content area element for the page.
            $content = $page.children( ":jqmData(role=content)" ),

        // The markup we are going to inject into the content
        // area of the page.
        htm = '<div data-role="controlgroup"><div data-role="collapsible" data-content-theme="b" data-collapsed="false"><h3>Personal Details</h3><p><span class="detailLabel">Name:</span>';
        htm = htm + lead.lastName +', ' + lead.firstName;
        htm = htm + '<br/><span class="detailLabel">Date:</span>'+ lead.created +'<br/><span class="detailLabel">Email:</span>'+ lead.email +'<br/>';
        htm = htm + '<span class="detailLabel">Ref. No.:</span>'+ lead.referenceNo +'<br/><span class="detailLabel">Contact:</span>'+ lead.contact +'<br/>';
        htm = htm + '<span class="detailLabel">Cell:</span>'+ lead.cell +'<br/><span class="detailLabel">Fax:</span>'+ lead.fax +'</p></div></div>';
        htm = htm + '<div data-role="controlgroup"><div data-role="collapsible" data-content-theme="b"><h3>Request Details</h3><p><span class="detailLabel">Max Price:</span>'+ lead.maxPrice +'<br/>';
        htm = htm + '<span class="detailLabel">Pre-approved finance:</span>'+ lead.preApproved +'<br/><span class="detailLabel">Looking to:</span>'+ lead.buy + lead.rent + lead.furnished + lead.unFurnished ;
        htm = htm + '<br/><span class="detailLabel">Selling own property:</span>'+ lead.isSelling +'<br/><span class="detailLabel">Looking for:</span>'+ lead.house_ok +', '+lead.flat_ok +', '+lead.complex_ok +', '+lead.security_estate_ok +', '+lead.golf_ok +', '+lead.farm_ok +', '+lead.vacant_ok +', '+lead.retail_ok +', '+lead.industrial_ok ;
        htm = htm + '<br/><span class="detailLabel">Bedrooms:</span>'+ lead.bedrooms +'<br/><span class="detailLabel">Bathrooms:</span>'+ lead.bathrooms +'<br/></p></div></div>';
        htm = htm + '<div data-role="controlgroup"><div data-role="collapsible" data-content-theme="b"><h3>Location</h3><p><span class="detailLabel">City:</span>' + lead.city +'<br/><span class="detailLabel">Suburbs:</span>'+ lead.suburbs;
        htm = htm + '<br/><span class="detailLabel">Include Surrounding Areas:</span>'+ lead.includeSurrounding +'<br/></p></div></div>';
        htm = htm + '<div data-role="controlgroup"><div data-role="collapsible" data-content-theme="b"><h3>Extras</h3><p><span class="detailLabel">Notes:</span>'+ lead.otherCriteria +'</p></div></div>';

        // Find the h1 element in our header and inject the name of
        // the lead into it.
        $header.find( "h1" ).html( 'Details:' );

        // Inject the lead items markup into the content element.
        $content.html( htm );

        // Pages are lazily enhanced. We call page() on the page
        // element to make sure it is always enhanced before we
        // attempt to enhance the listview markup we just injected.
        // Subsequent calls to page() are ignored since a page/widget
        // can only be enhanced once.
        $page.page();

        // Enhance the listview we just injected.
//        $content.find( ":jqmData(role=listview)" ).listview();

        // We don't want the data-url of the page we just modified
        // to be the url that shows up in the browser's location field,
        // so set the dataUrl option to the URL for the lead
        // we just loaded.
        options.dataUrl = urlObj.href;
        options.reloadPage = true;

        // Now call changePage() and tell it to switch to
        // the page we just modified.
        $.mobile.changePage( $page, options );
    }
}


// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
    // We only want to handle changePage() calls where the caller is
    // asking us to load a page by URL.
    if ( typeof data.toPage === "string" ) {
        // We are being asked to load a page by URL, but we only
        // want to handle URLs that request the data for a specific
        // lead.
        var u = $.mobile.path.parseUrl( data.toPage ),
            re = /^#lead-item/;
        if ( u.hash.search(re) !== -1 ) {
            // We're being asked to display the items for a specific lead.
            // Call our internal method that builds the content for the lead
            // on the fly based on our in-memory lead data structure.
            showLead( u, data.options );

            // Make sure to tell changePage() we've handled this call so it doesn't
            // have to do anything.
            e.preventDefault();
        }
    }
});







