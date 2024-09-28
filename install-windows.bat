mkdir -p src-tauri/ffmpeg
Invoke-WebRequest -Uri https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip -OutFile "ffmpeg-master-latest-win64-gpl.zip"
unzip ffmpeg-master-latest-win64-gpl.zip
mv ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe src-tauri/ffmpeg/ffmpeg-x86_64-pc-windows-msvc.exe
mkdir -p src-tauri/yt-dlp
Invoke-WebRequest -Uri https://github.com/yt-dlp/yt-dlp/releases/download/2024.04.09/yt-dlp.exe -OutFile "src-tauri/yt-dlp/yt-dlp.exe"
chmod +x src-tauri/ffmpeg/*
chmod +x src-tauri/yt-dlp/*