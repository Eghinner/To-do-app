const form     = document.querySelector('form');
const ul       = document.querySelector('#all');
const active   = document.querySelector('#active');
const complete = document.querySelector('#complete');
const button   = document.querySelector('#clear');
const input1   = document.getElementById('item');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));
////////////////////////////////////////////////////////////////////////////
let itemsArray2 = localStorage.getItem('items2') ? JSON.parse(localStorage.getItem('items2')) : [];
localStorage.setItem('items2', JSON.stringify(itemsArray2));
const data2 = JSON.parse(localStorage.getItem('items2'));

// Tareas_Completadas
let Ready = localStorage.getItem('Ready') ? JSON.parse(localStorage.getItem('Ready')) : [];
localStorage.setItem('Ready', JSON.stringify(Ready));
const data3 = JSON.parse(localStorage.getItem('Ready'));
////////////////////

// const liMaker = (text) => Que locura las flechas

 var counter = 0;
 var counter2 = 0;
 function liMaker(text){
  const div = document.createElement('div');
  div.setAttribute("class","label_cont");
  const input = document.createElement('input');
  input.setAttribute("type", "checkbox" );
  input.setAttribute("name", "he");
  input.setAttribute("id", counter++);
  
  const label = document.createElement('label');
  label.setAttribute("for", counter2++);
  ul.appendChild(div);
  div.appendChild(label);
  label.textContent = text;
  div.insertBefore(input,label);


  input.addEventListener('change',function(){
    if (this.checked) {
      itemsArray2[input.id].state = "on";
      localStorage.setItem('items2', JSON.stringify(itemsArray2));
      } else {
      itemsArray2[input.id].state = "off";
      localStorage.setItem('items2', JSON.stringify(itemsArray2));
      }
  });

  // var task_names = data2.map(function(omi) { 
  //     return omi.state == "on" ? input.checked = true : input.checked = false;
  // });
      data2[input.id].state == "on" ? input.checked = true : input.checked = false;
      // console.log(itemsArray2);
      // console.log(data2);
/////End Limaker
}

form.addEventListener('submit', function (e) {
  // e.preventDefault();
  itemsArray.push(input1.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));

  itemsArray2.push({task:input1.value, state:"off"});
  localStorage.setItem('items2', JSON.stringify(itemsArray2));

  // console.log(itemsArray);
  
  liMaker(input1.value);
  input1.value = "";

});

data2.forEach(item => {
  liMaker(item.task);
  // console.log(item);
});



button.addEventListener('click', function () {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  itemsArray = [];
  itemsArray2 = [];
});

///////////////////// ACTIVO /////////////////////
//FILTRO
let xiqui = data2.filter(goal=>goal.state=="off");
localStorage.setItem('UnReady', JSON.stringify(xiqui));
// CREAR_LISTA
function liMaker_active(text_active){
  const li = document.createElement('li');
  li.textContent = text_active;
  active.appendChild(li);
}
// ITERAR_EN_UL
xiqui.forEach(item => {
  liMaker_active(item.task);
});
///////////////////// COMPLETADO /////////////////////
//FILTRO
let great = data2.filter(goal=>goal.state=="on");
localStorage.setItem('Ready', JSON.stringify(great));
// CREAR_LISTA
function liMaker_complete(text_complete){
  const li = document.createElement('li');
  li.textContent = text_complete;
  complete.appendChild(li);
}
// ITERAR_EN_UL
great.forEach(item => {
  const li = document.createElement('li');
  liMaker_complete(item.task);
});




    let kawaii = document.querySelector('#kawaii');

    kawaii.addEventListener('change', function (e) {
        let target = e.target;
        let message;
        switch (target.id) {
            case 'show_all':
            ul.style.display = 'block';
            complete.style.display = 'none';
            active.style.display = 'none';
                break;
            case 'show_active':
            complete.style.display = 'none';
            active.style.display = 'block';
            ul.style.display = 'none';
                break;
            case 'show_complete':
            complete.style.display = 'block';
            active.style.display = 'none';
            ul.style.display = 'none';
                break;
        }
    });


// Themes
var switch_theme = document.querySelector('#switch');
var moon = document.querySelector('#moon');
var sun = document.querySelector('#sun');
var img_sun = document.querySelector('#img_sun');
var img_moon = document.querySelector('#img_moon');

function setTheme(themeName) {
            localStorage.setItem('theme', themeName);
            document.documentElement.className = themeName;
        }

switch_theme.addEventListener('click', function(themeName){
  if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        moon.style.display="block";
        sun.style.display="none";
        img_moon.style.display="block";
        img_sun.style.display="none";
    } else {
        setTheme('theme-dark');
        moon.style.display="none";
        sun.style.display="block";
        img_sun.style.display="block";
        img_moon.style.display="none";
    }
});

(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
})();