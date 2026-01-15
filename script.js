// 最初に表示する名前入力画面
window.onload = function () {
	document.getElementById("gameArea").innerHTML = `
	<h2>ようこそ！</h2>
	<p>あなたの名前を入力してください :</p>
	<input type="text" id="playerNameInput" placeholder="名前を入力">
	<br><br>
	<button onclick="startGame()">ゲームを始める</button>
	`;
};

let playerName = "あなた";

function startGame() {
	const inputBox = document.getElementById("playerNameInput");
	//名前入力欄がある画面の時だけ読み取る
	if (inputBox) {
		const input = inputBox.value;
		if (input.trim() !== "") {
			playerName = input;
		}
	}
	document.getElementById("gameArea").innerHTML = `
	<h2>こんにちは、${playerName}さん！</h2>
	<p>遊びたいゲームを選んでね</p>
	<button onclick="jankenGame()">じゃんけんゲーム</button>
	<button class="dice" onclick="diceGame()">さいころゲーム</button>
	<button onclick="slotGame()">スロットゲーム</button>
	<button onclick="endGame()">終了</button>
	`;
}



/*じゃんけんゲーム画面を表示する*/
function jankenGame() {
	document.getElementById("gameArea").innerHTML = `
		<h2>じゃんけんゲーム</h2>
		<button class="janken" onclick="playJanken('グー')">グー</button>
		<button class="janken" onclick="playJanken('チョキ')">チョキ</button>
		<button class="janken" onclick="playJanken('パー')">パー</button>

		<button class="janken" onclick="resetJanken()">リセット</button>
		<button class="janken" onclick="startGame()">メニューに戻る</button>

		<div id="jankenResult" class="result-box">結果がここに表示されます</div>
	`;
}

/*勝敗履歴のカウント用変数*/
let winCount = 0;
let loseCount = 0;
let drawCount = 0;

/*じゃんけんゲームの中身*/
function judgeJanken(player, computer) {
	if (player === computer) {
		return "あいこ";
	} else if (
		(player === "グー" && computer === "チョキ") ||
		(player === "チョキ" && computer === "パー") ||
		(player === "パー" && computer === "グー")
		) {
		return "勝ち"
	} else {
		return "負け";
	}
}
function playJanken(playerHand) {
	const hands = ["グー", "チョキ", "パー"];
	const computerHand = hands[Math.floor(Math.random() * 3)];

	// 判定だけを関数に任せる
const result = judgeJanken(playerHand, computerHand);

//カウント処理
if (result === "あいこ") {
	drawCount++;
} else if (result === "勝ち") {
	winCount++;
} else {
	loseCount++;
}
 //結果表示
	document.getElementById("jankenResult").innerHTML =
`<strong>${playerName}: ${playerHand}</strong><br>
コンピュータ: ${computerHand}<br>
結果: <strong>${result}</strong><br>
勝ち: ${winCount}回 / 負け: ${loseCount}回 / あいこ: ${drawCount}回`

const resultBox = document.getElementById("jankenResult");

//まず全部の色クラスを消す
resultBox.classList.remove("result-win", "result-lose", "result-draw");

//結果に応じて色をつける
if (result === "勝ち") {
	resultBox.classList.add("result-win");
} else if (result === "負け") {
	resultBox.classList.add("result-lose");
} else {
	resultBox.classList.add("result-draw");
}
}

//リセットボタン
function resetJanken() {
	winCount = 0;
	loseCount = 0;
	drawCount = 0;

	document.getElementById("jankenResult").textContent =
			"履歴をリセットしました！";
}

/*サイコロゲーム画面を表示*/
function diceGame() {
	document.getElementById("gameArea").innerHTML = `
		<h2>さいころゲーム</h2>
		<button class="dice" onclick="playDice()">サイコロを振る</button>

		<button class="dice" onclick="resetDice()">リセット</button>
		<button class="dice" onclick="startGame()">メニューに戻る</button>

		<div id="dice1">サイコロ1: </div>
		<div id="dice2">サイコロ2: </div>
		<div id="total" class="result-box">合計: </div>
	`;
}

let luckySeven = 0;
let doubleCount = 0;

/*サイコロを振る処理*/
function playDice() {
	const dice1Box = document.getElementById("dice1");
	const dice2Box = document.getElementById("dice2");
	const resultBox = document.getElementById("total");

//アニメーション開始
	dice1Box.classList.add("dice-rolling");
	dice2Box.classList.add("dice-rolling");

	let rollCount = 0;
	const rollInterval = setInterval(() => {
	
	dice1Box.textContent = "サイコロ1: " + (Math.floor(Math.random() * 6) + 1);
	dice2Box.textContent = "サイコロ2: " + (Math.floor(Math.random() * 6) + 1);
	rollCount++;
}, 50);

//0.6秒後に本当の結果を表示
	setTimeout(() => {
		clearInterval(rollInterval);

//本当の結果
		const dice1 = Math.floor(Math.random() * 6) + 1;
		const dice2 = Math.floor(Math.random() * 6) + 1;
		const total = dice1 + dice2;

		


//アニメーション終了
		dice1Box.classList.remove("dice-rolling");
		dice2Box.classList.remove("dice-rolling");

	

/*結果を画面に表示する*/
	/*document.getElementById("dice1").textContent = "サイコロ1: " + dice1;
	document.getElementById("dice2").textContent = "サイコロ2: " + dice2;*/


//まず色クラスを全部消す
resultBox.classList.remove("dice-lucky", "dice-double", "dice-normal");

	let message = "";

/*特別メッセージを追加*/
	if (total === 7) {
		luckySeven++;
		message = `合計: ${total} 🎉ラッキーセブン！`;
		resultBox.classList.add("dice-lucky");
	} else if (dice1 === dice2) {
		doubleCount++;
		message = `合計: ${total} ✨ゾロ目！`;
		resultBox.classList.add("dice-double");
	} else {
		message = `合計: ${total}`;
		resultBox.classList.add("dice-normal");
	}

	/*履歴を表示*/
	document.getElementById("total").innerHTML =
`<strong>${message}</strong><br>
🎉ラッキーセブン: ${luckySeven}回 / ✨ゾロ目: ${doubleCount}回`;
}, 600)
;}

