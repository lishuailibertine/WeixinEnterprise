using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WeiXinWeb.Models;

namespace WeiXinWeb.ViewModel
{
    public class SLEnterPriseClass
    {
        private static SLEnterPriseClass instance;

        public SLEnterpriseModel enterPeiseModel { set; get; }

        public static SLEnterPriseClass ShareEnterPrise()
        {

            if (instance == null)
            {

                instance = new SLEnterPriseClass();

            }

            return instance;
        }

        public SLApplicationModel GetApplicationModel(int  index)
        {

           return (SLApplicationModel)this.enterPeiseModel.ApplicationModelList[index];

        }

    }
}