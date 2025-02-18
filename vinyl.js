// ==UserScript==
// @name         Vinyl Record with Averaged Color
// @version      1.8
// @description  Adds a spinning vinyl record with an average color based on album art.
// @author       taymirrorball13
// @match        https://open.spotify.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    console.log("vinyl.js loaded successfully.");

    function injectCSS() {
        const css = `
            .main-nowPlayingWidget-coverArt .cover-art {
                position: relative;
                height: 240px !important;
                width: 240px !important;
                margin: auto;
                background-color: transparent;
                overflow: hidden;
            }
            .main-nowPlayingWidget-coverArt .cover-art::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 200px;
                height: 200px;
                background-color: var(--vinyl-color, #000);
                border-radius: 50%;
                background-image:
                    radial-gradient(circle, transparent 18%, #000000 19%, transparent 20%),
                    radial-gradient(circle, transparent 22%, #000000 23%, transparent 24%),
                    radial-gradient(circle, transparent 26%, #000000 27%, transparent 28%),
                    radial-gradient(circle, transparent 30%, #000000 31%, transparent 32%);
                background-size: cover;
                box-shadow:
                    inset 0px -2px 6px rgba(0,0,0,0.8),
                    inset -4px -4px 10px rgba(255,255,255,0.1),
                    0px 0px 20px rgba(255,255,255,0.3);
                transform: translate(-50%, -50%);
                z-index: -1;
                animation: vinyl-spin 5s linear infinite paused;
            }
            .vinyl-playing .main-nowPlayingWidget-coverArt .cover-art::before {
                animation-play-state: running !important;
            }
            .main-nowPlayingWidget-coverArt .cover-art img[src^="https://i.scdn.co/image/"] {
                border-radius: 50%;
                width: 90px !important;
                height: 90px !important;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
                animation: label-spin 5s linear infinite paused;
            }
            .vinyl-playing .main-nowPlayingWidget-coverArt .cover-art img[src^="https://i.scdn.co/image/"] {
                animation-play-state: running !important;
            }
            .main-nowPlayingWidget-coverArt .cover-art::after {
                content: "";
                display: block;
                position: absolute;
                top: calc(50% - 3px);
                left: calc(50% - 3px);
                width: 6px;
                height: 6px;
                background-color: #000000;
                border-radius: 50%;
                z-index: 2;
            }
            @keyframes vinyl-spin {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }
            @keyframes label-spin {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }
        `;
        const style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);
        console.log("CSS injected successfully.");
    }

    function getAverageColor(image) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size to match image
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Get pixel data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let r = 0, g = 0, b = 0, count = 0;

        // Sample every 10th pixel to improve performance
        for (let i = 0; i < pixels.length; i += 40) {
            r += pixels[i];     // Red
            g += pixels[i + 1]; // Green
            b += pixels[i + 2]; // Blue
            count++;
        }

        // Average colors
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        return `rgb(${r}, ${g}, ${b})`;
    }

    function updateVinylColor() {
        const albumArt = document.querySelector('.main-nowPlayingWidget-coverArt .cover-art img');
        if (!albumArt || !albumArt.complete) return;

        const img = new Image();
        img.crossOrigin = "Anonymous"; // Ensure we can get pixel data
        img.src = albumArt.src;

        img.onload = () => {
            const color = getAverageColor(img);
            document.documentElement.style.setProperty('--vinyl-color', color);
            console.log("Vinyl color updated to:", color);
        };
    }

    function updateVinylState() {
        const coverArt = document.querySelector('.main-nowPlayingWidget-coverArt');
        if (!coverArt) return;

        if (Spicetify.Player.isPlaying()) {
            coverArt.classList.add('vinyl-playing');
            updateVinylColor();
        } else {
            coverArt.classList.remove('vinyl-playing');
        }
    }

    function initialize() {
        if (typeof Spicetify === 'undefined' || !Spicetify.Player) {
            console.log("Waiting for Spicetify...");
            setTimeout(initialize, 1000);
            return;
        }
        injectCSS();
        setInterval(updateVinylState, 1000);
        console.log("vinyl.js initialization complete.");
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
