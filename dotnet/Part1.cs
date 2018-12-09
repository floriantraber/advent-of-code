using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Xml.Schema;
using Xunit;

namespace dotnet {
    public class Day10Part1 {
        public int Run(int players, int lastMarblePoints) {
            return 0;
        }
    }

    public class Day10Part1Test {
        [Fact]
        public void TestWithTestData() {
            var day = new Day10Part1();

            var result = day.Run(9, 25);

            Assert.Equal(32, result);
        }


        [Fact]
        public void TestWithRealInput() {
            var day = new Day10Part1();

            var result = day.Run(446, 71522);
            Assert.Equal(390592, result);
        }
    }
}