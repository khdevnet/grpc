using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Web.Hubs.SignalRWebPack.Hubs;
using Microsoft.AspNetCore.SignalR;
using VehicleGps;
using Grpc.Web.Models;

namespace Grpc.Web
{
    public class VehicleGpsService : VehicleGpsListener.VehicleGpsListenerBase
    {
        private readonly IHubContext<ChatHub, IChatHub> hubContext;

        public VehicleGpsService(IHubContext<ChatHub, IChatHub> hubContext)
        {
            this.hubContext = hubContext;
        }

        public override async Task<VehicleGpsReply> StreamGps(IAsyncStreamReader<VehicleGpsRequest> requestStream, ServerCallContext context)
        {
            while (await requestStream.MoveNext())
            {
                await hubContext.Clients.All.MessageReceived(ToModel(requestStream.Current));
            }

            return new VehicleGpsReply
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
