// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use open::that;
use rusty_ytdl::{Video, VideoOptions, VideoQuality, VideoSearchOptions};

#[tauri::command]
async fn download(url: &str) -> Result<(), String> {
    let video_options = VideoOptions {
        quality: VideoQuality::HighestVideo,
        filter: VideoSearchOptions::Video,
        ..Default::default()
    };
    let video = Video::new_with_options(url, video_options).map_err(|e| e.to_string())?;
    let info = video.get_info().await.map_err(|e| e.to_string())?;
    let url = info.formats.first().unwrap().url.clone();
    let _ = that(url);
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![download])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
