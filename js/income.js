function show() {
  document.getElementById("popup").style.display = "block";
}

function hide() {
  document.getElementById("popup").style.display = "none";
}

// 
try {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  document.getElementById('totalIncome').innerText = "Total Income: $" + tasks.reduce((acc, incomes) => incomes.type == "income" ? acc + incomes.amount : acc, 0);
} catch (err) {
  var tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* add button */
document.getElementById("addIncome").addEventListener("click", () => {
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
      type: "income"
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById('category').value = "";
    document.getElementById('amount').value = "";
    display();
    document.getElementById('totalIncome').innerText = "Total Income: $" + tasks.reduce((acc, incomes) => incomes.type == "income" ? acc + incomes.amount : acc, 0);
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
    document.getElementById('totalIncome').innerText = "Total Income: $" + tasks.reduce((acc, incomes) => incomes.type == "income" ? acc + incomes.amount : acc, 0);
  });

  
  var td1 = document.createElement('td');
  td1.innerText = element.category;
  var td2 = document.createElement('td');
  td2.innerHTML = "$ " + element.amount;
  var td3 = document.createElement('td');
  td3.innerHTML = element.date;
  var td4 = document.createElement('td');
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  td4.appendChild(cancelBtn);
  tr.appendChild(td4);

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
      if (element.type == "income") {
        createElementsList(element);
      }
      //JSON.parse(localStorage.getItem("tasks")).length){
    });
  }
}

const reset = () => {
  document.querySelector('#list').innerHTML = '';
}

let cancelBtn = btn => {
  console.log(btn.value);
}