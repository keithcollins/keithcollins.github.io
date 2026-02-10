---
title: "Explorations in video game development (2016)"
postSlug: "2016-08-29-what-im-building"
date: "2016-08-29"
type: "post"
---
So this is a pretty crappy gif but it represents a bit of a breakthrough:

<img src="/images/turnbased.gif">

I've implemented very basic turn-based combat and very simple AI, both of which use the pathfinding algorithm I've been working on. I've also switched from 2d to 2.5d. That is, I'm using 2d sprites in a 3d environment with an isometric/orthograhpic camera, and I've switched from using the XY plane to using XZ. I'm _pretty_ sure I'm going to stick with this setup going forward, but there are many pros and cons to each option.

In any case, I'm feeling comfortable enough with C# and Unity that I think I can start working toward making an actual game. My goal is to make an isometric city builder with turn-based tactical combat. Those are my two favorite game genres, and I think they could go together really well. Some of my favorite city builders, like SimCity, Cities Skylines and Banished have no combat. And some of my favorite turn-based combat games, like Final Fantasy Tactics, Jeanne d'Arc, Front Mission 4 and even Xcom EU/EW/2 have amazing combat, but everything between the battles has always felt like perfunctory busy-work to me.

And since I'm brand new to game development and only have the vaguest idea of what I'm doing, why not take on what I consider to be a longstanding flaw in video games! No, I've been a programmer for long enough to know that it's a bad idea to take on such a large project while learning a new language and a new system. I should be trying something easier. However, two things. One, I can't learn new concepts in the abstract--I have to get my hands dirty. Two, in order to stay interested, I have to go for a project I can really engage in.

There's a very good chance I will hit a brick wall eventually and not finish this game. But even if that happens, I'll have learned a lot by the time I get there.

### Pathfinding tests
2016-08-24

Now that I have pathfinding running smoothly, I tried out some tests. Here it is with many units trying to get to the same point from random points on the map:

<img src="/images/maze.gif">

The toughest part of this was dynamically finding a place for each of them to stop without overlapping with each other. To do that I kind of used a poor man's breadth-first search for each unit, looking at the neighbors of its goal point to find a free time, then neighbors of that neighbor, etc. It works _okay_, but not perfectly. I've decided I'll wait to solve that problem until I'm sure I need to in an actual game.

I also added forest tiles (the brown ones) and gave them a movement cost of five, to see how the guys would navigate around it:

<img src="/images/forest.gif">

A very helpful and smart developer on Reddit said this test isn't quite conclusive though, and suggested I try it with a couple of other setups:

"After looking at the gif, I noticed something. The forest looks to be 9 tiles vertically. The cost to go straight through is 5*9, which is 45. That's a much higher cost than going around the forest perimeter where normal tiles are 1 each. Maybe that's okay, and you want forests to be something the ship travels through on rare occasions. That's up to you."

"However, to see if forest tiles are implemented correctly, try these tests and any similar ones you can come up with: a test where the goal tile is completely surrounded by a ring of forest tiles, a forest that is only 1 tile high instead of 9, and a U shape forest to see if the ships go around the U or straight through the forest. The layout you have in the gif makes the forest too expensive, so we can't say for sure if they are implemented properly."

I'll definitely try those tests out soon.


### Another A* pathfinding gif
2016-08-22

I worked out a bunch of kinks and this guy now hugs corners like a pro:

<img src="/images/ship2.gif">

He was previously having trouble with turns:

<img src="/images/up.png">

But I eventually figured out that this was a bug related to how I was building maps. Right Now I'm simply using text files to define grids, like this:

