const dialogue = document.querySelector(".dialogue")
const lines = document.querySelector(".lines")
const commandInput = document.createElement("input")


const fileInformation = {
    "???": {
        name: "???",
        type: "folder",
        contains: [
            "homework"
        ],
    },
    homework: {
        name: "homework",
        type: "folder",
        date: "05/06/2016",
        hour: "03:00",
        parentPath: 'C:\\Users\\???',
        contains: [
            "weirdphoto"
        ],
    },
    weirdphoto: {
        name: "xde",
        type: "png",
        date: "05/06/2016",
        hour: "03:02",
        actions: {
            open: [
                "You open the file...",
                "...",
                "It's better to ignore this."
            ]
        }
    },
}

const dialogueLines = {
    0: {
        line: "Hello.",
    },
    1: {
        line: "Are you there?",
        options: {
            one: {
                text: ">Yes"
            },
            two: {
                text: "No"
            }
        }
    },
    2: {
        line: "...",
        speed: 100,
        delay: 1000,
    },
    3: {
        line: "What is your name?",
        delay: 500,
        input: true,
        answer: 'name'
    },

}



let parentPath = "C:\\Users"
let Path = "C:\\Users\\???"
let currentDir = "???"


commandInput.autofocus = true
commandInput.onblur = () => {
    commandInput.focus() 
}

let textIndex = 0
let dialogueLineIndex = 0
let currentDialogue


function typeWriter() {
    const currentLine = dialogueLines[dialogueLineIndex]
    const speed = currentLine.speed || 50
    if (!currentDialogue) {
        currentDialogue = document.createElement("span")
        dialogue.appendChild(currentDialogue)
    }
    setTimeout(function() {
        currentDialogue.textContent += currentLine.line.charAt(textIndex)
        textIndex++
        if (textIndex>=currentLine.line.length){
            textIndex = 0
            if (currentLine.options) {
                setTimeout(() => {
                    Object.keys(currentLine.options).forEach(optionName => {
                        const option = currentLine.options[optionName]
                        const button = document.createElement("button")
                        button.textContent = option.text
                        currentDialogue.appendChild(button)
                    })
                }, 500)
            } else {
                currentDialogue = null
                dialogueLineIndex++
                if (dialogueLineIndex!=Object.keys(dialogueLines).length) {
                    setTimeout(() => {
                        typeWriter() 
                    }, dialogueLines[dialogueLineIndex].delay || 100)
                }
            }
        } else {
            typeWriter() 
        }
    }, speed)
}
 


const startTerminal = () => {
    const one = document.createElement("span")
    const two = document.createElement("span")
    one.textContent = "Microsoft Windows [Version 6.1.7601]"
    two.textContent = "Copyright (c) 2009 Microsoft Corporation. All rights reserved."
    lines.appendChild(one)
    lines.appendChild(two)

    newCommand()
}  

const newCommand = () => {
    const lineBreak = document.createElement("br")
    lines.appendChild(lineBreak)
    const commandLine = document.createElement("span")
    commandLine.textContent=Path+">"
    const newDiv = document.createElement("div")
    newDiv.className = "commandPrompt"


    newDiv.appendChild(commandLine)
    newDiv.appendChild(commandInput)
    lines.appendChild(newDiv)

    window.scrollBy (0, 10000);

    commandInput.onkeydown = (e) => {
        if (e.key == "Enter") {
            const newLine = document.createElement("span")
            newLine.textContent = commandLine.textContent + commandInput.value
            lines.removeChild(newDiv)
            lines.appendChild(newLine)
            processCommand(commandInput.value)
            commandInput.value = ""
        }
    }
    
}

const dirFile = (newLine) => {
    const file = fileInformation[currentDir]
    file.contains.forEach(child =>{ 
        const childFile = fileInformation[child]
        if (childFile.type == "folder") {
            newLine.textContent += `${childFile.date}  ${childFile.hour}    <DIR>            ${child} \r\n`
        } else {
            newLine.textContent += `${childFile.date}  ${childFile.hour}                ${child}.${childFile.type} \r\n`
        }
    })
}

const processCommand = (command) => {
    const prefix = command.split(" ")[0]
    const arg = command.split(" ")[1]
    
    const newLine = document.createElement("span")
    newLine.setAttribute('style', 'white-space: pre;');
    switch(prefix) {
        case 'echo':
            newLine.textContent = arg
            lines.append(newLine)
            break
        case 'dir':
            if (currentDir in fileInformation) {
                dirFile(newLine)
            } else {
                newLine.textContent = "5/01/2016  03:00    <DIR>          homework"
            }
            lines.append(newLine)
            break
        case 'cd':
            if (arg == "../") {
                if (fileInformation[currentDir].parentPath) {
                    Path = fileInformation[currentDir].parentPath
                    currentDir = Path.split("\\")[Path.split("\\").length-1]
                } else {
                    newLine.textContent = "ERROR - UNAUTHORIZED"
                }
            } else {
                if (fileInformation[currentDir].contains.includes(arg.split(".")[0])) {
                    const file = fileInformation[arg.split(".")[0]]
                    if (file.type == "folder") {
                        if (arg != arg.split(".")[0]) {
                            newLine.textContent = "The system cannot find the path specified."
                        } else {
                            currentDir = arg
                            Path+="\\"+currentDir
                        }
                    } else {
                        if (arg.split(".")[1] == file.type) {
                            newLine.textContent = "The directory name is invalid."
                        } else {
                            newLine.textContent = "The system cannot find the path specified."
                        }
                    }
                } else {
                    newLine.textContent = "The system cannot find the path specified."
                }
            }
            lines.append(newLine)
            break;
        case 'cls':
            lines.replaceChildren()
            break;
        default: 
            newLine.textContent = "'"+ prefix + "' is not recognized as an internal or external command, \r\n operable program or batch file."
            lines.append(newLine)
            
            break
    }
    

    newCommand()
}

if (window.prompt("open terminal? (yes,no)") == 'yes') {
    startTerminal()
} else {
    setTimeout(() => {
        typeWriter()
    }, 1000)
}


