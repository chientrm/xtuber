// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest::Client;
use rusty_ytdl::{Video, VideoInfo};
use std::fs::File;
use std::io::Write;
use tauri::Runtime;

#[tauri::command]
async fn load(id: &str) -> Result<VideoInfo, String> {
    let url = format!("https://youtube.com/watch?v={}", id);
    let video = Video::new_with_options(url, Default::default()).map_err(|e| e.to_string())?;
    let info = video.get_info().await.map_err(|e| e.to_string())?;
    Ok(info)
}

#[tauri::command]
async fn download_file<R: Runtime>(
    id: &str,
    index: usize,
    path: &str,
    window: tauri::Window<R>,
) -> Result<(), String> {
    let video_info = load(id).await.unwrap();
    let format = videoInfo.formats.get(index).unwrap();
    let url = &format.url;
    let client = Client::new();
    let mut res = client.get(url).send().await.map_err(|e| e.to_string())?;

    let total_size = res.content_length().ok_or("Failed to get content length")?;
    let mut downloaded = 0;
    let mut file = File::create(path).map_err(|e| e.to_string())?;

    while let Some(chunk) = res.chunk().await.map_err(|e| e.to_string())? {
        file.write_all(&chunk);
        downloaded += chunk.len() as u64;

        let progress = (downloaded * 100) / total_size;
        window
            .emit("download_progress", progress as i32)
            .map_err(|e| e.to_string())?;
    }

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![load, download_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
