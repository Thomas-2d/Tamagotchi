const readline = require('readline');
const logUpdate = require('log-update');
const { Stats } = require('fs');
const { between, generateRandomSpace, generateRightSpace} = require('./utils')

gonst rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


readline.emitKeypressEvents(process.stdin, rl);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

process.stdin.on('keypress', (character, key) => {
  switch (character) {
    case 'e':
    play()
    break;
  }

  switch(character) {
    case 'f': 
      donnerAManger()
      break;
  }
  
})

rl.on('close', () => {
    process.exit(0)
})

const state = {
  dead: false,
  life: 3,
  nourriture: 10,
  play: 10,
  time: 0 // temps en secondes

}

function donnerAManger() {
  if (state.nourriture === 9) {
    state.nourriture += 1
  } else if (state.nourriture === 8) {
    state.nourriture += 2
  } else if (state.nourriture < 8) {
    state.nourriture += 3
  }
}

function play() {
  if (state.play === 9) {
    state.play += 1
  } else if (state.play === 8) {
    state.play += 2
  } else if (state.play < 8) {
    state.play += 3
  }

  ball = '🏀';

  return generateRightSpace() + ball[Math.floor(Math.random() * ball.length)]
}

function body() {
  if (state.dead === false) {
      if (state.nourriture > 6) {
        bear = ['ʕ•ᴥ•ʔ']
      } else if (state.nourriture > 1 && state.nourriture< 5) {
        bear = ['ʕ·ᴥ·ʔ']
      } else if (state.nourriture < 1) {
        bear = ['ʕºᴥºʔ']
      }

    return generateRandomSpace() + bear[Math.floor(Math.random() * bear.length)]
  }

  return "⎧ᴿᴵᴾ⎫◟◟◟◟◟◟◟◟ ❀◟(ó ̯ ò, )"
}



const heart = [
  ' ♡ ',
  ' ❤ ',
  ' 💀 '
]

function getLife() {
  const total = 3
  let plein = state.life
  let vide = total - plein
  
  if (plein === 3) {
    life = [
      heart[1],
      heart[1],
      heart[1]
      ]
  } else if (plein === 2) {
    life = [
      heart[1],
      heart[1],
      heart[0]
      ]
  } else if (plein === 1) {
    life = [
      heart[1],
      heart[0],
      heart[0]
      ]
  } else {
    life = [
      ["You're DEAD"],
      heart[2]
    ]
    state.dead = true
  }
  return life
}

function getNourriture() {
  if (state.dead)
    return 
  }

  const barCompleteChar = '🍜'
  const barIncompleteChar = ' '
  
  const total = 10
  const plein = (state.nourriture *total)/10
  const vide = total - plein

  if (state.nourriture < 0) {
    state.life --
  }
  if (state.nourriture <= 0) {
    return "I'M HUNGRY"
  }
  return new Array(plein).fill(barCompleteChar).join('') + new Array(vide).fill(barIncompleteChar).join('') 
}

function getPlay() {
  if (state.dead) {
    return
  }

  const barCompleteChar = '🏀'
  const barIncompleteChar = ' '
  
  const total = 10
  const plein = (state.play *total)/10
  const vide = total - plein

  if (state.play < 0) {
    state.life --
  }
  if (state.play <= 0 && state.dead === false) {
    return "I WANT TO PLAY !"
  }
  return new Array(plein).fill(barCompleteChar).join('') + new Array(vide).fill(barIncompleteChar).join('') 
}

function giveFood() {
  if (state.dead === false) {
    return 'f pour me nourrir'
  }
}

setInterval(function() {
  const espace = [
    getLife().join(''),
    getNourriture(),
     ``, 
    getPlay(),
    ``,
    body(),
    ``,
    giveFood()
  ]

  logUpdate(espace.join('\n'))
}, 750)


setInterval(function() {  
  state.time += 1

  if (state.time % 3 === 0) {
    state.nourriture --
  }

  if (state.time % 5 === 0) {
    state.play --
  }
}, 1000)
