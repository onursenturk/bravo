
var TableObject = new BravoTable ({
	containerId : 'data-table',
	form : FormObject
});

TableObject.init();

var FormObject = new BravoForm({
	containerId : 'FormContainer',
	table: TableObject
});

FormObject.init();
