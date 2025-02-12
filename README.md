# Frontend Tasks
This repository contains a series of frontend tasks designed to gain familiarity with the main APIs of Novorender SDK

## Repository Setup
- React + TypeScript + vite

### 1. Load Scene

#### Description:
- Load the condos scene with ID `95a89d20dd084d9486e383e131242c4c`.
- The canvas should take up the entire width and height of the browser window.
- The view's camera controller should be a `"flight"` controller.
- You should be able to see the condos building and move around in the 3D scene.

### 2. Store Camera Positions

#### Description:
- Create 3 buttons on top of the Canvas.
- Each button should work as follows:
  - `Shift + Left click`: Save current camera position and rotation.
  - `Left click`: Go to the stored position and rotation.
- You should be able to move around the 3D scene and save up to 3 positions to jump back to.


### 3. Isolate Objects

#### Description:
- Create a form with a single text input element and a submit button on top of the Canvas.
- The form should work as follows:
  - Search the scene for objects containing the input string.
  - If any results (e.g., search for `"chair"`):
    - Hide all other objects.
    - Show only the results in their neutral colors.
  - If no result (e.g., search for `"choir"`):
    - Show all objects in their neutral colors.
  - Abort the currently running search if a new one is starting.
- You should be able to search for objects and isolate them so that only objects matching the search string are displayed.
- You should also be able to show all objects again by searching for a string that returns no results.


#### Demo:
- [Video Demo](https://drive.google.com/file/d/1nvDAFyGVmOERWLtCN7wZJhvF13yXXlSC/view?usp=drive_link)

## How to Run the Project

1. Clone the repository:
   ```sh
   git clone https://github.com/ragini-pandey-dev/my-novorender-app.git
   
2. Navigate to the project directory:
   ```sh
   cd my-novorender-app

3. Install the dependencies:
   ```sh
   npm install
   
4. Start the development server:
   ```sh
   npm run dev