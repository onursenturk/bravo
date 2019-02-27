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

    this.options.rows = JSON.parse(localStorage.getItem('localeusertable')) || [];
    this.options.rows.push(obj);
    localStorage.setItem('localeusertable', JSON.stringify(this.options.rows));

    this.options.table.updateTable();
    clearAreas();
    console.log(obj.id);


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

