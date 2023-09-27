const dialogue = document.querySelector(".dialogue")
const lines = document.querySelector(".lines")
const commandInput = document.createElement("input")
const dialogueInput = document.createElement("input")
const arrow = document.createElement("span")
arrow.textContent = "<"

const playerInformation = {
    name: '',
    route: 'normal',
    textSpeedMultiplier: 1
}

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

const endingDescriptions = {
    "Dehydration": "Too lazy to drink, too lazy to live.",
    "Slipped and died": "Unlucky.",
    "THE GREATEST DISRESPECT": "DO NOT DISRESPECT THE GREAT, THE AMAZING, THE SUPER AWESOME AND COOL TRAVELLER, YUDELF!",
    "Stranger danger": "What are you, an orphan? Your parents never told you to not open the door for strangers?"
}

let dialogueLines = {}

const updateLines = () => {
    dialogueLines = {
    normal: [ 
        {
            line: "Text speed:",
            answer: "textSpeedMultiplier",
            speed: 25,
            options: [
                {
                    text: "Slow",
                    value: 1
                },
                {
                    text: "Medium",
                    value: 1.5
                },
                {
                    text: "Fast",
                    value: 2
                },
                {
                    text: "Instant",
                    value: 50
                },
                
            ],
        },
        //1
        {
            line: "<07:00 AM>"
        },
        //2
        {
            line: "...",
        },
        //3
        {
            line: "I need to wake up..I can't miss school..I can't be late..",
            options: [
                {
                    text: "Get up from the bed",
                },
                {
                    text: "Sleep",
                    response: "I wanna sleep a bit more..",
                    route: "sleep",
                    nextLine: 0
                }
            ],
        },
        //4
        {
            line: "I guess I have to..",
        },
        //5
        {
            line: "Now, what should I do?",
            options: [
                {
                    text: "Look outside the window",
                    response: "It's too dark outside to see anything..",
                    nextLine: 5
                },
                {
                    text: "Brush teeth",
                    response: "I don't have a toothbrush nor a toothpaste..",
                    nextLine: 5
                },
                {
                    text: "Go to school",
                    response: "I don't have time! I have to get there on time!"
                }
            ]
        },
        //6
        {
            line: "*As I grab my backpack and head to the door, I notice something on the table.*",
        },
        //7
        {
            line: "Ah. Almost forgot my new notebook on the table..I still need to put my name on it. I will write it now.",
        },
        //8
        {
            line: "Name: ",
            input: true,
            answer: 'name',
            delay: 500
        },
        //9
        {
            line: "Alright. Let's go to school."
        },
        //9
        {
            line: "Which way should I take to school..",
            options: [
                {
                    text: "Bus",
                    route: 'bus',
                    nextLine: 0
                },
                {
                    text: "Walk to school"
                }
            ]
        },
    ],
    sleep: [
        //0
        {
            line: "...",
        },
        //1
        {
            line: "<07:30 AM>",
            delay: 1250
        },
        //2
        {
            line: "...",
            options: [
                {
                    text: "No thanks..",
                    response: "..."
                },
                {
                    text: "It's time to get up.",
                    route: "normal",
                    nextLine: 4
                }
            ]
        },
        //3
        {
            line: "<08:00 AM>",
        },
        //4
        {
            line: "School starts on 8:30 AM..If I get up now I might get there on time..",
            options: [
                {
                    text: "...",   
                },
                {
                    text: "It's time to get up.",
                    route: "normal",
                    nextLine: 4
                }
            ]
        },
        //5
        {
            line: "<03:00 AM>",
        },
        //6
        {
            line: "*Knocking*",
            sound: "knock"
        },
        //7
        {
            line: "...",
            delay: 2000
        },
        //8
        {
            line: "*Knocking*",
            sound: "knock",
            delay: 2000
        },
        //9
        {
            line: "It's probably midnight..who the hell is knocking on the door at this hour?",
        },
        //10
        {
            line: "...",
            options: [
                {
                    text: "Get up",
                    response: "It'd better be something important..",
                    nextLine: 17
                },
                {
                    text: "Continue sleeping",
                    response: "As if I care.."
                },
            ]
        },
        //11
        {
            line: "A couple of hours have passed.",
            delay: 1500
        },
        //12
        {
            line: "..Days? Weeks? Probably not, I probably would have died of dehydration by then.",
        },
        //13
        {
            line: "...Speaking of which..",
        },
        //14
        {
            line: "I'm thirsty."
        },
        //15
        {
            line: "I try to stand up from the bed, but I feel stuck. Paralyzed. Perhaps I have been too lazy."
        },
        //16
        {
            line: "...",
            ending: "Dehydration"
        },
         //17
        {
            line: `I walk towards to the door, then ask "Who is it?"`
        },
        {
            line: "..."
        },
        {
            line: `???: "Please..let me get in..It's cold out here.."`
        },
        {
            line: "...",
            options: [
                {
                    text: "Open the door"
                },
                {
                    text: "Go back to sleep",
                    response: "I'm too tired for this shit..*Falls back asleep*",
                    nextLine:11
                },
            ]
        },
        {
            line: "I gently open the door..",
            image: "strangerdoor",
            delay: 3000
        },
        {
            line: `"Feel at home-"`,
            image: "stranger",
            duration: 500
        },
        {
            line: "",
            ending: "Stranger danger"
        },
    ],
    bus: [
        {
            line: "I arrive at the bus station, which seems to be full of kids from my school. Now I just need to wait for the bus..",
            delay: 3000
        },
        {
            line: "15 minutes have passed and the bus finally arrived",
        },
        {
            line: "I..",
            options: [
                {
                    text: "Walk in normally",
                },
                {
                    text: "Walk in sneakily",
                    route: "sneakily",
                    nextLine: 0
                },
                {
                    text: "Aggressively sprint in the bus",
                    route: "aggressively",
                    nextLine: 0
                },
                
            ]
        },
        {
            line : "You tried to get in the bus, but someone accidently pushed you and you hit your head on the step and died.",
            ending: "Slipped and died",
            delay: 1500
        }
    ],
    sneakily: [
        //0
        {
            line: "I sneakily peek behind the station waiting for the chance to get in, everybody is looking at me weird but in the end I got in."
        },
        //1
        {
            line: "The bus is already full of people, and as I try to find an empty seat, I realize the only seat not taken is next to... "
        },
        //2
        {
            line: "..Yudelf...",
            delay: 1200
        },
        //3
        {
            line: "Fuck..",
            delay: 500
        },
        //4
        {
            line: "As I sit next to Yudelf, he starts introducing himself.",
        },
        //5
        {
            line: `Yudelf:"HELLO! BEWARE OF THE GREAT, THE AMAZING, THE SUPER AWESOME AND COOL TRAVELLER, YUDELF!"`,
        },
        //6
        {
            line: "(What a dumbass..)",
            options: [
                {
                    text: `"Hello."`
                },
                {
                    text: `"Shut up."`,
                    nextLine: 10
                },
                {
                    text: "Ignore him",
                    nextLine: 12
                }
            ]
        },
        //7
        {
            line: `${playerInformation.name}:"Hello, I am ${playerInformation.name}."`
        },
        //8
        {
            line: `Yudelf:"THAT'S A STRONG NAME, A POWERFUL NAME! YOU SHOULD THANK YOUR PARENTS FOR GIVING YOU SUCH A GOOD NAME!"`,
        },
        //9
        {
            line: `Yudelf:"THE OTHER KIDS ARE SCARED OF ME, BUT FEAR NOT! YUDALF IS NO DANGER! YOU NOW HAVE THE HONOR OF BECOMING..YUDALF’S BEST FRIEND!!"`,
            nextLine: 11
        },
        //10
        {
            line: `Yudelf:"FEAR NOT, BECAUSE YUDALF’S ABILLITY AT SHUTTING UP IS ABOVE THE AVERAGE OF YUDALF'S PEERS!"`,
        },
        //11
        {
            line: `Fortunately, the rest of the ride went peacefully.`,
            route: 'school',
            nextLine: 0,
            delay: 2000
        },
        //12
        {
            line: `Yudelf:"SHOW RESPECT TO THE GREAT YUDALF!" He says, as he grabs a screwdiver from his pocket and stabs you in the neck.`,
            ending: "THE GREATEST DISRESPECT",
            delay: 1500
        },
    ],
    school: [
        {
            line: "We finally arrived at school.."
        }
    ]
    }
}

