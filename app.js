const dicePictures=["public/images/dice1.png","public/images/dice2.png","public/images/dice3.png","public/images/dice4.png","public/images/dice5.png","public/images/dice6.png"];

let playersNum=4;
let realPlayerNumbers=3;
var stepOverAudio=new Audio("sounds/crash.mp3");
var movementAudio=new Audio("sounds/blue.mp3");
var wrongAnswerAudio=new Audio("sounds/wrongAns.mp3");
var rightAnswerAudio=new Audio("sounds/rightAns.wav");
var viewQuestionAudio=new Audio("sounds/viewQ.wav");
var won=new Audio("sounds/win.mp3");
var homeReach=new Audio("sounds/homeReach.wav");

var diceNumber=-1;
let playerAnswered=true;
let playerExecuted=true;
let lastDisplayedQuestion;
//routes of players from their home until finish 
const yellowRoute=[6,9,12,15,18,37,38,39,40,41,42,48,54,53,52,51,50,49,57,60,63,66,69,72,71,70,67,64,61,58,55,36,35,34,33,32,31,25,19,20,21,22,23,24,16,13,10,7,4,1,2,5,8,11,14,17];
const redRoute=[67,64,61,58,55,36,35,34,33,32,31,25,19,20,21,22,23,24,16,13,10,7,4,1,2,3,6,9,12,15,18,37,38,39,40,41,42,48,54,53,52,51,50,49,57,60,63,66,69,72,71,68,65,62,59,56];
const BlueRoute=[53,52,51,50,49,57,60,63,66,69,72,71,70,67,64,61,58,55,36,35,34,33,32,31,25,19,20,21,22,23,24,16,13,10,7,4,1,2,3,6,9,12,15,18,37,38,39,40,41,42,48,47,46,45,44,43];
const greenRoute=[20,21,22,23,24,16,13,10,7,4,1,2,3,6,9,12,15,18,37,38,39,40,41,42,48,54,53,52,51,50,49,57,60,63,66,69,72,71,70,67,64,61,58,55,36,35,34,33,32,31,25,26,27,28,29,30];
const treats=[23,24,13,38,18,15,50,49,60,35,55,58];
const traps=[36,16,57,37]
const Routes=[redRoute,yellowRoute,BlueRoute,greenRoute];
//56 steps & the 57's is the finish
//stars at 66,33,40,7

//redColor=0       yellowColor=1      blueColor=2        greenColor=3
//The most used things for the players
//Registers       Red=AX    Yellow=BX      Blue=CX      Green=CX
let activePlayer=0;
let playerCellStyle=["circleRed","circleYellow","circleBlue","circleGreen"];
let shapes=["fa-microchip","fa-hdd","fa-database","fa-ethernet"];
let turnPhrase=["Red Turn 'AX'","Yellow Turn 'BX'","Blue Turn 'CX'","Green Turn 'DX'"]
let buttonStyles=["red","yellow","blue","green"];

//History of the players steps & thier Status Home/Cell/Finish
let playerHistory0=[{
    lastCell:0,
    treatCell:"PAX",
    hints:3,
    firstMove:true,
    code:"AX0",
    treatIndex:0,
    scoreID:"AXScore",
    lastCellValues:0,
    finishedPlayer:0
},
{
    lastCell:0,
    treatCell:"PBX",
    hints:3,
    firstMove:true,
    code:"BX0",
    treatIndex:0,
    scoreID:"BXScore",
    lastCellValues:0,
    finishedPlayer:0
},
{
    lastCell:0,
    treatCell:"PCX",
    hints:3,
    firstMove:true,
    code:"CX0",
    treatIndex:0,
    scoreID:"CXScore",
    lastCellValues:0,
    finishedPlayer:0
},
{
    lastCell:0,
    treatCell:"PDX",
    hints:3,
    firstMove:true,
    code:"DX0",
    treatIndex:0,
    scoreID:"DXScore",
    lastCellValues:0,
    finishedPlayer:0
}];

let playerHistory1=[{
    lastCell:0,
    firstMove:true,
    code:"AX1",
    lastCellValues:0
},
{
    lastCell:0,
    firstMove:true,
    code:"BX1",
    lastCellValues:0
},
{
    lastCell:0,
    firstMove:true,
    code:"CX1",
    lastCellValues:0
},
{
    lastCell:0,
    firstMove:true,
    code:"DX1",
    lastCellValues:0
}];

let playerHistory2=[{
    lastCell:0,
    firstMove:true,
    code:"AX2",
    lastCellValues:0
},
{
    lastCell:0,
    firstMove:true,
    code:"BX2",
    lastCellValues:0
},
{
    lastCell:0,
    firstMove:true,
    code:"CX2",
    lastCellValues:0
},
{
    lastCell:0,
    firstMove:true,
    code:"DX2",
    lastCellValues:0
}];

