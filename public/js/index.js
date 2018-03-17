var types = new Array()
var learnedType = new Array()
var moves = new Array()
var displayMoves = new Array()
const displayLength = 10

function saveLearnedType() {
  console.log('learnedType saved')
  event.preventDefault()

  let selectType1 = document.getElementById('type1')
  let selectType2 = document.getElementById('type2')

  let displayNameType1 = types.filter(x => x._id == selectType1.value)[0].displayName
  let displayNameType2 = selectType2.value == 'false' ? '---' : types.filter(x => x._id == selectType2.value)[0].displayName

  let obj = {
    type1:{_id:selectType1.value,displayName:displayNameType1},
    type2:{_id:selectType2.value,displayName:displayNameType2}
  }
  learnedType.push(obj)
  renderSelectedType()
}

function deleteLearnedType(i){
  console.log('learnedType deleted')
  event.preventDefault()

  learnedType.splice(i, 1)
  renderSelectedType()
}

onload = function(){
  fetch('/api/type')
  .then(res => res.json())
  .then(data => {
    types = data.types
    let selectType1 = document.getElementById('type1')
    let selectType2 = document.getElementById('type2')
    let selectType1Filter = document.getElementById('type1Filter')
    let selectType2Filter = document.getElementById('type2Filter')
    types.map(x => {
      let op = document.createElement('option')
      op.value = x._id
      op.text = x.displayName
      let op2 = document.createElement('option')
      op2.value = x._id
      op2.text = x.displayName
      let op3 = document.createElement('option')
      op3.value = x._id
      op3.text = x.displayName
      let op4 = document.createElement('option')
      op4.value = x._id
      op4.text = x.displayName
      selectType1.appendChild(op)
      selectType2.appendChild(op2)
      selectType1Filter.appendChild(op3)
      selectType2Filter.appendChild(op4)
    })
  })

  loadMoves()
}

function loadMoves(){
  ajaxLoader(true)
  fetch('/api/move')
  .then(res => res.json())
  .then(data => {
    moves = data.moves
    displayMoves = moves
    ajaxLoader(false)
    renderMoves(0)
  })
}

function renderSelectedType(){

  let content = ''
  learnedType.map((x,i)=> {
    content += `<tr>
                  <td>${x.type1.displayName}</td>
                  <td>${x.type2.displayName}</td>
                  <td><a href="##" onclick="deleteLearnedType(${i})" class="btn btn-sm btn-danger"><i class="fa fa-trash"></a></td>
                </tr>`
  })
  let html = `<thead>
                <tr>
                    <th scope="col">Tipo 1</th>
                    <th scope="col">Tipo 2</th>
                    <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                ${content}
              </tbody>`

  document.getElementById('tableLearned').innerHTML = html
}

