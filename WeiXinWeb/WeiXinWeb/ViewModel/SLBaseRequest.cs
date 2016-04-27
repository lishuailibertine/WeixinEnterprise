using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WeiXinWeb.Util;

namespace WeiXinWeb.ViewModel
{
    public class SLBaseRequest
    {
        public string Token { set; get; }
        public string AesKey { set; get; }
        public string CorpID { set; get; }
        public SLEnterPriseClass enterPriseClass { set; get; }
        public SLBaseRequest()
        {
            this.enterPriseClass = SLEnterPriseClass.ShareEnterPrise();
            this.Token = this.enterPriseClass.enterPeiseModel.Token;
            this.AesKey = this.enterPriseClass.enterPeiseModel.AesKey;
            this.CorpID = this.enterPriseClass.enterPeiseModel.CordId;
            
        }
        public string GetAccess_token(string corpID,string corpsecret,FuncException<string>fuc)
        {

            try
            {
                string url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken";
                string data = string.Format("corpid={0}&corpsecret={1}", corpID, corpsecret);
                string result = SLCustomMenuRequest.HttpGet(url, data);

                Dictionary<string, object> accesstokenDic = SLJsonHelp.JsonToDictionary(result);

                string accesstoken = (string)accesstokenDic["access_token"];

                fuc(result);

                return accesstoken;
            }

            catch(Exception e)
            {

                fuc(e.Message);

                return "";
            }
           
          
         

        }
    }
}