import fileInformation from "./info/fileInformation.mjs"
import colors from "./info/colors.mjs"

const lines = document.querySelector(".lines")
const commandInput = document.createElement("input")

const specialname = "Wazir Mashala Machlul Javarmi Muchtal Shitsha"


let parentPath = "C:\\Users"
let Path = "C:\\Users\\???"
let currentDir = "???"



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
    commandInput.focus()
    commandInput.addEventListener(onblur, () => {
        console.log("hi")
        commandInput.focus() 
    })
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
        case 'color':
            if (colors[arg]) {
                document.body.style.color = colors[arg]
                commandInput.style.color = colors[arg]
            } else {
                document.body.style.color = ""
                commandInput.style.color = ""
            }
            break;

        default: 
            newLine.textContent = "'"+ prefix + "' is not recognized as an internal or external command, \r\n operable program or batch file."
            lines.append(newLine)         
            break
    }
    

    newCommand()
}

export default function() {
    const one = document.createElement("span")
    const two = document.createElement("span")
    one.textContent = "Microsoft Windows [Version 6.1.7601]"
    two.textContent = "Copyright (c) 2009 Microsoft Corporation. All rights reserved."
    lines.appendChild(one)
    lines.appendChild(two)

    newCommand()
}  


// if (window.prompt("open terminal? (yes,no)") == 'yes') {
//     startTerminal()
// } else {
//     setTimeout(() => {
//         typeWriter()
//     }, 1000)
// }


// startTerminal()