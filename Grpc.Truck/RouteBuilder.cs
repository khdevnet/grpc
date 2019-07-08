using Dijkstra.NET.Graph;
using Dijkstra.NET.ShortestPath;
using Grpc.Common;
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
        //Dantooine 177,29
        //Scipio 102, 101
        //Ithor 209, 191
        //OrdMantell 148,245
        //Balnab 173,307
        //Shili 238,354
        //Coruscant 189,474
        //Abafar 548,168
        //Dathomir 560,206
        //Serenno 663,112
        //Jelucan 793,38
        //Yavin 727,169
        //Maridun 782,198
        //StygeonPrime 842,239
        //Mandalore 614,259
        //Shantipole 800,372
        //Onderon 620,467
        //Kashyyyk 749,465
        //Alderan 454,492
        //Kuat 480,532
        //Gorse 602,553
        //Ruusan 760,562
        public RouteBuilder()
        {
            graph = new Graph<MapObject, string>();
            planetNodeMap = new Dictionary<MapObject, uint>();
            nodePlanetMap = new Dictionary<uint, MapObject>();
            Planet.All.Values.ToList().ForEach(p => AddNode(p));

            ConnectBiDirectional(Planet.Dantooine, Planet.Scipio);
            ConnectBiDirectional(Planet.Scipio, Planet.Ithor);
            ConnectBiDirectional(Planet.Ithor, Planet.OrdMantell);
            ConnectBiDirectional(Planet.Ithor, Planet.Shili);
            ConnectBiDirectional(Planet.Ithor, Planet.Balnab);
            ConnectBiDirectional(Planet.OrdMantell, Planet.Balnab);
            ConnectBiDirectional(Planet.OrdMantell, Planet.Shili);
            ConnectBiDirectional(Planet.Shili, Planet.Coruscant);
            ConnectBiDirectional(Planet.Balnab, Planet.Coruscant);

            ConnectBiDirectional(Planet.Ithor, Planet.Abafar);
            ConnectBiDirectional(Planet.Ithor, Planet.Dathomir);
            ConnectBiDirectional(Planet.Shili, Planet.Mandalore);
            ConnectBiDirectional(Planet.Shili, Planet.Dathomir);
            ConnectBiDirectional(Planet.Dathomir, Planet.Serenno);
            ConnectBiDirectional(Planet.Dathomir, Planet.Mandalore);
            ConnectBiDirectional(Planet.Dathomir, Planet.Abafar);
            ConnectBiDirectional(Planet.Abafar, Planet.Serenno);
            ConnectBiDirectional(Planet.Serenno, Planet.Jelucan);
            ConnectBiDirectional(Planet.Serenno, Planet.Yavin);
            ConnectBiDirectional(Planet.Yavin, Planet.StygeonPrime);
            ConnectBiDirectional(Planet.StygeonPrime, Planet.Maridun);
            ConnectBiDirectional(Planet.Mandalore, Planet.Shantipole);
            ConnectBiDirectional(Planet.Shantipole, Planet.Onderon);
            ConnectBiDirectional(Planet.Shantipole, Planet.Kashyyyk);
            ConnectBiDirectional(Planet.Onderon, Planet.Alderan);
            ConnectBiDirectional(Planet.Onderon, Planet.Kashyyyk);
            ConnectBiDirectional(Planet.Onderon, Planet.Gorse);
            ConnectBiDirectional(Planet.Onderon, Planet.Kuat);
            ConnectBiDirectional(Planet.Alderan, Planet.Kuat);
            ConnectBiDirectional(Planet.Kashyyyk, Planet.Ruusan);
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
