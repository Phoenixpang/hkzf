import React from 'react'
import { Carousel, WingBlank } from 'antd-mobile'
import { Flex } from 'antd-mobile'
import Nav1 from '../../../assets/images/nav-1.png'
import Nav2 from '../../../assets/images/nav-2.png'
import Nav3 from '../../../assets/images/nav-3.png'
import Nav4 from '../../../assets/images/nav-4.png'
import axios from 'axios'
import './index.scss'
import { Link } from 'react-router-dom'
const navList =[
  { title:'整租', img:Nav1,path:'/home/house' },
  { title:'合租', img:Nav2,path:'/home/house' },
  { title:'地图找房', img:Nav3,path:'/home/Map' },
  { title:'去出租', img:Nav4,path:'/home/house' }
]

class Index extends React.Component{
  state = {
    // 轮播图数据
    swipers: ['1', '2', '3'],
    //图片的初始高度
    imgHeight: 212,

  }

  async getSwiper(){
   const res = await axios.get('http://localhost:8080/home/swiper')
   const { status,body } =res.data
   if(status ===200){
    this.setState({
      swipers:body
    })
   }
   console.log(res);
  }
 // 自动更新数据 
 componentDidMount(){
  this.getSwiper()
}

renderSwiper(){
  return(
    <WingBlank>
    <Carousel
      autoplay={true}
      infinite
    >
      {this.state.swipers.map(item => (
        <a
          key={item.id}
          href="http://itcast.cn"
          style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
        >
          <img
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
          />
        </a>
      ))}
    </Carousel>
</WingBlank>
  )
}

rendernav(){
  return navList.map(item=>(
    <Flex.Item>
    <Link to={item.path}>
     <img src={item.img} alt=""/>
     <p>{item.title}</p>
    </Link>
  </Flex.Item>
  ))
}

  render(){
    return (
      <div className="index">
        <div className="swiper">
          {this.renderSwiper()}
        </div>
        <div className="nav">
          <Flex>
            {this.rendernav()}
          </Flex>
        </div>
      </div>
     
    )
    
  }
}
export default Index