let playerHistory3=[{
    lastCell:0,
    firstMove:true,
    code:"AX3",
    lastCellValues:0
},
{
    lastCell:0,
    firstMove:true,
    code:"BX3",
    lastCellValues:0
},
{
    lastCell:0,
    firstMove:true,
    code:"CX3",
    lastCellValues:0
},
{
    lastCell:0,
    firstMove:true,
    code:"DX3",
    lastCellValues:0
}];

const playerTotalHistory=[playerHistory0,playerHistory1,playerHistory2,playerHistory3];

//-----------------Questions Bank-----------------//
//LEVEL 1 first part of assembly cheat sheet
const TitleLevel1="write the requried command in capital letters only"
//LEVEL 2 True or false
const TitleLevel2="Write T for True statments or F for False statments";
let questions=[
    {
        question:"Write the command name that we use, to store flags values in stack in assembly ? ",
        answer:"PUSHF"
    },
    {
        question:"Write the command name that we use, to store values in stack in assembly ? ",
        answer:"PUSH"
    },
    {
        question:"Write the command name that we use, to store all general registers values in stack in assembly ?",
        answer:"PUSHA"
    },
    {
        question:"Write the command name that we use, to convert from byte to word ?",
        answer:"CBW"
    },
    {
        question:"How many bits are there in the Double Word? ",
        answer:"32"
    },
    {
        question:"Write a line in one word which will result in clearing the carry flag ",
        answer:"CLC"
    },
    {
        question:"Write a line in one word which will result in clearing the direction flag",
        answer:"CLD"
    },
    {
        question:"Write a line in one word which will result in setting the direction flag ",
        answer:"STD"
    },
    {
        question:"Write a line in one word which will result in setting the carry flag ",
        answer:"STC"
    }
    ,{
        question:"T or F, Register indirect addressing mode is slower than register addressing mode because it accepts registers BX,SI and DI only",
        answer:"F"
    },
    {
        question:"T or F, General purpose registers AX,BX,SI and DX could be accessed as either 16/8-bit registers",
        answer:"F"
    },
    {
        question:"T or F, Assembly memory variables could be accessed by other variables names",
        answer:"T"
    },
    {
        question:"T or F, Increasing register size only, increases the data transfer rate",
        answer:"F"
    },
    {
        question:"T or F, The CMP instruction alters the contents of its operands",
        answer:"F"
    },
    {
        question:"T or F, Procedures minimize assembling time more than macros",
        answer:"T"
    },
    {
        question:"T or F, Procedures minimize the program size more than macros",
        answer:"T"
    },
    {
        question:"T or F, Procedures optimize the runtime in general more than macros",
        answer:"F"
    },
    {
        question:"T or F, It is always better to use parallel communication for low distances less than 5 m",
        answer:"F"
    },
    {
        question:"T or F, To transfer a lot of data asynchronous transmission is better than synchronous one",
        answer:"F"
    },
    {
        question:"T or F, Full duplex is always better than half-duplex communication mode for two-way communication",
        answer:"F"
    },
    {
        question:"T or F, Serial transmission prefer two or three stop bits for slow computers",
        answer:"F"
    },
    {
        question:"T or F, Even for a very stable connection in a non-noisy environment, it is preferred to add parity bit for serial transmission",
        answer:"F"
    },
    {
        question:"T or F, Before sending data, it is required to check the status of Transmitter shift Register",
        answer:"F"
    },
]

//----------------------------------------Start Playing--------------------------------//
function start(){
    if(document.querySelector("#startBtn").innerHTML=="Re-start Game"){
        location.reload();
        return;
    }
    playersNum=document.querySelector("#playerNumber").value;
    if(playersNum==""){
        alert("Insert How Many Players First Please");
        return;
    }
    playersNum=parseInt(playersNum,10);
    realPlayerNumbers=playersNum-1;
    console.log(playersNum);
    if(playersNum>1 && playersNum<5){
        document.querySelector("#rollDice").disabled=false;
        document.querySelector("#playerNumber").disabled=true;
        document.querySelector("#commandRequest").disabled=false;
        document.querySelector("#startBtn").innerHTML="Re-start Game";
    }else{
        alert("Players number must be from 2-4 players");
    }
}

function getCode(level,color){//to get the code of the oponent to be removed
    var result="";
    if(color==0){
        result+="AX"+level;
    }else if(color==1){
        result+="BX"+level;
    }else if(color==2){
        result+="CX"+level;
    }else{
        result+="DX"+level
    }
    return result;
}

//to get the shape in the home
function getHomeChild(playerNumber,Code){//Code for ex is AX0 player number if BX will be 1 for ex
    let getID="H";
    getID+=getCode(Code.level,Code.color);
    document.querySelector("#"+getID).hidden=false;
}


