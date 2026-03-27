const phone = "917605858467";
const upi = "mahantajoy1234-3@oksbi";

const items = [
["Chicken Steamed Momo (6 pcs)",50],
["Chicken Fried Momo (6 pcs)",60],
["Chicken Pan Fried Momo (6 pcs)",80],
["Veg Chow Mein Half",25],
["Veg Chow Mein Full",45],
["Egg Chow Mein Half",30],
["Egg Chow Mein Full",50],
["Chicken Chow Mein Half",40],
["Chicken Chow Mein Full",60],
["Mixed Chow Mein Half",45],
["Mixed Chow Mein Full",70],
["Egg Roll",35],
["Chicken Roll",50],
["Egg Chicken Roll",60],
["Chicken Lollipop Fry Single",40],
["Chicken Lollipop Fry Double",70],
["Chicken Lollipop Chilli (4 pcs)",170]
];

function render(){
  const m = document.getElementById("menu");
  m.innerHTML="";

  items.forEach(i=>{
    let d=document.createElement("div");
    d.className="item";

    d.innerHTML=`
      <div class="row">
        <span>${i[0]}</span>
        <span>₹${i[1]}</span>
      </div>
      <div class="controls">
        <button class="qty-btn" onclick="q(this,-1)">-</button>
        <span class="qty">0</span>
        <button class="qty-btn" onclick="q(this,1)">+</button>
      </div>
    `;
    m.appendChild(d);
  });
}

function q(btn,val){
  let span = btn.parentElement.querySelector(".qty");
  let n = parseInt(span.innerText);
  n += val;
  if(n<0) n=0;
  span.innerText = n;
  calc();
}

function calc(){
  let subtotal = 0;
  let billHTML = "";

  document.querySelectorAll(".item").forEach((el,i)=>{
    let q = parseInt(el.querySelector(".qty").innerText);
    if(q>0){
      let price = items[i][1];
      let total = q * price;
      subtotal += total;

      billHTML += `${items[i][0]} x ${q} = ₹${total}<br>`;
    }
  });

  let type = document.getElementById("type").value.toLowerCase();
  let packing = (type.includes("parcel")) ? 5 : 0;

  let final = subtotal + packing;

  document.getElementById("billItems").innerHTML = billHTML || "No items";
  document.getElementById("subtotal").innerText = "₹" + subtotal;
  document.getElementById("packing").innerText = "₹" + packing;
  document.getElementById("total").innerText = "₹" + final;
}

function getOrder(){
  let arr=[];
  document.querySelectorAll(".item").forEach((el,i)=>{
    let q=parseInt(el.querySelector(".qty").innerText);
    if(q>0){
      arr.push(items[i][0]+" x "+q);
    }
  });
  return arr;
}

function order(){
  let o=getOrder();
  if(o.length===0){
    alert("Add item first");
    return;
  }
  alert("Check bill & proceed to payment");
}

function payNow(){
  let total=document.getElementById("total").innerText.replace("₹","");
  if(total==0){
    alert("No items");
    return;
  }
  window.location.href=`upi://pay?pa=${upi}&pn=ByteZone&am=${total}&cu=INR`;
}

function sendBill(){
  let name=document.getElementById("name").value||"Customer";
  let type=document.getElementById("type").value||"N/A";
  let order=getOrder();
  let subtotal=document.getElementById("subtotal").innerText;
  let packing=document.getElementById("packing").innerText;
  let total=document.getElementById("total").innerText;

  let msg="ByteZone Bill%0A";
  msg+="Name: "+name+"%0A";
  msg+="Type: "+type+"%0A%0A";

  order.forEach(i=>msg+=i+"%0A");

  msg+="%0ASubtotal: "+subtotal;
  msg+="%0APacking: "+packing;
  msg+="%0ATotal: "+total;

  window.open(`https://wa.me/${phone}?text=${msg}`);
}

render();
