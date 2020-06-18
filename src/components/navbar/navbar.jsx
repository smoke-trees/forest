import React from 'react'
import Logo from '../../vectors/logo.svg'
import Search from '../../vectors/magnify.svg'

import './style.css'

class Navbar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className='fixed'>
        <div className='navbar-container'>
          <div className='logo'><img src={Logo}></img></div>
          <div style={{flex: 1}}></div>
          <div className='navbar-components'>
            <div className='search'><img src={Search} /></div>
            <div className='tabs'><div>MODLES</div></div>
            <div className='tabs'><div>CONTRIBUTE</div></div>
            <div className='tabs'><div>ISSUES</div></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
