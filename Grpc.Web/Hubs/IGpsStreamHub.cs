using Grpc.Web.Models;
using System.Threading.Tasks;

namespace Grpc.Web.Hubs.SignalRWebPack.Hubs
{
    public interface IGpsStreamHub
    {
        Task MessageReceived(VehicleeGpsModel gps);
    }
}