var rows = document.getElementsByTagName("usertable");
var username = document.getElementById("username");
var email = document.getElementById("email");
var citySelector = document.getElementById("citySelector");
var statusSelector = document.getElementById("statusSelector");
var obj;
var tbody = document.getElementById('table-body');
var thead  = document.getElementById('tablehead');
var InformationLabel = document.getElementById("InformationLabel");

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
			searchedRows : [],
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
		this.updateTable();
		document.getElementById('SearchInputButton').addEventListener("click",this.GetUsernames.bind(this));
		document.getElementById('ClearInputButton').addEventListener("click",this.updateTable.bind(this));
	}

	BravoTable.prototype.getData = function () {

		this.options.rows = JSON.parse(localStorage.getItem('localeusertable'));
	}

	BravoTable.prototype.setData = function (rowData) {

		if (rowData.length > 0) {
			tbody.innerHTML = "";
			for ( i = 0; i < rowData.length; i++ ) {
				this.createRow(rowData[i], i);
			}
		}
		else {
			console.log("tablo boş");
			// buraya tablo boş alanı gelecek. //
			tbody.innerHTML = '<img class="offset-6" align="center"  src="src/img/noperson.jpg"> <h5 class="offset-8">Kişiler Bulunamadı.</h5>';
		}
	}

	BravoTable.prototype.updateTable = function () {

		this.getData();
		this.setData(this.options.rows);
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
		removeButton.setAttribute('data-id', rowData.id);
		removeButton.innerHTML = 'Sil';
		removeButton.addEventListener('click', this.removePerson.bind(this));
		cellRemove.appendChild(removeButton);

		row.appendChild(cellRemove);

		tbody.appendChild(row);

		if(index % 2) {
			row.classList.add('rowlight');
		}
	}


	BravoTable.prototype.deleteRow = function (rowData ,index) {

		this.options.rows.splice(index,1);
		this.setData(this.options.rows);
	}

	BravoTable.prototype.removePerson = function ( event ,id ) {

		var activeIndex = parseInt(event.target.getAttribute('data-index'));
		var id = parseInt(event.target.getAttribute('data-id'));
		for (var i = 0; i < this.options.rows.length; i++) {

			this.getData();

			if (this.options.rows[i].id === id) {
				this.options.rows.splice(i, 1);
				localStorage.setItem('localeusertable', JSON.stringify(this.options.rows));
				this.updateTable();
			}
		}
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

		for (var i = 0; i < this.options.headers.length; i++) {

			var header = document.createElement('th');
			header.setAttribute('data-index',i);
			var wrapper = document.createElement('div');
			wrapper.classList.add('d-flex', 'd-flex-row', 'justify-content-between', 'align-items-center' ,'active');
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

		this.setData(this.options.rows);
		this.UpdateSortIcons();
	}

	BravoTable.prototype.UpdateSortIcons = function () {

		var index = parseInt(event.target.getAttribute('data-index'));
		console.log(index);
	}

	BravoTable.prototype.UpdateHeaders = function () {

		var row = document.querySelectorAll('tr');
		row.innerHTML = '' ;
		this.CreateHeader();
	}

	BravoTable.prototype.GetUsernames = function () {
		this.getData();
		var last_element = this.options.rows[this.options.rows.length -1] ;
		console.log(last_element);
		var SearchInput = document.getElementById('searchInput').value;
		if (SearchInput.length >2) {
			
			for (var i = 0; i < this.options.rows.length; i++) {
				if(	this.options.rows[i].username.includes(SearchInput)){
					if(last_element) {
						console.log("last item");
					}	
					else {
					console.log(i + this.options.rows[i].username + " kalacak");
					this.options.searchedRows[i] = this.options.rows[i];
					this.createRow(this.options.searchedRows[i],i);
					console.log(this.options.searchedRows[i]);

					}
				}
				else {
					console.log(i + this.options.rows[i].username + " gidecek");
					this.deleteRow(this.options.rows[i], i);
					this.options.searchedRows.splice(i,1);
					i--;
				}
			}
		}
		else {
			InformationLabel.innerHTML = "En az 3 karakter ile arama yapınız.";
		}

		console.log(this.options.searchedRows);
		console.log(this.options.rows);
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

