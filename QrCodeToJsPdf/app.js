( function() {
  
  'use strict';
  
  angular.module( 'App', [ 'ngMaterial' ] )
    .controller( 'AppCtrl', AppCtrl );
  
  AppCtrl.$inject = [ '$timeout' ];
  
  function AppCtrl( $timeout ) {
    
    var vm = this;
    
    // List of names to display in the view.
    vm.names = [
      { fName: 'Amanda', lName: 'Morra' }, 
      { fName: 'Michael', lName: 'Bailey' }, 
      { fName: 'Mark', lName: 'Smith' }
    ]
    
    // function to call when the user clicks on a name;
    vm.generateQrCodePdf = generateQrCodePdf;
    
    // This function takes the 'name' parameter passed from the view.
    function generateQrCodePdf( name ) {
      // We create the full name that will be used as the value for the qrCode.
      var fullName = name.fName + ' ' + name.lName;
      // Using jQuery we make an empty div.
      var div = $( '<div></div>' )
      // A qrCode code is generated with the value of the 'fullName' and attached to the empty div created above.
      var qr = new QRCode( $( div)[ 0 ], fullName );
      // A timeout function is used to give the qrCode time to generate and attach.
      $timeout( function() {
        // We then get the div and look for the 'img' element and extract the src.
        // The src generated from the 'QRCode' above is a base64 image needed to generate the PDF.
        var qrCodeSrc  = $( div ).find( 'img' ).attr('src');
        // A new jsPDF instance is created 
        var doc = new jsPDF();
        // The font size is set.
        doc.setFontSize( 30 );
        // Position the first name.
        doc.text( 56, 30, name.fName );
        // Position the last name right below the first name.
        doc.text( 56, 44, name.lName );
        // Then add and position our image.
        doc.addImage( qrCodeSrc, 'png', 20, 15, 30, 30 );
        // Finally we output the PDF.
        doc.output( 'datauri' );
      }) 
    } 
    
  };
  
})();
