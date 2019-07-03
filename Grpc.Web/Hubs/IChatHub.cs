using System.Threading.Tasks;

namespace Grpc.Web.Hubs.SignalRWebPack.Hubs
{
    public interface IChatHub
    {
        Task MessageReceived(string message);
    }
}