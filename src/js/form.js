(function () {

  this.BravoForm = function () {

    var defaults = {
      containerId: null,
      container: null,
      table: null,
      backColor : '',
      color : "white",
      rows : null

    };

    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }
  };

  BravoForm.prototype.init = function () {

    this.options.container = document.getElementById(this.options.containerId);
    this.options.rows = JSON.parse(localStorage.getItem('localeusertable'));
    document.getElementById('submitButton').addEventListener("click", this.addPerson.bind(this));


  }

  function clearAreas (){

    $('#username').val('');
    $('#email').val('');
    $('#citySelector').val('');
    $('#statusSelector').val('');

    console.log("temizlendi");

  }

  BravoForm.prototype.addPerson = function () {

    obj = {};
    obj.id =Date.now();
    obj.username = username.value;
    obj.email = email.value;
    obj.citySelector = citySelector.value;
    obj.statusSelector = statusSelector.value;

    this.options.table.rows = JSON.parse(localStorage.getItem('localeusertable')) || [];
    this.options.table.rows.push(obj);
    localStorage.setItem('localeusertable', JSON.stringify(this.options.table.rows));

    this.options.table.updateTable();
    clearAreas();

  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

})();

