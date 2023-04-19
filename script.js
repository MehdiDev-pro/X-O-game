let body = document.body
body.style.display = "none"
let plates = document.getElementsByClassName('plates')
let turnDiv = document.getElementById('my-turn')
let turnOuterDiv = document.getElementById('turn')
let changeModeBtn = document.getElementById('game-mode-btn')
let platesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let currentTurn = "X"
let myTurn = "X"
let AITurn = "O"
let isGameDone = false
let winner = ""
let gameMode = localStorage.getItem("mode")
let pvcTrun = "player"
let isAIDone = false

let xSound = new Audio("sounds/XSound.m4a")
xSound.volume = 0.5
let oSound = new Audio("sounds/OSound.m4a")
oSound.volume = 0.5
isSoundDisabled()


for (const plate of plates) {
  plate.innerHTML = ""
  
  plate.addEventListener("click", () => {

    changeModeBtn.disabled = true
    gameMode = localStorage.getItem("mode")
    
    if(gameMode == null){
      gameMode = "pvp"
    }

    if (isGameDone == true) {
      return
    }

    if (plate.innerHTML == "X" || plate.innerHTML == "O") {
      playSoundEffect("sounds/wrongMove.wav")
      return
    }

    if(gameMode == "pvp"){
      let value = plate.getAttribute("value")
    plate.innerHTML = currentTurn
    platesArr[value - 1] = currentTurn
      if(currentTurn == "X"){
        currentTurn = "O"
      }else if(currentTurn == "O"){
        currentTurn = "X"
      }
      sortingTurnDiv()
      evaluation()
      isGameDraw()
    }

    if(gameMode == "pvc"){
      
      if(isAIDone == true){
        console.log("ai");
        return
      }

      pvcTrun = "player"
      sortingTurnDiv()
      let value = plate.getAttribute("value")
    plate.innerHTML = myTurn
    platesArr[value - 1] = myTurn

      evaluation()
      isGameDraw()
      
      if(isGameDone){
       return
      }
        
      setTimeout(() => {
        playSoundEffect("sounds/OSound.m4a")
        pvcTrun = "device"
        sortingTurnDiv()
        isAIDone = false
        AI(platesArr)  
        evaluation()
      }, 1500)
      isAIDone = true
    }

    if (currentTurn == "X") { 
      let permission = localStorage.getItem("sound")
      if(permission == "true"){
        xSound.play()
      }
    } else if (currentTurn == "O") {
      let permission = localStorage.getItem("sound")
      if(permission == "true"){
        oSound.play()
      }
    }


    console.log(platesArr);
  })



  function evaluation(){

    if(gameMode == "pvp"){
      if (currentTurn == "X") {
        winner = "O"
      } else if (currentTurn == "O") {
        winner = "X"
      }
    }else if(gameMode == "pvc"){
      if (pvcTrun == "player") {
        winner = "You won"
      } else if (pvcTrun == "device") {
        winner = "you lost!"
      }
    }

    if(platesArr[0] == platesArr[1] && platesArr[1] == platesArr[2]){
      addAnimation(1,2,3, "animate__heartBeat")
      successProtocol()
    }else if(platesArr[3] == platesArr[4] && platesArr[4] == platesArr[5]){
      addAnimation(4,5,6, "animate__heartBeat")
      successProtocol()
    }else if(platesArr[6] == platesArr[7] && platesArr[7] == platesArr[8]){
      addAnimation(7,8,9, "animate__heartBeat")
      successProtocol()
    }else if(platesArr[0] == platesArr[3] && platesArr[3] == platesArr[6]){
      addAnimation(1,4,7, "animate__heartBeat")
      successProtocol()
    }else if(platesArr[1] == platesArr[4] && platesArr[4] == platesArr[7]){
      addAnimation(2,5,8, "animate__heartBeat")
      successProtocol()
    }else if(platesArr[2] == platesArr[5] && platesArr[5] == platesArr[8]){
      addAnimation(3,6,9, "animate__heartBeat")
      successProtocol()
    }else if(platesArr[0] == platesArr[4] && platesArr[4] == platesArr[8]){
      addAnimation(1,5,9, "animate__heartBeat")
      successProtocol()
    }else if(platesArr[2] == platesArr[4] && platesArr[4] == platesArr[6]){
      addAnimation(3,5,7, "animate__heartBeat")
      successProtocol()
    }
  }
  
}

