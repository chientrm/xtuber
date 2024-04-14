// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use open;
#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;
use std::{path::PathBuf, process::Command};
use tauri::{Manager, State};
use youtube_dl::{SingleVideo, YoutubeDl};

#[cfg(target_os = "windows")]
const CREATE_NO_WINDOW: u32 = 0x08000000;

struct AppState {
    ytdlp: PathBuf,
    ffmpeg: PathBuf,
}

#[tauri::command]
async fn get_info(id: &str, state: State<'_, AppState>) -> Result<SingleVideo, String> {
    let url = format!("https://youtube.com/watch?v={}", id);
    let output = YoutubeDl::new(url)
        .youtube_dl_path(state.ytdlp.clone())
        .socket_timeout("15")
        .run()
        .map_err(|e| e.to_string())
        .unwrap();
    let video = output.into_single_video().ok_or("Can't get video").unwrap();
    Ok(video)
}

#[tauri::command]
async fn download(
    id: &str,
    fid: &str,
    folder: &str,
    state: State<'_, AppState>,
) -> Result<(), String> {
    let url = format!("https://youtube.com/watch?v={}", id);

    #[cfg(not(target_os = "windows"))]
    let mut command = Command::new(state.ytdlp.clone());

    #[cfg(target_os = "windows")]
    let mut command = Command::new(state.ytdlp.clone()).creation_flags(CREATE_NO_WINDOW);

    command
        .arg("--force-overwrites")
        .arg("--socket-timeout")
        .arg("15")
        .arg("-f")
        .arg(fid)
        .arg(url)
        .arg("--ffmpeg-location")
        .arg(state.ffmpeg.clone())
        .current_dir(folder)
        .output()
        .expect("Failed to execute command");
    Ok(())
}

#[tauri::command]
fn open_dir(folder: &str) -> Result<(), String> {
    let _ = open::that(folder);
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let path_resolver = app.path_resolver();
            #[cfg(target_os = "linux")]
            let ytdlp = path_resolver
                .resolve_resource("yt-dlp/yt-dlp_linux")
                .expect("Failed to get yt-dlp");
            #[cfg(target_os = "macos")]
            let ytdlp = path_resolver
                .resolve_resource("yt-dlp/yt-dlp_macos")
                .expect("Failed to get yt-dlp");
            #[cfg(target_os = "windows")]
            let ytdlp = path_resolver
                .resolve_resource("yt-dlp/yt-dlp.exe")
                .expect("Failed to get yt-dlp");
            #[cfg(target_os = "linux")]
            let ffmpeg = path_resolver
                .resolve_resource("ffmpeg/ffmpeg-x86_64-unknown-linux-gnu")
                .expect("Failed to get ffmpeg");
            #[cfg(target_os = "macos")]
            let ffmpeg = path_resolver
                .resolve_resource("ffmpeg/ffmpeg-x86_64-apple-darwin")
                .expect("Failed to get ffmpeg");
            #[cfg(target_os = "windows")]
            let ffmpeg = path_resolver
                .resolve_resource("ffmpeg/ffmpeg-x86_64-pc-windows-msvc.exe")
                .expect("Failed to get ffmpeg");
            let state = AppState { ytdlp, ffmpeg };
            app.manage(state);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_info, download, open_dir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
