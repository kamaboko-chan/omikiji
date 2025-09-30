// JavaScript

const fortunes = [
  "中吉", "小吉", "吉", "末吉", "凶", "大凶"
];

function getFortune() {
  if (Math.random() < 0.1) {
    return "大吉";
  } else {
    return fortunes[Math.floor(Math.random() * fortunes.length)];
  }
}

const drawButton = document.getElementById('drawButton');
const resultDisplay = document.getElementById('resultDisplay');

function showBigMessage(text, color, shadow) {
  const bigMsg = document.createElement('div');
  bigMsg.textContent = text;
  bigMsg.style.position = 'fixed';
  bigMsg.style.top = '50%';
  bigMsg.style.left = '50%';
  bigMsg.style.transform = 'translate(-50%, -50%)';
  bigMsg.style.fontSize = '4rem';
  bigMsg.style.fontWeight = 'bold';
  bigMsg.style.color = color;
  bigMsg.style.textShadow = shadow;
  bigMsg.style.zIndex = 10000;
  bigMsg.style.pointerEvents = 'none';
  bigMsg.style.opacity = '0';
  bigMsg.style.transition = 'opacity 0.4s';
  document.body.appendChild(bigMsg);

  setTimeout(() => {
    bigMsg.style.opacity = '1';
  }, 100);

  setTimeout(() => {
    bigMsg.style.opacity = '0';
    setTimeout(() => bigMsg.remove(), 600);
  }, 3000);
}

function celebrateDaikichi() {
  // 紙吹雪
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-40px';
    confetti.style.width = '12px';
    confetti.style.height = '12px';
    confetti.style.background = `hsl(${Math.random()*360},80%,60%)`;
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = 9999;
    confetti.style.opacity = 0.8;
    confetti.style.pointerEvents = 'none';
    confetti.style.transition = 'top 1.2s linear, opacity 1.2s linear';
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.style.top = '80vh';
      confetti.style.opacity = 0;
    }, 50);

    setTimeout(() => {
      confetti.remove();
    }, 1300);
  }
  showBigMessage("🎉 幸運到来！ 🎉", "#d4af37", "2px 2px 12px #fff, 0 0 24px #b71c1c");
}

function celebrateBad(fortune) {
  document.body.classList.add('shake');
  document.body.style.background = '#333';
  resultDisplay.style.color = '#fff';
  let msg = "";
  let color = "#fff";
  let shadow = "2px 2px 12px #b71c1c, 0 0 24px #333";
  if (fortune === "凶") {
    msg = "⚡ 要注意！ ⚡";
  } else {
    msg = "💀 大ピンチ！ 💀";
  }
  showBigMessage(msg, color, shadow);
  setTimeout(() => {
    document.body.classList.remove('shake');
    document.body.style.background = '';
    resultDisplay.style.color = '';
  }, 1200);
}

function celebrateGood(fortune) {
  resultDisplay.style.transition = 'box-shadow 0.5s';
  resultDisplay.style.boxShadow = '0 0 24px 8px #ffe082';
  let msg = "";
  let color = "";
  let shadow = "";
  switch (fortune) {
    case "中吉":
      msg = "🌸 今日は絶好調！ 🌸";
      color = "#ff9800";
      shadow = "2px 2px 12px #fff, 0 0 24px #ff9800";
      break;
    case "小吉":
      msg = "🍀 ちょっとラッキー！ 🍀";
      color = "#4caf50";
      shadow = "2px 2px 12px #fff, 0 0 24px #4caf50";
      break;
    case "吉":
      msg = "😊 平和な一日！ 😊";
      color = "#2196f3";
      shadow = "2px 2px 12px #fff, 0 0 24px #2196f3";
      break;
    case "末吉":
      msg = "🌱 これからに期待！ 🌱";
      color = "#9c27b0";
      shadow = "2px 2px 12px #fff, 0 0 24px #9c27b0";
      break;
  }
  showBigMessage(msg, color, shadow);
  setTimeout(() => {
    resultDisplay.style.boxShadow = '';
  }, 1200);
}

drawButton.addEventListener('click', () => {
  drawButton.disabled = true;
  let times = 0;
  let interval = 30;
  let maxTimes = 15;
  let finalFortune = "";

  function roulette() {
    finalFortune = getFortune();
    resultDisplay.textContent = finalFortune;
    times++;
    interval += 5;
    if (times < maxTimes) {
      setTimeout(roulette, interval);
    } else {
      setTimeout(() => {
        if (finalFortune === "大吉") {
          resultDisplay.textContent = "大吉";
          celebrateDaikichi();
        } else if (finalFortune === "凶" || finalFortune === "大凶") {
          resultDisplay.textContent = finalFortune;
          celebrateBad(finalFortune);
        } else {
          resultDisplay.textContent = finalFortune;
          celebrateGood(finalFortune);
        }
        drawButton.disabled = false;
      }, 2000);
    }
  }
  roulette();
});

// CSS（style.css）に追加してください
/*
.shake {
  animation: shake 0.4s 3;
}
@keyframes shake {
  0% { transform: translate(0, 0);}
  20% { transform: translate(-10px, 0);}
  40% { transform: translate(10px, 0);}
  60% { transform: translate(-10px, 0);}
  80% { transform: translate(10px, 0);}
  100% { transform: translate(0, 0);}
}
*/