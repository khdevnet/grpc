using VehicleGps;
using Grpc.Core;
using System;
using System.Threading.Tasks;

namespace Grpc.Truck
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var start = new StartMapObject(100, 500);
            var destination = new DestinationMapObject(300, 500);

            var vehicle = new VehicleMapObject(start, destination, 1);


            AppContext.SetSwitch(
        "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport",
        true);

            Console.WriteLine("Press enter to start delivery.");

            Channel channel = new Channel("127.0.0.1:5000", ChannelCredentials.Insecure);

            var client = new VehicleGpsListener.VehicleGpsListenerClient(channel);
            var points = new[] { new VehicleGpsRequest() { Direction = "west", X = 100, Y = 300 } };

            Console.ReadLine();

            using (var call = client.StreamGps())
            {
                while (!vehicle.isArrived())
                {
                    await call.RequestStream.WriteAsync(vehicle.Move());
                }

                await call.RequestStream.CompleteAsync();

                var summary = await call.ResponseAsync;
            }

            channel.ShutdownAsync().Wait();

            Console.ReadLine();
        }
    }
}