//-----------Handling rolling dice-----------//
document.querySelector("#diceImg").src=dicePictures[0];

function rollDice(){
    diceNumber=(Math.random()*6)+1;
    diceNumber=Math.floor(diceNumber);
    //diceNumber=6;
    document.querySelector("#diceImg").src=dicePictures[diceNumber-1];
    document.querySelector("#rollDice").disabled=true;
    document.querySelector("#commandRequest").disabled=true;
    giveValues();
    checkValidMoves();
}

function checkValidMoves(){
    if(playerHistory0[activePlayer].firstMove && playerHistory1[activePlayer].firstMove && playerHistory2[activePlayer].firstMove && playerHistory3[activePlayer].firstMove && diceNumber!=6 && diceNumber!=1){
        document.querySelector("#displayTurn").innerHTML="No Available Moves";
        setTimeout(() => {
            getNextTurn();
        }, 1500);
    }else{
        let target0=playerHistory0[activePlayer].lastCell+diceNumber;
        let target1=playerHistory1[activePlayer].lastCell+diceNumber;
        let target2=playerHistory2[activePlayer].lastCell+diceNumber;
        let target3=playerHistory3[activePlayer].lastCell+diceNumber;
        let theCheck=[];
        if(friendInCell(target0) || firstMoveCell(playerHistory0) || lastCellLock(target0,playerHistory0)){
            if(friendInCell(target1) || firstMoveCell(playerHistory1) || lastCellLock(target1,playerHistory1)){
                if(friendInCell(target2) || firstMoveCell(playerHistory2) || lastCellLock(target2,playerHistory2)){
                    if(friendInCell(target3) || firstMoveCell(playerHistory3) || lastCellLock(target3,playerHistory3)){
                        document.querySelector("#displayTurn").innerHTML="No Available Moves";
                        setTimeout(() => {
                            getNextTurn();
                        }, 1500);
                    }
                }
            }
        }
        
    }
    
}

function friendInCell(Target){
    if(playerHistory0[activePlayer].lastCell==Target || playerHistory1[activePlayer].lastCell==Target || playerHistory2[activePlayer].lastCell==Target || playerHistory3[activePlayer].lastCell==Target){
        return true;
    }
    return false;
}
function firstMoveCell(playerH){
    if(playerH[activePlayer].firstMove && diceNumber!=6 && diceNumber!=1){
        return true;
    }
    return false;
}
function lastCellLock(Target,History){
    let getRegisterValue=document.querySelector("#"+History[activePlayer].code[0]+History[activePlayer].code[1]+"Score0").value;
    getRegisterValue=parseInt(getRegisterValue,10);
    if(Target>56){
        return true;
    }
    if(Target==56 && getRegisterValue<255){
        return true;
    }
    return false;
}

function getCellChild(History){//when moving the player to the cell will return the right Styles wrt the active player
    var node = document.createElement("LI");
    node.classList.add(playerCellStyle[activePlayer]);//to get the color
    node.classList.add("fas");
    node.classList.add(shapes[History[activePlayer].code[2]]);//where if it's AX0 will get shapes of 0 'microship'
    node.classList.add(History[activePlayer].code)
    console.log("added: "+History[activePlayer].code);
    node.onclick=function(){
        checkPlayerPress(node.classList[3]);
    }
    return node;
}


//------------------------------------------Get Next Turn Properties--------------------------------------//
function getNextTurn(){//to change the turn to the next player & change the button styles
    document.querySelector("#rollDice").classList.remove(buttonStyles[activePlayer]);
    document.querySelector("#displayTurn").classList.remove(playerCellStyle[activePlayer]);
    if(activePlayer==realPlayerNumbers){
        activePlayer=0;
    }else{
        activePlayer++;
    }
    document.querySelector("#rollDice").hidden=false;
    document.querySelector("#questionSection").hidden=true;
    document.querySelector("#commandRequest").disabled=false;
    document.querySelector("#executeCommand").disabled=true;
    document.querySelector("#ansBtn").hidden=false;
    document.querySelector("#ansBtn").disabled=false;
    document.querySelector("#Answer").value="";
    document.querySelector("#displayTurn").innerHTML=turnPhrase[activePlayer];
    document.querySelector("#rollDice").classList.add(buttonStyles[activePlayer]);
    document.querySelector("#displayTurn").classList.add(playerCellStyle[activePlayer]);
    document.querySelector("#rollDice").disabled=false;//returning the abilty to roll dice again
}
//------------------------------------------------------------------------------------------------------//

