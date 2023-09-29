export default {
    "???": {
        name: "???",
        type: "folder",
        contains: [
            "homework",
            "games"
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
    games: {
        name: "game",
        type: "folder",
        date: "28/09/2023",
        hour: "03:00",
        parentPath: 'C:\\Users\\???',
        contains: ["textadventure", "readme"]
    },

    readme: {
        name: "textadventure",
        type: "txt",
        date: "28/09/2023",
        hour: "03:05",
        parentPath: 'C:\\Users\\???\\games',
        content: `hello those are games you can run with the command "start".`
    },

    textadventure: {
        name: "textadventure",
        type: "exe",
        date: "28/09/2023",
        hour: "03:00",
        parentPath: 'C:\\Users\\???\\games',
        contains: ["text", "readme"]
    },
}