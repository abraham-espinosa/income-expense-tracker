  /* add button */
  /**/

  try {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      document.getElementById('totalAmount').innerText = "Total Income: $" + (tasks.reduce((acc, incomes) => incomes.type == "income" ? acc + incomes.amount : acc, 0) - tasks.reduce((acc, incomes) => incomes.type == "expense" ? acc + incomes.amount : acc, 0));

  } catch (err) {
      var tasks = [];
      localStorage.setItem("tasks", JSON.stringify(tasks));
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
      th4.innerText = "Concept";
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);
      document.querySelector('#list-index').appendChild(tr);
      JSON.parse(localStorage.getItem("tasks")).forEach(element => {
          createElementsList(element);
      });
    }
  }

  const createElementsList = element => {
      var li = document.createElement('tr');

      //var cancelBtn = document.createElement('button');
      //cancelBtn.innerText = "X";
      //cancelBtn.value = element.id;
      //cancelBtn.className = "deleteTask";

      var label = document.createElement('td');
      label.innerText = element.category;
      var amount = document.createElement('td');
      amount.innerHTML = "$ " + element.amount;
      var mdate = document.createElement('td');
      mdate.innerHTML = element.date;
      var mtype = document.createElement('td');
      mtype.innerHTML = element.type;
      li.appendChild(label);
      li.appendChild(amount);
      li.appendChild(mdate);
      li.appendChild(mtype);
      document.querySelector('#list-index').appendChild(li);
  }

  const reset = () => {
      document.querySelector('#list').innerHTML = '';
  }

  let cancelBtn = btn => {
      console.log(btn.value);
  }

  var xValues = ["Income", "Expenses"];
  var yValues = [tasks.reduce((acc, incomes) => incomes.type == "income" ? acc + incomes.amount : acc, 0), tasks.reduce((acc, incomes) => incomes.type == "expense" ? acc + incomes.amount : acc, 0)];
  var barColors = [
      "#ca6702",
      "#0a9396"
  ];

  new Chart("myChart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [{
              backgroundColor: barColors,
              data: yValues
          }]
        },
        options: {
          title: {
              display: true,
              text: "Income vs Expenses"
          } 
      }
  });