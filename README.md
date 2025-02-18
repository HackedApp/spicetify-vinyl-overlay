
# 🎵 Vinyl Record Overlay

⚠️ **IMPORTANT: This extension ONLY works with the "StarryNight" theme from the Spicetify Marketplace.**  
If you're using a different theme, the vinyl overlay **will not work properly**.

## 📌 Description
Vinyl Record Overlay adds a **spinning vinyl effect** on top of the album artwork in Spotify. The vinyl's color dynamically changes based on the **average color of the album art**.

### ✨ Features:
- 🎶 **Vinyl overlay replaces album art when playing music**
- 🌈 **Automatically matches vinyl color to album art**
- 📀 **Spins while playing, stops when paused**
- 🎨 **Designed for "StarryNight" theme in Spicetify Marketplace**

---

## 🛠 Installation

### **1️⃣ Install Spicetify**
If you haven’t installed Spicetify yet, follow the official guide:  
🔗 [Spicetify Installation Guide](https://spicetify.app/docs/getting-started/installation)

### **2️⃣ Install the "StarryNight" Theme**
1. Open a terminal and run:
   ```sh
   spicetify config current_theme StarryNight
   spicetify apply
Restart Spotify to ensure the theme is applied.
3️⃣ Install Vinyl Record Overlay
Automatic Installation (Recommended)
Open the Spicetify Marketplace (spicetify marketplace in the terminal).
Search for "Vinyl Record Overlay".
Click Install.
🛠 Manual Installation Guide
If you prefer manual installation, follow these steps:

Step 1: Navigate to the Spicetify Extensions Folder
sh
Copy
Edit
cd "$(spicetify path user)/Extensions"
Step 2: Download vinylRecord.js
sh
Copy
Edit
curl -o vinylRecord.js https://raw.githubusercontent.com/yourgithubusername/spicetify-vinyl-overlay/main/vinylRecord.js
Step 3: Enable the Extension in Spicetify
sh
Copy
Edit
spicetify config extensions vinylRecord.js
spicetify apply
Step 4: Restart Spotify
Close and reopen Spotify for the changes to take effect.

🛠 How to Use
Play a song → Vinyl overlay appears and spins 🎶
Pause the music → Vinyl stops spinning ⏸
Change the song → Vinyl changes color based on album art 🎨
❌ Troubleshooting
If the vinyl does not appear:

Make sure you're using the StarryNight theme (spicetify config current_theme StarryNight).
Run spicetify apply after installation.
Check that the extension is enabled: spicetify config extensions
Restart Spotify after applying changes.
👨‍💻 Author
Your Name
🔗 GitHub
📜 License
This extension is released under the MIT License.
Feel free to modify and share! 🚀

Enjoy your vinyl music experience on Spotify! 🎶✨
If you have issues, feel free to open an issue on GitHub. 🚀

yaml
Copy
Edit

---

### ✅ **What's New?**
✔ **Manual installation instructions added** 🛠  
✔ **Step-by-step terminal commands for installing `vinylRecord.js`**  
✔ **Clear and easy troubleshooting section**  

Now, users can **install it via the Marketplace or manually**! 🚀  
Let me know if you need any tweaks! 🎶🔥
