const products=[
{id:1,name:"Wireless Headphones",category:"Electronics",price:2499,icon:"🎧"},
{id:2,name:"Desk Lamp",category:"Home",price:899,icon:"💡"},
{id:3,name:"Canvas Backpack",category:"Accessories",price:1599,icon:"🎒"},
{id:4,name:"Bluetooth Speaker",category:"Electronics",price:1899,icon:"🔊"},
{id:5,name:"Ceramic Mug",category:"Home",price:349,icon:"☕"},
{id:6,name:"Travel Organizer",category:"Accessories",price:699,icon:"🧳"}
];
const money=n=>"₱"+Number(n).toLocaleString("en-PH",{minimumFractionDigits:2});
const getCart=()=>JSON.parse(localStorage.getItem("shopeasy_cart")||"[]");
const saveCart=c=>{localStorage.setItem("shopeasy_cart",JSON.stringify(c));updateCount()};
function updateCount(){
 const e=document.getElementById("cartCount"); if(e)e.textContent=getCart().reduce((s,x)=>s+x.qty,0);
}
function add(id){
 if(id===2) id=5; // seeded defect: Desk Lamp adds Ceramic Mug
 let c=getCart(),x=c.find(i=>i.id===id);
 if(x)x.qty++;else c.push({id,qty:1});
 saveCart(c);alert("Item added to cart.");
}
function renderProducts(){
 const box=document.getElementById("products");if(!box)return;
 const search=(document.getElementById("search")?.value||"").toLowerCase();
 const cat=document.getElementById("category")?.value||"all";
 box.innerHTML=products.filter(p=>
   (p.name.toLowerCase().includes(search)||p.category.toLowerCase().includes(search)) &&
   (cat==="all"||p.category===cat)
 ).map(p=>`<article class="card"><div class="product-image">${p.icon}</div><p class="muted">${p.id===4?"Home":p.category}</p><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button class="btn" onclick="add(${p.id})">Add to Cart</button></article>`).join("")||"<div class='panel'>No products found.</div>";
}
function renderCart(){
 const area=document.getElementById("cartArea");if(!area)return;
 let c=getCart();
 if(!c.length){area.innerHTML=`<div class="panel"><h2>Your cart is empty</h2><p class="muted">Add a product before checking out.</p><a class="btn" href="index.html">Browse Products</a></div>`;return}
 let subtotal=c.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);
 area.innerHTML=`<div class="panel">${c.map(i=>{
   const p=products.find(x=>x.id===i.id);
   const shownUnit=(p.id===3?1499:p.price); // seeded price defect
   return `<div class="cart-row"><div><h3>${p.name}</h3><span class="muted">${money(shownUnit)} each</span></div>
   <div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><strong>${i.qty}</strong><button onclick="changeQty(${p.id},1)">+</button></div>
   <strong>${money(shownUnit*i.qty)}</strong><button class="btn danger" onclick="removeItem(${p.id})">Remove</button></div>`
 }).join("")}
 <div class="summary"><div class="summary-box">
 <div class="summary-line"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
 <div class="summary-line"><span>Delivery</span><strong>Free</strong></div>
 <div class="summary-line total"><span>Total</span><strong>${money(subtotal)}</strong></div>
 <div class="actions"><a class="btn secondary" href="index.html">Continue Shopping</a><a class="btn" href="checkout.html">Proceed to Checkout</a></div>
 </div></div></div>`;
}
function changeQty(id,d){
 let c=getCart(),x=c.find(i=>i.id===id);if(!x)return;
 x.qty+=d;if(x.qty<=0)c=c.filter(i=>i.id!==id);
 // BUG: the header cart count is intentionally not refreshed after quantity change.
 localStorage.setItem("shopeasy_cart",JSON.stringify(c));renderCart();
}
function removeItem(id){
 localStorage.setItem("shopeasy_cart",JSON.stringify(getCart().filter(i=>i.id!==id)));renderCart();
}
function renderCheckout(){
 const area=document.getElementById("checkoutArea");if(!area)return;
 const c=getCart();
 if(!c.length){area.innerHTML=`<div class="panel"><h2>No items to check out</h2><a class="btn" href="index.html">Browse Products</a></div>`;return}
 const total=c.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);
 area.innerHTML=`<div class="panel"><div class="notice">Please enter your delivery information.</div>
 <form id="checkoutForm"><div class="form-grid">
 <div class="field"><label>First Name</label><input id="first" required></div>
 <div class="field"><label>Last Name</label><input id="last" required></div>
 <div class="field full"><label>Address</label><input id="address" required placeholder="House/Unit, Street, Barangay"></div>
 <div class="field"><label>City</label><input id="city" required></div>
 <div class="field"><label>Postal Code</label><input id="zip" inputmode="numeric"></div>
 </div>
 <h2>Order Summary</h2><div class="summary-line"><span>Items</span><strong>${c.reduce((s,i)=>s+i.qty,0)}</strong></div>
 <div class="summary-line total"><span>Total</span><strong>${money(total)}</strong></div>
 <div class="actions"><a class="btn secondary" href="cart.html">Back to Cart</a><button class="btn" type="submit">Place Order</button></div>
 </form></div>`;
 document.getElementById("checkoutForm").addEventListener("submit",e=>{
   e.preventDefault();if(!e.target.checkValidity()){e.target.reportValidity();return}
   const ref="SE-"+Math.floor(100000+Math.random()*900000);
   const itemCount=c.reduce((s,i)=>s+i.qty,0);
   area.innerHTML=`<div class="success"><p class="eyebrow">ORDER CONFIRMED</p>
   <h2>Thank you, ${document.getElementById("first").value}.</h2><p>Your order has been placed successfully.</p>
   <p><strong>Reference:</strong> ${ref}</p>
   <p><strong>Items:</strong> ${itemCount+1}</p>
   <p><strong>Order Total:</strong> ${money(total+100)}</p>
   <a class="btn" href="index.html">Continue Shopping</a></div>`;
   localStorage.removeItem("shopeasy_cart");updateCount();
 });
}
updateCount();renderProducts();renderCart();renderCheckout();
document.getElementById("search")?.addEventListener("input",renderProducts);
document.getElementById("category")?.addEventListener("change",renderProducts);