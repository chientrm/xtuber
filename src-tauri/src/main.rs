// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use open;
use std::path::PathBuf;
use youtube_dl::{SingleVideo, YoutubeDl};

#[tauri::command]
async fn get_info(ytdlp: &str, id: &str) -> Result<SingleVideo, String> {
    let url = format!("https://youtube.com/watch?v={}", id);
    let output = YoutubeDl::new(url)
        .youtube_dl_path(ytdlp)
        .socket_timeout("15")
        .run()
        .map_err(|e| e.to_string())
        .unwrap();
    let video = output.into_single_video().ok_or("Can't get video").unwrap();
    Ok(video)
}

#[tauri::command]
async fn download(ytdlp: &str, id: &str, fid: &str, folder: &str) -> Result<(), String> {
    let url = format!("https://youtube.com/watch?v={}", id);
    let _ = YoutubeDl::new(url)
        .youtube_dl_path(ytdlp)
        .socket_timeout("15")
        .format(fid)
        .download_to(folder)
        .map_err(|e| e.to_string());
    Ok(())
}

#[tauri::command]
async fn setup() -> Result<PathBuf, String> {
    let path = youtube_dl::download_yt_dlp(".")
        .await
        .map_err(|e| e.to_string())?;
    Ok(path)
}

#[tauri::command]
fn open_dir(folder: &str) -> Result<(), String> {
    let _ = open::that(folder);
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            setup, get_info, download, open_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
