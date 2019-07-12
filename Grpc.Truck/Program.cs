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
            Console.WriteLine($"[{string.Join(',', Planet.All.Keys)}]");

            Channel channel = new Channel("127.0.0.1:5000", ChannelCredentials.Insecure);
            var client = new VehicleGpsListener.VehicleGpsListenerClient(channel);

            var input = "";

            while (input != "exit")
            {
                Console.WriteLine("Enter route in format : {\"from\":\"Dantooine\",\"to\": \"Gorse\" }");
                Console.WriteLine("For exit type: exit");
                input = Console.ReadLine();
                var route = new RouteModel()
                {
                    From = "Dantooine",
                    To = "Gorse"
                };
                if (!string.IsNullOrEmpty(input))
                {
                    route = JsonConvert.DeserializeObject<RouteModel>(input);
                }
                await SimulateRoute(client, route);
            }


            channel.ShutdownAsync().Wait();

            Console.ReadLine();
        }

        private static async Task SimulateRoute(VehicleGpsListener.VehicleGpsListenerClient client, RouteModel route)
        {
            var path = new RouteBuilder().GetPath(Planet.All[route.From], Planet.All[route.To]);

            using (var call = client.StreamGps())
            {
                MapObject current = path.Dequeue();
                MapObject next;
                while (path.Any())
                {
                    next = path.Dequeue();

                    var vehicle = new VehicleSimulator(current, next, 1);
                    while (!vehicle.isArrived())
                    {
                        await call.RequestStream.WriteAsync(vehicle.Move());
                        await Task.Delay(300);
                    }

                    current = next;
                }

                await call.RequestStream.CompleteAsync();

                var summary = await call.ResponseAsync;
                Console.WriteLine("You arrived to Destination.");
            }

        }
    }
}
