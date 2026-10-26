// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// Menu data
const menuItems = [
  {id:1,name:'Basic Overload',price:'₱120',category:'Meals',desc:'Overloaded rice meal with egg and sauce.',img:'BASIC OVERLOAD.webp',available:true},
  {id:2,name:'Chicken Roll',price:'₱95',category:'Snacks',desc:'Crispy chicken roll with dipping sauce.',img:'CHICKEN ROLL.webp',available:true},
  {id:3,name:'Creamy Basic Samyang',price:'₱110',category:'Noodles',desc:'Creamy spicy samyang noodles.',img:'CREAMY BASIC SAMYANG.webp',available:true},
  {id:4,name:'Overload Combo 1',price:'₱180',category:'Combos',desc:'Combo meal with fries and drink.',img:'OVERLOAD COMBO 1.webp',available:true},
  {id:5,name:'Overload Combo 2',price:'₱200',category:'Combos',desc:'Premium combo with extra toppings.',img:'OVERLOAD COMBO 2.webp',available:true},
  {id:6,name:'Samyang Chix-Pop Fry',price:'₱130',category:'Noodles',desc:'Samyang with chicken poppers.',img:'SAMYANG CHIX-POP FRY.webp',available:true},
  {id:7,name:'Twisted Fries',price:'₱70',category:'Snacks',desc:'Crispy twisted potato fries.',img:'TWISTED FRIES.webp',available:true},
  {id:8,name:'Med Fries',price:'₱80',category:'Snacks',desc:'Medium serving of golden fries.',img:'MED-FRIES.webp',available:true},
  {id:9,name:'Add-On',price:'₱40',category:'Add-ons',desc:'Extra toppings add-on.',img:'ADD-ON.webp',available:true},
];

// Menu page logic
const menuGrid = document.getElementById('menuGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderMenu(items){
  if(!menuGrid) return;
  if(items.length===0){ menuGrid.innerHTML='<p class="empty">No items found.</p>'; return; }
  menuGrid.innerHTML = items.map(it=>`
    <div class="menu-card" data-id="${it.id}">
      <img src="${it.img}" alt="${it.name}">
      <div class="info">
        <h3>${it.name}</h3>
        <div class="price">${it.price}</div>
        <p class="desc">${it.desc}</p>
        <button class="toggle ${it.available?'available':'unavailable'}" data-id="${it.id}">${it.available?'Available':'Unavailable'}</button>
        <button class="btn" style="margin-left:.5rem;padding:.4rem .9rem;font-size:.85rem" data-order="${it.id}">Pre-order</button>
      </div>
    </div>`).join('');
  menuGrid.querySelectorAll('.toggle').forEach(b=>b.addEventListener('click',e=>{
    const id=+e.target.dataset.id; const item=menuItems.find(x=>x.id===id); item.available=!item.available; applyFilters();
  }));
  menuGrid.querySelectorAll('[data-order]').forEach(b=>b.addEventListener('click',e=>{
    const id=+e.target.dataset.order; const item=menuItems.find(x=>x.id===id);
    document.getElementById('modalTitle').textContent='Pre-order: '+item.name;
    document.getElementById('orderModal').classList.add('open');
  }));
}
function applyFilters(){
  const q=(searchInput?searchInput.value:'').toLowerCase();
  const active=document.querySelector('.filter-btn.active');
  const cat=active?active.dataset.cat:'all';
  const filtered=menuItems.filter(it=>{
    const matchQ=it.name.toLowerCase().includes(q)||it.desc.toLowerCase().includes(q)||it.category.toLowerCase().includes(q);
    const matchC=cat==='all'||it.category===cat;
    return matchQ&&matchC;
  });
  renderMenu(filtered);
}
if(menuGrid){
  const cats=['all',...new Set(menuItems.map(i=>i.category))];
  const filters=document.querySelector('.filters');
  if(filters){ filters.innerHTML=cats.map(c=>`<button class="filter-btn ${c==='all'?'active':''}" data-cat="${c}">${c==='all'?'All':c}</button>`).join('');
    filters.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{
      filters.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); applyFilters();
    }));
  }
  if(searchInput) searchInput.addEventListener('input',applyFilters);
  applyFilters();
}
// Modal close
const modal=document.getElementById('orderModal');
if(modal){ document.getElementById('closeModal').addEventListener('click',()=>modal.classList.remove('open'));
  modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open');});
}

// Contact form validation
const form=document.getElementById('contactForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    let ok=true;
    const name=document.getElementById('name'),email=document.getElementById('email'),msg=document.getElementById('message');
    const nameErr=document.getElementById('nameErr'),emailErr=document.getElementById('emailErr'),msgErr=document.getElementById('msgErr');
    nameErr.style.display='none';emailErr.style.display='none';msgErr.style.display='none';
    if(name.value.trim().length<2){nameErr.style.display='block';ok=false;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){emailErr.style.display='block';ok=false;}
    if(msg.value.trim().length<10){msgErr.style.display='block';ok=false;}
    if(ok){
      document.getElementById('successMsg').style.display='block';
      form.reset();
    }
  });
}
