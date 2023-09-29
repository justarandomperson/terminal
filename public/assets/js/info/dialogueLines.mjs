export default function (playerInformation) {
    return {
    normal: [ 
        {
            line: "Text speed:",
            answer: "textSpeedMultiplier",
            speed: 25,
            options: [
                {
                    text: "Slow",
                    value: 1.5
                },
                {
                    text: "Medium",
                    value: 2
                },
                {
                    text: "Fast",
                    value: 40
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
                    answer: 'late',
                    value: true,
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
        //10
        {
            condition: !playerInformation.late,
            elseNextLine: 11,
            line: "Which way should I take to school..",
            options: [
                {
                    text: "Bus",
                    route: 'bus',
                    nextLine: 0
                },
                {
                    text: "Walk to school",
                    nextLine: 12 //because next line is specficially if you're late
                },
                {
                    text: "Bike",
                    response: "I don't have a bike.",
                    nextLine: 10
                }
            ]
        },
        //11  late
        {
            line: "I woke up late and missed the bus though.",
            
        },
        //12
        {
            line: "Guess I'll walk.",
            
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
                    response: "I have to go to school now, I wasted too much time on the bed..",
                    nextLine: 7
                }
            ]
        },
        //3
        {
            line: "<08:00 AM>",
        },
        //4
        {
            line: "School starts at 8:30 AM..If I get up now I might get there on time..",
            options: [
                {
                    text: "...",   
                },
                {
                    text: "It's time to get up.",
                    route: "normal",
                    response: "I have to go to school now, I wasted too much time on the bed..",
                    nextLine: 7
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
            line: `???: "Please..let me in..It's cold out here.."`
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