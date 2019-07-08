using System;
using System.Collections.Generic;
using System.Text;

namespace Grpc.Common
{
    public class MapObject
    {
        private readonly string key;

        public MapObject(int x, int y, string key = "")
        {
            X = x;
            Y = y;
            this.key = key;
        }

        public int X { get; protected set; }
        public int Y { get; protected set; }
        public override string ToString()
        {
            return !string.IsNullOrEmpty(key) ? key : $"{{x:{X},y:{Y}}}";
        }
    }
}
