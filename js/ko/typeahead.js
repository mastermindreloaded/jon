ko.bindingHandlers.typeahead = {
  init: function(element, valueAccessor) {
    var e = $(element)
    var o = ko.unwrap(valueAccessor())
    e.typeahead(o.options, o.dataset)
  }
}
