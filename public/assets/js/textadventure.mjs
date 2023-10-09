import updateLines from "./info/dialogueLines.mjs"
import endingDescriptions from './info/endingDescriptions.mjs'

const dialogue = document.querySelector(".lines")
const dialogueInput = document.createElement("input")
dialogueInput.style.color = document.body.style.color;
const arrow = document.createElement("span")
arrow.className = "arrow"
arrow.textContent = "<"

const playerInformation = {
    name: '',
    route: 'normal',
    late: false,
    textSpeedMultiplier: 1,
    deaths: 0,
    friend: ''
}

let dialogueLines = updateLines(playerInformation)

let textIndex,optionIndex,dialogueLineIndex,latestChoiceLineIndex
let currentDialogue,currentLine,choosingOption,inputting,lastestChoiceRoute,voiceAudio

const Reset = (back) => {
    textIndex = 0
    optionIndex = 0
    dialogueLineIndex = 0
    currentDialogue,currentLine = ""
    choosingOption = 0
    inputting = false
    playerInformation.route = "normal"
    playerInformation.friend = ''
    if (!back) {
        playerInformation.rng = Math.floor(Math.random()*100)
        latestChoiceLineIndex = 0
        lastestChoiceRoute = "normal"
    }
}


const typeWriter = (optionIndex) => {
    let text = dialogueLines[playerInformation.route][dialogueLineIndex].line
    if (optionIndex != null) {
        text = currentLine.options[optionIndex].response
    } else {
        currentLine = dialogueLines[playerInformation.route][dialogueLineIndex]
    }
    dialogueLines = updateLines(playerInformation)
    if (dialogueLines[playerInformation.route][dialogueLineIndex].hasOwnProperty("condition") && !dialogueLines[playerInformation.route][dialogueLineIndex].condition) {
        dialogueLineIndex = currentLine.elseNextLine;
        if (currentLine.elseRoute) playerInformation.route = currentLine.elseRoute
        return typeWriter()
    }
    const speed = (currentLine.speed || 50) / playerInformation.textSpeedMultiplier
    if (!currentDialogue) {
        currentDialogue = document.createElement("span")
        if (currentLine.style) currentDialogue.style = currentLine.style
        dialogue.appendChild(currentDialogue)
    }
    setTimeout(function() {
        if (currentLine.voice) {voiceAudio = new Audio(`./public/assets/sfx/${currentLine.voice}.mp3`); voiceAudio.volume = 0.1; voiceAudio.play()} 
        currentDialogue.textContent += text.charAt(textIndex)
        textIndex++
        if (document.body.scrollHeight != Math.max(document.body.offsetHeight, document.body.clientHeight)) dialogue.firstElementChild.remove()
        window.scrollBy(0, 10000)
        if (textIndex>=text.length){
            textIndex = 0
            if (currentLine.options && optionIndex == null) {
                setTimeout(() => {
                    Object.keys(currentLine.options).forEach(optionName => {
                        showOption(optionName)
                    })
                    optionIndex = 0
                    choosingOption = true
                    dialogue.focus()
                    updateOption(0)
                }, 500)
            } else if (currentLine.input)  {
                currentDialogue.appendChild(dialogueInput)
                inputting = true
                if (currentLine.inputValue) dialogueInput.value = currentLine.inputValue
                dialogueInput.focus()
                dialogueInput.onblur = (() => {
                    if (inputting) dialogueInput.focus()
                })
            } else {
                currentDialogue = null
                if (currentLine.ending) return setTimeout(() => {
                    Ending(currentLine.ending, currentLine.won)
                }, currentLine.delay || 2000)
                if (currentLine.route) playerInformation.route = currentLine.route
                if (optionIndex == null) dialogueLineIndex++
                if (currentLine.nextLine != null) dialogueLineIndex = currentLine.nextLine
                if (currentLine.sound) new Audio(`./public/assets/sfx/${currentLine.sound}.mp3`).play()
                if (currentLine.image) document.body.style.backgroundImage = `url("./public/assets/images/${currentLine.image}.png")`
                if (currentLine.duration) {
                    setTimeout(() => {
                        document.body.style.backgroundImage = ``
                    }, currentLine.duration)
                }
                if (dialogueLineIndex!=Object.keys(dialogueLines[playerInformation.route]).length) {
                    setTimeout(() => {
                        typeWriter() 
                    }, currentLine.delay || 1000 )
                }
            }
        } else {
            typeWriter(optionIndex) 
        }
    }, speed)
}

