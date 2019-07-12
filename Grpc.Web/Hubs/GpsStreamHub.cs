using Grpc.Web.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Grpc.Web.Hubs
{
    namespace SignalRWebPack.Hubs
    {
        public class GpsStreamHub : Hub<IGpsStreamHub>
        {
        }
    }
}
