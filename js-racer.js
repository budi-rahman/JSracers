/**
 * ALGORITMA
 * 1. Gambar sesuai posisi di history
 * 2. Roll dadu dan tambahkan ke player yang bergerak
 * 3. Update Player
 * 4. Delay + Hapus
 * 5. Gambar lagi posisi di history yang baru
 * 6. Minimal Player adalah 2
 * 7. Minimal panjang Lintasan adalah 15
 * 8. Argv -----------> node js-racer.js 6 15
 * 
 */

"use strict"

function diceRoll () {
  let roll = Math.ceil(Math.random()*6)
  return roll
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function printBoard (Player, arrName, circiut) {
  let result = ''
  for (let i = 0; i < Player; i++) {
    result += printLine(arrName[i][0],arrName[i][1], circiut) + '\n'
  }
  return result
}

function printLine (player, pos, circuits) {
  let temp =''
  for (let i = 0; i < circuits; i++) {
    if (i == pos) {
      temp += `|${player}`
    }else{
      temp += `| `
    }
  }
  return temp
}

function advance (player, nextRoll, circuit) {
  for (let i = 0; i < player.length; i++) {
    if (i == nextRoll){
      player[i][1] += diceRoll()
    }  
    if (player[i][1] > circuit-1) {
      player[i][1] = circuit-1
    }

  }
  return player
}

function finished (player, finish) {
  for (let i = 0; i < player.length; i++) {
  
    if(player[i][1] >= finish-1) return true
  }
  return false
}

function winner (player) {
  let win = -Infinity
  let win2
  for (let i = 0; i < player.length; i++) {
    if(player[i][1] > win){
      win = player[i][1]
      win2 = player[i][0]
    } 
  }
  return `Congratulation ${win2} You're Winner!`
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function play(){
  let input = process.argv.slice(2)
  let players = Number(input[0])
  let circuit = Number(input[1])
  let namePlayer = name(players)

      if(players < 2) return `Jumlah pemain minimal 2!`
      if(circuit < 15) return `Panjang Lintasan minimal 15!`

  console.log(printBoard(players, namePlayer, circuit));

  sleep (100)
  clearScreen()

  let giliran = 0

  while (!finished(namePlayer, circuit)) {   

    namePlayer = advance(namePlayer, giliran, circuit)
    giliran++

    clearScreen()
    console.log(printBoard(players, namePlayer, circuit))
    sleep(100)

        if (giliran > namePlayer.length) giliran = 0     
  }
  return winner(namePlayer)
}


function name(players) {
  let alphabets = 'abcdefghijklmnopqrstuvwxyz'
  let temp = []
  for(let i = 0; i < players; i++){
    let outFirst = []
    outFirst.push(alphabets[i], 0)
    temp.push(outFirst)
  }
  return temp
}
console.log(play())