
//게임 캔버스 세팅
let game_canvas;
let ctx;
game_canvas = document.querySelector('#game_canvas canvas');
ctx = game_canvas.getContext("2d");
game_canvas.width = 600;
game_canvas.height = 700;
document.querySelector('#game_canvas').appendChild(game_canvas);

//스페이스바 스크롤 취소
document.addEventListener('keydown', function(event) {
	if (event.keyCode === 32) {
		// 스페이스바 이벤트 처리
		event.preventDefault();
	}
});


//이미지 불러오기
let backgroungImage, spaceshipImage, bulletImage, enemyImage, gameoverImage, bangImage;

//게임오버
let gameOver = false	//true이면 게임이 끝남, false이면 게임이 안끝남

//점수 변수 추가
let score = 0

//우주선 좌표
let spaceshipX = game_canvas.width/2-32;
let spaceshipY = game_canvas.height-90;
 
//총알 좌표
let bulletList = []	//총알들을 저장하는 리스트
function Bullet(){
	this.x = 0;
	this.y = 0;
	this.init = function(){		//좌표 초기화
		this.x = spaceshipX+32.5;
		this.y = spaceshipY-11;
		this.alive = true	//true면 살아있는 총알 false면 죽은 총알
			
		bulletList.push(this);	//리스트에 좌표 저장
	};
	this.update = function(){
		this.y -= 2;
	};
	
	//폭발 시간 변수
	this.explosionTime = null;
	
	this.checkHit = function(){
		for(let i = 0; i < enemyList.length; i++){
			if( this.y <= enemyList[i].y+15 && 
			    this.x >= enemyList[i].x && 
			    this.x <= enemyList[i].x + 50){
				//총알이 죽게됨 적군의 우주선이 없어짐, 점수 획득
				score++;
				this.alive = false;	//죽은 총알

				//폭발이 일어날 좌표 저장
				let explosionX = enemyList[i].x;
				let explosionY = enemyList[i].y;
				
				enemyList.splice(i, 1);
				this.explosionTime = Date.now();
			}
		}
		if (this.y <= 0) {
			this.alive = false;
		}
	}
}

//적군 x좌표 랜덤 생성 함수
function generateRandomValue(min, max){
	let randomNum = Math.floor(Math.random()*(max-min+1)) 	//0~1랜덤한수 반환
	return randomNum;
}

//적군 만들기 함수
let enemyList = []
function Enemy(){
	this.x = 0;
	this.y = 0;
	this.init = function(){
		this.y = 0;
		this.x = generateRandomValue(0, game_canvas.width-50);
		enemyList.push(this);
	};
	this.update = function(){
		this.y += 0.5;
		if(this.y >= game_canvas.height - 50) {
			gameOver = true;
		}
	};
}

//적군 몇초에 생성할지 조건 함수
let time = 4000;
let interval;

function createEnemy(){
	if (interval) clearInterval(interval);
	interval = setInterval(function(){
		let e = new Enemy()
		e.init();
	}, time);
	
	setTimeout(function(){
		time *= 2/3;
		createEnemy();
	}, 10000);
}

//사용할 그림들 불러오기 
function loadImage(){
	spaceshipImage = new Image();
	spaceshipImage.src = "/image/game_images/space-fighter.png";
	
	bulletImage = new Image();
	bulletImage.src = "/image/game_images/bullet.png";
	
	gameoverImage = new Image();
	gameoverImage.src = "/image/game_images/gameover.png";
	
	enemyImage = new Image();
	enemyImage.src = "/image/game_images/enemy.png";
	
	bangImage = new Image();
	bangImage.src = "/image/game_images/bang.png";
	
}

//키보드 입력 함수
let keysDown={}
function setupKeyboardListener(){
	document.addEventListener('keydown', function(event){
		
		keysDown[event.keyCode] = true;
		console.log('누른 키보드코드 :', keysDown);
	});
	document.addEventListener('keyup', function(event){
		delete keysDown[event.keyCode];
		
		if(event.keyCode == 32){
			createBullet();	//총알 생성
		}
	});
}

//우주선 좌표값 실시간 업데이트
function update(){
	if(39 in keysDown){
		spaceshipX += 3;
		if(spaceshipX > 520){
			spaceshipX = 520;
		}
	}
	if(37 in keysDown){
		spaceshipX += -3;
		if(spaceshipX < 0){
			spaceshipX = 0;
		}
	}
	//우주선의 좌표값이 무한대로 업데이트가 되는게아닌! 맵안에서만
	
	//총알의 y좌표 업데이트하는 함수 호출
	for(let i = 0; i < bulletList.length; i++){
		if(bulletList[i].alive){
			bulletList[i].update();
			bulletList[i].checkHit();	
		}
	}
	
	//적군 y좌표 업데이트하는 함수 호출
	for(let i = 0; i < enemyList.length; i++){
		enemyList[i].update();
	}
}

//총알 생성 함수
function createBullet(){
	let b = new Bullet()	//총알생성해서 b에 저장
	b.init();
}



//ui그려주기
function render(){
	ctx.clearRect(0,0, game_canvas.width, game_canvas.height);
	ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
	ctx.fillText(`Score:${score}`, 20, 40);
	ctx.fillStyle = "white";
	ctx.font = "24px Arial";
	for(let i = 0; i < bulletList.length; i++){
		//폭발 그림 그리기
		if (bulletList[i].explosionTime != null) {
			// 폭발 이후 500ms가 지나면 폭발 이미지 그리지 않음
			if (Date.now() - bulletList[i].explosionTime <= 500) {
				ctx.drawImage(bangImage, bulletList[i].x, bulletList[i].y);
			} else {
				bulletList[i].explosionTime = null;
			}
		}
		//총알이 살아있을때 업데이트되는 좌표대로 계속 그려주기
		if(bulletList[i].alive){
			let bullet = bulletList[i];
			ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
			if (!bullet.alive) {
				bulletList.splice(i, 1);
				i--;
			}	
		}
	}
	for(let i = 0; i < enemyList.length; i++){
		ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
	}
}

//게임 이미지 계속 로드하기
function main(){
	if (!gameOver) {
		update();	//좌표값을 업데이트
		render();	//그려주기
		requestAnimationFrame(main);
	}
	else{
		ctx.drawImage(gameoverImage, 55, 100, 500, 500);
	}
}

loadImage();
setupKeyboardListener();
createEnemy();
main();


//총알 만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알이 발사 = 총알의 y값이 --, 총알의 x값은? 
//	스페이스를 누른 순간의 우주선의 x좌표
//3. 발사된 총알들은 총알 배열에 저장을 한다
//4. 총알들은 x,y좌표값이 있어야 한다.
//5. 총알 배열을 가지고 render 그려준다.


//적군 만들기
//그림, x좌표, y좌표, init, update
//적군은 위치가 랜덤하다
//적군은 밑으로 내려온다
//1초마다 하나씩 적군이 나온다
//적군의 우주선이 바닥에 닿으면 게임오버
//적군과 총알이 만나면 우주선이 사라진다 점수 1점 획득


//적군이 죽는다
//총알.y <= 적군.y AND
//총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이
//닿으면
//적군과 총알이 없어지고 점수 1점 획득
