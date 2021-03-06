
(function () {





  this.CurrencyWidget = function () {

    var defaults = {
      url: 'https://www.macitturizm.org/afgcbdhaaa3i3iF63722bbfd5373833.xml',
      containerId: null,
      container: null,
      currencies: null,
      selectedCurrencies: ['USD', 'EUR'],
      padding: '8px',
      borderColor: '#eee',
      headColor: '#f5f5f5',
      headTextColor: '#333',
      backColor: '#fff',
      textColor: '#333'
    };

    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }


  };

  CurrencyWidget.prototype.init = function () {

    this.options.container = document.getElementById(this.options.containerId);
    getCurrencies.call(this);

  }

  function buildCurrencies () {

    if ( !this.options.currencies ) {
      console.log('currencies not found!');
    }

    var hasCurrency = false;
    this.options.container.style.background = this.options.backColor;

    var table = document.createElement('table');
    table.style.width = '100%';
    table.style.border = '1px solid ' + this.options.borderColor;
    table.style.color = this.options.color;

    var thead = document.createElement('thead');
    thead.style.background = this.options.headColor;

    var theadTr = document.createElement('tr');
    theadTr.style.color = this.options.headTextColor;
    theadTr.style.borderBottom = '1px solid ' + this.options.borderColor;

    var td1 = document.createElement('td');
    td1.style.padding = this.options.padding;
    td1.style.borderRight = '1px solid ' + this.options.borderColor;
    td1.innerText = 'Döviz';
    theadTr.appendChild(td1);

    var td2 = document.createElement('td');
    td2.style.padding = this.options.padding;
    td2.style.borderRight = '1px solid ' + this.options.borderColor;
    td2.innerText = 'Alış';
    theadTr.appendChild(td2);

    var td3 = document.createElement('td');
    td3.style.padding = this.options.padding;
    td3.innerText = 'Satış';
    theadTr.appendChild(td3);
    thead.appendChild(theadTr);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');

    var items = this.options.currencies.Tarih_Date.Currency;

    for ( var i = 0; i < items.length; i++ ) {
      var item = items[i];
      var code = item['@attributes'].Kod;

      if ( this.options.selectedCurrencies.indexOf(code) > -1 ) {

        if ( item.BanknoteBuying['#text'] !== undefined ) {
          hasCurrency = true;

          var row = document.createElement('tr');
          row.style.borderBottom = '1px solid ' + this.options.borderColor;

          var cellName = document.createElement('td');
          cellName.style.padding = this.options.padding;
          cellName.style.borderRight = '1px solid ' + this.options.borderColor;
          cellName.innerText = item.Isim['#text'];
          row.appendChild(cellName);

          var cellBuying = document.createElement('td');
          cellBuying.style.padding = this.options.padding;
          cellBuying.style.borderRight = '1px solid ' + this.options.borderColor;
          cellBuying.innerText = item.BanknoteBuying['#text'];
          row.appendChild(cellBuying);

          var cellSelling = document.createElement('td');
          cellSelling.style.padding = this.options.padding;
          cellSelling.innerText = item.BanknoteSelling['#text'];
          row.appendChild(cellSelling);

          tbody.appendChild(row);
        } else {
          var msg = item.Isim['#text'] + ' not found!';
          console.log(msg);
        }

      }

    }

    table.appendChild(tbody);

    if ( hasCurrency ) {
      this.options.container.appendChild(table);
    }

  }

  function getCurrencies () {

    var self = this;

    var responseParser = function () {

      if ( xhr.status === 200 ) {
        self.options.currencies = xmlToJson(this.responseXML);
        buildCurrencies.call(self);
      } else {
        console.log('currencies not found!');
      }

    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', responseParser);
    xhr.open( 'GET', this.options.url, true );
    xhr.send(null);

  }

  function xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  };

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  console.log(CurrencyWidget.prototype);




  (function () {
        var currencyWidget = new CurrencyWidget({
          containerId: 'onurs',
          selectedCurrencies: ['USD', 'EUR', 'JPY']
        });

        currencyWidget.init();
      })();

})();

