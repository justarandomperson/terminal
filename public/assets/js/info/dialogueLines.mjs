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
                    value: 20
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
            condition: localStorage.getItem("name") == null,
            elseNextLine: 9,
            line: "Name: ",
            input: true,
            answer: 'name',
            save: true,
            delay: 500,
            nextLine: 11,
            emptyInputLine: 0
        },
        //9
        {
            line: "Or..I..uh..guess I already did? Gotta check if I wrote it right though.",

        },
        //10
        {
            line: "Name: ",
            input: true,
            inputValue: localStorage.getItem("name"),
            answer: 'name',
            save: true,
            delay: 500,
            nextLine: 11,
            emptyInputLine: 1
        },
        //11
        {
            line: "Alright. Let's go to school."
        },
        //12
        {
            condition: !playerInformation.late,
            elseNextLine: 14,
            line: "Which way should I take to school..",
            options: [
                {
                    text: "Bus",
                    route: 'bus',
                    nextLine: 0
                },
                {
                    text: "Walk to school",
                    nextLine: 15
                },
                {
                    text: "Bike",
                    nextLine: 13
                }
            ]
        },
        //13
        {
            condition: playerInformation.rng<=80,
            elseNextLine: 0,
            elseRoute: 'bike',
            line: "I don't have a bike.",
            nextLine: 12
        },
        //14  late
        {
            line: "I woke up late and missed the bus though.",
            
        },
        //15
        {
            line: "Guess I'll walk.",
            delay: 1500,
            
        },
        //16
        {
            line: "I walk a bit and then come across a fork.",
            options: [
                {
                    text: "Pick it up",
                    response: '(Not a literal fork..2 seperate ways)',
                    nextLine: 15
                },
                {
                    text: "Go through the sketchy neighborhood to school",
                    route: 'neighborhood',
                    nextLine: 0
                },
                {
                    text: "Go through the forest to school",
                    route: 'forest',
                    nextLine: 0
                },
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
                    response: "I have to go to school now, I wasted too much time on the bed..",
                    nextLine: 6
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
                    nextLine: 6
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
            line: `???: "Please..let me in..It's cold out here.."`,
            style: "font-size:0.9em"
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
    bike: [
        {
            line:"I don't have a bike."
        },
        {
            line:"???: *heya kid, ya interested in a free bike?",
            style: "font-family: funny",
            voice: 'funny',
            delay: 1500
        },
        {
            line:"Is that!?", 
        },
        {
            line:"I turned around.", 
        },
        {
            line:"???: *my lil bro decided to throw away his bike,", 
            style: "font-family: funny",
            voice: 'funny',
            delay: 1000
        },
        {
            line:"???: *after he realized he can just run everywhere instead.", 
            style: "font-family: funny",
            voice: 'funny'
        },
        {
            line:`${playerInformation.name}: Sure, thanks.`, 
        },
        {
            line:`Then he handed me over the bike, which seems to be a little bit broken. Can't complain, though.`, 
        },
        {
            line:`I rode on it a little bit until it broke down...`, 
            nextLine: 16,
            route: 'normal'
        },
    ],
    bus: [
        {
            line: "I arrive at the bus station, which seems to be full of kids from my school. Now I just need to wait for the bus..",
            delay: 3000
        },
        {
            line: "15 minutes have passed and the bus finally arrived.",
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
                    text: "Aggressively sprint into the bus",
                    route: "aggressively",
                    nextLine: 0
                },
                
            ]
        },
        {
            line : "You tried to get in the bus, but someone accidently pushed you and you hit your head on the step and died.",
            ending: "Slipped and died",
            delay: 1500
        },
        //4
        {
            line: 'The bus went on for a bit until it suddenly stopped.'
        },
        //5
        {
            line: 'The bus driver told us a tire got punctured, and we had to continue our way on foot.'
        },
        //6
        {
            condition: playerInformation.friend != 'yuval',
            elseNextLine: 0,
            elseRoute: 'yuvalBusWalk',
            line: "Seems like I'll walk alone to school.",
        },
        //7
        {
            condition: playerInformation.friend == "yudelf",
            elseNextLine: 9,
            line: `Yudelf: "HELLO, FRIEND!! LET'S GO TOGETHER!!!!"`
        },
        //8
        {
            line: 'Nevermind.',
            nextLine: 0,
            route: 'yudelfBusWalk'
        },
        //9
        {
            line: '',
            nextLine: 0,
            route: 'busWalk'
        }

    ],
    busWalk:[
        {
            line: 'The bus driverdropped us off at the middle of nowhere.'
        },
        {
            line: "I have no idea where we are, and it seems he doesn't really care about our safety considering he just left us."
        },
        {
            line: "The other kids have already began to walk in the direction the bus driver told us, and so I started walking as well."
        },
        {
            line: "I look down and notice my shoe laces are not tied."
        },
        {
            line: "Gotta just tie them up real quick and...",
            delay: 1500
        },
        //5
        {
            line: "I stand back up and can't see any of the other kids.",
            delay: 1500
        },
        {
            line: "Ah, shit.",
            options: [
                {
                    text: "Run until you see someone"
                },
                {
                    text: "Walk normally",
                    nextLine: 9
                }
            ]
        },
        {
            line: "I start to run, hoping to find someone fast."
        },
        {
            line: "But then, I trip and hit my head on a rock that's shaped like a spike.",
            ending: 'Rock'
        },
        //9
        {
            line: "I continue to walk, hoping that I would see the school soon.",
            delay: 1500
        },
        {
            line: '...',
            delay: 1000
        },
        {
            line: '...',
            delay: 1000
        },
        {
            line: "After a lot of walking, I come across a mysterious object.",
            options: [
                {
                    text: 'Pick it up'
                },
                {
                    text: 'Ignore',
                    nextLine: 17
                }
            ]
        },
        //13
        {
            line: 'I pick up the mysterious object..'
        },
        {
            line: 'It looks weird..almost like..'
        },
        {
            line: 'Huh? Weird..It makes a weird sound.'
        },
        {
            line: '...',
            ending: 'Boom'
        },
        //17
        {
            line: 'Way too suspicious.'
        },
        {
            line: 'I walk a bit and then come across an old abandoned building.'
        },
        {
            line: 'Great, another choice..',
            options: [
                {
                    text: 'Walk in',
                    nextLine: 23
                },
                {
                    text: 'Ignore'
                }
            ]
        },
        //20
        {
            line: 'I continue walking. And walking. A lot of walking.'
        },
        {
            line: 'How come the bus dropped as off so far away from school...?',
            delay: 1000
        },
        {
            line: "...",
            ending: 'Exhaustion'
        },
        //23
        {
            line: 'I walk in the old abandoned building.'
        },
        {
            line: "There's a fridge and a couch."
        },
        //25
        {
            line: "Well, what should I do?",
            options: [
                {
                    text: "Check the fridge",
                    response: "The fridge is empty.",
                    nextLine: 25
                },
                {
                    text: "Sit on the couch"
                }
            ]
        },
        {
            line: 'I sit on the couch.',
        },
        {
            line: 'Just now I realize how tired I am..'
        },
        {
            line: "If I continued walking anymore, I probably would have died of exhaustion.."
        },
        {
            line: '...',
            delay: 1000
        },
        {
            line: '...zzzzzz',
            delay: 2000
        },
        {
            line: '...It seems I have fallen asleep..how many hours have passed?'
        },
        {
            line: 'I get up from the couch. I have a school to get to!'
        },
        {
            line: "I continue my way to the school."
        },
        {
            line: 'After walking a lot, I finally see the school!',
            ending: 'Lonely walk to school'
        },
    ],
    yuvalBusWalk:[
        {
            line: 'The bus driverdropped us off at the middle of nowhere.'
        },
        {
            line: "I have no idea where we are, and it seems he doesn't really care about our safety considering he just left us."
        },
        {
            line: "The other kids have already began to walk in the direction the bus driver told us, and so Yuval and Istarted walking as well."
        },
        {
            line: "I look down and notice my shoe laces are not tied."
        },
        {
            line: "Gotta just tie them up real quick and...",
            delay: 1500
        },
        //5
        {
            line: "I stand back up and can't see any of the other kids.",
            delay: 1500
        },
        {
            line: `${playerInformation.name}: "...Huh? Where are all the other kids?"`
        },
        {
            line: 'Yuval: "Why would I care?"'
        },

        {
            line: "...Maybe it wasn't the wisest choice to befriend him.",
        },
        {
            line: "I have to do something quick..",
            options: [
                {
                    text: "Run until you see someone"
                },
                {
                    text: `"We'll be fine."`,
                    nextLine: 12
                }
            ]
        },
        //10
        {
            line: "I start to run, leaving Yuval behind, hoping to find someone (else) fast."
        },
        {
            line: "But then, I trip and hit my head on a rock that's shaped like a spike.",
            ending: 'Rock'
        },
        //12
        {
            line: `${playerInformation.name}: "Yeah, I guess we'll be fine."`,
            delay: 1500
        },
        {
            line: "We continue to walk a bit.",
            delay: 1000
        },
        {
            line: '...',
            delay: 1000
        },
        //15
        {
            line: "After a lot of walking, we come across a mysterious object.",
        },
        //16
        {
            line: `Yuval: "You're not seriously thinking of picking it up, right?"`
        },
        //17
        {
            line: `${playerInformation.name}:"Of course -"`,
            options: [
                {
                    text: "I will pick it up"
                },
                {
                    text: "Not",
                    nextLine: 23
                }
            ]
        },
        {
            line: 'I pick up the mysterious object..'
        },
        {
            line: 'Yuval: "Why did you pick it up???"'
        },
        //20
        {
            line: `${playerInformation.name}: It's fine, see?`
        },
        {
            line: `${playerInformation.name}: ..Are you hearing this strange sound or is it just me?`
        },
        {
            line: '...',
            ending: 'Boom'
        },
        //23
        {
            line: `${playerInformation.name}: "Of course not, I'm not stupid."`
        },
        {
            line: `Yuval: "Then don't look like you were seriously considering it.."`
        },
        //25
        {
            line: 'We walk a bit and then come across an old abandoned building.'
        },
        {
            line: 'Yuval: "...Why are you stopping? The school is probably right around the corner, dumbass."'
        },
        {
            line: `${playerInformation.name}: "I'm just - "`,
            options: [
                {
                    text: 'Looking'
                },
                {
                    text: 'Entering the building',
                    nextLine: 31
                }
            ]
        },
        //28
        {
            line: 'We continue walking. And walking. A lot of walking.'
        },
        {
            line: 'How come the bus dropped as off so far away from school...?',
            delay: 1000
        },
        {
            line: "...",
            ending: 'Exhaustion'
        },
        //31
        {
            line: 'I walk in the old abandoned building.'
        },
        {
            line: "I hear Yuval screaming at me from the outside.",
        },
        {
            line: "There's a fridge and a couch."
        },
        //34
        {
            line: "Well, what should I do?",
            options: [
                {
                    text: "Check the fridge",
                    response: "The fridge is empty.",
                    nextLine: 34
                },
                {
                    text: "Sit on the couch"
                }
            ]
        },
        {
            line: 'I sit on the couch.',
        },
        {
            line: 'Just now I realize how tired I am..'
        },
        {
            line: "If I continued walking anymore, I probably would have died of exhaustion.."
        },
        {
            line: '...',
            delay: 1000
        },
        {
            line: '...zzzzzz',
            delay: 2000
        },
        //40
        {
            line: `???: ${playerInformation.name}..`,
            delay: 2000
        },
        {
            line: `Yuval: "${playerInformation.name}!!!"`
        },
        {
            line: `${playerInformation.name}: "..Huh? How long have I been sleeping for?"`
        },
        {
            line: `Yuval: As if I would know.. I don't have a remote clock or something, dumbass.`
        },
        {
            line: 'I get up from the couch. I have a school to get to!'
        },
        {
            line: `${playerInformation.name}: "Alright. Let's continue!!!!"`,
        },
        {
            line: `Yuval: (He's so cringe..)`
        },
        {
            line: "We continue our way to the school."
        },
        {
            line: 'After walking a lot, We finally see the school!',
            ending: 'Aggressive walk to school'
        },
    ],
    yudelfBusWalk: [
        {
            line: 'The bus driverdropped us off at the middle of nowhere.'
        },
        {
            line: "I have no idea where we are, and it seems he doesn't really care about our safety considering he just left us."
        },
        {
            line: "The other kids have already began to walk in the direction the bus driver told us, and so Yudelf and I started walking as well."
        },
        {
            line: "I look down and notice my shoe laces are not tied. I tell Yudelf to wait for me."
        },
        {
            line: `Yudelf: "FEAR NOT! I WILL STAND HERE AND WAIT FOR YOU!"`,
        },
        //5
        {
            line: "Great."
        },
        {
            line: "Gotta just tie them up real quick and...",
            delay: 1500
        },
        {
            line: "I stand back up and can't see any of the other kids.",
            delay: 1500
        },
        {
            line: `${playerInformation.name}: "...Huh? Where are all the other kids?"`
        },
        {
            line: `Yudelf: "WELL, YUDELF HAS DECIDED TO GIVE THEM A HEAD START! "`
        },
        //10
        {
            line: 'Yudelf: "AND TO MAKE IT EVEN MORE FAIR FOR THEM, YUDELF HAS MADE SURE TO LOSE THEM!"',
        },
        {
            line: "...Maybe it wasn't the wisest choice to befriend him.",
        },
        //12
        {
            line: "I have to do something quick..",
            options: [
                {
                    text: "Run until you see someone"
                },
                {
                    text: `"We'll be fine."`,
                    nextLine: 19
                }
            ]
        },
        {
            line: "I start to run, leaving Yudelf behind, hoping to find someone (else) fast."
        },
        {
            line: "Yudelf quickly catches up to me though."
        },
        //15
        {
            line: `Yudelf: "NICE, YUDELF CAN SEE YOU'RE FULL OF ENERGY! NOW, LET US GET TO SCHOOL BEFORE THE OTHER KIDS!"`
        },
        {
            line: `Yudelf: "MAKE SURE TO NOT TRIP AND FALL, FOR EXAMPLE, ON THAT PARTICULAR ROCK OVER THERE!"`
        },
        {
            line: "Huh?"
        },
        {
            line: "But then, I trip and hit my head on a rock that's shaped like a spike.",
            ending: 'Rock'
        },
        //19
        {
            line: `${playerInformation.name}: "Yeah, I guess we'll be fine."`,
            delay: 1500
        },
        {
            line: `Yudelf: "OF COURSE WE ARE! NOW, LET US RUN TO GET THERE FIRST!"`,
            delay: 1500
        },
        {
            line: "I try my best as I can to convince Yudelf to just walk..",
            delay: 2000
        },
        {
            line: "We continue to walk a bit.",
            delay: 1000
        },
        {
            line: '...',
        },
        {
            line: "After a lot of walking, we come across a mysterious object.",
        },
        //25
        {
            line: `Yudelf: "WOWIE!"`
        },
        {
            line: `...`,
            options: [
                {
                    text: "Pick it up"
                },
                {
                    text: `"Don't touch that"`,
                    nextLine: 32
                }
            ]
        },
        {
            line: 'I pick up the mysterious object..'
        },
        {
            line: 'Yudelf: "WHAT IS IT??"'
        },
        {
            line: `${playerInformation.name}: "it looks..a bit weird.."`
        },
        //30
        {
            line: `${playerInformation.name}: "..Are you hearing this strange sound or is it just me?"`
        },
        {
            line: `Yudelf: "AH, THAT'S JUST A BOM-"`,
            ending: 'Boom'
        },
        //32
        {
            line: `${playerInformation.name}: "Don't pick that up, it looks way too suspicious."`
        },
        {
            line: `Yudelf: "EVEN IF IT WAS A LITERAL BOMB, YUDELF IS SURE WE COULD JUST RUN AWAY BEFORE IT EXPLODES!"`
        },
        {
            line: "How did he stay alive this long..?"
        },
        //35
        {
            line: 'We walk a bit and then come across an old abandoned building.'
        },
        {
            line: 'Yudelf: "AMAZING! A NEW PLACE TO EXPLORE!"'
        },
        //37
        {
            line: `...`,
            options: [
                {
                    text: `"Let's not enter the building"`,
                },
                {
                    text: `"Let's enter the building"`,
                    nextLine: 42
                }
            ]
        },
        {
            line: 'After spending a lot of time convincing Yudelf, we continue walking. And walking. A lot of walking.'
        },
        {
            line: 'How come the bus dropped as off so far away from school...?',
            delay: 1000
        },
        {
            line: "...",
        },
        {
            line: `Yudelf: "HEY, FRIEND, ARE YOU ALRIGHT?  YOU LOOK KINDA PALE."`,
            ending: 'Exhaustion'
        },
        //42
        {
            line: 'We walk in the old abandoned building.'
        },
        {
            line: `Yudelf: "THIS PLACE LOOKS AMAZING!"`,
        },
        {
            line: "...There's a fridge and a couch."
        },
        //45
        {
            line: "Well, what should I do?",
            options: [
                {
                    text: "Check the fridge",
                    response: "The fridge is empty.",
                    nextLine: 45
                },
                {
                    text: "Sit on the couch"
                }
            ]
        },
        {
            line: 'I sit on the couch.',
        },
        {
            line: 'Just now I realize how tired I am..'
        },
        //48
        {
            line: `Yudelf: "HEY FRIEND! THIS IS NO TIME TO SLEEP!"`
        },
        {
            line: `${playerInformation.name}: "If I walked anymore, I probably would have died of exhaustion..."`
        },
        {
            line: `Yuval: "AH, I SEE! YUDELF'S MISTAKE! IT IS SIMPLY EASY TO FORGET HOW FRAGILE AVERAGE HUMANS ARE.`
        },
        {
            line: '...',
            delay: 1000
        },
        {
            line: '...zzzzzz',
            delay: 2000
        },
        //53
        {
            line: `???: ${playerInformation.name}..`,
            delay: 2000
        },
        {
            line: `Yudelf: "${playerInformation.name}!!!"`
        },
        {
            line: `${playerInformation.name}: "..Huh? How long have I been sleeping for?"`
        },
        {
            line: `Yudelf: EXACTLY 35 MINUTES AND 26 SECONDS, DEAR FRIEND!`
        },
        {
            line: 'That long..?'
        },
        //58
        {
            line: `${playerInformation.name}: "Alright. Let's continue!!!!"`,
        },
        {
            line: `Yudelf: (HE'S SO COOL)`
        },
        {
            line: "We continue our way to the school."
        },
        {
            line: 'After walking a lot, We finally see the school!',
            ending: 'Coolest walk to school'
        },
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
            speed: 25,
            style: 'font-style: italic',
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
                    text: `"Hello."`,
                    answer: "friend",
                    value: 'yudelf'
                },
                {
                    text: `"Shut up."`,
                    nextLine: 11
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
            line: `Yudelf:"THE OTHER KIDS ARE SCARED OF ME, BUT FEAR NOT! YUDELF IS NO DANGER! YOU NOW HAVE THE HONOR OF BECOMING..YUDELF’S BEST FRIEND!!"`,
        },
        //10
        {
            line: `It seems that you have befriended Yudelf.`,
            delay: 2000,
            nextLine: 4,
            route: 'bus'
        },
        //11
        {
            line: `Yudelf:"FEAR NOT, BECAUSE YUDELF’S ABILLITY AT SHUTTING UP IS ABOVE THE AVERAGE OF YUDELF'S PEERS!"`,
            delay: 2000,
            nextLine: 4,
            route: 'bus'
        },
        //12
        {
            line: `Yudelf:"SHOW RESPECT TO THE GREAT YUDELF!" He says, as he grabs a screwdiver from his pocket and stabs you in the neck.`,
            ending: "THE GREATEST DISRESPECT",
            delay: 1500
        },
    ],
    aggressively: [
        //0
        {
            line: "I aggressively run into the bus and get in before everyone, so I managed to secure a good seat."
        },
        //1
        {
            line: 'After almost all the kids got on the bus, a kid decided to sit next to you.'
        },
        //2
        {
            line: 'Probably because all the other seats were taken.'
        },
        //3
        {
            line: 'His name is "Yuval".'
        },
        //4
        {
            line: 'I..',
            options: [
                {
                    text: "Try to start a conversation",
                    nextLine: 5
                },
                {
                    text: "Stay silent throughout the whole ride",
                    nextLine: 8
                },
                {
                    text: "Start making fun of other kids on the bus",
                    answer: 'friend',
                    value: 'yuval'
                }
            ]
        },
        //5
        {
            line: "You start making fun of other kids on the bus, and Yuval starts getting amused and joins you."
        },
        //6
        {
            line: "You befriended Yuval!",
            delay: 1000,
            route: 'bus',
            nextLine: 4
        },
        //7
        {
            line: `${playerInformation.name}:"Good morning."`
        },
        //8
        {
            line: `Yuval:"Shut up, I'm not your friend."`
        },
        //9
        {
            line: `(Wow, rude.)`
        },
        //10
        {
            line: "Reluctantly, I stayed silent throughout the rest of the ride.",
            delay: 1000,
            route: 'bus',
            nextLine: 4
        },
    ],
    neighborhood: [
        //0
        {
            line: 'I made the poor decision to walk through the sketchy neighborhood.'
        },
        //1
        {
            line: 'The streets are empty and silent..',
        },
        //2
        {
            condition: playerInformation.rng < 50,
            elseNextLine: 4,
            line: 'As I walk, I look to the ground and I see 10 shekels!',
            options: [
                {
                    text: 'Pick it up',
                },
                {
                    text: 'Ignore',
                    nextLine: 4
                }
            ]
        },
        //3
        {
            line: 'As you stop next to the 10 shekels and bend over to pick it up, a car crashes into you.',
            ending: 'Greedy'
        },
        //4
        {
            line: 'After I continue to walk for a while, I hear someone behind me:',
        },
        //5
        {
            line:  'British man:”Empty the compartments of your pantaloons.”'
        },
        //6
        {
            line: '...What? I turn around and see a masked man, pointing a knife at me.'
        },
        //7
        {
            line: 'British man:”Empty the compartments of your pantaloons.”',
            options: [
                {
                    text: 'Try to run away',
                    nextLine: 12,
                },
                {
                    text: '"For what purpose?"',
                },
                {
                    text: "Empty the compartments of my pantaloons",
                    nextLine: 16
                }
            ]
        },
        //8
        {
            line: 'British man:”Now discard of your footwear.”',
           
        },
        //9
        {
            line: `${playerInformation.name}: "For what purpose!?"`,
        },
        //10
        {
            line: `British man:”I'm in equipped to summon the one casually known as little Travis on your buffoon ass.”`,
        },
        //11
        {
            line: '*Little Travis is summoned and smashes your head into the floor.*',
            ending: 'LITTLE TRAVIS'
        },
        //12
        {
            line: 'British man:”Nah Bitch.”'
        },
        //13
        {
            line: "British man:”Your buffoon self can not go away from my line of sight.”"
        },
        //14
        {
            line: "*Throws a knife at your back and hits your heart, killing you instantly*"
        },
        //15
        {
            line: "Ow.",
            ending: "THE BRITISH BLADE"
        },
        //16 back on track
        {
            line: "While I hand him my money, a police officer suddenly appears, causing the British man to flee.",
            delay: 1500
        },
        {
            line: "I continue to walk towards the school."
        },
        {
            line: 'Suddenly, Sans Undertale appeared.'
        },
        {
            line: "Just kidding, it didn't really happen. Why would Sans Undertale show up?"
        },
        //20
        {
            line: "What really happened is: a clown appeared.",
        },
        {
            line: 'Clown: "Hey kid, you want a balloon?"'
        },
        //22
        {
            line: '...',
            delay: 2000,
            options: [
                {
                    text: `"Yes plz"`,
                    response: `Clown: "Here." *gives u ballon*`
                },
                {
                    text: `"NO"`,
                    response: `Clown: ":("`
                }
            ]
        },
        {
            line: "After a whole lot other uninteresting things happened,"
        },
        {
            line: "Andrew Tate appeared.",
            delay: 2000
        },
        //25
        {
            line: "No, really."
        },
        {
            line: `Andrew Tate: "WANT TO ESCAPE THE MATRIX? JOIN HUSTLER UNIVERSITY NOW!"`,
        },
        {
            line: `Andrew Tate: "(only for 49.99 dollars per month)"`,
            style: "font-size: 0.75em",
        },
        {
            line: '...',
            options: [
                {
                    text: "Yes"
                },
                {
                    text: "No",
                    nextLine: 35
                }
            ]
        },
        {
            line: `${playerInformation.name}: "YES PLZ I WANT TO ESCAPE THE MATRIX"`,
            delay: 2000
        },
        {
            line: "Happily going back home instead of going to school (you don't need it anymore),"
        },
        //31
        {
            line: "You start watching a guide on how to invest in the stock market idk."
        },
        {
            line: "A lot of years have passed. You end up in an unexpected place.",
            delay: 2000
        },
        {
            line: "The streets.",
            ending: "Homeless"
        },
        //35
        {
            line: `${playerInformation.name}: "stfu"`, 
        },
        {
            line: 'Andrew Tate: ":("'
        },
        {
            line: "After walking a bit more, I arrive at school :D",
            ending: "Sketchy walk to school"
        }

    ],
    forest: [
        //0
        {
            line: "I made the poor decision to walk through the forest.",
        },
        //1
        {
            line: "The forest is empty and silent..",
        },
        //2
        {
            condition: playerInformation.rng < 30,
            elseNextLine: 10,
            line: "Or..So I thought.",
        },
        //3
        {
            line: "I see a small kid in the distance, and as I move closer to him I hear the kid saying:",
        },
        //4
        {
            line: '"wee snaw", Repeatedly.',
        },
        //5
        {
            line: "I stop next to the kid, but the kid doesn't seem to notice I am here.",
        },
        //6
        {
            line: '???:"wee snaw. wee snaw. wee snaw."',
            options: [
                {
                    text: "Ignore him",
                    nextLine: 9
                },
                {
                    text: `"Hello."`,
                    nextLine: 9
                },
                {
                    text: `"Snaw wee"`,
                },
                
            ]
        },
        //7
        {
            line: `???:"you fool. you absolute buffoon. you think you can challenge me in my own realm? you think you can rebel against my authority? you dare come into my house and upturn my dining chairs and spill coffee grounds in my Keurig? you thought you were safe in your chain mail armor behind that screen of yours. I will take these laminate wood floor boards and destroy you. I didn't want war. but i didn't start it."`,
        },
        //8
        {
            line: "He pulls out a gun, and shoots you 23 times in the chest.",
            ending: 'snaw wee'
        },
        //9
        {
            line: `I try saying "Hello" to the kid, but it's as if he didn't even hear me. Reluctantly, I ignored him and continued in my way.`
        },
        //10
        {
            line: "As I continue to walk, I come across an old cabin. I notice an old man waving his hand at me, and seemingly welcoming me inside.",
            options: [
                {
                    text: 'Enter the old cabin',
                    route: 'oldcabin',
                    nextLine: 0
                },
                {
                    text: 'Walk away',
                    nextLine: 17

                },
                {
                    text: 'Run away'
                }
            ]
        },
        //11
        {
            line: 'I run away as fast as I can, and then..',
            delay: 1500
        },
        //12
        {
            line: 'My leg gets stuck in a bear trap.',
        },
        //13
        {
            line: "Fuck.. I turn around to look at the old man, but he looks unfazed about what's happening to me right now.",
        },
        //14
        {
            line: `${playerInformation.name}:"Help! I got caught in a bear trap!"`,
            delay: 1500
        },
        //15
        {
            line: `The old man ignores me.`
        },
        //16 bear trap ending
        {
            line: "I bleed out to death.",
            ending: "Bear trapped"
        },
        //17 back on track
        {
            line: "I walk away. I notice a bear trap, hidden in the grass..Couldn't he at least warn me?",
            delay: 1000
        },
        //18
        {
            line: 'After a while, I start to see the end of the forest. The school must be close.'
        },
        //19
        {
            line: 'I got closer and closer and start to see the school',
            delay: 1000
        },
        //20
        {
            line: "Finally, I got here. Luckily, nothing happened in this trip."
        },
        //21
        {
            condition: playerInformation.death>0,
            elseNextLine: 22,
            line: "...Right?"
        },
        {
            line: '',
            ending: 'A walk in the park',
            won: true
        }
    ],
    oldcabin: [
        //0
        {
            line: "I follow the old man into the old cabin.",
        },
        //1
        {
            line: "He offers me tea.",
            options: [
                {
                    text: 'Drink the tea',
                    nextLine: 4
                },
                {
                    text: "Refuse",
                }
            ]
        },
        //2
        {
            line: "We talk a bit and then I exit the old cabin to continue on my way."
        },
        //3
        {
            line: "The old man waves me goodbye, seeming disappointed that i left.",
            route: 'forest',
            nextLine: 17
        },
        //4 drinking the tea
        {
            line: "I drink the tea while talking to the old man for a bit.",
        },
        {
            line: "After a little while, I start to feel nausea and dizzy.",
        },
        {
            line: 'I start to feel drowsy and really weak. Perhaps I have eaten something bad..'
        },
        {
            line: '...',
            ending: 'Lethal Tea'
        },
    ],
    checks:[
        // 0, not putting input as name
        {
            line: "I need to write my name.",
            route: 'normal',
            nextLine: 8
        },
        //1 name input is empty even after it filled it out for you
        {
            line: "Why did I erase that just now..? I need to write my name.",
            route: 'normal',
            nextLine: 8
        }
    ],
    gameover: [
        {
            line: "",
            style: "text-align:center",
            options: [
                {
                    text: "RESET"
                },
                {
                    text: "GO BACK TO LATEST CHOICE"
                },
            ]
        }

    ]
    }
}