using System;
using System.Collections.Generic;
using System.Text;
using VehicleGps;

namespace Grpc.Truck
{
    public class VehicleMapObject : MapObject
    {
        private readonly StartMapObject start;
        private readonly DestinationMapObject destination;
        private readonly int step;

        public VehicleMapObject(StartMapObject start, DestinationMapObject destination, int step) : base(start.X, start.Y)
        {
            this.start = start;
            this.destination = destination;
            this.step = step;
        }

        public bool isArrived()
        {
            return start.X == destination.X && start.Y == destination.Y;
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
                Direction = ""
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
    }
}
