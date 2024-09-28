#!/bin/bash

mkdir -p src-tauri/ffmpeg
wget https://www.osxexperts.net/ffmpeg7intel.zip
unzip ffmpeg7intel.zip
mv ffmpeg src-tauri/ffmpeg/ffmpeg-x86_64-apple-darwin
mkdir -p src-tauri/yt-dlp
wget https://github.com/yt-dlp/yt-dlp/releases/download/2024.04.09/yt-dlp_macos -O src-tauri/yt-dlp/yt-dlp_macos
chmod +x src-tauri/ffmpeg/*
chmod +x src-tauri/yt-dlp/*