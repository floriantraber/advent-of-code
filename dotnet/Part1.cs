using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace dotnet {
    public class Day9Part1 {
        public int Run(string input) {
        }
    }

    public class Day9Part1Test {
        [Fact]
        public void TestWithTestData() {
            var day = new Day9Part1();

            var result = day.Run("2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2");

            Assert.Equal(66, result);
        }

        [Fact]
        public void TestWithRealInput() {
            var day = new Day9Part1();

            var result = day.Run("");
            Assert.Equal(22989, result);
        }
    }
}