function login(){

  event.preventDefault()
  var form = {
    name: 'electric',
    displayName: 'Electrico'
  }

  var myHeaders = new Headers({
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  })

  fetch('/api/type', {method:'POST', body:JSON.stringify(form), headers:myHeaders
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
  .catch(err =>{
    console.log(err)
  })
}

function validateMove(){
  let name = document.getElementById('name').value
  if(name.length == 0){
    notify('Debe ingresar un nombre.','fa-exclamation','warning')
    return false
  }
  if(learnedType.length == 0){
    notify('Debe seleccionar tipos.','fa-exclamation','warning')
    return false
  }

  return true
}

function saveMove(){
  event.preventDefault()
  console.log('move saved')
  if(!validateMove()){
    return true
  }
  ajaxLoader(true)

  let name = document.getElementById('name').value
  let type = document.getElementById('type').value
  let levelMin = Number(document.getElementById('levelMin').value)
  let levelMax = Number(document.getElementById('levelMax').value)
  let difficulty = Number(document.getElementById('difficulty').value)
  let damage = Number(document.getElementById('damage').value)
  let description = document.getElementById('description').value
  let position = Number(document.getElementById('position').value)
  let speed = Number(document.getElementById('speed').value)
  let distraction = Number(document.getElementById('distraction').value)
  let repetition = stringToBoolean(document.getElementById('repetition').value)
  let tried = Number(document.getElementById('tried').value)
  let point = Number(document.getElementById('point').value)
  let contact = stringToBoolean(document.getElementById('contacto').value)
  let aoe = stringToBoolean(document.getElementById('aoe').value)
  let bodily = stringToBoolean(document.getElementById('bodily').value)
  let critical = stringToBoolean(document.getElementById('critical').value)
  let timeEffect = Number(document.getElementById('timeEffect').value)
  description = description == '' ? 'Sin Descripción' : description
  var form ={
    name,
    type,
    levelMin,
    levelMax,
    difficulty,
    damage,
    description,
    position,
    speed,
    distraction,
    repetition,
    tried,
    point,
    contact,
    aoe,
    bodily,
    critical,
    timeEffect
  }

  var myHeaders = new Headers({
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  })

  fetch('/api/move', {method:'POST',  body:JSON.stringify(form), headers:myHeaders })
  .then(res =>res.json())
  .then(data => {
    var fd = {
      arr: learnedType
    }
    fetch(`/api/move/${data.move._id}/learnedType`,{method:'POST',  body:JSON.stringify(fd), headers:myHeaders })
    .then(resp => {
      resp.json().then( datos => {
        console.log(datos)
        ajaxLoader(false)
        clearDataMove()
        notify('Movimiento guardado con éxito.','fa-check','success')
        loadMoves()
      })
    })
  })
  .catch(err =>{
    console.log(err)
  })
}

function renderMoves2(){
  let content = ''
  displayMoves.map((x,i)=> {
    content += `<tr>
                  <td>${x.name}</td>
                  <td><a href="##" data-toggle="modal" data-target="#dataMove1" onclick="loadDataMove1('${x._id}')" class="btn btn-sm btn-primary"><i class="fa fa-list"></a></td>
                  <td><a href="##" data-toggle="modal" data-target="#dataMove2" onclick="loadDataMove2('${x._id}')" class="btn btn-sm btn-success"><i class="fa fa-eye"></a></td>
                  <td><a href="##" data-toggle="modal" data-target="#dataMove3" onclick="loadDataMove3('${x._id}')" class="btn btn-sm btn-warning"><i class="fa fa-eye"></a></td>
                  <td><a href="##" data-toggle="modal" data-target="#dataMove4" onclick="loadDataMove4('${x._id}')" class="btn btn-sm btn-danger"><i class="fa fa-trash"></a></td>
                </tr>`
  })
  let html = `<thead>
                <tr>
                    <th scope="col">nombre</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                ${content}
              </tbody>`

  document.getElementById('tableMoves').innerHTML = html
}

function loadDataMove1(id){
  let m = displayMoves.filter(x => x._id ==id)[0]
  console.log(m)
  let html = `<tr>
                <th>Nombre</th>
                <td>${m.name}</td>
              </tr>
              <tr>
                <th>Tipo</th>
                <td>${m.type}</td>
              </tr>
              <tr>
                <th>Nivel</th>
                <td>${m.levelMin} al ${m.levelMax}</td>
              </tr>
              <tr>
                <th>Dificultad</th>
                <td>${m.difficulty}</td>
              </tr>
              <tr>
                <th>Daño</th>
                <td>${m.damage}</td>
              </tr>
              <tr>
                <th>Posición</th>
                <td>${m.position}</td>
              </tr>
              <tr>
                <th>Velocidad</th>
                <td>${m.speed}</td>
              </tr>
              <tr>
                <th>Distracción</th>
                <td>${m.distraction}</td>
              </tr>
              <tr>
                <th>Repeticiones</th>
                <td>${m.repetition ? 'SI' : 'NO'}</td>
              </tr>
              <tr>
                <th>Intentos</th>
                <td>${m.tried}</td>
              </tr>
              <tr>
                <th>Puntos</th>
                <td>${m.point}</td>
              </tr>
              <tr>
                <th>Contacto</th>
                <td>${m.contact ? 'SI' : 'NO'}</td>
              </tr>
              <tr>
                <th>AOE</th>
                <td>${m.aoe ? 'SI' : 'NO'}</td>
              </tr>
              <tr>
                <th>Cuerpo / Coraza</th>
                <td>${m.bodily ? 'SI' : 'NO'}</td>
              </tr>
              <tr>
                <th>Critico</th>
                <td>${m.critical ? 'SI' : 'NO'}</td>
              </tr>
              <tr>
                <th>Turnos</th>
                <td>${m.timeEffect}</td>
              </tr>
              `

  document.getElementById('tableDataMove1').innerHTML = html
}

function loadDataMove2(id){
  let m = displayMoves.filter(x => x._id ==id)[0]
  document.getElementById('descriptionMoveModal').innerHTML = m.description
}

function loadDataMove3(id){
  let m = displayMoves.filter(x => x._id ==id)[0]
  let typeArray = m.learnedType

  let content = ''

  typeArray.map(x => {
    content += `<tr>
                  <td>${x.type1.displayName}</td>
                  <td>${x.type2.displayName}</td>
                </tr>`
  })

  let html = `<thead>
                <tr>
                    <th scope="col">Tipo 1</th>
                    <th scope="col">Tipo 2</th>
                </tr>
              </thead>
              <tbody>
                ${content}
              </tbody>`
  document.getElementById('tableDataMove3').innerHTML = html
}

function loadDataMove4(id){
  let m = displayMoves.filter(x => x._id ==id)[0]
  let confirm = document.getElementById('confirmDelete')
  confirm.setAttribute("onclick", `deleteMove('${id}')`)
  document.getElementById('confirmDialog').innerHTML = `Confirmar Eliminación de Movimiento : ${m.name}`
}

function deleteMove(id){
  fetch(`/api/move/${id}`,{method:'DELETE'})
  .then(res => res.json())
  .then(data => {
    console.log(data)
    loadMoves()
  })
}

function renderMoves(page){
  if(event) event.preventDefault()

  let from = 0
  let to = displayMoves.length
  if(page != undefined){
    if(page < 0) page = 0
    from = page * displayLength > displayMoves.length ? (page-1) * displayLength : page * displayLength
    to = from + displayLength
    if(from < 0) from = 0
    if(to > displayMoves.length) to = displayMoves.length
    if(page * displayLength > displayMoves.length) page--
  }

  let pagination = ''
  let index = 0
  while(true){
    if(index == page)
      pagination += `<li class="page-item active"><a class="page-link" onclick="renderMoves(${index})" href="#">${index+1}</a></li>`
    else
     pagination += `<li class="page-item"><a class="page-link" onclick="renderMoves(${index})" href="#">${index+1}</a></li>`
    index++
    if(index * displayLength > displayMoves.length) break
  }

  let data = displayMoves.slice(from, to)
  console.log(`page: ${page} / from: ${from} / to: ${to}`)
  let content = ''
  data.map((x,i)=> {
    content += `<tr>
                  <td>${x.name}</td>
                  <td><a href="##" data-toggle="modal" data-target="#dataMove1" onclick="loadDataMove1('${x._id}')" class="btn btn-sm btn-primary"><i class="fa fa-list"></a></td>
                  <td><a href="##" data-toggle="modal" data-target="#dataMove2" onclick="loadDataMove2('${x._id}')" class="btn btn-sm btn-success"><i class="fa fa-eye"></a></td>
                  <td><a href="##" data-toggle="modal" data-target="#dataMove3" onclick="loadDataMove3('${x._id}')" class="btn btn-sm btn-warning"><i class="fa fa-eye"></a></td>
                  <td><a href="##" data-toggle="modal" data-target="#dataMove4" onclick="loadDataMove4('${x._id}')" class="btn btn-sm btn-danger"><i class="fa fa-trash"></a></td>
                </tr>`
  })
  let countMovesHTML = `<b>${data.length} movimientos.</b>`
  let tableMovesHTML = `<table class="table table-hover table-sm">
                          <thead>
                            <tr>
                                <th scope="col">nombre</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            ${content}
                          </tbody>
                        </table>`
  let paginationMovesHTML = `<nav aria-label="Page navigation example">
                              <ul class="pagination pagination-sm justify-content-center">
                                <li class="page-item">
                                <a class="page-link" href="##" onclick="renderMoves(${page-1})" aria-label="Previous">
                                  <span aria-hidden="true">&laquo;</span>
                                  <span class="sr-only">Previous</span>
                                </a>
                                </li>
                                ${pagination}
                                <li class="page-item">
                                <a class="page-link" href="##" onclick="renderMoves(${page+1})" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                                  <span class="sr-only">Next</span>
                                </a>
                                </li>
                              </ul>
                            </nav>`

  document.getElementById('countMoves').innerHTML = countMovesHTML
  document.getElementById('tableMoves').innerHTML = tableMovesHTML
  document.getElementById('paginationMoves').innerHTML = paginationMovesHTML
}

function search(val){
  //console.log(val)
  document.getElementById('type1Filter').value = 'false'
  document.getElementById('type2Filter').value = 'false'
  val = val.toUpperCase()
  displayMoves = moves.filter( x => {
    flag = false
    let name = x.name.toUpperCase()
    if(similarity(val,x.name) > 0.8)
      flag = true
    let arr = name.split(' ')
    //console.log(arr)
    arr.map( y => {
      if(y.includes(val))
        flag = true
    })
    if(flag) return x
  })
  //console.log(displayMoves)
  renderMoves(0)
}

function filterSelect(){
  let selectType1Filter = document.getElementById('type1Filter').value
  let selectType2Filter = document.getElementById('type2Filter').value
  console.log(`filter1: ${selectType1Filter} / filter2: ${selectType2Filter}`)

  displayMoves = moves.filter(x => {
    let flag1 = false
    let flag2 = false
    if(selectType1Filter != 'false'){
        x.learnedType.map( y => {
          if(y.type1._id == selectType1Filter){
            if(selectType2Filter == 'false'){
              if(y.type2._id == selectType2Filter)
                flag1 = true
            }else{
              flag1 = true
            }
          }
        })
    }
    if(selectType2Filter != 'false'){
      x.learnedType.map( y => {
        if(y.type2._id == selectType2Filter)
          flag2 = true
      })
    }
    if(selectType1Filter != 'false' && selectType2Filter != 'false'){
      if(flag1 && flag2) return x
    }
    if(selectType1Filter != 'false' && selectType2Filter == 'false'){
      if(flag1) return x
    }
    if(selectType1Filter == 'false' && selectType2Filter != 'false'){
      if(flag2) return x
    }
    if(selectType1Filter == 'false' && selectType2Filter == 'false'){
      return x
    }
  })
  renderMoves(0)
}

function clearDataMove(){
  document.getElementById('name').value = ''
  document.getElementById('type').value = 'ATK'
  document.getElementById('levelMin').value = 1
  document.getElementById('levelMax').value = 150
  document.getElementById('difficulty').value = 1
  document.getElementById('damage').value = 1
  document.getElementById('description').value = ''
  document.getElementById('position').value = 0
  document.getElementById('speed').value = 0
  document.getElementById('distraction').value = 0
  document.getElementById('repetition').value = 'false'
  document.getElementById('tried').value = 1
  document.getElementById('point').value = 4
  document.getElementById('contacto').value = 'false'
  document.getElementById('aoe').value = 'false'
  document.getElementById('bodily').value = 'false'
  document.getElementById('critical').value = 'false'
  document.getElementById('timeEffect').value = 0
  learnedType = new Array()
  renderSelectedType()
}
