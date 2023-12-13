function show() {
  document.getElementById("popup").style.display = "block";
}
function hide() {
  document.getElementById("popup").style.display = "none";
}

// 
try {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  document.getElementById('totalExpenses').innerText = "Total Expenses: $" + tasks.reduce((acc, incomes) => incomes.type == "expense" ? acc + incomes.amount : acc, 0);
} catch (err) {
  var tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ADD BUTTON */
document.getElementById("addExpense").addEventListener("click", () => {
  if ((document.getElementById('category').value != "") && (document.getElementById('amount').value != "")) {
    reset();
    var currentDate = new Date();
    let year = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(currentDate);
    let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(currentDate);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(currentDate);
    tasks.push({
      id: Date.now(),
      date: day+"-"+month+"-"+year,
      category: document.getElementById('category').value,
      amount: parseFloat(document.getElementById('amount').value),
      type: "expense"
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById('category').value = "";
    document.getElementById('amount').value = "";
    display();
    document.getElementById('totalExpenses').innerText = "Total Expenses: $" + tasks.reduce((acc, incomes) => incomes.type == "expense" ? acc + incomes.amount : acc, 0);
  } else {
    alert("Insert a value");
  }
});

const createElementsList = element => {
  var tr = document.createElement('tr');

  var cancelBtn = document.createElement('button');
  cancelBtn.innerText = "Delete";
  cancelBtn.value = element.id;
  cancelBtn.className = "deleteTask";
  cancelBtn.addEventListener('click', function handleClick(event) {
    //alert('Element deleted 🎉');
    tasks = tasks.filter(value => value.id != this.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    reset();
    display();
    document.getElementById('totalExpenses').innerText = "Total Expenses: $" + tasks.reduce((acc, incomes) => incomes.type == "expense" ? acc + incomes.amount : acc, 0);
  });
  var category = document.createElement('td');
  category.innerText = element.category;
  var amount = document.createElement('td');
  amount.innerHTML = "$ "+element.amount;
  var mdate = document.createElement('td');
  mdate.innerHTML = element.date;
  tr.appendChild(category);
  tr.appendChild(amount);
  tr.appendChild(mdate);
  tr.appendChild(cancelBtn);

  document.querySelector('#list').appendChild(tr);
}

var display = () => {
  if (JSON.parse(localStorage.getItem("tasks")).length != 0){
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.innerText = "Category";
    var th2 = document.createElement('th');
    th2.innerText = "Amount";
    var th3 = document.createElement('th');
    th3.innerText = "Date";
    var th4 = document.createElement('th');
    th4.innerText = "";
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    document.querySelector('#list').appendChild(tr);
    JSON.parse(localStorage.getItem("tasks")).forEach(element => {

      if (element.type == "expense") {
        createElementsList(element);
      }
    });
  }
}

const reset = () => {
  document.querySelector('#list').innerHTML = '';
}

let cancelBtn = btn => {
  console.log(btn.value);
}