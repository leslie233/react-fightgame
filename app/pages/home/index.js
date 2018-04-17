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
				// case 87:
				// m.style.top = m.offsetTop-10+"px";
				// break;
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
								if(boom.offsetLeft>730){
									clearInterval(fly);
									boom.style.display = "none"
								}
							},60)
						}
					}, i*150);
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
			default:	
				break;
		}	
		if(!arrKey[83] || !arrKey[68]){
			this.setState({ boomTime: false});
		}
	}
	limit=()=>{
		if(m.offsetLeft<=0){
			m.style.left=0
		}
		if(m.offsetLeft>=680){
			m.style.left=680+'px'
		}
		if(m.offsetTop<=0){
			m.style.top=0
		}
		if(m.offsetTop>=380){
			m.style.top=380+'px'
		}       
    }
   //  wait=()=>{
   //  	if(!this.state.wait){
   //  		for(let i=1;i<=5;i++){
			// 	setInterval(()=>{ 
			// 		m.src = require(`../pic/wait${i}.png`); 
			// 		i === 5 && this.setState({ lock: false});
			// 	}, i*180);
			// }
   //  	}			
   //  }

	componentDidMount(){
		window.m =this.refs.move
		window.boom =this.refs.boom
		window.arrKey = {}
		window.addEventListener('keydown', this.move)
		window.addEventListener('keyup', this.keyup)
		//this.wait()
	}
    render(){
        return <div className="container">
        	<img className="move" ref = "move" src={require('../pic/go1.png')} />
        	<img className="boom" ref = "boom" src={require('../pic/boom.png')} />
        </div>
    }
}