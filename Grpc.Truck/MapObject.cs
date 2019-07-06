using System;
using System.Collections.Generic;
using System.Text;

namespace Grpc.Truck
{
    public class MapObject
    {
        public MapObject(int x, int y)
        {
            X = x;
            Y = y;
        }

        public int X { get; protected set; }
        public int Y { get; protected set; }

    }
}
