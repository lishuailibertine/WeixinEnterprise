using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;

namespace WeiXinWeb.ViewModel
{
    public delegate TResult FuncCallBack<in T,out TResult>(T arg);

    public delegate void FuncException<in T>(T arg);

    public delegate TResult Func<in T, out TResult>(T arg);
}