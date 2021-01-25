<div align="center">
  
<img src="screenshots\Start_Screen.png" alt="Website image">

</div>

<div align="center">
  
# 🏆 Registeredo
**Registeredo** is an educational game for assembly language inspired by famous Ludo game.

</div>

---
### 🧐 Game Idea:
#
**Registeredo** 
Game Teams:
Red Team has AX Register.
Yellow Team has BX Register.
Blue Team has CX Register.
Green Team has DX Register.
How to Start Game:
There will be in the top right screen an input & beside it a start button ,just enter in the input the number of the players “2 or 3 or 4” and then press the start button, to re start the game later press the re-start button which will appear as soon as you start the game.
Game Idea:
The game idea is nearly similar to ludo game in the movement where each player have four pieces of the same color “red or yellow or blue or green” , your main target is to send these four pieces from their home to the finish line which is the triangle ”let us call it the team register” with the same color of them the path of the pieces is defined better in the picture below.
You can move a particular piece from its place after rolling the dice by clicking on that piece or by clicking on the piece’s place in it’s home. To be able to move a piece out of your home you must get 1 or 6 on your dice, the players couldn’t reach to the register ”triangle” except when they have exactly the dice number needed to reach it “not greater” ,in the begging of the game all the registers is locked they can be unlocked in one case when they have a value in it more than 255 “ffh”, during the game you can choose to take your turn as to roll dice to move or to execute a command .


How to Execute Command: ”all commands number is in decimal only”
When you press on the command button an input field will appear to you , write in it the command you want to execute the command should be written in the write way as in assembly program & should be a valid command or your register will be decremented by 25 , the spaces isn’t considered an error ex:”MOVax,40” is valid.
Invalid Commands:
Let’s suppose that we are the red Team “has AX register” , we can’t mov/add/xchg into another register except AX in another way you must write your register “AX” as the second word in the command ex:
-MOV AX
-XCHG AX
-ADD AX
or it will be considered invalid command , meaningless commands also is considered invalid ex: XCHG ax,ax & MOV ax,ax , you can’t also type the same register in the command 2 times ex: Add ax,ax , last you should MOV/ADD positive values greater than zero only to your register.
Execute Command:
After typing the command in the input field press on the execute button in red.
Important Note regarding Commands:
You should have more than 0 of the words you use in your command code in your row of the table, for example if you have mov=1 & ax=1 & decimal=20 & add=0 & xchg=0 , it is ok to execute this command “mov ax,20” but you can’t execute this command “mov ax,30” or “add ax,20” , it isn’t invalid but it won’t be executed & you will lose your turn for nothing.
Take care also whenever you use a word in your command it will be decremented by 1 from your row in the table except the register value of your team which is always 1 , for example: lets say that you have this values in your row “ MOV=2 , AX=1, Decimal=40” after executing this command “MOV AX,20” the values in your row will become “MOV=1 ,AX=1, Decimal=20”.
Important Note about Movement:
The cell can have only one piece , you can step over your opponent and take his cell in that case your opponent piece will go back to it’s home & starts it’s path all over again but in case another piece of your team is in that cell you couldn’t step over it & you can’t move to that cell.
Also whenever you roll a dice the value of this dice will be added to your decimal value in the row of the table.
Cell Types:
White Cell:  is a regular cell nothing special about it.
Grey Cell: if any player move to, it he will get a treat which is increasing his “MOV or XCHG or ADD ” commands by 1 , the increasing is in order which means if it’s your 1st move to a grey cell you will have MOV command +1 then the next time XCHG command +1 until ADD command +1 and the cycle repeats.
Black Cell: it is a trap cell if you move to it , a question will be displayed to the screen & you have to answer it ,if you answered correctly your register will be incremented by 25 otherwise your register will be decremented by 25.
Protocol Of Answering Question:
You will have below the question an input field if the question starts with “T or F” so it’s a true or false question just read the question  & if the statement is true write in the input field the letter T otherwise write F , if the question starts with “write command” so you should write the command only required in the question in the input field without adding any extra spaces or characters.
Important Notes:
In case 2 players mode the red & yellow only will be available , in case 3 players mode the red & yellow & blue will be available , in case 4 players all colors will be available.


---
### ⛏️ Built Using:
#
- HTML
- CSS
- JavaScript

---

### 📷 Screenshots:
#
<img src="screenshots\Player_Win.png" alt="Website image">
<img src="screenshots\While_Playing.png" alt="Website image">
