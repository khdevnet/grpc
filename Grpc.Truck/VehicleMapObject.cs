using Grpc.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VehicleGps;

namespace Grpc.Truck
{
    public class VehicleMapObject : MapObject
    {
        private readonly MapObject start;
        private readonly MapObject destination;
        private readonly int step;

        public VehicleMapObject(MapObject start, MapObject destination, int step) : base(start.X, start.Y)
        {
            this.start = start;
            this.destination = destination;
            this.step = step;
        }

        public bool isArrived()
        {
            return X == destination.X && Y == destination.Y;
        }

        public VehicleGpsRequest Move()
        {
            if (IsMoveRight(destination.X))
            {
                X += step;
            }

            if (IsMoveLeft(destination.X))
            {
                X -= step;
            }

            if (IsMoveUp(destination.Y))
            {
                Y -= step;
            }

            if (IsMoveDown(destination.Y))
            {
                Y += step;
            }

            return new VehicleGpsRequest
            {
                X = X,
                Y = Y,
                Direction = GetDirection()
            };
        }

        public bool IsMoveUp(int endY)
        {
            return Y > endY;
        }

        public bool IsMoveDown(int endY)
        {
            return Y < endY;
        }

        public bool IsMoveRight(int endX)
        {
            return X < endX;
        }

        public bool IsMoveLeft(int endX)
        {
            return X > endX;
        }

        private string GetDirection()
        {
            if (IsMoveLeft(destination.X) && IsMoveUp(destination.Y))
            {
                return Direction.Northwest.ToString();
            }

            if (IsMoveRight(destination.X) && IsMoveUp(destination.Y))
            {
                return Direction.Northeast.ToString();
            }

            if (IsMoveRight(destination.X) && IsMoveDown(destination.Y))
            {
                return Direction.Northeast.ToString();
            }

            if (IsMoveLeft(destination.X) && IsMoveDown(destination.Y))
            {
                return Direction.Southwest.ToString();
            }

            if (IsMoveLeft(destination.X))
            {
                return Direction.West.ToString();
            }

            if (IsMoveUp(destination.Y))
            {
                return Direction.North.ToString();
            }

            if (IsMoveRight(destination.X))
            {
                return Direction.East.ToString();
            }

            if (IsMoveDown(destination.Y))
            {
                return Direction.South.ToString();
            }

            return Direction.South.ToString();
        }
    }
}