//------------------------------------------Draw Function----------------------------------------------//
function Draw(Target,History){
    let nodeChild=getCellChild(History);
    //will add the playerCircle shape to the cell
    
    document.querySelector("#c"+Routes[activePlayer][History[activePlayer].lastCell]).appendChild(nodeChild);
    movementAudio.play();

    setTimeout(() => {
        if(History[activePlayer].lastCell==Target){//if the current cell is the cell supposed to be arrived so stop drawing & return
            History[activePlayer].lastCellValues=Routes[activePlayer][Target];
            console.log(playerHistory0);
            checkCellType(Target,History);
            if(playerAnswered && playerExecuted){
                getNextTurn();
            }
            return;
        }
        //will remove the circle Player from cell after period of time to make animation
        document.querySelector("#c"+Routes[activePlayer][History[activePlayer].lastCell]).removeChild(nodeChild);
        if(History[activePlayer].lastCell==55){//checking if the player have reahced home

            History[activePlayer].lastCell=57;//to prevent from moving again
            History[activePlayer].lastCellValues=0;//to prevent from checking over step
            if(playerHistory0[activePlayer].finishedPlayer==4){
                won.play();
                alert("Congratulations Team "+playerHistory0[activePlayer].code[0]+playerHistory0[activePlayer].code[1]+" Won The Game 🎉🎉🎇");
                return;
            }
            homeReach.play();
            alert("Reached Home Successfully 🎉");
            if(playerAnswered && playerExecuted){
                getNextTurn();
            }
            return;
        }
        History[activePlayer].lastCell=History[activePlayer].lastCell+1;//incrementing the lastcell by 1 until reaching target
        Draw(Target,History)
    }, 500);
}
//------------------------------------------------------------------------------------------------------//

//------------------------------------------Pressing On Players----------------------------------------//
function checkPlayerPress(Code){
    //check the press is the same color of active
    if(diceNumber==-1){//game hasn't started yet
        return ;
    }
    if(!playerAnswered || !playerExecuted){//if there is a displayed question just ignore the press
        return ;
    }
    let History=pickPlayerList(Code[2]);
    let Target;
    //check if it's his first move & the diceNumber isn't 6 or 1 don't allow the move
    if(History[activePlayer].firstMove && diceNumber!=6 && diceNumber!=1 && Code[0]==History[activePlayer].code[0]){
        if(playerHistory0[activePlayer].firstMove && playerHistory1[activePlayer].firstMove && playerHistory2[activePlayer].firstMove && playerHistory3[activePlayer].firstMove && diceNumber!=6 && diceNumber!=1){
            getNextTurn();
        }
        console.log("invalid to leave home");
        return ;
    }
    if(History[activePlayer].firstMove){
        Target=History[activePlayer].lastCell+diceNumber-1;
    }else{
        Target=History[activePlayer].lastCell+diceNumber;
    }

    console.log("diceNumber : "+diceNumber);
    console.log("last cell : "+History[activePlayer].lastCell);

    if(Code[0]==History[activePlayer].code[0] && document.querySelector("#rollDice").disabled && checkStepOver(Target,History) && checkFinish(Target,History)){
        if(History[activePlayer].firstMove){
            document.querySelector("#H"+History[activePlayer].code).hidden=true;
            History[activePlayer].firstMove=false;
        }else{
            //to remove the player from the cell of motion start
            document.querySelector("#c"+Routes[activePlayer][History[activePlayer].lastCell]).removeChild(document.querySelector("#c"+Routes[activePlayer][History[activePlayer].lastCell]).childNodes[0]);
        }
        
        Draw(Target,History);//calling the draw function to render the steps of the player
    }else{
        return false;
    }
}
//----------------------------------------------------------------------------------------------------//



//------------------------------------------Killing Opponents---------------------------------------//
function checkStepOver(Target,History){
    let obj;
    let found=false;
    console.log("targetValue: "+Routes[activePlayer][Target]);
    console.log("pressed playerCode "+History[activePlayer].code);
    const targetValue=Routes[activePlayer][Target];
    let checkHistory;
    for(var i=0;i<4;i++){
        if(found){break;}
        checkHistory=playerTotalHistory[i];
        for(var j=0;j<4;j++){
            console.log("to be compared value: "+checkHistory[j].lastCellValues);
            if(checkHistory[j].lastCellValues==targetValue && checkHistory[j].code!=History[activePlayer].code){
                found=true;
                console.log("found a player on the target cell");
                obj={
                    color:j,
                    level:i
                };
                break;
            }
        }
    }
    if(!found){
        console.log("empty valid cell");
        return true;
    }else if(obj.color==activePlayer && obj.level!=History[activePlayer].code[2]){
        console.log("unempty invalid cell");
        alert("Unavailable Move");
        return false;
    }else{
        checkHistory[obj.color].lastCell=0;
        checkHistory[obj.color].lastCellValues=0;
        checkHistory[obj.color].firstMove=true;
        console.log("unempty valid cell");
        let regName=checkHistory[obj.color].code[0]+checkHistory[obj.color].code[1];
        console.log(regName+"stabbed player")
        let killedPlayerID=getTheTableID(regName);
        console.log("returned ID: "+killedPlayerID);
        let theValue=document.querySelector("#"+killedPlayerID).innerHTML;
        theValue=parseInt(theValue,10)+1;
        console.log("new value ",theValue);
        document.querySelector("#"+killedPlayerID).innerHTML=theValue;
        while (document.querySelector("#c"+Routes[activePlayer][Target]).firstChild) {//removing the player from the cell
            document.querySelector("#c"+Routes[activePlayer][Target]).removeChild(document.querySelector("#c"+Routes[activePlayer][Target]).firstChild);
        }
        getHomeChild(obj.color,obj);
        stepOverAudio.play();
        return true;
    }
}
//---------------------------------------------------------------------------------------------------//


