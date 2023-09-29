import startGame from './textadventure.mjs'

import fileInformation from "./info/fileInformation.mjs"
import {colors} from "./info/smallInfo.mjs"


const lines = document.querySelector(".lines")
const commandInput = document.createElement("input")

const specialname = "Wazir Mashala Machlul Javarmi Muchtal Shitsha"

let parentPath = "C:\\Users"
let Path = "C:\\Users\\???"
let currentDir = "???"
let inTerminal = true

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

    let fileExistsInDir = false
    let file = null
    let fileType = ""
    if (arg) {
        fileExistsInDir  = (fileInformation[arg.split(".")[0]] && fileInformation[currentDir].contains.includes(arg.split(".")[0]))
        file = fileInformation[arg.split(".")[0]]
        fileType = arg.split(".")[1]
    }
    switch(prefix) {
        case 'echo':
            newLine.textContent = arg
            lines.append(newLine)
            break
        case 'dir':
            if (currentDir in fileInformation) {
                dirFile(newLine)
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
                if (fileExistsInDir) {
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
        case 'type': {
            if (!fileExistsInDir || fileType!=file.type) {
                newLine.textContent = `Cannot find file ${arg}.`; 
                lines.append(newLine); 
                break 
            }
            if (fileType != "txt") {newLine.textContent = `Cannot read file ${arg}.`;lines.append(newLine);  break;}
            newLine.textContent = file.content;
            lines.append(newLine); 
            break;
        }   
        case 'ipconfig': {
            newLine.textContent = ("Windows IP Configuration\r\n\r\n\r\nEthernet adapter Ethernet: \r\n     Connection-specific DNS Suffix  . : \r\n     IPv6 Address. . . . . . . . . . . : 2001:abce:26:2712:e6e4:b2b6:0bd1:a25d \r\n     IPv6 Address. . . . . . . . . . . : 2001:abce:26:2712:43b1:cea0:c288:a841\r\n     Temporary IPv6 Address. . . . . . : 2001:abce:26:2712:146f:29ed:66bd:fa04\r\n     Link-local IPv6 Address . . . . . : 2001:abce:26:2712:e6e4:b2b6:0bd1:a25d\r\n     IPv4 Address. . . . . . . . . . . : 139.57.43.87 \r\n     Subnet Mask . . . . . . . . . . . : 255.255.255.0\r\n     Default Gateway . . . . . . . . . : fe80::7eb7:33ff:feb5:dcfb%17\r\n                                        139.57.1.1")
            lines.appendChild(newLine)
            break;
        }

        case 'start':
            if (!fileExistsInDir || fileType!=file.type) {
                newLine.textContent = `Cannot find file ${arg}.`; 
                lines.append(newLine); 
                break 
            }
            if (fileType != "exe") {newLine.textContent = `Cannot run file ${arg}.`; 
            lines.append(newLine); }
            inTerminal = false;
            switch (file.name) {
                case "txtadven":
                    startGame()
                    break;
            }
            break;
        default: 
            newLine.textContent = "'"+ prefix + "' is not recognized as an internal or external command, \r\n operable program or batch file."
            lines.append(newLine)         
            break
    }
    
    if (inTerminal) newCommand()
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




startTerminal()