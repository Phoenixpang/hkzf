import React from 'react'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { getCurrentCity,setCity } from 'utils'
import { List,AutoSizer } from 'react-virtualized'
import styles from './index.module.scss'
import NavHeader from 'common/NavHeader'
const CITYS = ['北京', '上海', '深圳', '广州']
const TITLE_HEIGHT = 36
const CITY_HEIGHT = 50

// const list = Array.from(new Array(1000)).map((item,index) =>`${index}-----我是一个字符串`)

class City extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      cityObj: {},
      shortList: [],
      currentIndex: 0
    }
    this.listRef = React.createRef()
  }
  
  formatData(list){
    const cityObj={}
    
    list.forEach(item =>{
      const key = item.short.slice(0,1)
      if(key in cityObj){
        cityObj[key].push(item)
      } else {
        cityObj[key]=[item]
      }
    })
    const shortList=Object.keys(cityObj).sort()
    return {
      cityObj,
      shortList
    }

  }
  //格式化title的显示
  formatTitle(title){
    let showTitle
    if(title==='#'){
      showTitle = '当前定位'
    } else if (title === 'hot'){
      showTitle = '热门城市'
    } else {
      showTitle = title.toUpperCase()
    }
    return showTitle
  }

  async getCityList(){
   const res = await axios.get('http://localhost:8080/area/city?level=1')
  //  console.log(res.data.body)
   
  const { cityObj,shortList } = this.formatData(res.data.body)
  // 需要在城市列表 数据的前面添加上热门城市的数据
  shortList.unshift('hot')
  const hot= await axios.get("http://localhost:8080/area/hot")
  cityObj['hot']=hot.data.body

  // 在热门城市的前面添加  当前定位的数据
  // const city = JSON.parse(localStorage.getItem('current_city'))
  const city = await getCurrentCity()
  shortList.unshift('#')
  cityObj['#'] = [city]
  //  console.log(cityObj,shortList)
   this.setState({
     shortList,
     cityObj
   })
  }
  async componentDidMount(){
   await this.getCityList()
    // console.log(this.listRef.current)
   this.listRef.current.measureAllRows()
   }
   caclHeight({index}){
    // 标题的高度 + 每个城市的高度 * 城市的个数
    const title = this.state.shortList[index]
    const list = this.state.cityObj[title]
    return TITLE_HEIGHT + CITY_HEIGHT * list.length
   }
   //获取城市信息
   selectCity(city){
   if(CITYS.includes(city.label)){
    setCity(city)
    this.props.history.go(-1)
   } else{
      Toast.info('亲，你选择的城市暂无房源数据', 1)
   }
   }
  rowRenderer({ key, index, style }) {
    // 根据下标获取到城市的简写
    const title = this.state.shortList[index]
    // console.log(title)
    // 根据城市的简写获取城市的列表
    const list = this.state.cityObj[title]
    // console.log(list)
    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{this.formatTitle(title)}</div>
        {list.map(item => (
          <div key={item.value} className="name" onClick={this.selectCity.bind(this,item)}>
            {item.label}
          </div>
        ))}
      </div>
    )
  }
  scrollToRow(index){
    console.log(this.listRef)
    
      this.listRef.current.scrollToRow(index)
  }
  renderRightMenus(){
    return(
      <ul className='city-index'>
        {
          this.state.shortList.map((item,index)=>(
            <li key={item} className="city-index-item"  onClick={this.scrollToRow.bind(this, index)}>
              <span className={index === this.state.currentIndex ? 'index-active' : ''}>
              {item === 'hot' ? '热' : item.toUpperCase()}
              </span>
            </li>
          ))
        }

      </ul>
    )
  }
  onRowsRendered({startIndex}){
    console.log(startIndex)
    if(startIndex!==this.state.currentIndex){
      this.setState({
        currentIndex: startIndex
      })
    }
  }
  render(){
    return(
      <div className={styles.city}>
        {/* 头部导航区 */}
        <NavHeader>城市选择</NavHeader>
        {/* 城市列表 */}
        <AutoSizer>
          {
            ({width,height})=>(
              <List
              width={width}
              height={height}
              ref={this.listRef}
              rowCount={this.state.shortList.length}
              rowHeight={this.caclHeight.bind(this)}
              rowRenderer={this.rowRenderer.bind(this)}
              onRowsRendered={this.onRowsRendered.bind(this)}
              scrollToAlignment='start'
            />
            )
          }
        </AutoSizer>
       {this.renderRightMenus()}
      </div>
    )
  }
}

export default City