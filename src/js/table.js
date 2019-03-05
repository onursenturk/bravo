var rows = document.getElementsByTagName("usertable");
var username = document.getElementById("username");
var email = document.getElementById("email");
var citySelector = document.getElementById("citySelector");
var statusSelector = document.getElementById("statusSelector");
var obj;
var tbody = document.getElementById('table-body');
var thead  = document.getElementById('tablehead');


(function () {

	this.BravoTable = function () {

		var defaults = {
			containerId: null,
			container: null,
			backColor : '',
			color : "white",
			tbody : null,
			thead : null,
			rows : null,
			form :null,
			activeSort :null,
			headers: [
			{title:'#',sortPropertyName:'id', asc: true ,selectedKey :true},
			{title:'İsim',sortPropertyName:'username', asc: true ,selectedKey :true},
			{title:'E-posta',sortPropertyName:'email', asc: true ,selectedKey :true},
			{title:'Şehir',sortPropertyName:'citySelector', asc: true ,selectedKey :true},
			{title:'Durum',sortPropertyName:'statusSelector', asc: true ,selectedKey :true},
			{title:'Sil',sortPropertyName:'delete', asc: true ,selectedKey :true}
			]
		};

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(defaults, arguments[0]);
		}
	};

	BravoTable.prototype.init = function () {

		this.options.container = document.getElementById(this.options.containerId);
		this.getData();
		this.UpdateHeaders();
		this.sortPerson();
		this.updateTable();

		document.getElementById('save').addEventListener("click",this.SortRows.bind(this));

	}

	BravoTable.prototype.getData = function () {

		this.options.rows = JSON.parse(localStorage.getItem('localeusertable'));

	}

	BravoTable.prototype.setData = function () {

		tbody.innerHTML = "";
		for ( i = 0; i < this.options.rows.length; i++ ) {
			this.createRow(this.options.rows[i], i);
		}

	}

	BravoTable.prototype.updateTable = function () {

		this.getData();
		this.setData();

	}

	BravoTable.prototype.createRow = function ( rowData, index ) {

		var row = document.createElement('tr');

		var cellId = document.createElement('td');
		cellId.innerHTML = rowData.id;
		row.appendChild(cellId);

		var cellName = document.createElement('td');
		cellName.innerHTML = rowData.username;
		row.appendChild(cellName);

		var cellEmail = document.createElement('td');
		cellEmail.innerHTML = rowData.email;
		row.appendChild(cellEmail);

		var cellCity = document.createElement('td');
		cellCity.innerHTML = rowData.citySelector;
		row.appendChild(cellCity);

		var cellStatus = document.createElement('td');
		cellStatus.innerHTML = rowData.statusSelector;
		row.appendChild(cellStatus);

		var cellRemove = document.createElement('td');
		var removeButton = document.createElement('a');
		removeButton.setAttribute('href', 'javascript:void(0);');
		removeButton.setAttribute('data-index', index);
		removeButton.innerHTML = 'Sil';
		removeButton.addEventListener('click', this.removePerson.bind(this));
		cellRemove.appendChild(removeButton);

		row.appendChild(cellRemove);

		tbody.appendChild(row);

	}


	BravoTable.prototype.removePerson = function ( event ) {

		var activeIndex = parseInt(event.target.getAttribute('data-index'));
		this.options.rows.splice(activeIndex, 1);
		localStorage.setItem('localeusertable', JSON.stringify(this.options.rows));
		this.updateTable();
		this.getFormIds.bind(this);

	}

	BravoTable.prototype.sortPerson = function (headers , event) {

		this.options.activeSort = this.options.headers[1];
		console.log(this.options.activeSort);
		
		if(this.options.activeSort === this.options.headers[1]) {
            this.options.headers[1].asc = !this.options.headers[1].asc; //toggle the direction of the sort
        } else {
            this.options.activeSort = this.options.headers[1]; //first click, remember it
        }
        
        var prop = this.options.activeSort.sortPropertyName;

        console.log(prop);

        var ascSort = function(a,b){ return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : a[prop] == b[prop] ? 0 : 0; };
        var descSort = function(a,b){ return a[prop] > b[prop] ? -1 : a[prop] < b[prop] ? 1 : a[prop] == b[prop] ? 0 : 0; };

        var sortFunc = this.options.activeSort.asc ? ascSort : descSort;

        console.log(this.options.activeSort.asc);

        this.options.rows.sort(sortFunc);



        //console.log(this.options.rows);
    }

    BravoTable.prototype.CreateHeader = function () {

    	var header;

    	for (var i = 0; i < this.options.headers.length; i++) {
    		header = this.options.headers[i].title;
    		var row = document.createElement('td');
    		row.innerHTML = header;
    		thead.appendChild(row);

    		row.addEventListener("click",this.SortRows.bind(this));

    		console.log(header);

		//console.log(row); // şu an headers içindeki title olanları çekebiliyorum.//

		}


	}

	BravoTable.prototype.SortRows = function () {

		this.sortPerson();
		console.log(this.options.rows);
		this.setData();

	}

	BravoTable.prototype.UpdateSortIcons = function () {

	}

	BravoTable.prototype.UpdateHeaders = function () {

		var row = document.querySelectorAll('tr');
		row.innerHTML = '' ;
		this.CreateHeader();
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

