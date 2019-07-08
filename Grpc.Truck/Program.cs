using VehicleGps;
using Grpc.Core;
using System;
using System.Threading.Tasks;
using Dijkstra.NET.Graph;
using Dijkstra.NET.ShortestPath;
using Grpc.Truck.Planets;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

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
            Console.ReadLine();

            Channel channel = new Channel("127.0.0.1:5000", ChannelCredentials.Insecure);

            var client = new VehicleGpsListener.VehicleGpsListenerClient(channel);

            var rb = new RouteBuilder();

            var path = rb.GetPath(Planet.Dathomir, Planet.Dantooine);

            using (var call = client.StreamGps())
            {
                MapObject current = path.Dequeue();
                MapObject next;
                while (path.Any())
                {
                    next = path.Dequeue();

                    var vehicle = new VehicleMapObject(current, next, 1);
                    while (!vehicle.isArrived())
                    {
                        await call.RequestStream.WriteAsync(vehicle.Move());
                        await Task.Delay(500);
                    }

                    current = next;
                }

                await call.RequestStream.CompleteAsync();

                var summary = await call.ResponseAsync;
            }

            channel.ShutdownAsync().Wait();

            Console.ReadLine();
        }
    }
}
