import React from 'react'
import Index from './Index/index.js'
import House from './House'
import News from './News'
import My from './My'
import { Route,Switch} from 'react-router-dom'
import './index.scss'
import '../../assets/fonts/iconfont.css'
import { TabBar } from 'antd-mobile';
const itemList = [
  { title: '首页', icon: 'icon-ind', path: '/home' },
  { title: '找房', icon: 'icon-findHouse', path: '/home/house' },
  { title: '资源', icon: 'icon-infom', path: '/home/news' },
  { title: '我的', icon: 'icon-my', path: '/home/my' },
]



class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
    };
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
      </div>
    );
  }
  
  renderItem(){
    return itemList.map(item =>(
      <TabBar.Item
            title={item.title}
            key={item.title}
            icon={<i className={`iconfont ${item.icon}`}></i>}
            selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
            selected={this.state.selectedTab === item.path}
            onPress={() => {
              this.setState({
                selectedTab: item.path,
              });
              this.props.history.push(item.path)
            }}
          >
        </TabBar.Item>
    ))
  }

  render(){
    return(
      <div className="home">
        {/* 路由规则 */}
       <Switch>
          <Route exact path="/home" component={Index} />
          <Route path="/home/house" component={House} />
          <Route path="/home/news" component={News} />
          <Route path="/home/my" component={My} />
       </Switch>

      {/* 底部导航栏 */}
       <div className="Taber">
        <TabBar tintColor="#21b97a">
          {this.renderItem()}
        </TabBar>
      </div>
      </div>
    )
  }
}

export default Home