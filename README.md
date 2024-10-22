# 3D Scene with Three.js : Scape Church

![image](https://github.com/user-attachments/assets/798ebda4-e722-4957-aa2a-9df37b8cc926)

## Project Explanation
This scene is a type of interactive 3D simulation or video game created using the Three.js library, which is a tool for working with 3D graphics on the web. The scene includes various elements, explained in simple terms below:

1. **The Camera**: Think of the camera as your "view" within the 3D world. This camera lets you look around in all directions, and you can move using the keyboard (W to move forward and S to move backward) or the mouse.
   
2. **Lighting**: There are several lights in the scene that illuminate objects, much like in a real room. Some lights are general, while others are focused on specific parts of the scene. For example, there is a light in "Room 1" and another one illuminating an important object.

3. **Objects**: The scene contains various objects, such as:
   - **Table, Shelf, Vase**: Everyday objects placed in specific locations.
   - **Crucifix, Virgin Mary, Candles, Chalice**: Religious objects that seem important to the scene.
   - **Paintings**: There are several pictures or paintings on the walls with religious themes.
   - **Maze**: This seems to be a part of the game, possibly a challenge the player must overcome.
   - **Priest**: There is a model or figure of a priest, who may give hints in the game.

4. **Collisions and Movement**: The system detects if you collide with an object while moving. Additionally, some objects may change or move when you interact with them.

5. **Interactivity**: You can interact with certain objects using the mouse. For instance, clicking on the Virgin Mary or the Crucifix will trigger a reaction, which is part of the puzzle or challenge the player must solve to advance. Hints are provided as you interact with objects, such as doors opening or walls moving.

6. **Controls and Hints**: Throughout the game, you receive hints. For example, the priest might tell you something related to solving a puzzle. Once you find or solve all the puzzles, a congratulatory message appears, and the game restarts.

In summary, this is a virtual world where you can move and interact with various objects, solving puzzles to progress. It is designed to be viewed and played directly in a web browser.

## Installation

To run the scene file (which appears to be part of a web project based on Three.js), you'll need to set up a local server. This is necessary because web browsers often block files loaded directly from your computer (such as textures or images) for security reasons.

Here’s how to create a local server using Python, one of the simplest ways to do this:

### Steps to create a local server with Python:

1. **Make sure you have Python installed**:
   - If you don’t have Python installed, go to the [official Python page](https://www.python.org/downloads/) and download it for your operating system.
   - To check if Python is installed, open a terminal (or Command Prompt in Windows) and type:
     ```bash
     python --version
     ```
     or
     ```bash
     python3 --version
     ```
     It should display the installed Python version.

2. **Place your files in a folder**:
   - Create a folder on your computer and place all your project files inside it. Ensure that your HTML, JavaScript (such as the uploaded file), images, and textures are in this folder or organized in subfolders.

3. **Navigate to the project folder**:
   - Open a terminal (or Command Prompt) and navigate to the folder that contains your files using the `cd` command. For example:
     ```bash
     cd path/to/your/project
     ```

4. **Start a local server with Python**:
   - If you have **Python 3.x**, run the following command in the terminal:
     ```bash
     python3 -m http.server
     ```
     or simply:
     ```bash
     python -m http.server
     ```
   - If you have **Python 2.x**, the command is slightly different:
     ```bash
     python -m SimpleHTTPServer
     ```

5. **Access your project in the browser**:
   - Once you run the previous command, the server will start running locally. You should see something like this in the terminal:
     ```
     Serving HTTP on 0.0.0.0 port 8000 ...
     ```
   - Open your browser and type in the address bar:
     ```
     http://localhost:8000
     ```
   - This will open your project, allowing you to interact with the files (such as the `escena.js` file) in your browser.

### What does this local server do?
The local server created with Python is very simple. It serves all the files of your project on your local computer's web environment, allowing you to test how it would look on a real server. This allows you to load images, JavaScript files, and other resources without security issues.

### Additional note:
- If you want to change the port (default is `8000`), you can specify a different one by adding the number at the end of the command. For example, for port `8080`:
  ```bash
  python3 -m http.server 8080


If you wish to contribute to this project, feel free to fork the repository and submit a pull request with your improvements.

This project is licensed under the MIT License. See the LICENSE file for more details.
