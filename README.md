## BeatsFlōw

A powerful workflow-based productivity timer and music player to unwind and boost your productivity.
Check out the live demo of BeatsFlōw [here](https://beatsflow.vercel.app).

This project is licensed under the MIT License.

![](/public/beatsflow-editor.png)

### Features
- 🧮 Workflow Editor: Craft your custom flow with the canvas editor
- 🎧 Beats with the flow: Bring your favorite tracks to your flow without ads with our YouTbe integration.
- ⏱️ Manage your workflow with BeatsFlow Timer
- 🎼 Sounds effects during the execution of your flow

### Technologies Used
- **Next.js** as the frontend framework
- **TailwindCSS** for styling with base UI components
- **Zustand** for global state management
- **React Flow** for the workflow editor
- **React YouTube & YouTube API** for the music player

### How to run this project?

This project relies on `pnpm` as the package manager. Install it by running `npm install -g pnpm`.

To run this project on your local environment, follow the following steps :
- Clone the repository to your local machine or download the source code.
- Run the command `pnpm install` in the project directory to install the **required** dependencies
- Create a `.env` file in the root directory of the project and add the following content:

```dotenv
YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
```
- Run the command `pnpm preview` to build `production build` of the project. It will start a local production server.
- Open your internet browser and go to the following address: [http://localhost:3000](http://localhost:3000)

## User Interfaces

### BeatsFlow Editor

![](/public/beatsflow-editor.png)

### BeatsFlow Timer

![](/public/beatsflow-runner.png)