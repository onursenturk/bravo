
var TableObject = new BravoTable ({
	containerId : 'data-table'
});

TableObject.init();

var FormObject = new BravoForm({
	containerId : 'FormContainer',
	table: TableObject
});

FormObject.init();
