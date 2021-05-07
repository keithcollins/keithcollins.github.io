---
title: "Rotating a camera around a point"
slug: "2016-07-22-rotate_camera"
date: "2016-07-22"
---

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

