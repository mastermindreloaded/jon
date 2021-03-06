var App = function(baseUrl) {
  this.lectures = new LectureList(baseUrl);
  this.lecture = new Lecture(baseUrl);
  this.cart = new Cart(baseUrl);
  this.user = new User(baseUrl);
  this.print= new Print(baseUrl);
  this.rangeSelect = new RangeSelect(this.cart, this.lecture);

  this.visible = 'documents';
  this.cartID = '';

  ko.track(this);
}

App.prototype.lecturesVisible = function () {
  return this.visible === 'lectures';
}

App.prototype.documentsVisible = function() {
  return this.visible === 'documents' ||
         this.visible === 'cart';
}

App.prototype.cartVisible = function() {
  return this.visible === 'documents' ||
         this.visible === 'cart';
}

App.prototype.loginVisible = function() {
  return !this.user.isAuthenticated && this.visible === 'print';
}

App.prototype.printVisible = function() {
  return this.user.isAuthenticated && this.visible === 'print';
}

App.prototype.show = function(name) {
  this.visible = name;
  // special casing for in-page navigation to cart
  // Sadly this can't be done by setting the <a>'s href in the html
  if (name === 'cart') {
    document.location.href = '#cart';
  }
}

App.prototype.openLecture = function(lecture) {
  this.lecture.load(lecture.name)
  this.visible = 'documents'
}

App.prototype.login = function() {
  this.user.login(function() {
    this.visible = 'cart';
  });
}

App.prototype.germanExamType = function(examType) {
  return examType === "written" ? "Schriftlich" : "Mündlich"
}

App.prototype.germanDate = function(dateString) {
  var months = ['Jan ',
                'Feb ',
                'Mär ',
                'Apr ',
                'Mai ',
                'Jun ',
                'Jul ',
                'Aug ',
                'Sep ',
                'Okt ',
                'Nov ',
                'Dez ']
  var d = new Date(dateString)
  return d.getDate() + '. ' + months[d.getMonth()] + d.getFullYear()
}

$(document).ready(function() {
  // global config
  depositPrice = 500
  pricePerPage = 3

  if (window.location.hostname === 'www.fsmi.uni-karlsruhe.de') {
    url = window.location.origin + '/odie';
  } else {
    var live = true
    var url = live ? 'https://www-test.fsmi.uni-karlsruhe.de/odie' : 'http://localhost:8000'
  }
  var app = new App(url);
  window.app = app;
  ko.applyBindings(app);
})
