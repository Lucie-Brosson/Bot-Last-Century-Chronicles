const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { Client, GatewayIntentBits, EmbedBuilder, PermissionBitField, Permissions, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType } = require(`discord.js`);

const fs = require('fs');
const { resolve } = require('path');

const {readFileSync, promises: fsPromises} = require('fs');

const prefix = 'dd ';

const client = new Client({ intents : [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

client.on("ready", () => {
    console.log("Dédé est réveillé")
    client.user.setActivity("Prêt à lancer des dés", {type: "WATCHING" })
})

client.on("messageCreate",(message) =>{

    if (!message.content.startsWith(prefix)|| message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // message array

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    // autre Fonction 

    function checkIfContainsSync(filename, str){
        const contents = readFileSync(filename,'utf-8');
        const result = contents.includes(str);
        
        return result;
    }

    user = message.member.user.username;

    if (command === "test"){
        message.channel.send("Dédé is working!")
        let data = "Dédé écrit"
        
        fs.appendFile('Output.txt', 'Hello content!', function (err) {
            if (err) throw err;
            console.log('Saved!');
          });

    }

    if (command === "start"){
        fs.writeFile(user+'.txt',"1", function (err) {
            if (err) throw err;
            console.log('Created!');
          });  
    }

    if (Number.isInteger(parseInt(command)) === true){
        commandNumber= parseInt(command)+1
        resultDice = Math.floor(Math.random() * (commandNumber - 1) + 1);
        diceStatus =""
        if (resultDice == 1){
            diceStatus = "  Echec critique"
        }
        if (resultDice == parseInt(command)){
            diceStatus = "  Réussite critique"
        }
        message.channel.send("Résultat: " + resultDice + diceStatus)
    }

    if (command === "d42"){
        message.channel.send("Pour Rémi, la solution à l'univers")
    }

    if (command === "folie"){
        resultDiceFolie = Math.floor(Math.random() * (7 - 1) + 1);
        message.channel.send("Dans ce sombre monde la folie est proche. Reprends ton dernier résultat de folie \n et compare le au nouveau. Si ce dernier est au dessus, tu gagne un point de folie \n Résultat: " + resultDiceFolie )
        
        fs.readFile(user+".txt",(err,data)=>{
            if (err) throw err; 
            folieNiveau = data;
            console.log(folieNiveau)
                if (folieNiveau < resultDiceFolie){
                    folieNiveau++
                    fs.writeFile(user+'.txt',folieNiveau.toString(), function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                      });  
                    message.channel.send("Hélas, ton niveau de folie augmente, pense au xanax")
                } 
                else {
                    console.log(folieNiveau.toString())
                } 
        message.channel.send("Ton niveau est de " + folieNiveau.toString())                 
        })
    }

    if (command === "niveau"){

        fs.readFile(user+".txt",(err,data)=>{
            if (err) throw err; 
            folieNiveau = data;
            console.log(folieNiveau)
            message.channel.send("Ton niveau est de " + folieNiveau.toString()+"/n Bonne chance!")                 
        })
    }

    if (command === "hérésie"){
        
        fs.readFile(user+".txt",(err,data)=>{
            
            if (err) throw err; 
            folieNiveau = data;
            folieNiveau--;
            
            fs.writeFile(user+'.txt',folieNiveau.toString(), function (err) {
                if (err) throw err;
                console.log('Saved!');
            });  
        
        message.channel.send("Ton niveau est de " + folieNiveau.toString())                 
        })
    }

    if (command === "aide"){
        message.channel.send({
            embeds:[new EmbedBuilder()
                .setTitle('Commande de Dédé')
                .setColor(0x189418)
                .addFields(
                    {name:'aide', value:'ouvre le dossier avec toute les commandes'},
                    {name:"n'importe quel nombre", value:'lance un dé de ce nombre de face'},
                    {name:'folie', value:'lance un dé de folie et garde en fichier le niveau '},
                    {name:'boutique', value:'te donne tout les objets achetable dans une boutique'},
                    {name:'auberge', value:'te donne tout les objets achetable dans une auberge'},
                    {name:'pharmacie', value:'te donne tout les objets achetable dans une pharmacie'}
                )   
            ],
        })
    }

    if (command === "boutique"){

        message.channel.send({
            embeds:[new EmbedBuilder()
                .setTitle('Boutique')
                .setColor(0x3d1a14)
                .addFields(
                    ({name:"briquet", value: "-3€"}),
                    ({name:"corde", value: "-3.5€"}),
                    ({name:"matériel d'écriture", value: "-5€"}),
                    ({name:"outils de crochetage", value: "-10€"}),
                    ({name:"ration", value: "pour une semaine -3€"}),
                    ({name:"couteau", value: "-5€"}),
                    ({name:"petit pistolet", value: "(courte distance)-20€"}),
                    ({name:"pistolet", value: "(distance moyenne)-50€"}),
                    ({name:"munitions (10)", value: "-5€"})
                )   
            ],
        })
    }

    if (command === "auberge"){

        message.channel.send({
            embeds:[new EmbedBuilder()
                .setTitle('Auberge')
                .setColor(0x3d1a14)
                .addFields(
                    ({name:"Bière", value: "blonde ou brune pour les vraies - 3€"}),
                    ({name:"Vin", value: "du bon vin de chez le voisin - 5€"}),
                    ({name:"Coca", value: "Le seul remède à tout les mals - 10€"}),
                    ({name:"Cacahuète", value: "partagés avec tout le bar - 1€"}),
                    ({name:"soupe et crouton de pain", value: "bien chaude - 3€"}),
                    ({name:"repas avec viande", value: "pour les viandares - 8€"}),
                    ({name:"repas vegan", value: "pour les vraies - 7€"}),
                    ({name:"Nuit",value:"dans un dortoire - 7€"}),
                    ({name:"Nuit",value:"dans une chambre de 4 - 15€"})
                    
                )   
            ],
        })
    }

    if (command === "pharmacie"){

        message.channel.send({
            embeds:[new EmbedBuilder()
                .setTitle('Pharmacie')
                .setColor(0x3d1a14)
                .addFields(
                    ({name:"bandage", value: "- 3€"}),
                    ({name:"crème contre brulure", value: "-3€"}),
                    ({name:"médicament", value: "- 5€"}),
                    ({name:"Coca", value: "Le seul remède à tout les mals - 10€"})
                )
                    
            ],
        })
    }

})

client.login("discord key");
