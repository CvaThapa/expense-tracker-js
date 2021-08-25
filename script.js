
var state = {
	balance: 10,
	income: 10,
	expenditure: 10,
	transaction: [
	{ name: 'Salary', amount: 0, type:'income'},
	{ name: 'Food', amount: 0, type:'expenditure'},
	{ name: 'Transportation', amount: 0, type:'expenditure'}
	]
};
var balance_elmt = document.querySelector('#balance');
var income_elmt = document.querySelector('#income');
var expenditure_elmt = document.querySelector('#expenditure');
var transaction_elmt = document.querySelector('.transaction');

function init() {
	balance_elmt.innerHTML = `RS ${state.balance}`;
	income_elmt.innerHTML = `RS ${state.income}`;
	expenditure_elmt.innerHTML=	`RS ${state.expenditure}`;
	
	var transactions_elmt;
	var container_elmt,amount_elmt;
	var item;
	var button_elmt;
	for (var i =0;i<state.transaction.length; i++){
		item = state.transaction[i];
		transactions_elmt= document.createElement('li');
		transactions_elmt.append(state.transaction[i].name);

		transaction_elmt.appendChild(transactions_elmt);
		container_elmt=document.createElement('div');
		amount_elmt = document.createElement('span');
		if (item.type === 'income') {
			amount_elmt.classList.add('income-amount');
		} else if (item.type === 'expenditure') {
			amount_elmt.classList.add('expense-amount');
		}
		amount_elmt.innerHTML = `RS ${item.amount}`;
		container_elmt.appendChild(amount_elmt);
		button_elmt = document.createElement('button');
		button_elmt.innerHTML='-';
		container_elmt.appendChild(button_elmt);
		transactions_elmt.appendChild(container_elmt);
		}
		
	}

init();
