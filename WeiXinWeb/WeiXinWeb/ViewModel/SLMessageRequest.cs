using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WeiXinWeb.Models;
using WeiXinWeb.Util;
using Kenel;
using Newtonsoft.Json;

namespace WeiXinWeb.ViewModel
{
    public class SLMessageRequest:SLCommonGZLRequest
    {
        public  void PostWeixin(string userId, SLMessageModel messageModel,FuncException<string> fuc)
        {
            try
            {
                SLMessageHandle.HandleMessageModel(messageModel);

                string postUrla = string.Format("https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token={0}", this.GetAccess_token(this.CorpID, this.Corpsecret,(string message)=>
                {

                    Console.Write("message{0}", message);

                }));

                string postStr = SLCustomMenuRequest.HttpPost(postUrla, SLMessageHandle.HandleMessageModel(messageModel));

                Dictionary<string, object> accesstokenDic2 = SLJsonHelp.JsonToDictionary(postStr);

                fuc(postStr);
            }
            catch(Exception e)
            {

                fuc(e.Message);

            }
           

        }

    }

    public class SLMessageHandle
    {

        public static string HandleMessageModel(SLMessageModel messageMode)
        {

            SLMessageContent messageContent = messageMode.MessageContent;

            string strSerializeJSON = JsonConvert.SerializeObject(messageMode);

            Dictionary<string, object> messageDic = SLJsonHelp.JsonToDictionary(strSerializeJSON);

            messageDic.Add(messageContent.ContentType, messageContent.ContentDic);
            String jsonStr = JsonConvert.SerializeObject(messageDic);

            return jsonStr;

        }


    }
}