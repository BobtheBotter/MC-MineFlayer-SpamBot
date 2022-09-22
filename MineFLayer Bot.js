const mineflayer = require('mineflayer');
const fs = require('fs');

svalues = []
spamlinesint = 0
fs.readFileSync('Settings.txt', 'utf-8').split(/\r?\n/).forEach(line =>  {
    svalues[spamlinesint] = line
    spamlinesint++
});

let batSettings = {
    host: svalues[4],
    post: svalues[5],
    version: svalues[3],
    auth: "mojang"
};

words = loopFile(svalues[0])
names = loopFile(svalues[1])
spamlines = loopFile(svalues[2])

function loopFile(file) {
    holdlines = []
    int = 0
    fs.readFileSync(file, 'utf-8').split(/\r?\n/).forEach(line =>  {
        holdlines[int] = line
        int++
    });
    return holdlines
}

function getName(players) {
    for(var x in players) {
        var skip = true
        for(var xbot = 0; xbot < this.names.length; xbot++) {
            if(x == this.names[xbot]) skip = false
        }
        if(skip) {
            return x;
        }
    }
    return "None"
}

function spamer(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    var rantext = Math.floor(Math.random() * 2)
    if(rantext == 0) {
        return spamlines[Math.floor(Math.random() * spamlinesint)]
    }
    if(rantext == 1) {
        LineTest = ""
        for ( var i = 0; i < Math.floor(Math.random() * 50); i++ ) {
            LineTest = LineTest + words[Math.floor(Math.random() * words.length)] + " ";
        }
        return LineTest
    }

    return result;
}

class mcbot {
    constructor(username, listnames) {
        this.username = username;
        this.host = batSettings["host"];
        this.port = batSettings["post"];
        this.version = batSettings["version"];
        this.auth = batSettings["auth"];
        this.names = listnames;
        this.initbot();
    }

    initbot() {
        this.bot = mineflayer.createBot({
            username: this.username,
            host: this.host,
            port: this.port,
            version: this.version,
            auth: this.auth,
            viewDistance: "tiny",
        })

        this.initEvents();
    }

    initEvents() {
        this.bot.on('login', () => {
            let num = 0
            this.bot.on("physicTick", () => {
                num--;
                if(num > 0) return;
                num = Math.floor(Math.random() * 50) + 20;

                var rannumber = Math.floor(Math.random() * 5)
                if(rannumber == 1) {
                    this.bot.chat("/tell " + getName(this.bot.players) + " " + spamer(20));
                    return
                }
                this.bot.chat(spamer(32));
            })

            this.bot.on('kicked', () => {
                setTimeout(() => this.initbot(), 1000);
                console.log()
            })

            this.bot.on('error', () => {
                console.log()
            })

            this.bot.on('end', (reason) => {
                console.log('end: ' + reason)
                setTimeout(() => this.initbot(), 1000);
            })

            this.bot.on('death', () => {

            })

            this.bot.on('end', (reason) => {
                if(reason == "disconnect.quitting") return;

                setTimeout(() => this.initbot(), 1000);
            })
        })
    }
}

for(var nameint = 0; nameint < names.length; nameint++) {
    new mcbot(names[nameint],names)
}