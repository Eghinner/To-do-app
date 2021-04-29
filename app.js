const form     = document.querySelector('form');
const ul       = document.querySelector('#all');
const active   = document.querySelector('#active');
const complete = document.querySelector('#complete');
const button   = document.querySelector('#clear');
const input1   = document.getElementById('item');
const skina    = document.querySelector('p');

////////////////////////////////////////////////////////////////////////////
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));

// const liMaker = (text) => Que locura las flechas
 var counter = 0;
 var counter2 = 0;
 var counter3 = 1;
 function liMaker(text){
  const div = document.createElement('div');
  div.setAttribute("class","label_cont");
  const input = document.createElement('input');
  input.setAttribute("type", "checkbox" );
  // input.setAttribute("name", "he");
  input.setAttribute("id", counter++);
  const label = document.createElement('label');
  label.setAttribute("for", counter2++);
  // label.setAttribute("class", "drag");
  const icon = document.createElement('i');
  icon.setAttribute("class", "fas fa-times");
  ul.appendChild(div);
  div.appendChild(label);
  div.appendChild(icon);
  label.textContent = text;
  div.insertBefore(input,label);
  
  icon.addEventListener('click',function(){
    children1 = ul.childNodes;
          function get41() {
                  result = [];
              for (var i = 0; i < children1.length; i++) {
                  result.push(children1[i].textContent);
              }
              return result;
          }
      index=get41().indexOf(text);
      itemsArray.splice(index, 1);
      localStorage.setItem('items', JSON.stringify(itemsArray));    
      ul.removeChild(ul.childNodes[get41().indexOf(text)]);

      children2 = active.childNodes;
            function get43() {
                    result = [];
                for (var i = 0; i < children2.length; i++) {
                    result.push(children2[i].textContent);
                }
                return result;
            }
            if (get43().includes(text)) {
              active.removeChild(active.childNodes[get43().indexOf(text)]);
            }
      

      children3 = complete.childNodes;
            function get44() {
                    result = [];
                for (var i = 0; i < children3.length; i++) {
                    result.push(children3[i].textContent);
                }
                return result;
            }
            if (get44().includes(text)) {
              complete.removeChild(complete.childNodes[get44().indexOf(text)]);
            }
  });


  input.addEventListener('change',function(){
    if (this.checked) {
      itemsArray[input.id].state = "on";
      localStorage.setItem('items', JSON.stringify(itemsArray));
      let great2 = itemsArray.filter(goal=>goal.state=="on");
      let tasks = great2.map(el=>el.task);

      children = active.childNodes;
      function get42() {
              result = [];
          for (var i = 0; i < children.length; i++) {
              result.push(children[i].textContent);
          }
          return result;
      }
      active.removeChild(active.childNodes[get42().indexOf(text)]);
      liMaker_complete(text);

      } else {
      itemsArray[input.id].state = "off";
      localStorage.setItem('items', JSON.stringify(itemsArray));
      itemsArray = JSON.parse(localStorage.getItem('items'));

      children = complete.childNodes;
      function get42() {
              result = [];
          for (var i = 0; i < children.length; i++) {
              result.push(children[i].textContent);
          }
          return result;
      }
      complete.removeChild(complete.childNodes[get42().indexOf(text)]);
      
      liMaker_active(text);
      }
  });  
      itemsArray[input.id].state === "on" ? input.checked = true : input.checked = false;
      skina.textContent ="Items " + counter3++;
/////End Limaker
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input1.value == ""){e.preventDefault();}else{
  itemsArray.push({task:input1.value, state:"off"});
  localStorage.setItem('items', JSON.stringify(itemsArray));
  liMaker(input1.value);
  liMaker_active(input1.value);
  input1.value = "";
}
});
itemsArray.forEach(item => {
  liMaker(item.task);
});
button.addEventListener('click', function () {
  localStorage.removeItem('items');
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }
  while (active.firstChild) {
    active.removeChild(active.firstChild);
  }
  while (complete.firstChild) {
    complete.removeChild(complete.firstChild);
  }
/////////////////////////////////////////////////
/////////////////////BUG////////////////////
////////////////////////////////////////////
  itemsArray = [];
///////////////////////////////////////////////
////////////////////////////////////////////
// localStorage.setItem('items', JSON.stringify(itemsArray));
});

//////////////////////////////////////////
let xiqui = itemsArray.filter(goal=>goal.state=="off");
function liMaker_active(text_active){
  const li = document.createElement('li');
  li.textContent = text_active;
  active.appendChild(li);
}
xiqui.forEach(item => {
  liMaker_active(item.task);
});
//////////////////////////////////////////
let great = itemsArray.filter(goal=>goal.state=="on");
function liMaker_complete(text_complete){
  const li = document.createElement('li');
  li.textContent = text_complete;
  complete.appendChild(li);
}
great.forEach(item => {
  liMaker_complete(item.task);
});

// Switch_Ul
    document.querySelector('#kawaii').addEventListener('change', function (e) {
        let target = e.target;
        switch (target.id) {
            case 'show_all':
            complete.style.display = 'none';
            active.style.display = 'none';
            ul.style.display = 'block';
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
function setTheme(themeName) {
            localStorage.setItem('theme', themeName);
            document.documentElement.className = themeName;
        }
switch_theme.addEventListener('click', function(themeName){
  if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
});
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
})();


// SORTABLE
Sortable.create(active, {
  group: {
    name: "order_active"
  },
  animation: 350, 
  easing: "cubic-bezier(0.64, 0, 0.78, 0)",
  handle: "li",
  draggClass: "invisible",
  store: {
    get: function (sortable) {
      var order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split('|') : [];
    },
    set: function (sortable) {
      var order = sortable.toArray();
      localStorage.setItem(sortable.options.group.name, order.join('|'));
    }
  }
});
Sortable.create(complete, {
  group: {
    name: "order_complete"
  },
  animation: 350, 
  easing: "cubic-bezier(0.64, 0, 0.78, 0)",
  handle: "li",
  draggClass: "invisible",
  store: {
    get: function (sortable) {
      var order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split('|') : [];
    },
    set: function (sortable) {
      var order = sortable.toArray();
      localStorage.setItem(sortable.options.group.name, order.join('|'));
    }
  }
});
Sortable.create(ul, {
  group: {
    name: "order_all"
  },
  animation: 350, 
  delay: 1000,
  easing: "cubic-bezier(0.64, 0, 0.78, 0)",
  draggable: ".label_cont",
  // handle: ".fas",
  draggClass: "ghost",
  store: {
    get: function (sortable) {
      var order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split('|') : [];
    },
    set: function (sortable) {
      var order = sortable.toArray();
      localStorage.setItem(sortable.options.group.name, order.join('|'));
    }
  }
});