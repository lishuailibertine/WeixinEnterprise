using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using WeiXinWeb.Util;
using WeiXinWeb.Models;

namespace WeiXinWeb.ViewModel
{
    public class SLAddressRequest:SLCommonGZLRequest
    {
        //上传临时素材文件
        public  void UploadTemporaryFile(FuncException<string>fuc)
        {
            try
            {
                string postUrla = string.Format("https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token={0}&type={1}", this.GetAccess_token(this.CorpID, this.Corpsecret,(string message)=>
                {

                    Console.Write("错误信息");

                }
               ), "file");

                string resultStr = HttpHelper.HttpUploadFile(postUrla, new string[] { @"D:\测试服务\import_user_sample.xlsx" }, null);

                fuc(resultStr);

            }
            catch (Exception e)
            {

                fuc(e.Message);

            }
           
        }

        //上传永久素材文件  测试通过
        public void UploadForeverFile(FuncException<string>fuc)
        {
            try
            {
                string postUrla = string.Format("https://qyapi.weixin.qq.com/cgi-bin/material/add_material?agentid={0}&access_token={1}&type={2}", this.Agentid, this.GetAccess_token(this.CorpID, this.Corpsecret,(string message)=>
                {

                    Console.Write("错误信息");


                }), "file");

                string resultStr = HttpHelper.HttpUploadFile(postUrla, new string[] { @"D:\测试服务\汉威团队通讯录.csv" }, null);

                fuc(resultStr);
            }
            catch (Exception e)
            {
                fuc(e.Message);

            }

        }

        //获取文件素材

        //同步通讯录

        //  1mn7___MFnzo5ph8RntQXI1C2fUhiU32sBFC7VSLcPYbN9BV-v6gMvEHdC2hLHLsqYu_mtpy_7fIXgMmrx4F8ZA    media_id
        public void SyschronousAddress(FuncException<string>fuc)
        {

            try
            {
                string postUrla = string.Format("https://qyapi.weixin.qq.com/cgi-bin/batch/syncuser?access_token={0}", this.GetAccess_token(this.CorpID, this.Corpsecret,(string message)=>
                {

                    Console.Write("错误信息");

                }));
                string jsonStr = "{\"media_id\":\"2gf3irmEvTfPRa648oPwcs_M9DSUVV9_vnEp5ppvDRNWqoTbBH0cG9-3OWfag7WOEFLS99vdyDJNonLnpkkj5uA\"}";

                string postStr = SLCustomMenuRequest.HttpPost(postUrla, jsonStr);

                fuc(postStr);

            }
            catch (Exception e)
            {
                fuc(e.Message);

            }
        }
    }
}