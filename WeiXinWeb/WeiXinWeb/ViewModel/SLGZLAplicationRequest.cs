using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WeiXinWeb.Util;

namespace WeiXinWeb.ViewModel
{
    public class SLGZLAplicationRequest:SLCommonGZLRequest
    {
        //创建菜单
        public void CreatMenu(FuncException<string>fuc)
        {

            try
            {
                string postUrla = string.Format("https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token={0}&agentid={1}", this.GetAccess_token(this.CorpID, this.Corpsecret,(string message)=>
                {
                    Console.Write("message{0}",message);

                }), this.Agentid);

                string postStr = SLCustomMenuRequest.HttpPost(postUrla, SLMenuAttachData.SLMenuToJson());

                fuc(postStr);

            }
            catch (Exception e)
            {

                fuc(e.Message);

            }

        }

    }
}