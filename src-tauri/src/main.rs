// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use open;
#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;
use std::{
    io::{BufRead, BufReader},
    path::PathBuf,
    process::{Command, Stdio},
    thread,
};
use tauri::{Manager, State, Window};
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
        .youtube_dl_path(&state.ytdlp)
        .socket_timeout("15")
        .run()
        .map_err(|e| format!("youtube_dl error: {}", e))?;
    let video = output
        .into_single_video()
        .ok_or_else(|| "Failed to get video info".to_string())?;
    Ok(video)
}

#[tauri::command]
fn download(
    id: &str,
    fid: &str,
    folder: &str,
    key: &str,
    state: State<'_, AppState>,
    window: Window,
) -> Result<(), String> {
    let url = format!("https://youtube.com/watch?v={}", id);
    let mut command = Command::new(&state.ytdlp);
    #[cfg(target_os = "windows")]
    command.creation_flags(CREATE_NO_WINDOW);
    let mut child = command
        .arg("--force-overwrites")
        .arg("--socket-timeout")
        .arg("15")
        .arg("-f")
        .arg(fid)
        .arg(url)
        .arg("--ffmpeg-location")
        .arg(state.ffmpeg.clone())
        .arg("-q")
        .arg("--progress")
        .arg("--no-warnings")
        .arg("--newline")
        .arg("--progress-template")
        .arg(
            "%(progress._percent_str)s of %(progress._total_bytes_str)s at %(progress._speed_str)s",
        )
        .current_dir(folder)
        .stdout(Stdio::piped())
        .spawn()
        .expect("Failed to execute command");
    let stdout = BufReader::new(child.stdout.take().unwrap());
    let key = key.to_string();
    thread::spawn(move || {
        for line in stdout.lines() {
            let _ = window.emit(&key, line.unwrap());
        }
        let _ = window.emit(&key, "done");
    });
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
