// Based on name3.chipland version. Useless features removed.
let commonLoaded = false
const loadStyleSheet = function(name){
  const ss = document.createElement("link")
  ss.rel="stylesheet"
  ss.href=`../resources/windows/${name}.css`
  document.head.appendChild(ss)
}
const themes = {};
window.loadTheme = function(name, extras){
  themes[name] = [ name ];
  if(extras) for(const item of extras) themes[name].push(item)
  if(!commonLoaded){
    loadStyleSheet(`common`);
    commonLoaded = true
  }
  loadStyleSheet(`${name}/buttons`)
  loadStyleSheet(`${name}/buttonPos`)
  loadStyleSheet(`${name}/window`)
}

window.setTheme = (windows, theme) => {
  // windows is a single window, named that way due to a limitation in JavaScript.
  const classList = document.getElementById(`window_${windows}_bg`).classList
  const removeList = []
  classList.forEach(item => { if (item.startsWith('theme')) removeList.push(item) })
  for(const item of removeList) classList.remove(item)
  for(const themeItem of themes[theme]) classList.add(`theme_${themeItem}`)
}

const initWindow = (allThemes) => {
  // Load theme~~s~~
  loadTheme("main_normal")
}

// Window movement
let movingWindow = false;
let lastPos = [-1,-1];
let pos = {
  window_debug: [0, 0],
  window_base: [80, 80]
};




// Resizing (unfinished)
const setSizeAbs = function(windows, x, y){
  document.getElementById(`${windows}_container`).style.width=`${x}px`;
  document.getElementById(`${windows}_container`).style.height=`${y}px`;
}

// Modal Mode
window.setModalMode = function(name, mode){
  if(mode){
    document.getElementById(`window_${name}_bg`).classList.add('modal')
  } else {
    document.getElementById(`window_${name}_bg`).classList.remove('modal')
  }
}

window.setFastMode = function(mode){
  if(mode){
    document.body.classList.add('fastMode')
  } else {
    document.body.classList.remove('fastMode')
  }
}

