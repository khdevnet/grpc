using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Web.Hubs.SignalRWebPack.Hubs;
using Microsoft.AspNetCore.SignalR;
using VehicleGps;
using Grpc.Web.Models;
using Grpc.Web.Data;

namespace Grpc.Web
{
    public class VehicleGpsService : VehicleGpsListener.VehicleGpsListenerBase
    {
        private readonly IHubContext<GpsStreamHub, IGpsStreamHub> hubContext;
        private readonly IRouteObserver routeObserver;

        public VehicleGpsService(IHubContext<GpsStreamHub, IGpsStreamHub> hubContext, IRouteObserver routeObserver)
        {
            this.hubContext = hubContext;
            this.routeObserver = routeObserver;
        }

        public override async Task ListenRoute(IAsyncStreamReader<RouteRequest> requestStream, IServerStreamWriter<RouteResponse> responseStream, ServerCallContext context)
        {
            routeObserver.Subscribe(async (route) =>
            {
                await responseStream.WriteAsync(new RouteResponse() { From = route.From, To = route.To });
            });

            while (await requestStream.MoveNext())
            {

            }
        }

        public override async Task<Reply> StreamGps(IAsyncStreamReader<VehicleGpsRequest> requestStream, ServerCallContext context)
        {
            while (await requestStream.MoveNext())
            {
                await hubContext.Clients.All.MessageReceived(ToModel(requestStream.Current));
            }

            return new Reply
            {
                Message = "Delivery Done"
            };
        }

        private static VehicleeGpsModel ToModel(VehicleGpsRequest request)
        {
            return new VehicleeGpsModel()
            {
                Direction = request.Direction,
                Gps = new PointModel
                {
                    X = request.X,
                    Y = request.Y
                }
            };
        }
    }
}
