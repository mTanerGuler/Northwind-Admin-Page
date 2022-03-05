const baseURL = "http://localhost:3000";


async function fetchOrders(cmbName, searchTxt) {
  const response = await fetch(`${baseURL}/orders`);
  const orders = await response.json();
  render(orders, cmbName, searchTxt);
}

async function fetchEmployee() {
  const response = await fetch(`${baseURL}/employees`);
  const employee = await response.json();
  render1(employee);
}


const source = document.querySelector('.searchtxt');


const inputHandler = function(searchText) {
  var li = document.querySelectorAll(".topic li");
  li.forEach((li)=>{
    li.remove();
  })

  var searchTxt = source.value;
  fetchOrders(cmbName, searchTxt);
}

source.addEventListener('input', inputHandler);

function fillList(topic, text) {
    const li = document.createElement("li");
    const a = document.createElement("a");
  
    a.innerText = text;
    li.append(a);
    document.querySelector(topic).append(li);
}

var cmbName = 0;

function selectedEmpID(chosen) {
  var li = document.querySelectorAll(".topic li");
  li.forEach((li)=>{
    li.remove();
  })
  
  cmbName = parseInt(chosen);
  fetchOrders(cmbName);
}
function render(orders, cmbName, searchTxt) {
  var sumTotalPrice=0;
  
  const num=document.querySelector(".orderIDCount");
  const sumPrice=document.querySelector(".sumTotalPrice");
  const avgUnitPrice=document.querySelector(".avgUnitPrice");
  var ordLen= parseInt(orders.length);
  num.innerText =ordLen;
  
  if (cmbName == null && searchTxt == null) {
    orders.forEach((order) => {
      fillList(".topic1", order.id);
      fillList(".topic2", order.customerId);
      fillList(".topic3", order.employeeName);
      fillList(".topic4", order.orderDate.slice(0, 10));

      const detail = order.details[0];
      const totalPrice = (
        detail.unitPrice *
        detail.quantity *
        (1 - detail.discount)
      ).toFixed(2);

      var totalPriceInt= parseInt(totalPrice);
      sumTotalPrice=totalPriceInt+sumTotalPrice;
      sumPrice.innerText=sumTotalPrice;
      
      fillList(".topic5", totalPrice);
    });
    
  } else if(searchTxt==null && cmbName!== null) {
    
    var orderArr = [];
    orders.forEach((order2) => {
      if (cmbName === order2.employeeId) {
        orderArr.push(order2);
      }
    });
    orderArr.forEach((order) => {
      fillList(".topic1", order.id);
      fillList(".topic2", order.customerId);
      fillList(".topic3", order.employeeName);
      fillList(".topic4", order.orderDate.slice(0, 10));

      const detail = order.details[0];
      const totalPrice = (
        detail.unitPrice *
        detail.quantity *
        (1 - detail.discount)
      ).toFixed(2);
      fillList(".topic5", totalPrice);
    });
  }
  else {
    var searchCustomerID = [];
    orders.forEach((order3) => {
      if(order3.customerId.toUpperCase().includes(searchTxt.toUpperCase())) 
      {
        searchCustomerID.push(order3);
      }
    });

    searchCustomerID.forEach((order) => {
      fillList(".topic1", order.id);
      fillList(".topic2", order.customerId);
      fillList(".topic3", order.employeeName);
      fillList(".topic4", order.orderDate.slice(0, 10));

      const detail = order.details[0];
      const totalPrice = (
        detail.unitPrice *
        detail.quantity *
        (1 - detail.discount)
      ).toFixed(2);
      fillList(".topic5", totalPrice);
    });

  }
  
}


var comboBox = document.querySelector("#selectNumber");

function render1(employee) {
  employee.forEach((emp) => {
    var name = document.createElement("option");
    name.textContent = emp.employeeName;
    name.value = emp.id;
    comboBox.appendChild(name);
  });
}
fetchOrders();
fetchEmployee();
//const form = document.querySelector(".links_name");
//window.location.href = form.getAttribute("action"); 


