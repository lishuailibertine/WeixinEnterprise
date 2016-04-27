
using System;
using System.IO;
using WeiXinWeb.Models;
using WeiXinWeb.Util;
using Kenel;

namespace WeiXinWeb.ViewModel
{
    public class SLMenuAttachData
    {
        //post对应的菜单JSON
        public static string SLMenuToJson()
        {
            SLMenuModel model = new SLMenuModel();

            ViewButton clickBtn = new ViewButton();
            clickBtn.type = "view";
            clickBtn.name = "待办事宜";
            clickBtn.url = "http://1492m13p21.iok.la/Weixin/SourceUI/db.html";

            ViewButton clickBtn2 = new ViewButton();
            clickBtn2.type = "view";
            clickBtn2.name = "发起流程";
            clickBtn2.url = "http://1492m13p21.iok.la/Weixin/SourceUI/fq.html";

            ViewButton viewBtn = new ViewButton();
            viewBtn.name = "我的请求";
            viewBtn.type = "view";
            viewBtn.url = "http://1492m13p21.iok.la/Weixin/SourceUI/wd.html";

            ViewButton viewBtn2 = new ViewButton();
            viewBtn2.name = "已办事宜";
            viewBtn2.type = "view";
            viewBtn2.url = "http://1492m13p21.iok.la/Weixin/SourceUI/yb.html";

            ViewButton viewBtn3 = new ViewButton();
            viewBtn3.name = "办结事宜";
            viewBtn3.type = "view";
            viewBtn3.url = "http://1492m13p21.iok.la/Weixin/SourceUI/bj.html";

            ViewButton viewBtn4 = new ViewButton();
            viewBtn4.name = "抄送事宜";
            viewBtn4.type = "view";
            viewBtn4.url = "http://1492m13p21.iok.la/Weixin/SourceUI/cs.html";

            MoreButton moreBtn = new MoreButton();
            moreBtn.name = "流程跟踪";
            moreBtn.sub_button.Add(viewBtn); moreBtn.sub_button.Add(viewBtn2); moreBtn.sub_button.Add(viewBtn3); moreBtn.sub_button.Add(viewBtn4);

            model.button.Add(clickBtn); model.button.Add(clickBtn2); model.button.Add(moreBtn);

            string jsonStr = JsonHelper.JsonSerialize(model);
           // string jsonStr = SLJsonHelp.ObjectToJson(model);
            SLLog.WriteLog("", "", jsonStr);

            return jsonStr;

        }

    }

}