```js
W W W W W W W W W W W W W W W W W W W W W W W
W F F W F F F F F F F F W F F F F F F F F F W
W F F W W W W F F W F F W W W W W W W F F F W
W F F F F F F F F W F F F F F F F F W F W F W
W W W W W W W W W W W W W F F W F F W W W F W
W F F F F F F F F W F F F F F W F F F F F F W
W F F W F F W W W W F F W W W W W W W W W W W
W F F W F F F F F F F F F F F W F F F F F F W
W F F W W W W W W W W W W W W W F F W F F F W
W F F W F F F F F F F F F F F F F F W F F F W
W F F W W W W W W W W W W W W W W W W F F F W
W F F F F F F F F W F F F F F W F F F F F F W
W W W W F F W W W W F F W F F W F F W F F F W
W F F W F F W F F F F F W F F W F F W F F F W
W F F W F F W F F W W W W F F W F F W F F F W
W F F W F F W F F W F F F F F W F F W F F F W
W F F W F F W F F W F F W W W W W W W F F F W
W F F F F F F F F W F F W F F F F F F F F F W
W W W W F F W W W W F F W F F W W W W W W W W
W F F F F F W F F F F F W F F W F F F F F F W
W F F W W W W F F W W W W F F W F F W F F F W
W F F W F F W F F F F F F F F W F F W F F F W
W F F F F F W F F F F F W F F F F F W F F F W
W W W W W W W W W W W W W W W W W W W W W W W
```

Where `W` = wall and `F` = floor. The problem was in the script where I parse this text. For each character, I instantiate and position gameobjects to represent each tile, and set a movement cost for each of them. The bug was really just a dumb mistake. Rather than writing something like, `if char = "F"` for floor tiles, I wrote something like `if char = "G"`. I guess when I wrote it I was thinking G for ground rather than F for floor. So dumb.

The floor tiles should have a movement cost of 1, but were getting nothing instead. So when A* was trying to find the path, all `F` tiles cost nothing, so it had no reason to choose one route over another--it was all free. Kind of cool actually, how it ended up choosing routes kind of at random.


### A* pathfinding
2016-08-18

<img src="/images/ship.gif">

