using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Greet;
using Grpc.Core;
using Grpc.Web.Hubs.SignalRWebPack.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace Grpc.Web
{
    public class GreeterService : Greeter.GreeterBase
    {
        private readonly IHubContext<ChatHub, IChatHub> hubContext;

        public GreeterService(IHubContext<ChatHub, IChatHub> hubContext)
        {
            this.hubContext = hubContext;
        }

        public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
        {
            return Task.FromResult(new HelloReply
            {
                Message = "Hello " + request.Name
            });
        }

        public override async Task<HelloReply> ListFeatures(IAsyncStreamReader<HelloRequest> requestStream, ServerCallContext context)
        {
            while (await requestStream.MoveNext())
            {
                await hubContext.Clients.All.MessageReceived(requestStream.Current.Name);
            }

            return new HelloReply
            {
                Message = "Delivery Done"
            };
        }
    }
}