// Window creation
const createWindow=function (name, theme, sizeX, sizeY, posX, posY, title, htmlContent, modal){
  pos[`window_${name}`] = [posX, posY]

  // Element creation
  const overcbBG = document.createElement("div")
  const overcbCC = document.createElement("div")
  const overcbC = document.createElement("div")
  const overcb = document.createElement("div")
  const overlay = document.createElement("div")
  const windows7EffectV = document.createElement("div")
  const windows7EffectH = document.createElement("div")
  const windowTitleContainer = document.createElement("div")
  const windowTitleContent = document.createElement("div")
  const windowContentOuterContainer = document.createElement("div")
  const windowContentInnerContainer = document.createElement("div")
  const windowContent = document.createElement("div")
  const buttons = document.createElement("div")
  const buttonMinContainer = document.createElement("div")
  const buttonMin = document.createElement("div")
  const buttonMinContent = document.createElement("div")
  //const buttonMinEffectLower = document.createElement("div")
  //const buttonMinEffectUpper = document.createElement("div")
  //const buttonMinEffect3 = document.createElement("div")
  //const buttonMinEffect4 = document.createElement("div")
  const buttonMaxContainer = document.createElement("div")
  const buttonMax = document.createElement("div")
  const buttonMaxContent = document.createElement("div")
  //const buttonMaxEffectLower = document.createElement("div")
  //const buttonMaxEffectUpper = document.createElement("div")
  //const buttonMaxEffect3 = document.createElement("div")
  //const buttonMaxEffect4 = document.createElement("div")
  const buttonRestoreContainer = document.createElement("div")
  const buttonRestore = document.createElement("div")
  const buttonRestoreContent = document.createElement("div")
  //const buttonRestoreEffectLower = document.createElement("div")
  //const buttonRestoreEffectUpper = document.createElement("div")
  //const buttonRestoreEffect3 = document.createElement("div")
  //const buttonRestoreEffect4 = document.createElement("div")
  const buttonCloseContainer = document.createElement("div")
  const buttonClose = document.createElement("div")
  const buttonCloseContent = document.createElement("div")
  //const buttonCloseEffectLower = document.createElement("div")
  //const buttonCloseEffectUpper = document.createElement("div")
  //const buttonCloseEffect3 = document.createElement("div")
  //const buttonCloseEffect4 = document.createElement("div")
  const buttonEffectLower = document.createElement("div")
  const buttonEffectUpper = document.createElement("div")

  /* Element parameters */
  overcbBG.classList.add("window_background")
  overcbBG.classList.add(`theme_${theme}`)
  if(modal){
    overcbBG.classList.add("modal");
    overcbBG.classList.add("modalStart");
  }
  overcbCC.classList.add("overcb_cc")
  overcbC.classList.add("overcb_c")
  overcb.classList.add("overcb")
  overlay.classList.add("overlay")

  windowTitleContainer.classList.add("title")
  windowTitleContent.classList.add("title_content")
  windowContentOuterContainer.classList.add("content")
  windowContentInnerContainer.classList.add("content_real")
  windowContent.classList.add("content_real2")

  overcbBG.id = `window_${name}_bg`

  overcbCC.id = `window_${name}_container`
  overcbC.id = `window_${name}`

  overcbCC.style.width = `${sizeX}px`
  overcbCC.style.height = `${sizeY}px`

  overcbC.style.left = `${posX}px`
  overcbC.style.top = `${posY}px`

  overcbC.onmousedown = selectWindow

  buttons.classList.add("buttons")

  windowTitleContent.innerHTML = title

  windowContent.innerHTML = htmlContent
  windowContentInnerContainer.appendChild(windowContent)

  windowContentOuterContainer.appendChild(windowContentInnerContainer)

  windowTitleContainer.appendChild(windowTitleContent)

  overcb.appendChild(overlay)
  overcb.appendChild(windowTitleContainer)
  overcb.appendChild(windowContentOuterContainer)

  overcbC.appendChild(buttons)
  overcbC.appendChild(overcb)

  buttons.classList.add("buttons")

  buttonMinContainer.classList.add("buttonMin_c","windowButton_c")

  buttonMin.classList.add("buttonMin","windowButton")

  buttonMinContent.classList.add("buttonMin_real","windowButton_real")
  buttonMin.appendChild(buttonMinContent)

  buttonMaxContainer.classList.add("buttonMax_c","windowButton_c")

  buttonMax.classList.add("buttonMax","windowButton")

  buttonMaxContent.classList.add("buttonMax_real","windowButton_real")
  buttonMax.appendChild(buttonMaxContent)

  buttonRestoreContainer.classList.add("buttonRestore_c","windowButton_c")

  buttonRestore.classList.add("buttonRestore","windowButton")

  buttonRestoreContent.classList.add("buttonRestore_real","windowButton_real")
  buttonRestore.appendChild(buttonRestoreContent)

  buttonCloseContainer.classList.add("buttonClose_c","windowButton_c")

  buttonClose.classList.add("buttonClose","windowButton")
  buttonClose.onclick = event => document.body.removeChild(document.getElementById(overcbBG.id))
  buttonClose.title = "Close"

  buttonCloseContent.classList.add("buttonClose_real","windowButton_real")
  buttonClose.appendChild(buttonCloseContent)


  buttonMinContainer.appendChild(buttonMin)
  buttonMaxContainer.appendChild(buttonMax)
  buttonRestoreContainer.appendChild(buttonRestore)
  buttonCloseContainer.appendChild(buttonClose)

  buttons.appendChild(buttonMinContainer)
  buttons.appendChild(buttonMaxContainer)
  buttons.appendChild(buttonCloseContainer)

  overcbC.appendChild(buttons)

  overcbCC.appendChild(overcbC)

  overcbBG.appendChild(overcbCC)

  document.body.appendChild(overcbBG)
}
const createBase = () => createWindow('base', 'main_normal', 1000, 500, 100, 100, 'Theme Selector', '<iframe src="../html/windows_embed.html"></iframe>')//function (name, sizeX, sizeY, posX, posY, title, htmlContent){

let windowClickHistory=[]

const selectWindow=function(event){
}
