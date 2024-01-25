param(
    [string]$installPath
)

# Define programs and their download URLs
$programs = @{
    "Notepad++"   = "https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.6.2/npp.8.6.2.Installer.x64.exe";
    "GIMP" = "https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.36-setup.exe";
    "VCL Media Player" = "https://mirror.yandex.ru/mirrors/ftp.videolan.org/vlc/3.0.20/win64/vlc-3.0.20-win64.exe";
    "Telegram" = "https://telegram.org/dl/desktop/win64";
    "Sublime Text" = "https://download.sublimetext.com/Sublime%20Text%20Build%203211%20x64%20Setup.exe";
    "OBS Studio" = "https://cdn-fastly.obsproject.com/downloads/OBS-Studio-30.0.2-Full-Installer-x64.exe";
    "LibreOffice" = "https://download.documentfoundation.org/libreoffice/stable/7.6.4/win/x86_64/LibreOffice_7.6.4_Win_x86-64.msi";
    "Audacity" = "https://github.com/audacity/audacity/releases/download/Audacity-3.4.2/audacity-win-3.4.2-64bit.exe";
    "Audacity + free effects & samples (Muse Hub)" = "https://pub-c7a32e5b5d834ec9aeef400105452a42.r2.dev/Muse_Hub.exe";
    "Blender" = "https://ftp.halifax.rwth-aachen.de/blender/release/Blender4.0/blender-4.0.2-windows-x64.msi";
    "WizTree" = "https://diskanalyzer.com/files/wiztree_4_17_setup.exe";
    "Steam" = "https://cdn.cloudflare.steamstatic.com/client/installer/SteamSetup.exe";
    "Google Picasa" = "https://picasa3.ru/wp-content/uploads/soft/picasa39-setup.exe";
    "QTTabBar" = "https://github.com/Colony42/file/raw/main/QTTabBar_Setup.exe";
    "DNS Benchmark" = "https://github.com/Colony42/file/raw/main/DNSBench.exe";
    "Notion" = "https://www.notion.so/desktop/windows/download";
    "Flowframes" = "https://github.com/Colony42/file/raw/main/FlowframesInstaller1.36.0.exe";
    "ASIO4ALL" = "https://github.com/Colony42/file/raw/main/ASIO4ALL_2_15_Russian.exe";
    "DeepL" = "https://github.com/Colony42/file/raw/main/DeepLSetup%20(1).exe";
    "Dual Monitors Tools" = "https://github.com/Colony42/file/raw/main/DualMonitorTools-2.10.msi";
    "Discord" = "https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x86";
    "Chrome" = "https://github.com/Colony42/file/raw/main/ChromeSetup%20(1).exe";
    "Yandex Browser" = "https://browser.yandex.ru/download?banerid=6302000000&statpromo=true&partner_id=default";
    "TCP Optimizer" = "https://github.com/Colony42/file/raw/main/TCPOptimizer.exe";

}

# Download and install each program
foreach ($program in $programs.Keys) {
    $installerPath = $programs[$program]
    $installerFilePath = Join-Path $installPath "$program.exe"

    # Download the installer
    Invoke-WebRequest -Uri $installerPath -OutFile $installerFilePath

    # Install the program
    Start-Process -FilePath $installerFilePath -ArgumentList "/S" -Wait

    # Remove the installer
    Remove-Item -Path $installerFilePath -Force
}

Write-Host "Installation complete."
