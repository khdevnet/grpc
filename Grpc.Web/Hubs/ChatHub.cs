using Grpc.Web.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Grpc.Web.Hubs
{
    namespace SignalRWebPack.Hubs
    {
        public class ChatHub : Hub<IChatHub>
        {
            public async Task NewMessage(string message)
            {
                await Clients.All.MessageReceived(new VehicleeGpsModel());
            }
        }
    }
}
