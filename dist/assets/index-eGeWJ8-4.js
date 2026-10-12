(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>new Promise(t=>setTimeout(t,e)),t=e=>new Promise(t=>{let n=()=>{requestAnimationFrame(()=>{e-->0?n():t(null)})};n()}),n=e=>{for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e},r=(e,t)=>{let n=[0,1,2,3,4,5,6,7,8,9,10],r=n.length,i=n.slice(0,e>1?r-1:r);return t&&(i[0]=1),i},i=(e,t,i=!0)=>{let a=e[e.length-1],o=[],s=t===1?11:10;for(let e=0;e<t;e++){let a=r(t,t>1&&e===0);i&&n(a),o.push(a)}let c=[];for(let e=0;e<s;e++){let n=0;for(let r=0;r<t;r++)n=n*10+o[r][e];c.push(n)}c[0]===a&&c.reverse(),e.splice(e.length,0,...c)},a=[``,`หนึ่ง`,`สอง`,`สาม`,`สี่`,`ห้า`,`หก`,`เจ็ด`,`แปด`,`เก้า`],o=[``,`สิบ`,`ร้อย`,`พัน`,`หมื่น`];function s(e){if(!Number.isInteger(e)||e<0||e>99999)throw RangeError(`Input must be an integer between 0 and 9999`);if(e===0)return`ศูนย์`;let t=String(e).split(``).map(Number),n=t.length,r=``;return t.forEach((e,t)=>{let i=n-1-t;e!==0&&(r+=i===0?e===1&&n>1?`เอ็ด`:a[e]:i===1?e===1?`สิบ`:e===2?`ยี่สิบ`:a[e]+`สิบ`:(e===1?``:a[e])+o[i])}),r}var c=`<div class="learn">
	<div class="menu">
		<button type="button" class="back-button">
			<svg class="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<title>Menu</title>
	        	<path d="M19 12H5M12 19l-7-7 7-7"/>
      		</svg>
      		<span>Main Menu</span>
		</button>
	</div>
	<h1>Learn</h1>
	<div class="output"></div>
	<legend>
		Delay <input type="checkbox" id="listenFirst" />
	</legend>

	<div class="navigation">
		<button type="button" class="again">
			<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
				<title>Listen again</title>
				<path d="M1 4v6h6M23 20v-6h-6"/>
				<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
			</svg>
			<span>Listen again</span>
		</button>
		<button type="button" class="previous">
			<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
				<title>Previous</title>
          		<path d="M15 18l-6-6 6-6"/>
        	</svg>
			<span>Prev</span>
		</button>
		<button type="button" class="next">
			<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
				<title>Next</title>
				<path d="M9 18l6-6-6-6"/>
			</svg>
			<span>Next</span>
		</button>
	</div>

</div>`,l=class{container;level;speaker;element;backButtonHandler;currentNumberIndex=0;numbers=[];againButton;nextButton;previousButton;output;listenFirst;changeSettings;constructor(e,t,n,r,a,o){this.container=e,this.backButtonHandler=t,this.level=n,this.speaker=r,this.listenFirst=a.listenFirst,this.changeSettings=o,this.element=document.createElement(`div`),this.element.innerHTML=c,this.againButton=this.element.querySelector(`.learn .navigation .again`),this.previousButton=this.element.querySelector(`.learn .navigation .previous`),this.nextButton=this.element.querySelector(`.learn .navigation .next`),this.output=this.element.querySelector(`.output`),this.bindButtonEvents(),i(this.numbers,this.level,this.level>1),this.currentNumberIndex=0,setTimeout(this.next.bind(this),300)}async mount(){this.container.appendChild(this.element),await t(2),this.element.classList.add(`visible`),await e(300)}async unmount(){this.element.classList.remove(`visible`),await e(300),this.container.removeChild(this.element),await t(1)}async sayCurrentNumber(){let e=this.numbers[this.currentNumberIndex];return this.speaker.say(s(e),`thai`)}async showCurrentNumber(){let e=this.numbers[this.currentNumberIndex];return this.output.innerHTML=e.toString(10),this.output.classList.add(`visible`),Promise.resolve()}async hideCurrentNumber(){this.output.classList.remove(`visible`),await e(300),this.output.innerHTML=``}async next(){this.disableButtons(),await this.hideCurrentNumber(),await e(300),await this.showCurrentNumber(),this.listenFirst&&await e(500+this.level*400),await this.sayCurrentNumber(),this.enableButtons()}disableButtons(){this.againButton.disabled=!0,this.nextButton.disabled=!0,this.previousButton.disabled=!0}enableButtons(){this.againButton.disabled=!1,this.nextButton.disabled=!1,this.previousButton.disabled=!1}bindButtonEvents(){this.element.querySelector(`.back-button`).addEventListener(`click`,()=>this.backButtonHandler()),this.againButton.addEventListener(`click`,async()=>{this.disableButtons(),await this.sayCurrentNumber(),this.enableButtons()}),this.previousButton.addEventListener(`click`,()=>{this.currentNumberIndex!==0&&(--this.currentNumberIndex,this.next())}),this.nextButton.addEventListener(`click`,()=>{this.currentNumberIndex>=this.numbers.length-1&&i(this.numbers,this.level),this.currentNumberIndex+=1,this.next()});let e=this.element.querySelector(`#listenFirst`);e.checked=this.listenFirst,e.addEventListener(`change`,()=>{this.listenFirst=e.checked,this.changeSettings(`listenFirst`,this.listenFirst)})}},u=[`__บาทค่ะ`,`ราคา__บาทค่ะ`,`__บาทเองค่ะ`,`ลดเหลือ__บาทค่ะ`,`ถุงละ__บาทค่ะ`,`กิโลละ__บาทค่ะ`,`อันเดียว__บาทค่ะ`,`เอา__บาทค่ะ`,`__บาทได้ไหมคะ`,`แพงไป __ได้ไหมคะ`,`ขอ__ลูกค่ะ`,`ขอ__ไม้ค่ะ`,`ขอ__ถุงค่ะ`,`เหลือ__ชิ้นค่ะ`,`มีแบงค์__ไหมคะ`,`รออีก__นาทีนะคะ`],d=0,f=e=>{let t=u[d];return t=t.replace(`__`,e),t},p=()=>{d=(d+1)%u.length},m=`<div class="listen">
	<button type="button" class="back-button">
		<svg class="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
			stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<title>Menu</title>
			<path d="M19 12H5M12 19l-7-7 7-7" />
		</svg>
		<div>Main Menu</div>
	</button>

	<div class="output"></div>
	<legend>
		Use in sentence <input type="checkbox" id="sentence" />
		Speak slower <input type="checkbox" id="slow" />
	</legend>
	<div class="numpad">
		<button type="button" data-key="7"><span>7</span></button>
		<button type="button" data-key="8"><span>8</span></button>
		<button type="button" data-key="9"><span>9</span></button>
		<button type="button" data-key="4"><span>4</span></button>
		<button type="button" data-key="5"><span>5</span></button>
		<button type="button" data-key="6"><span>6</span></button>
		<button type="button" data-key="1"><span>1</span></button>
		<button type="button" data-key="2"><span>2</span></button>
		<button type="button" data-key="3"><span>3</span></button>
		<button type="button" class="icon repeat" data-key="Repeat" aria-label="Repeat">
			<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
			<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<title>Repeat</title>
				<path d="M18.357 1.61413C18.5701 1.25895 19.0308 1.14378 19.386 1.35689L19.0001 2.00001C19.386 1.35689 19.3857 1.35668 19.386 1.35689L19.3874 1.35772L19.389 1.35867L19.3927 1.36093L19.4023 1.36684C19.4096 1.37142 19.4189 1.37726 19.4299 1.38438C19.4519 1.39861 19.481 1.41798 19.5162 1.44261C19.5865 1.49183 19.6815 1.56234 19.7928 1.65509C20.0149 1.84018 20.3053 2.11667 20.5946 2.49272C21.1775 3.25046 21.7501 4.40735 21.7501 6.00001C21.7501 7.59266 21.1775 8.74955 20.5946 9.50729C20.3053 9.88334 20.0149 10.1598 19.7928 10.3449C19.6815 10.4377 19.5865 10.5082 19.5162 10.5574C19.481 10.582 19.4519 10.6014 19.4299 10.6156C19.4189 10.6228 19.4096 10.6286 19.4023 10.6332L19.3927 10.6391L19.389 10.6413L19.3874 10.6423C19.3871 10.6425 19.386 10.6431 19.0001 10L19.386 10.6431C19.0308 10.8562 18.5701 10.7411 18.357 10.3859C18.1448 10.0322 18.2581 9.57388 18.6098 9.35959L18.6153 9.35606C18.6226 9.35134 18.6365 9.3422 18.656 9.32855C18.695 9.30121 18.7563 9.25609 18.8325 9.19259C18.9854 9.06518 19.1949 8.86667 19.4057 8.59272C19.8228 8.05046 20.2501 7.20735 20.2501 6.00001C20.2501 4.79266 19.8228 3.94955 19.4057 3.40729C19.1949 3.13334 18.9854 2.93483 18.8325 2.80742C18.7563 2.74393 18.695 2.6988 18.656 2.67146C18.6365 2.65781 18.6226 2.64867 18.6153 2.64396L18.6098 2.64043C18.2581 2.42614 18.1448 1.96783 18.357 1.61413Z" fill="#1C274C"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0001 1.25001C7.37678 1.25001 5.25013 3.37665 5.25013 6.00001C5.25013 8.62336 7.37678 10.75 10.0001 10.75C12.6235 10.75 14.7501 8.62336 14.7501 6.00001C14.7501 3.37665 12.6235 1.25001 10.0001 1.25001ZM6.75013 6.00001C6.75013 4.20508 8.20521 2.75001 10.0001 2.75001C11.7951 2.75001 13.2501 4.20508 13.2501 6.00001C13.2501 7.79493 11.7951 9.25001 10.0001 9.25001C8.20521 9.25001 6.75013 7.79493 6.75013 6.00001Z" fill="#1C274C"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0001 12.25C7.68658 12.25 5.55506 12.7759 3.97558 13.6643C2.41962 14.5396 1.25013 15.8661 1.25013 17.5L1.25007 17.602C1.24894 18.7638 1.24752 20.222 2.52655 21.2635C3.15602 21.7761 4.03661 22.1407 5.22634 22.3815C6.4194 22.623 7.97436 22.75 10.0001 22.75C12.0259 22.75 13.5809 22.623 14.7739 22.3815C15.9637 22.1407 16.8443 21.7761 17.4737 21.2635C18.7527 20.222 18.7513 18.7638 18.7502 17.602L18.7501 17.5C18.7501 15.8661 17.5807 14.5396 16.0247 13.6643C14.4452 12.7759 12.3137 12.25 10.0001 12.25ZM2.75013 17.5C2.75013 16.6487 3.37151 15.7252 4.71098 14.9717C6.02693 14.2315 7.89541 13.75 10.0001 13.75C12.1049 13.75 13.9733 14.2315 15.2893 14.9717C16.6288 15.7252 17.2501 16.6487 17.2501 17.5C17.2501 18.8078 17.2098 19.544 16.5265 20.1004C16.156 20.4022 15.5366 20.6967 14.4763 20.9113C13.4194 21.1252 11.9744 21.25 10.0001 21.25C8.02591 21.25 6.58087 21.1252 5.52393 20.9113C4.46366 20.6967 3.84425 20.4022 3.47372 20.1004C2.79045 19.544 2.75013 18.8078 2.75013 17.5Z" fill="#1C274C"/>
				<path d="M17.386 3.35689C17.0308 3.14378 16.5701 3.25895 16.357 3.61413L16.6052 4.63763L16.613 4.64295C16.6247 4.65115 16.6469 4.66736 16.6762 4.6918C16.7354 4.74108 16.8199 4.82084 16.9057 4.93229C17.0728 5.14955 17.2501 5.49266 17.2501 6.00001C17.2501 6.50735 17.0728 6.85046 16.9057 7.06772C16.8199 7.17917 16.7354 7.25893 16.6762 7.30822C16.6469 7.33265 16.6247 7.34887 16.613 7.35707L16.6052 7.36238C16.2571 7.57784 16.1457 8.03372 16.357 8.38588C16.5701 8.74106 17.0308 8.85624 17.386 8.64313L17.0001 8.00001C17.386 8.64313 17.3857 8.64333 17.386 8.64313L17.3873 8.64232L17.3888 8.64145L17.3919 8.63953L17.3994 8.63493L17.4186 8.62272C17.4333 8.61322 17.4517 8.60098 17.4732 8.58591C17.5162 8.55584 17.5721 8.51424 17.6365 8.46055C17.7649 8.35358 17.9303 8.19584 18.0946 7.98229C18.4275 7.54955 18.7501 6.89266 18.7501 6.00001C18.7501 5.10735 18.4275 4.45046 18.0946 4.01772C17.9303 3.80417 17.7649 3.64643 17.6365 3.53947C17.5721 3.48577 17.5162 3.44418 17.4732 3.4141C17.4517 3.39904 17.4333 3.38679 17.4186 3.3773L17.3994 3.36508L17.3919 3.36049L17.3888 3.35856L17.3873 3.35769C17.387 3.35749 17.386 3.35689 17.0001 4.00001L17.386 3.35689Z" fill="#1C274C"/>
			</svg>
		</button>
		<button type="button" data-key="0">0</button>
		<button type="button" data-key="10">10</button>
		<button type="button" class="icon backspace" data-key="Backspace" aria-label="Backspace">
			<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
			<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<title>Backspace</title>
				<path d="M11.0303 8.96967C10.7374 8.67678 10.2625 8.67678 9.96965 8.96967C9.67676 9.26256 9.67676 9.73744 9.96965 10.0303L11.9393 12L9.96967 13.9697C9.67678 14.2626 9.67678 14.7374 9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L13 13.0607L14.9696 15.0303C15.2625 15.3232 15.7374 15.3232 16.0303 15.0303C16.3232 14.7374 16.3232 14.2625 16.0303 13.9697L14.0606 12L16.0303 10.0304C16.3232 9.73746 16.3232 9.26258 16.0303 8.96969C15.7374 8.6768 15.2625 8.6768 14.9696 8.96969L13 10.9394L11.0303 8.96967Z" fill="#1C274C"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3191 4.63407C20.5538 3.88938 19.5855 3.55963 18.3866 3.40278C17.2186 3.24997 15.7251 3.24999 13.8342 3.25H11.1058C10.0228 3.24999 9.15832 3.24999 8.45039 3.31591C7.71946 3.38398 7.09979 3.52598 6.51512 3.84132C5.92948 4.15718 5.47496 4.59515 5.02578 5.16537C4.59197 5.7161 4.13289 6.43088 3.55968 7.32338L2.83702 8.44855C2.35887 9.19299 1.96846 9.80083 1.7023 10.3305C1.42424 10.8839 1.25 11.411 1.25 12C1.25 12.589 1.42424 13.1161 1.7023 13.6695C1.96845 14.1992 2.35886 14.807 2.83699 15.5514L3.55969 16.6766C4.1329 17.5691 4.59197 18.2839 5.02578 18.8346C5.47496 19.4048 5.92948 19.8428 6.51512 20.1587C7.09979 20.474 7.71947 20.616 8.45039 20.6841C9.15831 20.75 10.0228 20.75 11.1058 20.75H13.8341C15.725 20.75 17.2186 20.75 18.3866 20.5972C19.5855 20.4404 20.5538 20.1106 21.3191 19.3659C22.0872 18.6185 22.4299 17.6679 22.5924 16.4917C22.75 15.3511 22.75 13.8943 22.75 12.0577V11.9422C22.75 10.1056 22.75 8.64883 22.5924 7.50827C22.4299 6.33205 22.0872 5.38153 21.3191 4.63407ZM13.779 4.75C15.7373 4.75 17.1327 4.75151 18.192 4.89011C19.2319 5.02615 19.8343 5.2822 20.273 5.70908C20.7088 6.13319 20.9681 6.71126 21.1066 7.71356C21.2483 8.73957 21.25 10.0926 21.25 12C21.25 13.9074 21.2483 15.2604 21.1066 16.2864C20.9681 17.2887 20.7088 17.8668 20.273 18.2909C19.8343 18.7178 19.2319 18.9738 18.192 19.1099C17.1327 19.2485 15.7373 19.25 13.779 19.25H11.142C10.0146 19.25 9.21982 19.2493 8.58947 19.1906C7.97424 19.1333 7.5722 19.0246 7.22717 18.8385C6.88311 18.6529 6.57764 18.3806 6.20411 17.9064C5.82029 17.4192 5.39961 16.7657 4.80167 15.8347L4.12086 14.7747C3.61571 13.9882 3.26903 13.4466 3.04261 12.996C2.82407 12.5611 2.75 12.2714 2.75 12C2.75 11.7286 2.82407 11.4389 3.04261 11.004C3.26903 10.5534 3.61571 10.0118 4.12086 9.22531L4.80167 8.16532C5.39961 7.23433 5.82029 6.58082 6.20411 6.09357C6.57764 5.61938 6.88311 5.34711 7.22717 5.16154C7.5722 4.97545 7.97424 4.86674 8.58947 4.80945C9.21982 4.75075 10.0146 4.75 11.142 4.75L13.779 4.75Z" fill="#1C274C"/>
			</svg>
		</button>
	</div>

</div>`,h=class{container;backButtonHandler;element;level;spokenNumbers;spokenNumberIndex=0;displayNumbers;output;speaker;speakInSentences;speakSlowly;changeSettings;constructor(e,t,n,r,a,o){this.container=e,this.backButtonHandler=t,this.level=n,this.displayNumbers=[],this.spokenNumbers=[],this.speaker=r,this.element=document.createElement(`div`),this.element.innerHTML=m,this.output=this.element.querySelector(`.output`),this.speakInSentences=a.useSentence,this.speakSlowly=a.useSlow,this.changeSettings=o,i(this.spokenNumbers,this.level),this.update(),this.removeAllNumbers(),this.bindButtonEvents(),setTimeout(this.sayCurrentNumber.bind(this),300)}mount(){this.container.appendChild(this.element)}unmount(){this.container.removeChild(this.element)}async markCorrect(){this.output.classList.toggle(`correct`,!0),await e(1e3),this.output.classList.toggle(`invisible`,!0),await e(300),this.displayNumbers.splice(0,this.displayNumbers.length),this.update(),this.output.classList.toggle(`correct`,!1),this.output.classList.toggle(`invisible`,!1),p()}async markIncorrect(){this.output.classList.toggle(`incorrect`,!0),await e(1e3),this.displayNumbers.splice(0,this.displayNumbers.length),this.output.classList.toggle(`incorrect`,!1),this.update(),this.output.classList.toggle(`invisible`,!1),await e(300)}async checkAnswer(){if(this.displayNumbers.length!==this.level)return;let e=this.spokenNumbers[this.spokenNumberIndex];parseInt(this.displayNumbers.join(``),10)===e?(await this.markCorrect(),this.spokenNumberIndex++,this.spokenNumberIndex>=this.spokenNumbers.length&&i(this.spokenNumbers,this.level)):await this.markIncorrect(),this.sayCurrentNumber()}sayCurrentNumber(){let e=s(this.spokenNumbers[this.spokenNumberIndex]),t=this.speakInSentences?f(e):e,n=this.speakSlowly?.6:1;return this.speaker.say(t,`thai`,n)}removeAllNumbers(){this.displayNumbers.splice(0,this.displayNumbers.length)}addNumber(e){this.displayNumbers.length>=this.level||this.level>1&&this.displayNumbers.length===0&&e===0||(this.displayNumbers.push(e),this.update(),this.checkAnswer())}deleteNumber(){this.displayNumbers.length!==0&&(this.displayNumbers.pop(),this.update())}update(){this.output.textContent=this.displayNumbers.join(``)}repeat(){}bindButtonEvents(){this.element.querySelector(`.back-button`).addEventListener(`click`,()=>this.backButtonHandler()),this.element.querySelector(`.listen .numpad .repeat`).addEventListener(`pointerdown`,()=>{this.sayCurrentNumber()});let e=this.element.querySelectorAll(`.numpad button`);for(let t of e){let e=t.dataset.key;if(!e)continue;let n=parseInt(e,10);Number.isNaN(n)?e===`Backspace`?t.addEventListener(`click`,()=>this.deleteNumber()):e===`Repeat`&&t.addEventListener(`click`,()=>this.repeat()):t.addEventListener(`click`,()=>this.addNumber(n))}let t=this.element.querySelector(`#sentence`);t.addEventListener(`change`,e=>{let t=e.target;this.speakInSentences=t.checked,this.sayCurrentNumber(),this.changeSettings(`useSentence`,this.speakInSentences)}),t.checked=this.speakInSentences;let n=this.element.querySelector(`#slow`);n.addEventListener(`change`,e=>{let t=e.target;this.speakSlowly=t.checked,this.sayCurrentNumber(),this.changeSettings(`useSlow`,this.speakSlowly)}),n.checked=this.speakSlowly}},g=`<div class="main-menu">
	<h1>Thai numbers</h1>

	<section>
		<h2>Study:</h2>
		<div class="selector">
			<button type="button" class="standard-button" data-value="learn-1">1</button>
			<button type="button" class="standard-button" data-value="learn-2">2</button>
			<button type="button" class="standard-button" data-value="learn-3">3</button>
			<button type="button" class="standard-button" data-value="learn-4">4</button>
			<button type="button" class="standard-button" data-value="learn-5">5</button>
		</div>
	</section>

	<h2>Challenge:</h2>
	<section data-section="listen">
		<div class="selector">
			<button type="button" class="standard-button" data-value="listen-1">1</button>
			<button type="button" class="standard-button" data-value="listen-2">2</button>
			<button type="button" class="standard-button" data-value="listen-3">3</button>
			<button type="button" class="standard-button" data-value="listen-4">4</button>
			<button type="button" class="standard-button" data-value="listen-5">5</button>
		</div>
	</section>
	<ul>
		<li>Level 1: 0 &ndash; 9</li>
		<li>Level 2: 10 &ndash; 99</li>
		<li>Level 3: 100 &ndash; 999</li>
		<li>Level 4: 1,000 &ndash; 9,999</li>
		<li>Level 5: 10,000 &ndash; 99,999</li>
	</ul>

</div>`,_=class{container;element;menuHandler;constructor(e,t){this.container=e,this.menuHandler=t,this.element=document.createElement(`div`),this.element.className=`mainmenu`,this.element.innerHTML=g,this.bindButtonEvents()}bindButtonEvents(){let e=this.element.querySelectorAll(`button`);for(let t of e){let e=t.dataset.value;if(!e)continue;let[n,r]=e.split(`-`);t.addEventListener(`click`,()=>{this.menuHandler({section:n,level:parseInt(r,10)})})}}async mount(){this.container.appendChild(this.element),await t(2),this.element.classList.add(`visible`),await e(300)}async unmount(){this.element.classList.remove(`visible`),await e(300),this.container.removeChild(this.element),await t(1)}},v=Object.freeze({useSentence:!1,useSlow:!1,listenFirst:!0}),y=`numbers-storage`,b=Object.keys(v),x=e=>{let t={...v};if(typeof e!=`object`||!e||Array.isArray(e))return t;for(let n of b)if(Object.hasOwn(e,n)){let r=e[n];typeof r==`boolean`&&(t[n]=r)}return t},S=()=>{try{let e=localStorage.getItem(y);return e===null?{...v}:x(JSON.parse(e))}catch{return console.warn(`Failed to load data from localStorage`),{...v}}};function C(e){try{return localStorage.setItem(y,JSON.stringify(x(e))),!0}catch(e){return console.error(e),!1}}var w=()=>new Promise((e,t)=>{let n=10,r=()=>{let i=speechSynthesis.getVoices();if(i.length)e(i);else{if(n--,n===0)return t(Error(`No voices found in 10 attempts`));setTimeout(r,10)}};r()}),T=async()=>{let e=/th[-_]TH/,t=/ja[-_]JP/,n=await w(),r=n.find(({lang:e})=>t.test(e)),i=n.find(({lang:t})=>e.test(t)),a=!1;if(!i)throw Error(`No Thai voice found`);if(!r)throw Error(`No Japanese voice found`);return{say:(e,t,n=1)=>new Promise(o=>{if(a)return;let s=new SpeechSynthesisUtterance(e);s.voice=t===`japanese`?r:i,s.lang=s.voice.lang,s.rate=n,s.addEventListener(`error`,t=>{console.error(e,t),a=!1,o()}),s.addEventListener(`end`,()=>{a=!1,o()}),a=!0,speechSynthesis.speak(s)}),stop:()=>{speechSynthesis.cancel(),a=!1}}},E=class{root;currentView;speaker;settings;constructor(e){this.settings=S();let t=document.querySelector(e.rootSelector||`#app`);if(!t)throw Error(`Root element not found`);this.root=t,T().then(e=>{this.speaker=e,this.changeView()}).catch(e=>{alert(e.message)})}async changeView(e){if(!this.speaker)return Promise.resolve();let t=e===void 0?new _(this.root,this.changeView.bind(this)):e.section===`learn`?new l(this.root,this.changeView.bind(this),e.level,this.speaker,this.settings,this.changeSettings.bind(this)):new h(this.root,this.changeView.bind(this),e.level,this.speaker,this.settings,this.changeSettings.bind(this));await Promise.all([this.currentView?this.currentView.unmount():Promise.resolve(),t.mount()]),this.currentView=t}changeSettings(e,t){this.settings[e]=t,C(this.settings)}destroy(){this.currentView&&=(this.currentView.unmount(),void 0)}};(()=>{let e=new E({rootSelector:`#app`});window.addEventListener(`beforeunload`,()=>e.destroy())})();