function isGameDraw() {
  let isDraw = true
  for (var index of platesArr) {
    if (index != "X" && index != "O") {
      isDraw = false
    }
  }
  if (isDraw == true) {
    turnOuterDiv.innerHTML = "Game over"
    if(!isGameDone){
        playSoundEffect("sounds/gameTied.wav")
        setTimeout(() => {
        changeModeBtn.disabled = false
        openModal(2, 'alert-modal')
        resetBoard()
        platesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        currentTurn = "X"
      }, 2000)
    }
  }
}

function resetBoard() {
  playSoundEffect("sounds/reset.wav")
  setTimeout(() => {
    isGameDone = false
    platesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    currentTurn = "X"
    myTurn = "X"
      AITurn = "O"
    turnOuterDiv.innerHTML = `
       <span id="my-turn">${currentTurn}</span> Turn
      `
    for (var plate of plates) {
    plate.innerHTML = ""
  }
    changeModeBtn.disabled = false
  }, 2000)
}

function getElement(id){
  let element = document.getElementById(`${id}`)
  return element
}

function addAnimation(n1, n2, n3, animationClass){
  
  let el1 = getElement(`${n1}`)
  let el2 = getElement(`${n2}`)
  let el3 = getElement(`${n3}`)

  el1.classList.toggle(`${animationClass}`)
  el2.classList.toggle(`${animationClass}`)
  el3.classList.toggle(`${animationClass}`)
  
  setTimeout(() => {
    el1.classList.remove(`${animationClass}`)
    el2.classList.remove(`${animationClass}`)
    el3.classList.remove(`${animationClass}`)
    
  }, 3000)
}

function successProtocol(){
  playSoundEffect("sounds/win.wav")
  isGameDone = true
  turnOuterDiv.innerHTML = "Game over"
      setTimeout(() => {
        openModal(1, 'alert-modal', winner)
        resetBoard()
        platesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        currentTurn = "X"
        turnOuterDiv.innerHTML = `
       <span id="my-turn">${currentTurn}</span> Turn
      `
      }, 3000)
}

function getPlayer(player){
  
  let hiddenInput = document.getElementById('hidden-input').value

  hiddenInput = player
  currentTurn = hiddenInput
  turnOuterDiv.innerHTML = `
       <span id="my-turn">${currentTurn}</span> Turn
      `
  myTurn = hiddenInput
  if(myTurn == "X"){
    AITurn = "O"
  }else if(myTurn == "O"){
    AITurn = "X"
  }
}

function switchTeam(){
  let modalContent = ""
  let isBoardEmpty = true
  let modalBtnaDiv = document.getElementById('modal-btns')
  
  for(var plate of plates){
    if(plate.innerHTML == "X" || plate.innerHTML == "O"){
      isBoardEmpty = false   
    }
  }

  if(isBoardEmpty){
    modalContent = `
        <button onclick="getPlayer('X')" id="x-btn" class="btn player btn-success" style="font-size: 50px">
           X
        </button>
        <button onclick="getPlayer('O')" id="o-btn" class="btn player btn-success" style="font-size: 50px">
           O
        </button>
        <button onclick="chooseRandomPlayer()" id="random-btn" class="btn player btn-warning d-flex" style="font-size: 50px">
           <span id="dice-icon" class="material-symbols-outlined dice-icon-costume">
             casino
           </span>
        </button>   
    `
  }else{
    modalContent = `<h4>you can not change player during match!</h4>`
  }
  modalBtnaDiv.innerHTML = modalContent
}

