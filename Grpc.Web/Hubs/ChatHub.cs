using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grpc.Web.Hubs
{
    namespace SignalRWebPack.Hubs
    {
        public class ChatHub : Hub<IChatHub>
        {
            public async Task NewMessage(string message)
            {
                await Clients.All.MessageReceived(message);
            }
        }
    }
}
