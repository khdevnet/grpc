using VehicleGps;
using Grpc.Core;
using System;
using System.Threading.Tasks;
using Dijkstra.NET.Graph;
using Dijkstra.NET.ShortestPath;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using Grpc.Common;
using Newtonsoft.Json;

namespace Grpc.Truck
{
    class Program
    {
        static async Task Main(string[] args)
        {
            AppContext.SetSwitch(
        "System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport",
        true);

            Console.WriteLine("All planets:");
            Console.WriteLine($"[ {string.Join(',', Planet.All.Keys)}]");
            Console.WriteLine("Enter route in format : {\"from\":\"Dantooine\",\"to\": \"Gorse\" }");
            var routeJson = Console.ReadLine();
            var route = JsonConvert.DeserializeObject<RouteModel>(routeJson);
            Channel channel = new Channel("127.0.0.1:5000", ChannelCredentials.Insecure);

            var client = new VehicleGpsListener.VehicleGpsListenerClient(channel);

            var rb = new RouteBuilder();

            var path = rb.GetPath(Planet.All[route.From], Planet.All[route.To]);

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
