import updateLines from "./info/dialogueLines.mjs"
import endingDescriptions from './info/endingDescriptions.mjs'

const dialogue = document.querySelector(".lines")
const dialogueInput = document.createElement("input")
const arrow = document.createElement("span")
arrow.className = "arrow"
arrow.textContent = "<"

const playerInformation = {
    name: '',
    route: 'normal',
    late: false,
    textSpeedMultiplier: 1
}

let dialogueLines = updateLines(playerInformation)

let textIndex = 0
let optionIndex = 0
let dialogueLineIndex = 0
let currentDialogue
let choosingOption = false
let inputting = false
let currentLine


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
        return typeWriter()
    }
    const speed = (currentLine.speed || 50) / playerInformation.textSpeedMultiplier
    if (!currentDialogue) {
        currentDialogue = document.createElement("span")
        dialogue.appendChild(currentDialogue)
    }
    if (document.body.scrollHeight != Math.max(document.body.offsetHeight, document.body.clientHeight) || dialogue.childNodes.length>20) dialogue.firstElementChild.remove()
    setTimeout(function() {
        currentDialogue.textContent += text.charAt(textIndex)
        textIndex++
        if (textIndex>=text.length){
            textIndex = 0
            if (currentLine.options && optionIndex == null) {
                setTimeout(() => {
                    Object.keys(currentLine.options).forEach(optionName => {
                        showOption(optionName)
                    })
                    optionIndex = 0
                    choosingOption = true
                    updateOption(0)
                }, 500)
            } else if (currentLine.input)  {
                currentDialogue.appendChild(dialogueInput)
                inputting = true
                dialogueInput.focus()
                dialogueInput.onblur = (() => {
                    if (inputting) dialogueInput.focus()
                })
            } else {
                currentDialogue = null
                if (currentLine.ending) return setTimeout(() => {
                    Ending(currentLine.ending)
                }, currentLine.delay)
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
    optionDiv.setAttribute("name", "option")
    optionDiv.appendChild(optionText)
    currentDialogue.appendChild(optionDiv)
    if (document.body.scrollHeight != Math.max(document.body.offsetHeight, document.body.clientHeight) || dialogue.childNodes.length>20) dialogue.firstElementChild.remove()
    optionText.addEventListener('click', () => {
        optionIndex = optionName
        chooseOption()
    })
    
}

const chooseOption = () => {
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
    optionLabels[optionIndex].textContent = `${optionLabels[optionIndex].textContent}<`
    if (currentLine.answer || answer.answer) {
        playerInformation[currentLine.answer || answer.answer] = answer.value
    }
    currentDialogue = null
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

const Ending = (endingName) => {
    const gameOver = document.createElement("span")
    gameOver.style = "white-space: pre-wrap"
    gameOver.textContent = `--------------------------------------------------\r\n
    <GAME OVER> \r\n \r\n
    Ending: ${endingName} \r\n \r\n
    ${endingDescriptions[endingName]}`
    dialogue.appendChild(gameOver)
    while (document.body.scrollHeight != Math.max(document.body.offsetHeight, document.body.clientHeight) || dialogue.length==12) dialogue.firstElementChild.remove()
}

document.onkeydown = function (e) {
    if (choosingOption) {
        if (e.key == "ArrowUp" || e.key=="w") {
            updateOption(-1)
        } else if (e.key == "ArrowDown" || e.key == "s") {
            updateOption(1)
        } 
    } 
    if (e.key == "Enter") {
        if (choosingOption) {
            chooseOption()
        } else if (inputting) {
            dialogueInput.blur()
            inputting = false
            const oldInput = document.createElement("span")
            oldInput.className = "oldinput"
            oldInput.textContent = dialogueInput.value
            const answerType = currentLine.answer
            if (answerType == "name") dialogueInput.value = dialogueInput.value[0].toUpperCase() + dialogueInput.value.slice(1)
            playerInformation[answerType] = dialogueInput.value
            dialogueInput.remove()
            dialogueInput.value = ""
            currentDialogue.appendChild(oldInput)
            dialogueLineIndex++
            currentDialogue = null
            dialogueLines = updateLines(playerInformation)
            typeWriter()
        }            
    }
}

export default function () {
    setTimeout(() => {
        typeWriter()
    }, 250)
}


