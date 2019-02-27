var rows = document.getElementsByTagName("usertable");
var username = document.getElementById("username");
var email = document.getElementById("email");
var citySelector = document.getElementById("citySelector");
var statusSelector = document.getElementById("statusSelector");
var obj;
var myProperties = [];
var tbody = document.getElementById('table-body');
var thead  = document.getElementById('table-head');


(function () {

	this.BravoTable = function () {

		var defaults = {
			containerId: null,
			container: null,
			backColor : '',
			color : "white",

		};

		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = extendDefaults(defaults, arguments[0]);
		}
	};

	BravoTable.prototype.init = function () {

		this.options.container = document.getElementById(this.options.containerId);
		myProperties = JSON.parse(localStorage.getItem('localeusertable'));
		this.updateTable();
		//document.getElementById('theadUsername').addEventListener("click", this.sortPerson.bind(this));


	}

	BravoTable.prototype.updateTable = function () {

		tbody.innerHTML = "";
		for ( i = 0; i < myProperties.length; i++ ) {
			this.createRow(myProperties[i], i);


		}
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
		myProperties.splice(activeIndex, 1);
		localStorage.setItem('localeusertable', JSON.stringify(myProperties));
		this.updateTable();
		this.getFormIds.bind(this);

	}

	BravoTable.prototype.sortPerson = function (rowData , index) {

	

	}

	BravoTable.prototype.CreateHeader = function () {

	}

	BravoTable.prototype.SortRows = function () {

	}

	BravoTable.prototype.UpdateSortIcons = function () {

	}

	BravoTable.prototype.UpdateHeaders = function () {

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

