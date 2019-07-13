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
            await Task.Delay(15000);
            Console.WriteLine("Grpc client connected to: 127.0.0.1:5000");
            Channel channel = new Channel("127.0.0.1:5000", ChannelCredentials.Insecure);
            var client = new VehicleGpsListener.VehicleGpsListenerClient(channel);

            using (var routeStream = client.ListenRoute())
            {
                while (await routeStream.ResponseStream.MoveNext())
                {
                    Console.WriteLine("Wait for route:");
                    var route = ToRouteModel(routeStream.ResponseStream.Current);
                    if (!string.IsNullOrEmpty(route.From))
                    {
                        Console.WriteLine($"Route:{route.From} > {route.To}");
                        await SimulateRoute(client, route);
                    }
                }
            }

            channel.ShutdownAsync().Wait();

            Console.ReadLine();
        }

        private static RouteModel ToRouteModel(RouteResponse response)
        {
            return new RouteModel
            {
                From = response.From,
                To = response.To
            };
        }

        private static async Task SimulateRoute(VehicleGpsListener.VehicleGpsListenerClient client, RouteModel route)
        {
            var path = new RouteBuilder().GetPath(Planet.All[route.From], Planet.All[route.To]);

            Console.WriteLine("Path: ");
            Console.WriteLine($"[{string.Join(',', path)}]");

            using (AsyncClientStreamingCall<VehicleGpsRequest, Reply> call = client.StreamGps())
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
