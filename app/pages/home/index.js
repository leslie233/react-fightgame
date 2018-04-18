import React, { Component } from "react";
// 以CSS Modules方式引入Home页样式
import style from "./index.css";
// 引入图片
import { Input, Button, Icon } from '@bone/bone-web-ui';
import Stand from "../pic/stand.png";
import Kick from "../pic/kick.png"

// 导出Home页组件
export default class Home extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	        lock : false,
	        keep : false,
	        boomTime : false,
	        wait : false
	    };
	}

	move=(e)=>{
		if(this.state.lock == true){
			return
		}
		else{
			this.setState({ lock: true});
			let self = this
			arrKey[e.keyCode] = true
			this.effect(e)
			//单个键
			switch (e.keyCode){
				case 68:
					for(let i=1;i<=6;i++){
						setTimeout(function(){ 
							m.style.left = m.offsetLeft+6+"px";
							m.src = require(`../pic/go${i}.png`); 
							i === 6 && self.setState({ lock: false});
						}, i*80);
					}
					break;
				case 65:
					for(let i=1;i<=6;i++){
						setTimeout(function(){ 
							m.style.left = m.offsetLeft-6+"px";
							m.src = require(`../pic/back${i}.png`); 
							i === 6 && self.setState({ lock: false});
						}, i*80);
					}
					break;
				case 83:
					self.setState({ lock: false});
					if(this.state.keep === false){
						self.setState({ keep: true});
						for(let i=1;i<=3;i++){
							setTimeout(function(){ 
								m.src = require(`../pic/down${i}.png`); 
							}, i*40);
						}
					}
					break;
				case 74:
					m.src = Kick
					setTimeout(function(){ 
						m.src = Stand; 
					}, 200);

					break;
				case 75:
					if(!arrKey[83]){
						for(let i=1;i<=5;i++){
							setTimeout(function(){ 
								m.src = require(`../pic/leg${i}.png`); 
								i === 5 && self.setState({ lock: false});
							}, i*100);
						}
					}	
					break;
				case 32:
					for(let i=1;i<=2;i++){
						setTimeout(function(){ 
							m.src = require(`../pic/jump${i}.png`); 
							//m.style.top = m.offsetTop-40+"px";
							m.style.bottom = 200+"px"
							if(i === 2){
								for(let j=3;j<=4;j++){
									setTimeout(function(){ 
										m.src = require(`../pic/jump${j}.png`); 
										m.style.bottom = 130+"px"
										j === 4 && self.setState({ lock: false});
									}, j*100);
								}
							}
						}, i*100);
					}

					break;

				default:
	           		self.setState({ lock: false});
	          		break; 		

			}
			//组合键
			if(arrKey[83]&&arrKey[74]){
				m.src = require('../pic/down_kick.png')
				setTimeout(function(){ 
					m.src = require('../pic/down3.png')
				}, 200);
			}
			if(arrKey[83]&&arrKey[75]){
				for(let i=1;i<=3;i++){
					setTimeout(function(){ 
						m.src = require(`../pic/down_leg${i}.png`); 
						i === 3 && self.setState({ lock: false});
					}, i*100);
				}
			}
	
			if(arrKey[83]&&arrKey[68]&&arrKey[74]&&!this.state.boomTime){
				this.setState({ boomTime: true});
				for(let i=1;i<=5;i++){
					setTimeout(function(){ 
						m.src = require(`../pic/boom${i}.png`); 
						if (i===5){
							boom.style.left = m.offsetLeft+90+"px"
							boom.style.display = "block"
							let fly = setInterval(function(){
								boom.style.left = boom.offsetLeft+15+"px"
								if(player2.offsetLeft - boom.offsetLeft <= 48){
									clearInterval(fly);
									boom.style.display = "none"
									blood2 = blood2 - 20
									bar.style.clip = `rect(0 ${blood2}px 50px 0)`
									self.attacked()
								}
								if(boom.offsetLeft>730){
									clearInterval(fly);
									boom.style.display = "none"
								}
							},60)
						}
					}, i*150);
				}

			}
			if(arrKey[83]&&arrKey[65]&&arrKey[75]&&!this.state.wait){
				this.setState({ wait: true});
				for(let i=1;i<=5;i++){
					setTimeout(function(){ 
						m.style.left = m.offsetLeft+20+"px"
						m.src = require(`../pic/jump_kick${i}.png`); 
						if(player2.offsetLeft - m.offsetLeft <= 120){
							blood2 = blood2 - 20
							bar.style.clip = `rect(0 ${blood2}px 50px 0)`
							self.attackedFly()
						}
						i === 5 && self.setState({ lock: false});
					}, i*100);
				}
		
			}
			this.limit()
		}
		
	}

	keyup=(e)=>{
		arrKey[e.keyCode] = false
		switch(e.keyCode){
			case 83:
				m.src = require('../pic/go1.png')
				this.setState({ keep: false})
				break;
			case 74:
				this.setState({ lock: false});
				break;	
			case 75:
				//this.setState({ lock: false});
				break;	
			default:	
				break;
		}	
		if(!arrKey[83] || !arrKey[68]){
			this.setState({ boomTime: false});
		}
		if(!arrKey[83] || !arrKey[65]){
			this.setState({ wait: false});
		}
	}

	limit=()=>{
		if(m.offsetLeft<=36){
			m.style.left=36+'px'
		}
		if(m.offsetLeft>=612){
			m.style.left=612+'px'
		}
		if(m.offsetTop<=0){
			m.style.top=0
		}
		if(m.offsetTop>=380){
			m.style.top=380+'px'
		}  
		if(player2.offsetLeft>=680){
			player2.style.left=680+'px'
		}

    }

    ko=()=>{
    	let self = this
    	this.refs.ko.style.display = "block";
    	for(let i=1;i<=4;i++){
			setTimeout(function(){ 
				player2.style.left = player2.offsetLeft+8+"px"
				self.limit()
				player2.src = require(`../pic/fall${i}.png`); 
			}, i*100);
		}
    }

    attacked = ()=>{
    	if(blood2 <= 172){
			this.ko()
		}
		else{
			for(let i=1;i<=2;i++){
				setTimeout(function(){ 
					player2.src = require(`../pic/beattacked${i}.png`); 
				}, i*60);
			}
			setTimeout(function(){ 
				player2.src = require('../pic/stand.png'); 
			}, 400);
		}
    }

    attackedFly = ()=>{
    	if(blood2 <= 172){
			this.ko()
		}
		else{
			let self = this
	    	for(let i=1;i<=4;i++){
				setTimeout(function(){ 
					player2.style.left = player2.offsetLeft+8+"px"
					self.limit()
					player2.src = require(`../pic/fall${i}.png`); 
				}, i*100);
			}
			setTimeout(function(){ 
				player2.src = require('../pic/stand.png'); 
			}, 1500);
		}
    }

    effect = e =>{
		let distance = player2.offsetLeft - m.offsetLeft
		//console.log("p1",m.offsetLeft)
		//console.log("p2",player2.offsetLeft)
		switch (e.keyCode){
			case 68:
				if(distance <= 86){
					for(let i=1;i<=6;i++){
						setTimeout(function(){ 
							player2.style.left = player2.offsetLeft+6+"px";
							player2.src = require(`../pic/back${i}.png`); 
						}, i*80);
					}
				}
				break;
			case 74:
				if(distance <= 86){
					blood2 = blood2 - 15
					bar.style.clip = `rect(0 ${blood2}px 50px 0)`
					this.attacked()
				}
				break;
			case 75:
				if(distance <= 116){
					blood2 = blood2 - 15
					bar.style.clip = `rect(0 ${blood2}px 50px 0)`
					this.attacked()
				}
				break;
			case 32:
				break;
			default:
           		
          		break; 		

		}

    }

	componentDidMount(){
		window.m =this.refs.move
		window.player2 =this.refs.player2
		window.boom =this.refs.boom
		window.bar =this.refs.bar
		window.blood2 = 322
		window.arrKey = {}
		window.addEventListener('keydown', this.move)
		window.addEventListener('keyup', this.keyup)
		//this.wait()
	}

    render(){
        return <div className="container">
        	<img className="ko" ref = "ko" src={require('../pic/KO.png')} />
        	<img className="bar" ref = "bar" src={require('../pic/bar.gif')} />
        	<img className="move" ref = "move" src={require('../pic/go1.png')} />
        	<img className="boom" ref = "boom" src={require('../pic/boom.png')} />
        	<img className="player2" ref = "player2" src={require('../pic/stand.png')} />
        </div>
    }
}