function playSoundEffect(soundSrc) {
  let permission = isSoundDisabled()
  
  if(permission == "true"){
    let sound = new Audio(`${soundSrc}`)
  sound.volume = 0.5
  sound.play()
  }
}

function openModal(modalType, modal, winner="none") {
  var myModal = new bootstrap.Modal(document.getElementById(modal), {  keyboard: false });
  let modalHeader = document.getElementById('alert-modal-header')
  let modalBody = document.getElementById('alert-modal-body')
  let header = ""
  let body = ""

  if(modalType == 1){
    if(gameMode == "pvp"){
      header = "Congrats!"
      body = `<span>${winner}</span> Won`
    }else if(gameMode == "pvc"){
      if(pvcTrun == "player"){
        header = "Congrats!!"
        body = `<span>${winner}</span>`
      }else{
        header = "Oh oh!"
        body = `<span>${winner}</span>`
      }
    }
  }else if(modalType == 2){
    header = "Try Again!"
    body = "draw"
  }

  modalHeader.innerHTML = header
  modalBody.innerHTML = body
  myModal.show();
}

function changeTheme(){

  const root = document.querySelector(':root');

  const color = getComputedStyle(root).getPropertyValue('--main-bg'); 

  if(color == "#ffffff"){
    setCssVars(1)
    localStorage.setItem("theme", "dark")
  }else{
    setCssVars(2)
    localStorage.setItem("theme", "light")
  }
  
}

function setCssVars(modeType){
    const root = document.querySelector(':root');

  if(modeType == 1){
    const setVariables = vars => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));
  const myVariables = {
    '--main-bg': '#000000',
    '--modal-bg': '#000000',
    '--sec-bg': '#8E4162',
    '--board-bg': '#247BA0',
    '--fonts': '#ffffff',
    '--board-fonts': '#ffffff',
    '--modal-fonts': '#ffffff'
  };
  setVariables(myVariables);
  }else{
    const setVariables = vars => Object.entries(vars).forEach(v => root.style.setProperty(v[0], v[1]));
  const myVariables = {
    '--main-bg': '#ffffff',
    '--modal-bg': '#ffffff',
    '--sec-bg': '#8E4162',
    '--board-bg': '#247BA0',
    '--fonts': '#ffffff',
    '--board-fonts': '#ffffff',
    '--modal-fonts': '#000000'
  };
  setVariables(myVariables);
  }
}

function applyStoredTheme(){
  let theme = localStorage.getItem("theme")
  let switchBtn = document.getElementById('theme-switch')
  
  if(theme == null){
    setCssVars(2)
  }else{
    if(theme == "dark"){
      setCssVars(1)
      switchBtn.checked = true
      
    }else if(theme == "light"){
      setCssVars(2)
      
    }
  }
  body.style.display = "flex"
  setDefaultGameMode()
}

function disableSound(){
  let soundSwitch = document.getElementById('sound-switch').checked

  if(soundSwitch){
    localStorage.setItem("sound", soundSwitch)
  }else{
    localStorage.setItem("sound", soundSwitch)
  }
}

function isSoundDisabled(){
  let permission = localStorage.getItem("sound")
  let soundSwitch = document.getElementById('sound-switch')

  if(permission == "true"){
    soundSwitch.checked = true
  }else if(permission == "false"){
    soundSwitch.checked = false
  }
  
  return permission
}

function chooseRandomPlayer(){
  let selectedPlayer = ""
  let number = Math.floor((Math.random() * 10) + 1)

  enableDesableBtn(['random-btn', 'x-btn', 'o-btn'], true)
  
  if(number > 0 && number <= 5){
    selectedPlayer = "X"
  }else if (number > 5 && number <= 10){
    selectedPlayer = "O"
  }
  currentTurn = selectedPlayer
  console.log(selectedPlayer+`${number}`)
  randomBtnAnimation()
}

