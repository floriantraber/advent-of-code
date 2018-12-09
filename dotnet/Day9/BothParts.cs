using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace dotnet.Day9 {
    public class Day9Part1 {
        public long Run(int players, int lastMarblePoints) {
            LinkedList<long> marbles = new LinkedList<long>();
            marbles.AddFirst(0L);
            long[] scores = new long[players];
            LinkedListNode<long> currentMarble = marbles.First;

            for (int i = 1; i <= lastMarblePoints; i++) {
                if (i % 23 == 0) {
                    scores[i % players] += i;
                    for (int j = 0; j < 6; j++) {
                        currentMarble = GetPrevious(currentMarble);
                    }

                    var toRemove = GetPrevious(currentMarble);
                    marbles.Remove(toRemove);
                    scores[i % players] += toRemove.Value;
                } else {
                    currentMarble = GetNext(currentMarble);
                    marbles.AddAfter(currentMarble, i);
                    currentMarble = GetNext(currentMarble);
                }
            }

            return scores.Max();
        }

        private LinkedListNode<T> GetPrevious<T>(LinkedListNode<T> marble) {
            return marble.Previous ?? marble.List.Last;
        }

        private LinkedListNode<T> GetNext<T>(LinkedListNode<T> marble) {
            return marble.Next ?? marble.List.First;
        }
    }

    public class Day9Part1Test1 {
        [Theory]
        [InlineData(9, 25, 32)]
        [InlineData(10, 1618, 8317)]
        [InlineData(13, 7999, 146373)]
        [InlineData(17, 1104, 2764)]
        [InlineData(21, 6111, 54718)]
        [InlineData(30, 5807, 37305)]
        public void TestWithTestData(int players, int lastMarblePoints, long expected) {
            var day = new Day9Part1();

            var result = day.Run(players, lastMarblePoints);

            Assert.Equal(expected, result);
        }

        [Fact]
        public void TestWithRealInput() {
            var day = new Day9Part1();

            var result = day.Run(446, 71522);
            Assert.Equal(390592, result);
        }

        [Fact]
        public void TestWithRealInputPart2() {
            var day = new Day9Part1();

            var result = day.Run(446, 71522 * 100);
            Assert.Equal(3277920293, result);
        }
    }
}