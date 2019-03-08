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
				{title:'#',sortPropertyName:'id', dataindex: 0, asc: true ,selectedKey :false, sortable: true},
				{title:'İsim',sortPropertyName:'username', dataindex: 1, asc: true ,selectedKey :false, sortable: true},
				{title:'E-posta',sortPropertyName:'email', dataindex: 2, asc: true ,selectedKey :false, sortable: true},
				{title:'Şehir',sortPropertyName:'citySelector', dataindex: 3, asc: true ,selectedKey :false, sortable: true},
				{title:'Durum',sortPropertyName:'statusSelector', dataindex: 4, asc: true ,selectedKey :false, sortable: true},
				{title:'Sil',sortPropertyName:'delete', asc: true , dataindex: 5, selectedKey :false, sortable: false}
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
		// this.sortPerson();
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

	BravoTable.prototype.sortPerson = function (event) {

		var index = parseInt(event.target.getAttribute('data-index'));

		this.toggleSortIcons(index);
        
        var prop = this.options.headers[index].sortPropertyName;

        var ascSort = function(a,b){ return a[prop] < b[prop] ? -1 :
        	a[prop] > b[prop] ? 1 : a[prop] == b[prop] ? 0 : 0; };
        var descSort = function(a,b){ return a[prop] > b[prop] ? -1 :
        		a[prop] < b[prop] ? 1 : a[prop] == b[prop] ? 0 : 0; };

        var sortFunc = this.options.headers[index].asc ? ascSort : descSort;

        this.options.rows.sort(sortFunc);
        this.SortRows();

    }

    BravoTable.prototype.toggleSortIcons = function ( index ) {

    	var headers = document.getElementsByTagName('th');

    	for ( var i = 0; i < this.options.headers.length; i++ ) {

    		if ( index === i ) {
    			this.options.headers[i].asc = !this.options.headers[i].asc;
    		} else {
    			this.options.headers[i].asc = null;
    		}

    		headers[i].setAttribute('data-asc', this.options.headers[i].asc);

    	}

    }

	BravoTable.prototype.CreateHeader = function (event) {

		var theadTr = document.getElementsByTagName('thead')[0].querySelectorAll('tr')[0];
		//var iconUp = '<i class="fa fa-sort-up"></i>';
		//var iconDown = '<i class="fa fa-sort-down"></i>';

		for (var i = 0; i < this.options.headers.length; i++) {

			var header = document.createElement('th');
			header.setAttribute('data-index',i);
			var wrapper = document.createElement('div');
			wrapper.classList.add('d-flex', 'd-flex-row', 'justify-content-between', 'align-items-center');
			var title = document.createElement('span');
			title.innerHTML = this.options.headers[i].title;
			wrapper.appendChild(title);

			if (this.options.headers[i].sortable ) {

				var iconUp = document.createElement('i');
				var iconDown = document.createElement('i');
				iconDown.classList.add("active","fa","fa-sort-down","has-action");
				iconUp.classList.add("active","fa","fa-sort-up","has-action");
				wrapper.appendChild(iconUp);
				wrapper.appendChild(iconDown);
				header.addEventListener("click",this.sortPerson.bind(this));

			}

			header.appendChild(wrapper);
			theadTr.appendChild(header);

		}
	}


	BravoTable.prototype.SortRows = function () {

		this.setData();
		this.UpdateSortIcons();

	}

	BravoTable.prototype.UpdateSortIcons = function () {

		var index = parseInt(event.target.getAttribute('data-index'));
		// var index  = this.options.headers[3].dataindex;
		console.log(index);
	}

	BravoTable.prototype.UpdateHeaders = function () {

		var row = document.querySelectorAll('tr');
		row.innerHTML = '' ;
		this.CreateHeader();
		this.SearchUsername();
	}

	BravoTable.prototype.SearchUsername = function () {
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