function randomBtnAnimation(){
  let diceIcon = document.getElementById('dice-icon')
  let randomBtn = document.getElementById('random-btn')
  let deg = 10

  let iconRotation = setInterval(() => {
    diceIcon.style.transform = `rotate(${deg}deg)`
    deg = deg + 5
  }, 10)

  setTimeout(() => {
    clearInterval(iconRotation)
    randomBtn.innerHTML = ""
    randomBtn.innerHTML = currentTurn
    getPlayer(currentTurn)
    setTimeout(() => {
      randomBtn.innerHTML = ""
      randomBtn.innerHTML = `
       <span id="dice-icon" class="material-symbols-outlined dice-icon-costume">
             casino
       </span>
      `
      enableDesableBtn(['random-btn', 'x-btn', 'o-btn'], false)
    }, 2000)
  }, 2000)

}

function enableDesableBtn(myBtns, action){
  for(let myBtn of myBtns){
    let btn = document.getElementById(`${myBtn}`)
    
    if(action == true) {
      btn.disabled = true
    }else{
      btn.disabled = false
    }
  }
}

function changeGameMode(){ 
  let gameModeIcon = document.getElementById('game-mode-icon')
  let gameModeBtn = document.getElementById('mode-btn-label')
  let modeBtnIcon = document.getElementById('mode-btn-icon');
  
  let pvpIcon = `group`
  let pvcIcon = `phone_iphone`
  
  if(gameModeIcon.innerHTML == pvpIcon){
    gameModeBtn.innerHTML = "Play against friend"
    
    modeBtnIcon.innerHTML = `
       <span class="material-symbols-outlined">${pvpIcon}</span>
      `
    
    gameModeIcon.innerHTML = pvcIcon
    localStorage.setItem("mode", "pvc")
  }else if(gameModeIcon.innerHTML == pvcIcon){
    gameModeBtn.innerHTML = "Play against device"

    modeBtnIcon.innerHTML = `
       <span class="material-symbols-outlined">${pvcIcon}</span>
      `
    
    gameModeIcon.innerHTML = pvpIcon
    localStorage.setItem("mode", "pvp")
  }
}

function setDefaultGameMode(){
  let gameModeIcon = document.getElementById('game-mode-icon')
  let gameModeBtn = document.getElementById('mode-btn-label')
  let modeBtnIcon = document.getElementById('mode-btn-icon');
  
  if(gameMode == null){
    return
  }else{
    if(gameMode == "pvc"){
      gameModeBtn.innerHTML = "Play against friend"
      gameModeIcon.innerHTML = "phone_iphone"
      modeBtnIcon.innerHTML = `
       <span class="material-symbols-outlined">group</span>
      `
    }else if(gameMode == "pvp"){
      gameModeBtn.innerHTML = "Play against device"
      gameModeIcon.innerHTML = "group"
      modeBtnIcon.innerHTML = `
       <span class="material-symbols-outlined">phone_iphone</span>
      `
    }
  }
}

function AI(plates){
  locateEmptyPlates(plates)
}

function locateEmptyPlates(plates){
  let emptyPlates = []
  
  for(var plate of plates){
    if(plate != "X" && plate != "O"){
      emptyPlates.push(plate)
    }
  }
  console.log(emptyPlates);
  AIMoves(emptyPlates)
}

function AIMoves(emptyPlates){

  
  let chosenPlate = emptyPlates[Math.floor(Math.random() * emptyPlates.length)]

  if(chosenPlate == undefined){
    return
  }

  plates[chosenPlate].innerHTML = AITurn
  platesArr[chosenPlate] = AITurn
  
}

function sortingTurnDiv(){
  turnOuterDiv.innerHTML = ""
  
  if(isGameDone == false){
    if(gameMode == "pvc"){
      if(pvcTrun == "device"){
        turnOuterDiv.innerHTML = `
         <span id="my-turn">${myTurn}</span> Turn
        `
      }else if(pvcTrun == "player"){
        turnOuterDiv.innerHTML = "Wait.."
      }
    }else if(gameMode == "pvp"){
      turnOuterDiv.innerHTML = `
       <span id="my-turn">${currentTurn}</span> Turn
      `
    }
  }else{
    turnOuterDiv.innerHTML = "Game over"
  }
}