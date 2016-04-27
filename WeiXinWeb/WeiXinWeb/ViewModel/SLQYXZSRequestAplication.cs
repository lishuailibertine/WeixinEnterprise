using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WeiXinWeb.Util;
using PubPlatform.Services;
using Kenel;

namespace WeiXinWeb.ViewModel
{
    public class SLQYXZSRequestAplication:SLCommonQYXZSRequest
    {
        public HttpRequest Request { set; get; }

        public string UserId { set; get; }

        //获取USEID
        public void GetUserIdStr(string codeStr)
        {

            string url2 = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo";
            string data2 = string.Format("access_token={0}&code={1}", this.GetAccess_token(this.CorpID,this.Corpsecret,(string message)=>
            {
                Console.Write("message{0}", message);

            }), codeStr);
            string result2 = SLCustomMenuRequest.HttpGet(url2, data2);

            Dictionary<string, object> accesstokenDic2 = SLJsonHelp.JsonToDictionary(result2);

            string useId = (string)accesstokenDic2["UserId"];

            this.UserId = useId;
            SLLog.WriteLog("", "", useId);

        }
        //获取当前登录用户信息

        public void GetUserDetail()
        {
            //获取用户信息
            string url3 = "https://qyapi.weixin.qq.com/cgi-bin/user/list";
            string data3 = string.Format("access_token={0}&department_id=1&fetch_child=1&status=0", this.GetAccess_token(this.CorpID, this.Corpsecret,(string message)=>
            {
                Console.Write("message{0}", message);

            }));
            string result3 = SLCustomMenuRequest.HttpGet(url3, data3);

            Dictionary<string, object> members = SLJsonHelp.JsonToDictionary(result3);

            ArrayList userSArry = new ArrayList();

            if ((string)members["errmsg"] == "ok")
            {

                userSArry = (ArrayList)members["userlist"];

                for (int i = 0; i < userSArry.Count; i++)
                {

                    Dictionary<string, object> useerDic = (Dictionary<string, object>)userSArry[i];
                    string userCurrentId = (string)useerDic["userid"];
                    if (userCurrentId == this.UserId)
                    {

                        string mobileNember = (string)useerDic["mobile"];

                        SLLog.WriteLog("", "", mobileNember);

                        OrganizationService ozs = new OrganizationService();

                        ozs.Url = System.Configuration.ConfigurationManager.AppSettings["ORGANIZATIONSERVICEURL"];

                        ozs.UpdateWeixinID(UserId, mobileNember);

                        string url4 = "https://qyapi.weixin.qq.com/cgi-bin/user/authsucc";
                        string data4 = string.Format("access_token={0}&userid={1}", this.GetAccess_token(this.CorpID, this.Corpsecret, (string message) =>
                        {
                            Console.Write("message{0}", message);

                        }), this.UserId);
                        string result4 = SLCustomMenuRequest.HttpGet(url4, data4);

                        Dictionary<string, object> members4 = SLJsonHelp.JsonToDictionary(result4);

                    }

                }

            }
         }
        //企业二次验证判断
        public bool GetCode(HttpRequest request)
        {
            this.Request = request;

            if (this.Request["code"] != null)
            {

                string codeStr = this.Request["code"];
                GetUserIdStr(codeStr);

                //获取当前登录用户信息
                GetUserDetail();

                return true;

            }
            else
            {

                return false;

            }

        }

        


    }
}