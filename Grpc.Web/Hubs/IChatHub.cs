using Grpc.Common.Models;
using Grpc.Web.Models;
using System.Threading.Tasks;

namespace Grpc.Web.Hubs.SignalRWebPack.Hubs
{
    public interface IChatHub
    {
        Task MessageReceived(VehicleeGpsModel gps);
    }
}