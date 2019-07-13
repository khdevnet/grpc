using System;
using Grpc.Common;

namespace Grpc.Web.Data
{
    public interface IRouteObserver
    {
        void Push(RouteModel routeModel);
        void Subscribe(Action<RouteModel> callback);
        void UnSubscribe(Action<RouteModel> callback);
    }
}