//------------------------------------------Home Arrival Handelling--------------------------------------//
function checkFinish(Target,History){
    let getRegisterValue=document.querySelector("#"+History[activePlayer].code[0]+History[activePlayer].code[1]+"Score0").value;
    getRegisterValue=parseInt(getRegisterValue,10);
    if(Target>56){
        console.log("more than home target cannot move");
        return false;
    }else if(Target==56){
        if(getRegisterValue>=255){
            playerHistory0[activePlayer].finishedPlayer=playerHistory0[activePlayer].finishedPlayer+1;
            return true;
        }else{
            console.log("not enough value in reg");
            return false;
        }
    }else{
        return true;
    }
}
//------------------------------------------------------------------------------------------------//


//------------------------------------------Commands Handeling--------------------------------------//
function Command(){//to display the text input where user will enter the command he want to execute
    document.querySelector("#questionHeader").innerHTML="Write Only 1 Line";
    document.querySelector("#questionContent").innerHTML="⚠ execute an empty line to cancel";
    document.querySelector("#Answer").value="";
    document.querySelector("#questionSection").hidden=false;
    document.querySelector("#commandRequest").disabled=true;
    document.querySelector("#executeCommand").disabled=false;
    document.querySelector("#ansBtn").hidden=true;
    document.querySelector("#ansBtn").disabled=true;
    document.querySelector("#rollDice").disabled=true;
    playerExecuted=false;
}
//----------------Table Id's Getter---------------------//
function getTheTableID(value){
    let theMainPart="P"+playerHistory0[activePlayer].code[0]+playerHistory0[activePlayer].code[1];
    value=value.toUpperCase();
    if(value=="AX"){
        theMainPart+="4";
    }else if(value=="BX"){
        theMainPart+="5";
    }else if(value=="CX"){
        theMainPart+="6";
    }else if(value=="DX"){
        theMainPart+="7";
    }else if(value=="MOV"){
        theMainPart+="0";
    }else if(value=="XCHG"){
        theMainPart+="1";
    }else if(value=="ADD"){
        theMainPart+="2";
    }
    return theMainPart;
}
//----------checking if code words exist in playerTable-------------//
function checkExists(value,isText){
    if(isText){
        let getIdOfWritten=getTheTableID(value);
        getIdOfWritten=document.querySelector("#"+getIdOfWritten).innerHTML;
        getIdOfWritten=parseInt(getIdOfWritten,10);
        console.log("number: "+getIdOfWritten);
        if(getIdOfWritten>0){
            return true;
        }else{
            return false;
        }
    }else{
        let getNumID="P"+playerHistory0[activePlayer].code[0]+playerHistory0[activePlayer].code[1]+"3";
        getNumID=document.querySelector("#"+getNumID).innerHTML;
        getNumID=parseInt(getNumID,10);
        if(getNumID>=value){
            return true;
        }else{
            return false;
        }
    }
}
//-----------------------------------------------------------------------------------------------//


