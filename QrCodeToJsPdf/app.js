( function() {
  
  'use strict';
  
  angular.module( 'App', [ 'ngMaterial' ] )
    .controller( 'AppCtrl', AppCtrl );
  
  AppCtrl.$inject = [ '$timeout' ];
  
  function AppCtrl( $timeout ) {
    
    var vm = this;
    
    vm.names = [
      { fName: 'Amanda', lName: 'Morra' }, 
      { fName: 'Michael', lName: 'Bailey' }, 
      { fName: 'Mark', lName: 'Smith' }
    ]
    
    vm.generateQrCodePdf = generateQrCodePdf;
    
    function generateQrCodePdf( name ) {
      var fullName = name.fName + ' ' + name.lName;
      var div = $( '<div></div>' )
      var qr = new QRCode( $( div)[ 0 ], fullName );
      $timeout( function() {
        var qrCodeSrc  = $( div ).find( 'img' ).attr('src');
        var doc = new jsPDF();
        doc.setFontSize( 30 );
        doc.text( 56, 30, name.fName );
        doc.text( 56, 44, name.lName );
        doc.addImage( qrCodeSrc, 'png', 20, 15, 30, 30 );
        doc.output( 'datauri' );
      }) 
    } 
    
  };
  
})();