const specialname = "Wazir Mashala Machlul Javarmi Muchtal Shitsha"

updateLines()

let parentPath = "C:\\Users"
let Path = "C:\\Users\\???"
let currentDir = "???"

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
    const speed = (currentLine.speed || 50) / playerInformation.textSpeedMultiplier
    if (!currentDialogue) {
        currentDialogue = document.createElement("span")
        dialogue.appendChild(currentDialogue)
    }
    if (document.body.scrollHeight != Math.max(document.body.offsetHeight, document.body.clientHeight)) dialogue.firstElementChild.remove()
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
                currentDialogue.appendChild(commandInput)
                inputting = true
                commandInput.focus()
                commandInput.onblur = (() => {
                    if (inputting) commandInput.focus()
                })
            } else {
                currentDialogue = null
                if (currentLine.ending) return setTimeout(() => {
                    Ending(currentLine.ending)
                }, currentLine.delay)
                if (currentLine.route) playerInformation.route = currentLine.route
                if (optionIndex == null) dialogueLineIndex++
                if (currentLine.nextLine != null) dialogueLineIndex = currentLine.nextLine
                if (currentLine.sound) new Audio("./public/assets/sfx/"+currentLine.sound+".mp3").play()
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
    const optionText = document.createElement("span")
    optionText.textContent = `-${option.text}`
    optionDiv.className = "option"
    optionDiv.setAttribute("name", "option")
    optionDiv.appendChild(optionText)
    currentDialogue.appendChild(optionDiv)
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
    if (currentLine.answer) {
        playerInformation[currentLine.answer] = answer.value
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
    while (document.body.scrollHeight != Math.max(document.body.offsetHeight, document.body.clientHeight)) dialogue.firstElementChild.remove()
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
            commandInput.blur()
            inputting = false
            const oldInput = document.createElement("span")
            oldInput.className = "oldinput"
            oldInput.textContent = commandInput.value
            const answerType = currentLine.answer
            if (answerType == "name") commandInput.value = commandInput.value[0].toUpperCase() + commandInput.value.slice(1)
            playerInformation[answerType] = commandInput.value
            commandInput.remove()
            commandInput.value = ""
            currentDialogue.appendChild(oldInput)
            dialogueLineIndex++
            currentDialogue = null
            updateLines()
            typeWriter()
        }            
    }
}

// if (window.prompt("open terminal? (yes,no)") == 'yes') {
//     startTerminal()
// } else {
//     setTimeout(() => {
//         typeWriter()
//     }, 1000)
// }

setTimeout(() => {
    typeWriter()
}, 250)

// startTerminal()