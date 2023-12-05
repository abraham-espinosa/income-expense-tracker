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
      var li = document.createElement('li');
      var label1 = document.createElement('label');
      label1.innerText = "Category";
      var label2 = document.createElement('label');
      label2.innerText = "Amount";
      var label3 = document.createElement('label');
      label3.innerText = "Date";
      var label4 = document.createElement('label');
      label4.innerText = "Type";
      li.appendChild(label1);
      li.appendChild(label2);
      li.appendChild(label3);
      li.appendChild(label4);
      document.querySelector('#list-index').appendChild(li);
      JSON.parse(localStorage.getItem("tasks")).forEach(element => {
          createElementsList(element);
      });
  }

  const createElementsList = element => {
      var li = document.createElement('li');

      var cancelBtn = document.createElement('button');
      cancelBtn.innerText = "X";
      cancelBtn.value = element.id;
      cancelBtn.className = "deleteTask";

      var label = document.createElement('label');
      label.innerText = element.category;
      var amount = document.createElement('label');
      amount.innerHTML = "$"+element.amount;
      var mdate = document.createElement('label');
      mdate.innerHTML = element.date;
      var mtype = document.createElement('label');
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