//------------------------------------------Command Execution Handelling--------------------------------------//
function executeCommand(){
    let second="";
    let third="";
    let theCommandContent=document.querySelector("#Answer").value;
    console.log("Command"+theCommandContent);
    theCommandContent = theCommandContent.toString().replace(/ /g,"");//removing all the spaces
    theCommandContent=theCommandContent.toUpperCase();
    console.log("Command"+theCommandContent);
    if(theCommandContent.length==0){
        alert("executing command is canceled");
        playerExecuted=true;
        //getNextTurn();
        document.querySelector("#rollDice").disabled=false;
        document.querySelector("#questionSection").hidden=true;
        document.querySelector("#commandRequest").disabled=false;
        document.querySelector("#executeCommand").disabled=true;
        return;
    }
    if(theCommandContent.length<7){
        alert("invalid assembly code, Your Register Is Decremented By 25 😭");
        decrementRegister(25);
        playerExecuted=true;
        getNextTurn();
        return;
    }

    
    if(theCommandContent.slice(0,4)=="XCHG"){//then the command is exchange 0,1,2,3 is the first word
        if(theCommandContent.length!=9){
            alert("invalid assembly code, Your Register Is Decremented By 25 😭");
            decrementRegister(25);
            playerExecuted=true;
            getNextTurn();
            return;
        }
        if(!checkExists("XCHG",true)){
            alert("You don't have enough XCHG Commands 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        second=theCommandContent[4]+theCommandContent[5];
        third=theCommandContent[7]+theCommandContent[8];
        checkXCHG(second,third);
    }else if(theCommandContent[0]=="M"){//then command is MOV
        second=theCommandContent[3]+theCommandContent[4];
        for(var i=6;i<theCommandContent.length;i++){
            console.log(theCommandContent[i] +"  added");
            third+=theCommandContent[i];
        }
        if(!checkExists("MOV",true)){
            alert("You don't have enough MOV Commands 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        checkMOV(second,third);
    }else if(theCommandContent[0]=="A"){//then the command is ADD
        second=theCommandContent[3]+theCommandContent[4];
        for(var i=6;i<theCommandContent.length;i++){
            third+=theCommandContent[i];
        }
        if(!checkExists("ADD",true)){
            alert("You don't have enough ADD Commands 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        checkADD(second,third);
    }else{
        alert("invalid assembly code, Your Register Is Decremented By 25 😭");
        decrementRegister(25);
        playerExecuted=true;
        getNextTurn();
    }
}

function checkXCHG(second,third){
    decreaseFromTable("XCHG");
    let getActiveReg=playerHistory0[activePlayer].code[0]+playerHistory0[activePlayer].code[1];//to get the value of the register AX or BX etc
    third=third.toUpperCase();
    second=second.toUpperCase();
    getActiveReg=getActiveReg.toUpperCase();
    console.log("exchange is called");
    if(second !=getActiveReg){
        console.log("loll");
        alert("invalid assembly code, Your Register Is Decremented By 25 😭");
        decrementRegister(25);
        playerExecuted=true;
        getNextTurn();
        return;
    }
    let getActiveScore=document.querySelector("#"+getActiveReg+"Score0").value;
    if(third=="BX" && second[0]!="B"){
        if(!checkExists("BX",true)){
            alert("You don't have enough BX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("BX");
        document.querySelector("#"+getActiveReg+"Score0").value=document.querySelector("#BXScore0").value;
        document.querySelector("#BXScore0").value=getActiveScore;
    }else if(third=="CX" && second[0]!="C"){
        if(!checkExists("CX",true)){
            alert("You don't have enough CX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("CX");
        document.querySelector("#"+getActiveReg+"Score0").value=document.querySelector("#CXScore0").value;
        document.querySelector("#CXScore0").value=getActiveScore;
    }else if(third=="DX" && second[0]!="D"){
        if(!checkExists("DX",true)){
            alert("You don't have enough DX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("DX");
        document.querySelector("#"+getActiveReg+"Score0").value=document.querySelector("#DXScore0").value;
        document.querySelector("#DXScore0").value=getActiveScore;
    }else if(third=="AX" && second[0]!="A"){
        if(!checkExists("AX",true)){
            alert("You don't have enough AX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("AX");
        document.querySelector("#"+getActiveReg+"Score0").value=document.querySelector("#AXScore0").value;
        document.querySelector("#AXScore0").value=getActiveScore;
    }else{
        alert("invalid assembly code, Your Register Is Decremented By 25 😭");
        decrementRegister(25);
    }
    updateScoreValues();
    playerExecuted=true;
    getNextTurn();
}

function checkMOV(second,third){
    decreaseFromTable("MOV");
    let getActiveReg=playerHistory0[activePlayer].code[0]+playerHistory0[activePlayer].code[1];//to get the value of the register AX or BX etc
    console.log("active: "+getActiveReg+"  second:"+second+"    third:"+third);
    third=third.toUpperCase();
    second=second.toUpperCase();
    console.log("active: "+getActiveReg+"  second:"+second+"    third:"+third);
    getActiveReg=getActiveReg.toUpperCase();
    if(second !=getActiveReg){
        console.log("here0");
        alert("invalid assembly code, Your Register Is Decremented By 25 😭");
        decrementRegister(25);
        playerExecuted=true;
        getNextTurn();
        return;
    }

    if(third=="BX" && second[0]!="B"){
        if(!checkExists("BX",true)){
            alert("You don't have enough BX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("BX");
        document.querySelector("#"+getActiveReg+"Score0").value=document.querySelector("#BXScore0").value;
    }else if(third=="CX" && second[0]!="C"){
        if(!checkExists("CX",true)){
            alert("You don't have enough CX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("CX");
        document.querySelector("#"+getActiveReg+"Score0").value=document.querySelector("#CXScore0").value;
    }else if(third=="DX" && second[0]!="D"){
        if(!checkExists("DX",true)){
            alert("You don't have enough DX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("DX");
        document.querySelector("#"+getActiveReg+"Score0").value=document.querySelector("#DXScore0").value;
    }else if(third=="AX" && second[0]!="A"){
        if(!checkExists("AX",true)){
            alert("You don't have enough AX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("AX");
        document.querySelector("#"+getActiveReg+"Score0").value=document.querySelector("#AXScore0").value;
    }else if(parseInt(third,10)){//He will move a number , so check that all text is only numbers
        third=parseInt(third,10);
        console.log("result: "+checkExists(third,false));
        if(!checkExists(third,false)){
            alert("You don't have enough Decimal values 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        const moneyID="#P"+playerHistory0[activePlayer].code[0]+playerHistory0[activePlayer].code[1]+"3";
        let moneyValue=document.querySelector(moneyID).innerHTML;
        moneyValue=parseInt(moneyValue);
        moneyValue-=third;
        document.querySelector(moneyID).innerHTML=moneyValue;
        document.querySelector("#"+getActiveReg+"Score0").value=third;
    }else{
        console.log(parseInt(third,10).length);
        console.log("here1");
        alert("invalid assembly code, Your Register Is Decremented By 25 😭");
        decrementRegister(25);
    }
    updateScoreValues();
    playerExecuted=true;
    getNextTurn();
}

function decreaseFromTable(Word){
    getXCHGID=getTheTableID(Word);//to decremnt it by 1
    let decValue=document.querySelector("#"+getXCHGID).innerHTML;
    decValue=parseInt(decValue,10);
    decValue-=1;
    document.querySelector("#"+getXCHGID).innerHTML=decValue;
    console.log("new value is: "+decValue);
}

function checkADD(second,third){
    decreaseFromTable("ADD");
    let getActiveReg=playerHistory0[activePlayer].code[0]+playerHistory0[activePlayer].code[1];//to get the value of the register AX or BX etc
    console.log("active: "+getActiveReg+"  second:"+second+"    third:"+third);
    third=third.toUpperCase();
    second=second.toUpperCase();
    console.log("active: "+getActiveReg+"  second:"+second+"    third:"+third);
    getActiveReg=getActiveReg.toUpperCase();
    if(second !=getActiveReg){
        alert("invalid assembly code, Your Register Is Decremented By 25 😭");
        decrementRegister(25);
        playerExecuted=true;
        getNextTurn();
        return;
    }

    if(third=="BX" && second[0]!="B"){
        if(!checkExists("BX",true)){
            alert("You don't have enough BX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("BX");
        let addedVal=document.querySelector("#BXScore0").value;
        addedVal=parseInt(addedVal,10);
        incrementRegister(addedVal);
    }else if(third=="CX" && second[0]!="C"){
        if(!checkExists("CX",true)){
            alert("You don't have enough CX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("CX");
        let addedVal=document.querySelector("#CXScore0").value;
        addedVal=parseInt(addedVal,10);
        incrementRegister(addedVal);
    }else if(third=="DX" && second[0]!="D"){
        if(!checkExists("DX",true)){
            alert("You don't have enough DX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("DX");
        let addedVal=document.querySelector("#DXScore0").value;
        addedVal=parseInt(addedVal,10);
        incrementRegister(addedVal);
    }else if(third=="AX" && second[0]!="A"){
        if(!checkExists("AX",true)){
            alert("You don't have enough AX Words 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        decreaseFromTable("AX");
        let addedVal=document.querySelector("#AXScore0").value;
        addedVal=parseInt(addedVal,10);
        incrementRegister(addedVal);
    }else if(parseInt(third,10)){//He will move a number , so check that all text is only numbers
        third=parseInt(third,10);
        if(!checkExists(third,false)){
            alert("You don't have enough Decimal values 😭");
            playerExecuted=true;
            getNextTurn();
            return;
        }
        const moneyID="#P"+playerHistory0[activePlayer].code[0]+playerHistory0[activePlayer].code[1]+"3";
        let moneyValue=document.querySelector(moneyID).innerHTML;
        moneyValue=parseInt(moneyValue);
        moneyValue-=third;
        document.querySelector(moneyID).innerHTML=moneyValue;
        incrementRegister(third);
    }else{
        alert("invalid assembly code, Your Register Is Decremented By 25 😭");
        decrementRegister(25);
    }
    updateScoreValues();
    playerExecuted=true;
    getNextTurn();
}
//----------------------------------------------------------------------------------------------------//


//------------------------------------------Question Handeling--------------------------------------//
function displayQuestion(History){
    lastDisplayedQuestion=(Math.random()*questions.length);
    lastDisplayedQuestion=Math.floor(lastDisplayedQuestion);
    viewQuestionAudio.play();
    document.querySelector("#rollDice").hidden=true;
    document.querySelector("#questionSection").hidden=false;
    document.querySelector("#questionHeader").innerHTML="Team "+History[activePlayer].code[0]+History[activePlayer].code[1]+" Answer The Question";
    document.querySelector("#questionContent").innerHTML=questions[lastDisplayedQuestion].question;

    playerAnswered=false;
}

function checkPlayerAnswer(){
    if(playerAnswered){
        return;
    }
    var ans=document.getElementById("Answer").value;
    ans=ans.toLowerCase();
    if(ans==questions[lastDisplayedQuestion].answer.toLowerCase()){
        rightAnswerAudio.play();
        alert("Congratulations Correct Answer, Your Register Is Incremented By 25 🎉");
        incrementRegister(25);
    }else{
        wrongAnswerAudio.play();
        alert("Opps Wrong Answer, Your Register Is Decremented By 25 😭");
        decrementRegister(25);
    }
    document.querySelector("#questionSection").hidden=true;
    document.getElementById("Answer").value="";
    playerAnswered=true;
    getNextTurn();
}
//--------------------------------------------------------------------------------------------------------------//

function pickPlayerList(codeChar){
    console.log("code:"+codeChar);
    if(codeChar=="0"){
        return playerHistory0;
    }else if(codeChar=="1"){
        return playerHistory1;
    }else if(codeChar=="2"){
        return playerHistory2;
    }else if(codeChar=="3"){
        return playerHistory3;
    }
}

function checkCellType(Target,History){
    for(var i=0;i<traps.length;i++){//if it is a trap display a question for the activeplayer
        if(Routes[activePlayer][Target]==traps[i]){
            return displayQuestion(History);
        }
    }
    for(var i=0;i<treats.length;i++){//if it is a treat giva a treat to the activeplayer
        if(Routes[activePlayer][Target]==treats[i]){
            return giveTreat();
        }
    }
}

function giveValues(){//to add the dice value to the decimal of the player
    var num=document.querySelector("#"+playerHistory0[activePlayer].treatCell+"3").textContent;
    num=parseInt(num,10);
    num+=diceNumber;
    document.querySelector("#"+playerHistory0[activePlayer].treatCell+"3").textContent=num;
}

function giveTreat(){
    var num=document.querySelector("#"+playerHistory0[activePlayer].treatCell+playerHistory0[activePlayer].treatIndex).textContent;
    num++;
    document.querySelector("#"+playerHistory0[activePlayer].treatCell+playerHistory0[activePlayer].treatIndex).innerHTML=num;
    if(playerHistory0[activePlayer].treatIndex==2){
        playerHistory0[activePlayer].treatIndex=0;
    }else{
        playerHistory0[activePlayer].treatIndex++;
    }
}

function incrementRegister(incrementValue){
    var RegisterCode=playerHistory0[activePlayer].scoreID;
    var RegisterValue=RegisterCode+"0";//to get the id of the hidden input
    var Values=document.getElementById(RegisterValue).value;
    Values=parseInt(Values,10);
    Values+=incrementValue;
    document.getElementById(RegisterValue).value=Values;
    document.querySelector("#"+RegisterCode).innerHTML=" "+playerHistory0[activePlayer].scoreID[0]+playerHistory0[activePlayer].scoreID[1]+" = "+Values+" ";
    if(Values>=255){
        document.querySelector("#"+RegisterCode).classList.remove("fa-lock");
        document.querySelector("#"+RegisterCode).classList.add("fa-unlock");
    }
}

function decrementRegister(incrementValue){
    var RegisterCode=playerHistory0[activePlayer].scoreID;
    var RegisterValue=RegisterCode+"0";//to get the id of the hidden input
    var Values=document.getElementById(RegisterValue).value;
    Values=parseInt(Values,10);
    Values-=incrementValue;
    document.getElementById(RegisterValue).value=Values;
    document.querySelector("#"+RegisterCode).innerHTML=" "+playerHistory0[activePlayer].scoreID[0]+playerHistory0[activePlayer].scoreID[1]+" = "+Values+" ";
    if((Values+incrementValue)>=255){
        if(Values<255){
            document.querySelector("#"+RegisterCode).classList.remove("fa-unlock");
            document.querySelector("#"+RegisterCode).classList.add("fa-lock");
        }
    }
}

function updateScoreValues(){
    document.querySelector("#AXScore").innerHTML=" AX = "+document.querySelector("#AXScore0").value+" ";
    document.querySelector("#BXScore").innerHTML=" BX = "+document.querySelector("#BXScore0").value+" ";
    document.querySelector("#CXScore").innerHTML=" CX = "+document.querySelector("#CXScore0").value+" ";
    document.querySelector("#DXScore").innerHTML=" DX = "+document.querySelector("#DXScore0").value+" ";
}
