using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Security.Cryptography;
using System.Xml.Schema;
using Xunit;

namespace dotnet {
    public class Day10Part1 {
        private Star[] stars;
        private int moves = 0;

        public void Run(string input) {
            string[] lines = input.Split(
                new[] {Environment.NewLine},
                StringSplitOptions.None
            );

            stars = new Star[lines.Length];
            for (int i = 0; i < lines.Length; i++) {
                stars[i] = new Star(lines[i]);
            }

            for (var i = 0; i < 10603; i++) {
                MoveStars(stars);
            }

            MoveStars(stars);
            PrintStars(stars);
            MoveStars(stars);
            PrintStars(stars);
        }

        private void MoveStars(Star[] stars) {
            moves++;
            foreach (var star in stars) {
                star.Move();
            }

            Console.WriteLine("moves " + moves);
        }

        private void PrintStars(Star[] stars) {
            var positions = stars.Select(x => x.Position).ToList();


            var minX = positions.Select(x => x.X).Min();
            var maxX = positions.Select(x => x.X).Max();
            var minY = positions.Select(x => x.Y).Min();
            var maxY = positions.Select(x => x.Y).Max();

            int[][] grid = new int[Math.Abs(minY) + Math.Abs(maxY) + 1][];
            if (Math.Abs(maxY - minY) > 100
                || Math.Abs(maxX - minX) > 100) {
                return;
            }

            positions.ForEach(pos => {
                if (grid[Math.Abs(minY) + pos.Y] == null) {
                    grid[Math.Abs(minY) + pos.Y] = new int[Math.Abs(minX) + Math.Abs(maxX) + 1];
                }

                grid[Math.Abs(minY) + pos.Y][Math.Abs(minX) + pos.X] = 1;
            });
            for (int y = 0; y < grid.Length; y++) {
                if (grid[y] != null) {
                    string line = "";
                    for (int x = 0; x < grid[y].Length; x++) {
                        if (grid[y] != null && grid[y][x] == 1) {
                            line += "#";
                        } else {
                            line += " ";
                        }
                    }

                    Console.WriteLine(line);
                }
            }

            Console.WriteLine();
            Console.WriteLine("----------------------------");
            Console.WriteLine();
        }

        class Star {
            public Point Position { get; set; }
            public int VelocityX { get; set; }
            public int VelocityY { get; set; }

            public override string ToString() {
                return
                    $"{nameof(Position)}: {Position}, {nameof(VelocityX)}: {VelocityX}, {nameof(VelocityY)}: {VelocityY}";
            }

            public Star(string input) {
                int x = Convert.ToInt32(input.Split("position=<")[1].Split(", ")[0]);
                int y = Convert.ToInt32(input.Split("position=<")[1].Split(", ")[1].Split(">")[0]);
                Position = new Point(x, y);
                VelocityX = Convert.ToInt32(input.Split("position=<")[1].Split(", ")[1].Split("=<")[1]);
                VelocityY = Convert.ToInt32(input.Split("position=<")[1].Split(", ")[2].Replace(">", ""));
            }

            public void Move() {
                Position = new Point(Position.X + VelocityX, Position.Y + VelocityY);
            }
        }
    }
}