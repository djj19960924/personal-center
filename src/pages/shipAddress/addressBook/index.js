import React from 'react';
import './index.less';
import Loading from '@components/loading/loading';

class AddressBook extends React.Component {
  constructor(props) {
    document.title = "地址簿";
    super(props);
    this.state = {
      data: [],//地址数据
      loading: null,
      panduan: false,//显示是否删除选项
      addressId: "",//地址id
    }
  }

  componentDidMount() {
    this.getAddressList();
  }

  getAddressList(){
    this.setState({loading: 1});
    fetch(window.theUrl+'/crmOrderController/getSenderListByUserId',
        {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                userId:"ce449501de6f48fa86deece7003f861f"
            })
        }
    ).then(r=>r.json()).then(r=>{
        this.setState({loading: 0});
        console.log('r:',r) 
        if(r.status===10000){
            this.setState({
                data:r.data
            })
        }
    })
  }

  componentWillUnmount() {
    this.setState = () => null;
  }

//   delete(id,e) {
//     //阻止冒泡事件
//     e.stopPropagation();
//     this.setState({addressId: id, panduan: true})
//   }

//   cancel() {
//     this.setState({panduan: false});
//   }

//   define() {
//     fetch(window.theUrl + '/recipients/removeRecipients', {
//       method: 'post',
//       headers: {
//         "Content-type": "application/json"
//       },
//       body: JSON.stringify({recipientsId: this.state.addressId})
//     }).then(response => response.json()).then((res) => {
//       console.log(res);
//       this.setState({panduan: false});
//       if (!res.data && !res.msg) {
//         this.Tips.alert("后端数据错误");
//       } else {
//         if (res.status !== 10000) {
//           this.Tips.alert(res.msg);
//         } else {
//           this.getAddressList();
//         }
//       }
//     }).catch(() => {
//       this.Tips.alert("前端删除地址接口调取失败");
//     })
//   }

  chooseAddress(addressInfo) {
    console.log('a:',addressInfo)
    //当选择地址存入本地
    var addressInfo = JSON.stringify(addressInfo)
    localStorage.setItem('addressInfo',addressInfo)
    this.props.history.push('/shipAddress')
  }

  render() {
    const {loading, data,panduan} = this.state;
    return (
      <div className="addressBook">
        <p className="tishi">
          根据中华人民共和国法律规定，海外直邮物品金额年度不能超过2万元人民币，请勿频繁重复使用同一地址
        </p>
        {
            data.length === 0 && <div className="no-information">
              <img src="http://resource.maishoumiji.com/wuliu/kong.png" alt="" className="success"/>
              <p>您还没有地址哦，请先去添加收货地址</p>
            </div>
        }
        
        <div className="xiala opacity">
          {
            data.map((item, index) => {
              return (
                <div className="xinxi" key={index}  onClick={this.chooseAddress.bind(this,item)}>
                  <div className="youbian">
                    <span className="xingm">{item.recipientsName.replace(/^./, "*")}</span>
                    <div className="geren">
                      <span
                        className="id-card">{item.receiveCard ? item.receiveCard.replace(/^(\d{6})\d*(\d{4})$/, "$1********$2") : ""}</span>
                      <span className="shoujih">{item.recipientsPhone.replace(/^(\d{3})\d*(\d{4})$/, "$1****$2")}</span>
                    </div>
                    <div className="dizhi">
                      <span>{item.recipientsProvince + item.recipientsCity + item.recipientsDistrict + item.recipientsAddress}</span>
                    </div>
                    {
                        // <div className="caozuo">
                        //     <span className="shanchu" onClick={this.delete.bind(this,item.recipientsId)}><img
                        //     src="http://resource.maishoumiji.com/wuliu/delete.png" alt=""/>删除</span>
                        // </div>
                    }
                    
                  </div>
                </div>
              )
            })
          }

        </div>
        {
            panduan === true && <div className="mask">
              <div className="panduan">
                <div className="content">
                  <p>要删除此地址吗?</p>
                  <p>删除此地址将同时删除其数据</p>
                </div>
                <div className="hr"/>
                <div className="choose">
                  <span onClick={this.cancel.bind(this)}>取消</span>
                  <div className="separation"/>
                  <span onClick={this.define.bind(this)}>确定</span>
                </div>
              </div>
            </div>
        }
      </div>
    )
  }
}

export default AddressBook;