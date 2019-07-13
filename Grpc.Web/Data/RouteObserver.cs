using Grpc.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grpc.Web.Data
{
    public class RouteObserver : IRouteObserver
    {
        private static readonly HashSet<Action<RouteModel>> routeSubscribers = new HashSet<Action<RouteModel>>();

        public void Push(RouteModel routeModel)
        {
            routeSubscribers.ToList().ForEach((calback) => calback(routeModel));
        }

        public void Subscribe(Action<RouteModel> callback)
        {
            routeSubscribers.Add(callback);
        }

        public void UnSubscribe(Action<RouteModel> callback)
        {
            routeSubscribers.Remove(callback);
        }
    }
}
