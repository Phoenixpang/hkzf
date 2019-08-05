import React from 'react'
import { Carousel, WingBlank } from 'antd-mobile'
import { Flex } from 'antd-mobile'
import { Grid } from 'antd-mobile'
import Nav1 from 'assets/images/nav-1.png'
import Nav2 from 'assets/images/nav-2.png'
import Nav3 from 'assets/images/nav-3.png'
import Nav4 from 'assets/images/nav-4.png'
import axios from 'axios'
import './index.scss'
import { Link } from 'react-router-dom'
const navList =[
  { title:'整租', img:Nav1,path:'/home/house' },
  { title:'合租', img:Nav2,path:'/home/house' },
  { title:'地图找房', img:Nav3,path:'/home/Map' },
  { title:'去出租', img:Nav4,path:'/home/rent' }
]

class Index extends React.Component{
  state = {
    // 轮播图数据
    swipers: [],
    groups:[],
    news:[],
    //图片的初始高度
    imgHeight: 212, 
    isLoaded: false,
  }

   // 自动更新数据 
  componentDidMount(){
    this.getSwiper()
    this.getGroup()
    this.getNews()
  }
  //轮播图
  async getSwiper(){
   const res = await axios.get('http://localhost:8080/home/swiper')
   const { status,body } =res.data
   if(status ===200){
    this.setState({
      swipers:body,
      isLoaded:true
    })
   }
  }
  // group
  async getGroup(){
    const res= await axios.get('http://localhost:8080/home/groups',{
      params:{
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    console.log(res);
     const {status,body} = res.data
     if(status ===200){
      this.setState({
        groups:body
      })
     }
  }
  //资讯
  async getNews(){
    const res = await axios.get('http://localhost:8080/home/news',{
      params:{
        area:'88cff55c-aaa4-e2e0'
      }
    })
    console.log(res)
    const { status,body } = res.data
    if( status ===200 ){
      this.setState({
        news:body
      })
    }
  }
 
 //轮播图
 renderSwiper(){
  if(!this.state.isLoaded){
    return
  }
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
//导航栏:
rendernav(){
  return navList.map(item=>(
    <Flex.Item key={item.id}>
    <Link to={item.path}>
     <img src={item.img} alt=""/>
     <p>{item.title}</p>
    </Link>
  </Flex.Item>
  ))
}
//租房
renderGroup (){
  return(
    <>
      {/* 标题 */}
      <h3 className="group-title">
        租房小组
        <span className="more">更多</span>
      </h3>
      {/* 内容 */}
      <div className="group-content">
      <Grid data={this.state.groups}
       columnNum={2}
       square={false}
       hasLine={false}
      renderItem={el => (
        <Flex className="group-item" justify="around">
          <div className="desc">
            <p className="title">{el.title}</p>
            <span className="info">{el.desc}</span>
          </div>
          <img src={`http://localhost:8080${el.imgSrc}`} alt="" />
        </Flex>
      )}
    />
      </div>
    </>
  )
}
//新闻
renderNews (){
  return(
    <>
    <h3 className="group-title">最新资讯</h3>
    {this.state.news.map(item =>(
      <div className="news-item" key={item.id}>
      <div className="imgwrap">
        <img
          className="img"
          src={`http://localhost:8080${item.imgSrc}`}
          alt=""
        />
      </div>
      <Flex className="content" direction="column" justify="between">
        <h3 className="title">
          {item.title}
        </h3>
        <Flex className="info" justify="between">
          <span>{item.from}</span>
          <span>{item.date}</span>
        </Flex>
      </Flex>
  </div>
    ))}
    
  </>
  )
}
//搜索框
renderSearch (){
  return (
  <Flex className="search-box">
      <Flex className="search-form">
        <div className="location" onClick={()=>this.props.history.push('/city')}>
          <span className="name">上海</span>
          <i className="iconfont icon-arrow"> </i>
        </div>
        <div className="search-input">
          <i className="iconfont icon-seach" />
          <span className="text">请输入小区地址</span>
        </div>
      </Flex>
  {/* 地图小图标 */}
  <i className="iconfont icon-map" />
</Flex>
  )
}
  render(){
    return (
      <div className="index">
          {/* 轮播图模块 */}
        <div className="swiper">
          {this.renderSearch()}
          {this.renderSwiper()}
        </div>
        <div className="nav">
           {/* 渲染导航模块 */}
          <Flex>
            {this.rendernav()}
          </Flex>
        </div>
        <div className="group">
          {/* 渲染租房小组 */}
          {this.renderGroup()}
        </div>
        <div className="message">
         {/* 渲染资讯 */}
         {this.renderNews()}
        </div>
      </div>
     
    )
    
  }
}
export default Index