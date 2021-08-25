
var state = {
	balance: 10,
	income: 10,
	expenditure: 10,
	transaction: []
};
var balance_elmt = document.querySelector('#balance');
var income_elmt = document.querySelector('#income');
var expenditure_elmt = document.querySelector('#expenditure');
var transaction_elmt = document.querySelector('.transaction');
var incbt_elmt = document.querySelector('#incbt');
var expbt_elmt = document.querySelector('#expbt');
var nameInput_elmt = document.querySelector('#name');
var amtInput_elmt = document.querySelector('#amount');

function init() {
	var localState = JSON.parse(localStorage.getItem('expenseTrackerState'));
	if (localState !== null){
		state = localState;
	}
	updateState();
	listeners();
}

function idGen (){
	return Math.round(Math.random()*1000000);
}
function listeners () {
	incbt_elmt.addEventListener ('click',AddIncome);
	expbt_elmt.addEventListener('click', AddExpenditure);
}
function AddIncome () {
	addTransaction(nameInput_elmt.value,amtInput_elmt.value,'income');
}
function AddExpenditure () {
	addTransaction(nameInput_elmt.value,amtInput_elmt.value,'expenditure');	
}
function addTransaction (name, amount, type) {
if (name!== ''&& amount !==''){
	var transaction1= {
		id : idGen(),
	 name: name,
	 amount: parseInt(amount),
	 type: type
	};
	state.transaction.push(transaction1);
	updateState();
}
else {
	alert ('Enter valid data!!!');
}
	nameInput_elmt.value ='';
	amtInput_elmt.value ='';
}
	
function deleteClick (event) {
	var id = parseInt(event.target.getAttribute('data-id'));
	var delIndex;
	
	for (var i = 0;i<state.transaction.length;i++){
		if (state.transaction[i].id===id){
			delIndex = i;
			break;
		}
	}
	state.transaction.splice(delIndex,1);
	updateState();
}

function updateState(){
	var balance = 0, income = 0, expenditure=0,item;
	for (var i = 0; i <state.transaction.length;i++){
		item = state.transaction[i];
		if (item.type === 'income'){
			income += item.amount;
		}
		else if (item.type==='expenditure') {
			expenditure+=item.amount;
		}
	}
	balance=income - expenditure;
	state.balance=balance;
	state.expenditure=expenditure;
	state.income = income;

	localStorage.setItem('expenseTrackerState',JSON.stringify(state));

	render ();
}
	
	function render () {
		balance_elmt.innerHTML = `RS ${state.balance}`;
	income_elmt.innerHTML = `RS ${state.income}`;
	expenditure_elmt.innerHTML=	`RS ${state.expenditure}`;
	
	var transactions_elmt;
	var container_elmt,amount_elmt;
	var item;
	var button_elmt;
	transaction_elmt.innerHTML = '';
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
		button_elmt.setAttribute('data-id',item.id);
		button_elmt.innerHTML='-';
		button_elmt.addEventListener('click',deleteClick);
		container_elmt.appendChild(button_elmt);
		transactions_elmt.appendChild(container_elmt);
		}
		
	}
	

init();