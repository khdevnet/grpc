using Greet;
using Grpc.Core;
using System;
using System.Threading.Tasks;

namespace Grpc.Truck
{
    class Program
    {
        static async Task Main(string[] args)
        {
            AppContext.SetSwitch(
     "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport",
     true);

            Console.WriteLine("Press enter to start delivery.");

            Channel channel = new Channel("127.0.0.1:5000", ChannelCredentials.Insecure);

            var client = new Greeter.GreeterClient(channel);
            var points = new[] { new HelloRequest() { Name = "anton" }, new HelloRequest() { Name = "petr" } };

            Console.ReadLine();

            using (var call = client.ListFeatures())
            {
                foreach (var point in points)
                {
                    await call.RequestStream.WriteAsync(point);
                }

                await call.RequestStream.CompleteAsync();

                HelloReply summary = await call.ResponseAsync;
            }

            channel.ShutdownAsync().Wait();

            Console.ReadLine();
        }
    }
}