function resetDice() {
	luckySeven = 0;
	doubleCount = 0;

	document.getElementById("total").textContent =
	"履歴をリセットしました！";
}
/*終了画面を表示*/
function endGame() {
	document.getElementById("gameArea").innerHTML = `
		<h2>遊んでくれてありがとう！</h2>
	`;
}

function slotGame() {
	document.getElementById("gameArea").innerHTML =`
		<h2>スロットマシーン</h2>

		<div id="slotArea">
			<div class="reel" id="reel1"></div>
			<div class="reel" id="reel2"></div>
			<div class="reel" id="reel3"></div>
		</div>

		<button onclick="playSlot()">回す！</button>
		<button onclick="startGame()">メニューに戻る</button>

		<div id="slotResult" class="result-box">結果がここに表示されます</div>


	`;
}

function playSlot() {
	const resultBox = document.getElementById("slotResult");
	const reelsymbols=["🍒","🔔","🍉","🍇","7️⃣"];

	//リールの中身を作る関数
	function createReelContent() {
		let html = "";
		for (let i=0; i < 30; i++) {
			html += `<div>${reelsymbols[i % reelsymbols.length]}</div>`;
		}
		return html+html;
	}

	//リールに中身をセットする
	const reel1=document.getElementById("reel1");
	const reel2=document.getElementById("reel2");
	const reel3=document.getElementById("reel3");

reel1.innerHTML=`<div class="reel-inner">${createReelContent()}</div>`;
reel2.innerHTML=`<div class="reel-inner">${createReelContent()}</div>`;
reel3.innerHTML=`<div class="reel-inner">${createReelContent()}</div>`;

const inner1=reel1.querySelector(".reel-inner");
const inner2=reel2.querySelector(".reel-inner");
const inner3=reel3.querySelector(".reel-inner");

//ランダム停止位置
const stop1=Math.floor(Math.random()*reelsymbols.length);
const stop2=Math.floor(Math.random()*reelsymbols.length);
const stop3=Math.floor(Math.random()*reelsymbols.length);

//回転アニメーション
inner1.style.transition="transform 0.5s linear";
inner1.style.transform="translateY(-2000px)";

setTimeout(()=> {
	inner1.style.transition="none";
	inner1.style.transform="translateY(0px)";
},500);

setTimeout(()=> {
	inner1.style.transition="transform 0.6s ease-out";
	inner1.style.transform=`translateY(-${stop1*60}px)`;
	inner1.classList.add("stop-bounce");
	setTimeout(()=>inner1.classList.remove("stop-bounce"),300);
},550);

setTimeout(()=> {
inner2.style.transition="transform 0.5s linear";
inner2.style.transform="translateX(-2000px)";
},150);

setTimeout(()=> {
	inner2.style.transition="none";
	inner2.style.transform="translateY(0px)";
},650);

setTimeout(()=> {
	inner2.style.transition="transform 0.6s ease-out";
	inner2.style.transform=`translateY(-${stop2*60}px)`;
	inner2.classList.add("stop-bounce");
	setTimeout(()=>inner2.classList.remove("stop-bounce"),300);
},700);

setTimeout(()=> {
inner3.style.transition="transform 0.5s linear";
inner3.style.transform="translateY(-2000px)";
},300);

setTimeout(()=> {
	inner3.style.transition="none";
	inner3.style.transform="translateX(0px)";
},800);

setTimeout(()=> {
	inner3.style.transition="transform 0.6s ease-out";
	inner3.style.transform=`translateY(-${stop3*60}px)`;
	inner3.classList.add("stop-bounce");
	setTimeout(()=>inner3.classList.remove("stop-bounce"),300);
},850);

//結果判定（最後のリールが止まった後）
setTimeout(()=> {
	const n1=reelsymbols[stop1];
	const n2=reelsymbols[stop2];
	const n3=reelsymbols[stop3];

	if(n1===n2 && n2===n3) {
		resultBox.textContent="🎉大当たり！3つ揃った！";
		resultBox.classList.add("slot-win");

		//リールを光らせる
		reel1.classList.add("flash");
		reel2.classList.add("flash");
		reel3.classList.add("flash");

		//1.5秒後に光を消す
		setTimeout(()=>{
			reel1.classList.remove("flash");
			reel2.classList.remove("flash");
			reel3.classList.remove("flash");
		},1500);

	}else {
		resultBox.textContent="残念...もう一度挑戦！";
		resultBox.classList.remove("slot-win");
	}
},1300);
}
	
