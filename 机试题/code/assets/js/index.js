var title, todolist, todocount, donecount, donelist, prev, ipv4, addr
var list = {
    todolist: [],
    donelist: []
}
go()
function go(){
    title = document.querySelector('#title')
    todolist = document.querySelector('#todolist')
    todocount = document.querySelector('#todocount')
    donecount = document.querySelector('#donecount')
    donelist = document.querySelector('#donelist')
    ipv4 = document.querySelector('#ipv4')
    addr = document.querySelector('#addr')
    document.addEventListener("keyup", keyHandler)
    // 未完成事件
    todolist.addEventListener("click", clickHandler)
    todolist.addEventListener("change", changeHandler)
    todolist.addEventListener("dblclick", dblclickHandler)
    todolist.addEventListener("focusout",blurHandler)

    // 完成事件
    donelist.addEventListener("click", clickHandler)
    donelist.addEventListener('change', changeHandler)

   if(localStorage.list){
       list=JSON.parse(localStorage.list)
    render()
   }
    
}
function keyHandler(e) {
    if (e.keyCode !== 13 || title.value.trim().length === 0) return
    list.todolist.push(title.value.trim())
    title.value = ""
    render()
}

function changeHandler(e) {
    if (e.target.type !== "checkbox") return
    chooseList(e.target, e.target.checked)
}

function chooseList(target, flag, remove) {
    var list1 = flag ? list.todolist : list.donelist
    var list2 = flag ? list.donelist : list.todolist
    var elem = remove === undefined
        ? target.nextElementSibling
        : target.previousElementSibling;
    var index = list1.indexOf(elem.textContent);
    var del = list1.splice(index, 1);
    if (remove === undefined) list2.push(del[0]);
    render();
}

function clickHandler(e) {
    if (e.target.nodeName !== "A") return;
    chooseList(e.target, !e.target.parentElement.firstElementChild.checked, true)

}

function dblclickHandler(e) {
    if(e.target.nodeName!=="P")return
    const elem=e.target.firstElementChild
    if(prev){
        prev.style.display="none"
    }
    prev=elem
    elem.style.display="block"
    elem.value=e.target.textContent
    elem.setSelectionRange(0,elem.value.length)
    elem.focus()

}
function blurHandler(e){
    let index=Array.from(todolist.children).indexOf(e.target.parentElement.parentElement)
    list.todolist[index]=e.target.value
    console.log(index);
    render()
}

// 页面渲染
function render() {
    localStorage.list = JSON.stringify(list)
    for (var prop in list) {
        window[prop].innerHTML = list[prop].reduce((value, item) => {
            return (value + `
            <li>
            <input type="checkbox" ${prop === "donelist" ? "checked" : ""
                }>
            <p>${item}<input type="text" style="display:none"></p>
            <a href="javascript:void(0)">-</a>     
         </li>
            `)

        }, "")
    }

    todocount.textContent = list.todolist.length;
    donecount.textContent = list.donelist.length;

}

