#!/bin/bash

mkdir -p src-tauri/ffmpeg
wget https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz
tar -xf ffmpeg-master-latest-linux64-gpl.tar.xz
mv ffmpeg-master-latest-linux64-gpl/bin/ffmpeg src-tauri/ffmpeg/ffmpeg-x86_64-unknown-linux-gnu
mkdir -p src-tauri/yt-dlp
wget https://github.com/yt-dlp/yt-dlp/releases/download/2024.04.09/yt-dlp_linux -O src-tauri/yt-dlp/yt-dlp_linux
chmod +x src-tauri/ffmpeg/*
chmod +x src-tauri/yt-dlp/*