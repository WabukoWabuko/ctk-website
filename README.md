# Anglican Church Website
Welcome to the Anglican Church Website project! This is a modern, dynamic, and user-friendly website built for an Anglican church. It’s designed to feel fresh and engaging (think 10/5 stars!) while giving church admins full control to manage content like events, sermons, and more. Whether you're a developer helping out or a church member curious about the tech, this README will guide you through everything you need to know.

## What Does It Do?
This website serves the church community with these key features:
- **Homepage:** A warm welcome with service times and highlighted events.
- **About Us:** Info on the church’s history and clergy team.
- **Events:** A calendar where people can see upcoming events and even RSVP.
- **Sermons:** An archive for sermon audio or text, uploaded by admins.
- **Prayer:** Daily readings tied to Anglican traditions (like the lectionary).
- **Contact:** A form to reach out and a map showing the church location.
- **Donations:** A simple button for giving (using free tools like PayPal).
- **Admin Dashboard:** A private area where admins can add, edit, or remove content.
- **User Accounts:** Basic login for members to access extra features (e.g., RSVP).

## How Is It Built?
We’ve used free, powerful tools to make this site both modern and manageable:
- **Front-End (What You See):**
  - **ReactJS:** Makes the site fast and interactive.
  - **Redux:** Keeps track of data (like whether you’re logged in).
  - **React Router:** Handles page navigation (e.g., Home to Events).
  - **Tailwind CSS:** Gives it a clean, modern look that works on phones and desktops.
- **Back-End (Behind the Scenes):**
  - **Django:** Runs the server and handles admin tasks.
  - **Django REST Framework:** Connects the front-end to the back-end with APIs.
  - **SQLite:** A simple, free database to store everything (events, sermons, etc.).
- **Extras:**
  - **Celery + Redis:** Sends emails or notifications in the background (e.g., event reminders).
  - **Cloudinary:** Stores sermon audio or images for free.
  - **Sentry:** Catches errors so we can fix them quickly.
  - **Gunicorn + Nginx:** Helps the site run smoothly when live.

## Getting Started
Want to set this up on your computer? Here’s how to do it step-by-step. You’ll need some basic software first.

### What You’ll Need
- **Python 3.9+:** For the back-end (download from python.org).
- **Node.js 16+:** For the front-end (get it from nodejs.org).
- **Git:** To download the code (install from git-scm.com).

### Step 1: Download the Project
1. Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux).
2. Run these commands:
   ```bash
   git clone <repository-url>  # Replace <repository-url> with the GitHub link
   cd church-website
