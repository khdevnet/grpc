using System;
using System.Collections.Generic;
using System.Text;

namespace Grpc.Common
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
        public static MapObject Dantooine { get; } = new MapObject(177, 29, nameof(Dantooine));
        public static MapObject Scipio { get; } = new MapObject(102, 101, nameof(Scipio));
        public static MapObject Ithor { get; } = new MapObject(209, 191, nameof(Ithor));
        public static MapObject OrdMantell { get; } = new MapObject(148, 245, nameof(OrdMantell));
        public static MapObject Balnab { get; } = new MapObject(173, 307, nameof(Balnab));
        public static MapObject Shili { get; } = new MapObject(238, 354, nameof(Shili));
        public static MapObject Coruscant { get; } = new MapObject(189, 474, nameof(Coruscant));
        public static MapObject Abafar { get; } = new MapObject(548, 168, nameof(Abafar));
        public static MapObject Dathomir { get; } = new MapObject(560, 206, nameof(Dathomir));
        public static MapObject Serenno { get; } = new MapObject(663, 112, nameof(Serenno));
        public static MapObject Jelucan { get; } = new MapObject(793, 38, nameof(Jelucan));
        public static MapObject Yavin { get; } = new MapObject(727, 169, nameof(Yavin));
        public static MapObject Maridun { get; } = new MapObject(782, 198, nameof(Maridun));
        public static MapObject StygeonPrime { get; } = new MapObject(842, 239, nameof(StygeonPrime));
        public static MapObject Mandalore { get; } = new MapObject(614, 259, nameof(Mandalore));
        public static MapObject Shantipole { get; } = new MapObject(800, 372, nameof(Shantipole));
        public static MapObject Onderon { get; } = new MapObject(620, 467, nameof(Onderon));
        public static MapObject Kashyyyk { get; } = new MapObject(749, 465, nameof(Kashyyyk));
        public static MapObject Alderan { get; } = new MapObject(454, 492, nameof(Alderan));
        public static MapObject Kuat { get; } = new MapObject(480, 532, nameof(Kuat));
        public static MapObject Gorse { get; } = new MapObject(602, 553, nameof(Gorse));
        public static MapObject Ruusan { get; } = new MapObject(760, 562, nameof(Ruusan));


        public static readonly Dictionary<string, MapObject> All = new Dictionary<string, MapObject>();

        static Planet()
        {
            Add(Dantooine);
            Add(Scipio);
            Add(Ithor);
            Add(OrdMantell);
            Add(Balnab);
            Add(Shili);
            Add(Coruscant);
            Add(Abafar);
            Add(Dathomir);
            Add(Serenno);
            Add(Jelucan);
            Add(Yavin);
            Add(Maridun);
            Add(StygeonPrime);
            Add(Mandalore);
            Add(Shantipole);
            Add(Onderon);
            Add(Kashyyyk);
            Add(Alderan);
            Add(Kuat);
            Add(Gorse);
            Add(Ruusan);
        }

        private static void Add(MapObject mapObject)
        {
            All.Add(mapObject.ToString(), mapObject);
        }
    }
}
