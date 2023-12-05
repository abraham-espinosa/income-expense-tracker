function show() {
  document.getElementById("popup").style.display = "block";
}

function hide() {
  document.getElementById("popup").style.display = "none";
}


// localStorage.setItem("tasks", JSON.stringify(tasks));
try {
  var tasks = JSON.parse(localStorage.getItem("tasks"));

} catch (err) {
  var tasks = [];

}

document.getElementById('totalExpenses').innerText = "Total Expenses: $" + tasks.reduce((acc, incomes) => incomes.type == "expense" ? acc + incomes.amount : acc, 0);
/* add button */
document.getElementById("addExpense").addEventListener("click", () => {
  if ((document.getElementById('category').value != "") && (document.getElementById('amount').value != "")) {
    reset();
    var currentDate = new Date();
    currentDate = currentDate.toLocaleDateString();
    tasks.push({
      id: Date.now(),
      date: currentDate,
      category: document.getElementById('category').value,
      amount: parseFloat(document.getElementById('amount').value),
      type: "expense"
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById('category').value = "";
    document.getElementById('amount').value = "";
    display("expense");
    document.getElementById('totalExpenses').innerText = "Total Expenses: $" + tasks.reduce((acc, incomes) => incomes.type == "expense" ? acc + incomes.amount : acc, 0);

  } else {
    alert("Insert a value");
  }
});

var display = type => {
  var li = document.createElement('li');
  var label1 = document.createElement('label');
  label1.innerText = "Category";
  var label2 = document.createElement('label');
  label2.innerText = "Amount";
  var label3 = document.createElement('label');
  label3.innerText = "Date";
  var label4 = document.createElement('label');
  label4.innerText = "Delete";
  li.appendChild(label1);
  li.appendChild(label2);
  li.appendChild(label3);
  li.appendChild(label4);
  document.querySelector('#list').appendChild(li);
  JSON.parse(localStorage.getItem("tasks")).forEach(element => {

    if (element.type == "expense" && type == "expense") {
      createElementsList(element);
    }
  });
}

const createElementsList = element => {
  var li = document.createElement('li');

  var cancelBtn = document.createElement('button');
  cancelBtn.innerText = "X";
  cancelBtn.value = element.id;
  cancelBtn.className = "deleteTask";
  cancelBtn.addEventListener('click', function handleClick(event) {
    alert('Element deleted 🎉');
    tasks = tasks.filter(value => value.id != this.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    reset();
    display("expense");
    document.getElementById('totalExpenses').innerText = "Total Expenses: $" + tasks.reduce((acc, incomes) => incomes.type == "expense" ? acc + incomes.amount : acc, 0);
  });
  var label = document.createElement('label');
  label.innerText = element.category;
  var amount = document.createElement('label');
  amount.innerHTML = element.amount;
  var mdate = document.createElement('label');
  mdate.innerHTML = element.date;
  li.appendChild(label);
  li.appendChild(amount);
  li.appendChild(mdate);
  li.appendChild(cancelBtn);

  document.querySelector('#list').appendChild(li);
}

const reset = () => {
  document.querySelector('#list').innerHTML = '';
}

let cancelBtn = btn => {
  console.log(btn.value);
}