module.exports.path = {
  srcVendorCss: './modules/jquery-ui-1.13.0/jquery-ui.min.css',
  vendorCss: 'vendor.css',
  srcVendorJs: [
    './node_modules/jquery/dist/jquery.min.js',
    './modules/jquery-ui-1.13.0/jquery-ui.min.js'
  ],
  vendorJs: 'vendor.js',
  appCss: 'app.css',
  appJs: 'app.js',
  srcHtml: './src/index.html',
  srcCss: './src/*.css',
  srcJs: [
    './src/const.js',
    './src/StudentsApi.js',
    './src/Collection.js',
    './src/view/ListView.js',
    './src/view/FormView.js',
    './src/Controller.js',
    './src/index.js',
  ],
  jqueryUiImg: './modules/jquery-ui-1.13.0/images/*',
  dest: './dist',
} 