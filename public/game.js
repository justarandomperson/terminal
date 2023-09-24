const lines = document.querySelector(".lines")
const commandInput = document.createElement("input")

let currentDir = ""

commandInput.autofocus = true
commandInput.onblur = () => {
    commandInput.focus() 
}


newCommand = () => {
    const lineBreak = document.createElement("br")
    lines.appendChild(lineBreak)
    const commandLine = document.createElement("span")
    commandLine.textContent=`C:\\Users\\???${currentDir}>`
    const newDiv = document.createElement("div")


    newDiv.appendChild(commandLine)
    newDiv.appendChild(commandInput)
    lines.appendChild(newDiv)

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

newCommand()

processCommand = (command) => {
    const prefix = command.split(" ")[0]
    console.log(prefix)
    
    const newLine = document.createElement("span")
    newLine.setAttribute('style', 'white-space: pre;');
    switch(prefix) {
        case 'echo':
            newLine.textContent = command.split(" ")[1]
            lines.append(newLine)
            break
        case 'dir':
            newLine.textContent = "5/01/2016  03:00    <DIR>          homework"
            lines.append(newLine)
            break
        case 'cd':
            currentDir = currentDir+="\\"+command.split(" ")[1]
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