const showOption = (optionName) => {
    const option = currentLine.options[optionName]
    const optionDiv = document.createElement("div")
    const optionText = document.createElement("button")
    optionText.textContent = `-${option.text}`
    optionDiv.className = "option"
    optionDiv.style.color = document.body.style.color;
    optionDiv.setAttribute("name", "option")
    optionDiv.appendChild(optionText)
    currentDialogue.appendChild(optionDiv)
    if (document.body.scrollHeight != Math.max(document.body.offsetHeight, document.body.clientHeight)) dialogue.firstElementChild.remove()
    window.scrollBy(0, 10000)
    optionText.addEventListener('click', () => {
        optionIndex = optionName
        chooseOption()
    })
    
}

const chooseOption = () => {
    if (playerInformation.route != "gameover") {
        latestChoiceLineIndex = dialogueLineIndex
        lastestChoiceRoute = playerInformation.route
    }
    const optionLabels = document.querySelectorAll("[name='option']")
    const answer = currentLine.options[optionIndex]
    choosingOption = false
    arrow.remove()
    let l = 0
    optionLabels.forEach(label => {
        label.removeAttribute("name")
        if (l!=optionIndex) label.remove()
        l++;
    })
    currentDialogue = null
    optionLabels[optionIndex].textContent = `${optionLabels[optionIndex].textContent}<`
    if (playerInformation.route == "gameover") return gameOverChoice()
    if (currentLine.answer || answer.answer) {
        playerInformation[currentLine.answer || answer.answer] = answer.value
    }
    if (answer.ending) return Ending(answer.ending)
    if (answer.nextLine != null) {
        dialogueLineIndex = answer.nextLine
    } else {
        dialogueLineIndex++
    }
    if (answer.route) playerInformation.route = answer.route
    if (answer.response) {
        typeWriter(optionIndex)
    } else {
        typeWriter()
    }
}

const updateOption = (amount) => {
    const optionLabels = document.querySelectorAll("[name='option']")
    optionIndex+=amount
    if (amount == 0) optionIndex = 0
    if (optionIndex<0) {
        optionIndex = optionLabels.length-1
    } else if (optionIndex>=optionLabels.length) {
        optionIndex = 0 
    }
    optionLabels[optionIndex].appendChild(arrow)
}

const Ending = (endingName, won) => {
    const endingScreen = document.createElement("span")
    endingScreen.setAttribute("name", "gameoverScreen")
    endingScreen.style = "white-space: pre-wrap; width: 75; text-align:center"
    endingScreen.textContent = `--------------------------------------------------\r\n
    ${won ? ("<GAME WIN>"): ("<GAME OVER>")} \r\n \r\n
    Ending: ${endingName} \r\n \r\n${endingDescriptions[endingName]}`
    dialogue.appendChild(endingScreen)
    playerInformation.route = "gameover"
    dialogueLineIndex = 0
    typeWriter()
    while (document.body.scrollHeight != Math.max(document.body.offsetHeight, document.body.clientHeight)) dialogue.firstElementChild.remove()
    window.scrollBy(0, 10000)
    if (!won) {playerInformation.deaths++} else playerInformation.deaths = 0
}

const gameOverChoice = () => {
    if (optionIndex == 0) {
        Reset()
        dialogue.replaceChildren()
    } else {
        Reset(true)
        document.querySelector('[name="gameoverScreen"]').remove()
        dialogueLineIndex = latestChoiceLineIndex
        playerInformation.route = lastestChoiceRoute
    }
    typeWriter()
}


document.onkeydown = function (e) {
    if (choosingOption) {
        if (e.key == "ArrowUp" || e.key=="w") {
            updateOption(-1)
        } else if (e.key == "ArrowDown" || e.key == "s") {
            updateOption(1)
        } 
    } 
    if (e.key == "Enter" || e.key == "z") {
        if (choosingOption) {
            chooseOption()
        } else if (inputting) {
            dialogueInput.blur()
            inputting = false
            const oldInput = document.createElement("span")
            oldInput.className = "oldinput"
            oldInput.textContent = dialogueInput.value
            const answerType = currentLine.answer
            dialogueInput.remove()
            currentDialogue.appendChild(oldInput)
            if (dialogueInput.value == "") {
                if (currentLine.save) localStorage.removeItem(currentLine.answer)
                currentDialogue = null
                dialogueLineIndex=currentLine.emptyInputLine
                playerInformation.route = "checks"
                return typeWriter()
            }
            if (currentLine.save) localStorage.setItem(currentLine.answer, dialogueInput.value)
            if (answerType == "name") dialogueInput.value = dialogueInput.value[0].toUpperCase() + dialogueInput.value.slice(1)
            playerInformation[answerType] = dialogueInput.value
            dialogueInput.value = ""
            dialogueLineIndex++
            if (currentLine.nextLine) dialogueLineIndex = currentLine.nextLine
            currentDialogue = null
            dialogueLines = updateLines(playerInformation)
            typeWriter()
        }            
    }
}

export default function () {
    setTimeout(() => {
        Reset() 
        typeWriter()
    }, 250)
}


