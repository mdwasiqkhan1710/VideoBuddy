# VideoBuddy - MERN Stack Video Conferencing Platform

![VideoBuddy](https://img.shields.io/badge/Stack-MERN-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![WebRTC](https://img.shields.io/badge/Protocol-WebRTC-orange)

A full-stack, real-time video conferencing and chat application built with the MERN stack. VideoBuddy leverages WebRTC for peer-to-peer video communication, ensuring low-latency and secure connections without relying on third-party plugins.

**Live Demo:** https://video-buddy-drdk.onrender.com/

## 🚀 Features

-   **Real-time Video & Audio Calls:** High-quality, peer-to-peer video and audio communication using WebRTC.
-   **Secure User Authentication:** JWT-based login/register system with encrypted passwords.
-   **Instant Messaging:** Integrated chat functionality during calls powered by Socket.IO.
-   **Meeting History:** Users can view a log of their past meetings.
-   **Responsive UI:** A clean and modern interface built with Material-UI and custom CSS.
-   **Media Controls:** Toggle video, audio, and screen sharing.

## 🛠️ Tech Stack

### **Frontend**
-   **React** - Component-based UI library
-   **Axios** - HTTP client for API requests
-   **Material-UI (MUI)** - React component library for styling
-   **React Router** - Client-side routing

### **Backend**
-   **Node.js** - Runtime environment
-   **Express.js** - Web framework for RESTful APIs
-   **JWT (jsonwebtoken)** - Secure user authentication and authorization
-   **bcryptjs** - Password hashing and salting
-   **Mongoose** - ODM for MongoDB

### **Real-Time Communication & Database**
-   **Socket.IO** - WebSocket library for real-time chat features
-   **WebRTC** - Peer-to-peer protocol for video/audio streaming
-   **MongoDB** - NoSQL database for storing user and meeting data

## 📦 Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
-   Node.js (v14 or higher)
-   npm or yarn
-   MongoDB (local instance or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/VideoBuddy.git
cd VideoBuddy
