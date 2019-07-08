using Dijkstra.NET.Graph;
using Dijkstra.NET.ShortestPath;
using Grpc.Truck.Planets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Grpc.Truck
{
    public class RouteBuilder
    {
        private readonly Graph<MapObject, string> graph;
        private readonly Dictionary<MapObject, uint> planetNodeMap;
        private readonly Dictionary<uint, MapObject> nodePlanetMap;

        public RouteBuilder()
        {
            graph = new Graph<MapObject, string>();
            planetNodeMap = new Dictionary<MapObject, uint>();
            nodePlanetMap = new Dictionary<uint, MapObject>();
            AddNode(Planet.Coruscant);
            AddNode(Planet.Dathomir);
            AddNode(Planet.Dantooine);

            ConnectBiDirectional(Planet.Coruscant, Planet.Dathomir);
            ConnectBiDirectional(Planet.Dathomir, Planet.Dantooine);
            ConnectBiDirectional(Planet.Coruscant, Planet.Dantooine);

        }

        private void AddNode(MapObject planet)
        {
            var node = graph.AddNode(planet);
            planetNodeMap.Add(planet, node);
            nodePlanetMap.Add(node, planet);
        }

        public Queue<MapObject> GetPath(MapObject start, MapObject end)
        {
            ShortestPathResult result = graph.Dijkstra(GetNode(start), GetNode(end)); //result contains the shortest path
            var path = result.GetPath().Select(node => nodePlanetMap[node]);
            return new Queue<MapObject>(path);
        }

        private void ConnectBiDirectional(MapObject start, MapObject end)
        {
            Connect(start, end);
            Connect(end, start);
        }

        private void Connect(MapObject start, MapObject end)
        {
            graph.Connect(GetNode(start), GetNode(end), GetDestination(start, end), $"{start} to {end}");
        }

        private uint GetNode(MapObject planet)
        {
            planetNodeMap.TryGetValue(planet, out var node);
            return node;
        }

        private int GetDestination(MapObject start, MapObject end)
        {
            return (int)Math.Sqrt(Math.Pow(end.X - start.X, 2) + Math.Pow(end.Y - start.Y, 2));
        }

    }
}
