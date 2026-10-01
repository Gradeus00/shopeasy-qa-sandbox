(()=>{var M="AUF10";var $=[{id:"k7q2",name:"Wireless Headphones",shelf:"Electronics",group:"Electronics",price:2499,icon:"\u{1F3A7}",visible:!0},{id:"m3x9",name:"Desk Lamp",shelf:"Home",group:"Home",price:899,icon:"\u{1F4A1}",visible:!1},{id:"b8n4",name:"Canvas Backpack",shelf:"Accessories",group:"Accessories",price:1599,icon:"\u{1F392}",visible:!0},{id:"s5d1",name:"Bluetooth Speaker",shelf:"Electronics",group:"Home",price:1899,icon:"\u{1F50A}",visible:!0},{id:"c2v6",name:"Ceramic Mug",shelf:"Home",group:"Home",price:349,icon:"\u2615",visible:!0},{id:"t9r3",name:"Travel Organizer",shelf:"Accessories",group:"Accessories",price:699,icon:"\u{1F9F3}",visible:!0},{id:"w4h8",name:"Wall Clock",shelf:"Home",group:"Home",price:549,icon:"\u{1F570}\uFE0F",visible:!0},{id:"p6j5",name:"Phone Stand",shelf:"Accessories",group:"Accessories",price:299,icon:"\u{1F4F1}",visible:!0}],T={k7q2:2499,m3x9:899,b8n4:1599,s5d1:1899,c2v6:349,t9r3:749,w4h8:549,p6j5:299},O=[{upTo:1e3,fee:0},{upTo:1500,fee:100},{upTo:1/0,fee:0}],v=e=>$.find(t=>t.id===e);var P="shopeasy_cart",S="shopeasy_promo",L="shopeasy_orders";function d(){try{return(JSON.parse(localStorage.getItem(P))||[]).filter(t=>t&&typeof t.id=="string"&&Number.isFinite(t.qty)&&t.qty>0)}catch{return[]}}function E(e){localStorage.setItem(P,JSON.stringify(e))}function k(){localStorage.removeItem(P)}function g(){return localStorage.getItem(S)||""}function A(e){localStorage.setItem(S,e)}function I(){localStorage.removeItem(S)}function X(){try{return JSON.parse(sessionStorage.getItem(L))||[]}catch{return[]}}function w(e){let t=X();return t.push(e),sessionStorage.setItem(L,JSON.stringify(t)),t}var N=e=>Math.round(e),B=e=>Math.max(1,Math.min(10,Math.floor(Number(e)||1)));function K(e,t){let o=T[e],r=B(t),s=r<10?r:9;return N(o*s)}function R(e,t){let o=[],r=String(t||"").trim().toUpperCase()===M;return r&&o.push(.1),r&&e>=3e3&&o.push(.1),o}function W(e){let t=O.find(o=>e<o.upTo);return t?t.fee:0}function h(e,t){let o=e.map(a=>({id:a.id,qty:B(a.qty),unit:T[a.id],total:K(a.id,a.qty)})),r=o.reduce((a,p)=>a+p.total,0),s=R(r,t).reduce((a,p)=>a+N(r*p),0),n=W(r),c=String(t||"").trim();return{lines:o,subtotal:r,discount:s,promo:c?{code:c.toUpperCase(),valid:R(r,t).length>0}:null,unitCount:o.reduce((a,p)=>a+p.qty,0),total:r-s+n}}function G(){return d().reduce((e,t)=>e+t.qty,0)}function y(){let e=document.getElementById("cartCount");e&&(e.textContent=G())}function F(e){E(e),y()}function _(e){let t=d(),o=t.find(r=>r.id===e);if(o){if(o.qty>=10)return{ok:!1,reason:"max"};o.qty++}else t.push({id:e,qty:1});return F(t),{ok:!0,name:v(e)?.name}}function H(e,t){let o=d(),r=o.find(n=>n.id===e);if(!r)return;r.qty=Math.min(10,r.qty+t);let s=o.filter(n=>n.qty>0);E(s)}function Y(e){let t=d(),o=t.findIndex(r=>r.id===e);o<0||(t.splice(o,t.length),F(t))}var b=[{id:"first",label:"First Name",message:"Please enter your first name."},{id:"last",label:"Last Name",message:"Please enter your last name."},{id:"address",label:"Address",message:"Please enter your address.",full:!0,placeholder:"House/Unit, Street, Barangay"},{id:"city",label:"City",message:"Please enter your city."},{id:"zip",label:"Postal Code",message:"Enter a 4-digit postal code.",numeric:!0}];function Q(e){let t={};for(let o of b){let r=String(e[o.id]??"").trim();o.numeric?/^\d{4}$/.test(r)||(t[o.id]=o.message):r||(t[o.id]=o.message)}return t}function U(e){let t=h(d(),g()),r={ref:"SE-"+Math.floor(1e5+Math.random()*9e5),firstName:String(e.first).trim(),itemCount:t.lines.length,total:t.total},n=w(r)[0];return k(),I(),y(),{ref:r.ref,firstName:r.firstName,itemCount:r.itemCount,total:n.total}}var i=e=>document.getElementById(e),u=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),m=e=>"\u20B1"+Number(e).toLocaleString("en-PH",{minimumFractionDigits:2,maximumFractionDigits:2}),j;function V(e){let t=i("toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(j),j=setTimeout(()=>t.classList.remove("show"),1800))}function q(){let e=i("products");if(!e)return;let t=i("search").value.trim().toLowerCase(),o=i("category").value,r=$.filter(s=>{let n=!t||s.name.toLowerCase().includes(t)||s.shelf.toLowerCase().includes(t),c=o==="all"||s.group===o;return n&&c});e.innerHTML=r.map(s=>`
    <article class="card">
      <div class="product-image" aria-hidden="true">${s.icon}</div>
      <p class="muted">${u(s.shelf)}</p>
      <h3>${u(s.name)}</h3>
      <div class="price">${m(s.price)}</div>
      <button class="btn" data-add="${s.id}">Add to Cart</button>
    </article>`).join("")||"<div class='panel'>No products found. Try a different search or category.</div>"}function Z(){i("search").addEventListener("input",q),i("category").addEventListener("change",q),i("products").addEventListener("click",e=>{let t=e.target.closest("[data-add]");if(!t)return;let o=_(t.dataset.add);V(o.ok?`${o.name} added to cart.`:`You can add up to ${10} of each item.`)}),q()}function x(){let e=i("cartArea");if(!e)return;let o=d().filter(n=>v(n.id)?.visible);if(!o.length){e.innerHTML='<div class="panel"><h2>Your cart is empty</h2><p class="muted">Add a product before checking out.</p><a class="btn" href="index.html">Browse Products</a></div>';return}let r=h(o,g()),s=r.promo?r.promo.valid?`Code ${u(r.promo.code)} applied: 10% off your order.`:`Code ${u(r.promo.code)} is not valid.`:"Have a promo code? Enter it here.";e.innerHTML=`<div class="panel">
    ${r.lines.map(n=>{let c=v(n.id);return`<div class="cart-row">
        <div class="cart-item"><div class="cart-icon" aria-hidden="true">${c.icon}</div>
          <div><h3>${u(c.name)}</h3><span class="muted">${m(n.unit)} each</span></div></div>
        <div><div class="qty">
          <button data-dec="${n.id}" aria-label="Decrease quantity of ${u(c.name)}">\u2212</button>
          <strong>${n.qty}</strong>
          <button data-inc="${n.id}" aria-label="Increase quantity of ${u(c.name)}"${n.qty>=10?" disabled":""}>+</button>
        </div><div class="max-note">Max ${10} per item</div></div>
        <strong>${m(n.total)}</strong>
        <button class="btn danger" data-remove="${n.id}">Remove</button>
      </div>`}).join("")}
    <div class="summary"><div class="summary-box">
      <div class="promo"><input id="promoInput" aria-label="Promo code" placeholder="Promo code" value="${u(g())}"><button class="btn secondary" id="promoApply">Apply</button></div>
      <p class="promo-msg">${s}</p>
      <div class="summary-line"><span>Subtotal</span><strong>${m(r.subtotal)}</strong></div>
      ${r.discount?`<div class="summary-line"><span>Discount</span><strong>\u2212${m(r.discount)}</strong></div>`:""}
      <div class="summary-line"><span>Delivery</span><strong>Free</strong></div>
      <div class="summary-line total"><span>Total</span><strong>${m(r.total)}</strong></div>
      <div class="actions"><a class="btn secondary" href="index.html">Continue Shopping</a><a class="btn" href="checkout.html">Proceed to Checkout</a></div>
    </div></div></div>`}function tt(){i("cartArea").addEventListener("click",e=>{let t=e.target.closest("button");t&&(t.dataset.inc?(H(t.dataset.inc,1),x()):t.dataset.dec?(H(t.dataset.dec,-1),x()):t.dataset.remove?(Y(t.dataset.remove),x()):t.id==="promoApply"&&(A(i("promoInput").value.trim()),x()))}),x()}function et(){let e=i("checkoutArea");if(!e)return;let t=d().filter(r=>v(r.id)?.visible);if(!t.length){e.innerHTML='<div class="panel"><h2>No items to check out</h2><a class="btn" href="index.html">Browse Products</a></div>';return}let o=h(t,g());e.innerHTML=`<div class="panel">
    <div class="notice">Please enter your delivery information.</div>
    <form id="checkoutForm" novalidate><div class="form-grid">
      ${b.map(r=>`<div class="field${r.full?" full":""}">
        <label for="${r.id}">${r.label}</label>
        <input id="${r.id}"${r.placeholder?` placeholder="${r.placeholder}"`:""}${r.numeric?' inputmode="numeric" maxlength="4"':""} aria-describedby="${r.id}Err">
        <span class="err" id="${r.id}Err"></span></div>`).join("")}
    </div>
    <h2>Order Summary</h2>
    <div class="summary-line"><span>Items</span><strong>${o.unitCount}</strong></div>
    <div class="summary-line"><span>Subtotal</span><strong>${m(o.subtotal)}</strong></div>
    ${o.discount?`<div class="summary-line"><span>Discount</span><strong>\u2212${m(o.discount)}</strong></div>`:""}
    <div class="summary-line"><span>Delivery</span><strong>Free</strong></div>
    <div class="summary-line total"><span>Total</span><strong>${m(o.total)}</strong></div>
    <div class="actions"><a class="btn secondary" href="cart.html">Back to Cart</a><button class="btn" type="submit">Place Order</button></div>
    </form></div>`,i("checkoutForm").addEventListener("submit",r=>{r.preventDefault();let s={};b.forEach(f=>{s[f.id]=i(f.id).value});let n=Q(s),c=null;if(b.forEach(f=>{let C=!!n[f.id];i(f.id+"Err").textContent=C?n[f.id]:"",i(f.id).setAttribute("aria-invalid",C?"true":"false"),C&&!c&&(c=i(f.id))}),c){c.focus();return}let a=U(s),p=i("checkoutTitle");p&&(p.innerHTML='<p class="eyebrow">ORDER CONFIRMED</p><h1>Thank you for your order</h1>'),e.innerHTML=`<div class="success">
      <h2>Thank you, ${u(a.firstName)}.</h2>
      <p>Your order has been placed successfully.</p>
      <p><strong>Reference:</strong> ${u(a.ref)}</p>
      <p><strong>Items:</strong> ${a.itemCount}</p>
      <p><strong>Order Total:</strong> ${m(a.total)}</p>
      <a class="btn" href="index.html">Continue Shopping</a></div>`})}function J(){let e=document.querySelector("main")?.dataset.page;y(),e==="products"?Z():e==="cart"?tt():e==="checkout"&&et()}J();})();
