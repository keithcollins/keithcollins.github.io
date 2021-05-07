---
title: "Pathfinding tests"
slug: "2016-08-24-pathfinding_tests"
date: "2016-08-24"
---
Now that I have pathfinding running smoothly, I tried out some tests. Here it is with many units trying to get to the same point from random points on the map:

<img src="/images/maze.gif">

The toughest part of this was dynamically finding a place for each of them to stop without overlapping with each other. To do that I kind of used a poor man's breadth-first search for each unit, looking at the neighbors of its goal point to find a free time, then neighbors of that neighbor, etc. It works _okay_, but not perfectly. I've decided I'll wait to solve that problem until I'm sure I need to in an actual game.

I also added forest tiles (the brown ones) and gave them a movement cost of five, to see how the guys would navigate around it:

<img src="/images/forest.gif">

A very helpful and smart developer on Reddit said this test isn't quite conclusive though, and suggested I try it with a couple of other setups:

"After looking at the gif, I noticed something. The forest looks to be 9 tiles vertically. The cost to go straight through is 5*9, which is 45. That's a much higher cost than going around the forest perimeter where normal tiles are 1 each. Maybe that's okay, and you want forests to be something the ship travels through on rare occasions. That's up to you."

"However, to see if forest tiles are implemented correctly, try these tests and any similar ones you can come up with: a test where the goal tile is completely surrounded by a ring of forest tiles, a forest that is only 1 tile high instead of 9, and a U shape forest to see if the ships go around the U or straight through the forest. The layout you have in the gif makes the forest too expensive, so we can't say for sure if they are implemented properly."

I'll definitely try those tests out soon.

