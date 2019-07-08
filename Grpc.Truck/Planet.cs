using System;
using System.Collections.Generic;
using System.Text;

namespace Grpc.Truck.Planets
{
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
    public static class Planet
    {

        public static MapObject Dathomir { get; } = new MapObject(560, 206, nameof(Dathomir));

        public static MapObject Coruscant { get; } = new MapObject(189, 474, nameof(Coruscant));

        public static MapObject Dantooine { get; } = new MapObject(177, 29, nameof(Dantooine));

        public static readonly Dictionary<string, MapObject> All = new Dictionary<string, MapObject>();

        static Planet()
        {
            Add(Dathomir);

        }

        private static void Add(MapObject mapObject)
        {
            All.Add(mapObject.ToString(), mapObject);
        }
    }
}