I recently I [took a shot](https://gist.github.com/keithcollins/307c3335308fea62db2731265ab44c06) at implementing an A* (a-star) pathfinding algorithm in Unity. Much of the work draws from Red Blob's [C# implementation](http://www.redblobgames.com/pathfinding/a-star/implementation.html#csharp) of A*, with a few changes to make it work in a Unity project and a little bit of optimization. It seems to be working well, but keep in mind that this is my first attempt and I'm still new to Unity. Also, I don't expect to keep updating the script I've uploaded here as I work on it within my project.

If you're new to pathfinding (like me), check out Red Blob's wonderful[pathfinding tutorial](http://www.redblobgames.com/pathfinding/a-star/introduction.html) for a primer. The script is extensively commented, but here are a few notes:

This `enum` defines the types of possible tiles to `SquareGrid`:

```csharp
public enum TileType {
  Floor = 1,
  Forest = 5,
  Wall = System.Int32.MaxValue
}
```

Note that Floor, Forest and Wall are somewhat arbitrary, but also represent three different types of tiles, which are all handled differently by A*. Floors are Passable, walls are not, and forests are passable with a higher movement cost. You'll want to customize this to fit your use case. One thing to consider is to create a type like `Occupied`, so you can keep track of tiles that sprites are currently using.

The `DIRS` array is also worth checking out:

```csharp
public static readonly Location[] DIRS = new [] {
  new Location(1, 0), // to right of tile
  new Location(0, -1), // below tile
  new Location(-1, 0), // to left of tile
  new Location(0, 1), // above tile
  new Location(1, 1), // diagonal top right
  new Location(-1, 1), // diagonal top left
  new Location(1, -1), // diagonal bottom right
  new Location(-1, -1) // diagonal bottom left
};
```
The `DIRS` array is important in the pathfinding step where we look for a given tile's neighbors. In Red Blob's tutorial and implementation, it only looked for neighbors above, below, and next to each tile. That leads to paths along straight lines and prohibits diagonal movement, which feels weird when you see it in action. So I added diagonals to the directions above. I've noticed at least one issue this creates, though. If there are two walls that are diagonal to each other, the sprite can pass diagonally through them. I have a few ideas to solve this, but if anyone knows a good solution, please leave a comment.

For diagonal movement to work well, we also have to make diagonal movement cost a little more than regular movement:

```csharp
// If the heuristic = 2f, the movement is diagonal
public float Cost(Location a, Location b) {
  if (AStarSearch.Heuristic(a,b) == 2f) {
    return (float)(int)tiles[b.x,b.z] * Mathf.Sqrt(2f);
  }
  return (float)(int)tiles[b.x,b.z];
}
```

If the heuristic between a and b is 2, the movement is diagonal and its cost should be the cost of the tile multiplied by the square root of 2. Where each of the sides of a floor tile have a length of 1, for exmple, Sqrt(2) is the literal length of the diagonal. And we can apply the same forumla to tiles of higher costs as well.

### Rotating a camera around a point
2016-07-22

<img src="/images/camera.gif">

I've been digging into C# and Unity for the past few weeks and thought I might start sharing my progress as I go. This post is instructional, partly so that I remember what I did. But I don't expect many future posts to be how-tos so much as thoughts and insights.

Tonight I learned how to rotate a camera around a target object (probably a player character) in both directions. This should work for various setups, but I'm using an orthographic/isometric angle and rotating only around the Y axis at 45, 135, 225 and 315 degrees. This should work whether your camera is set to Orthographic or Perspective.

## Scene setup

1. Add an empty GameObject to the project Hierarchy pane.
2. Name it something like `CameraParent` and drag your Main Camera into it.
3. Give `CameraParent` these settings in its Transform: Position 0,0,0; Rotation 30,45,0; Scale 1,1,1.
4. Make sure the Main Camera's Transform has these settings: Position 0,0,-10; Rotation 0,0,0; Scale 1,1,1.
5. Add a 3D cube to the Hierarchy, rename it to `Player`, tag it as `Player`, and give it a Rigidbody component.
4. Give player these settings in Transform: Position 0,5,0; Rotation 0,0,0; Scale 1,1.7,1.
5. Add some kind of ground for the `Player` to stand on at Position 0,0,0. Make sure it has a Box Collider and does not have a Rigidbody.
6. Create a C# script called `CameraControl` and drag it onto `CameraParent` to attach it as a component.
7. Open CameraControl.cs in whatever text editor.

Rather than step through the script, here's the entire thing with detailed comments:

```csharp
using UnityEngine;
using System.Collections;
// Be sure to include System.Collections.Generic in order to use a List, which is like an Array:
using System.Collections.Generic;

public class CameraControl : MonoBehaviour {

  // "Speed" of rotation, must be between 0 and 1
  // Iterates from this number to one in each frame after a rotate is started,
  // so lower is slower.
  public float rotateSpeed = 0.06f;

  // Declare a list to hold all possible camera rotation positions
  private List<Quaternion> allRotations;
  // Declare a starting index for that List
  private int currentIndex;

  // Use this for initialization
  void Start () {
    // Define the allRotations list if it's null
    if (allRotations == null) {
      allRotations = new List<Quaternion>();
    }
    // Add all possible rotations to List
    allRotations.Add(Quaternion.Euler(30, 45, 0));
    allRotations.Add(Quaternion.Euler(30, 135, 0));
    allRotations.Add(Quaternion.Euler(30, 225, 0));
    allRotations.Add(Quaternion.Euler(30, 315, 0));
    // Set index to start at first Quaternion in List
    currentIndex = 0;
  }

  // Update is called once per frame
  void Update () {
    // Get player position
    GameObject player = GameObject.Find("Player");
    Vector3 pos = player.transform.position;

    // Follow player. This is only necessary if you have another script setup to
    // move the player around.
    Vector3 cameraPos = this.transform.position;
    cameraPos.x = pos.x;
    cameraPos.z = pos.z;
    this.transform.position = cameraPos;

    // Initiate rotation direction based on key input
    // Q rotates to left
    // E rotates to right
    if (Input.GetKeyDown(KeyCode.Q)) {
      currentIndex = (currentIndex < 3) ? currentIndex + 1 : 0;
      RotateCamera();
    } else if (Input.GetKeyDown(KeyCode.E)) {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : 3;
      RotateCamera();
    }

    // If the rotation Quaternion in this frame does not match one in the List,
    // go to Slerp in RotateCamera to continue rotation iteration.
    // This could probably be done in a for loop between rotateSpeed and 1.0 using
    // Lerp instead of Slerp, but not sure.
    if (allRotations.IndexOf(this.transform.rotation) == -1) {
      RotateCamera();
    }
  }

  // Rotate the camera
  // Quaternion Slerp(Quaternion from, Quaternion to, float t);
  // Slerp spherically interpolates between 'from' and 'to' by t.
  // The parameter t is clamped to the range [0, 1].
  void RotateCamera () {
    this.transform.rotation = Quaternion.Slerp(this.transform.rotation, allRotations[currentIndex], rotateSpeed);
  }
}
```

