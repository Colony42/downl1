let programs = null;

async function toggleCheckboxList(category) {
  const checkboxList = document.getElementById('checkboxList');
  const cartWindow = document.getElementById('cartWindow');

  try {
    // Wait for the promise to resolve
    const programsForCategory = await getProgramsForCategory(category);

    console.log('programsForCategory:', programsForCategory);

    if (!programsForCategory || programsForCategory.length === 0) {
      console.error('No programs found for the selected category.');
      return;
    }

    // Set programs only if it's not already set
    if (!programs) {
      programs = programsForCategory;
    }

    const checkboxes = programsForCategory.map((program, index) => {
      return `
        <div class="checkbox-item">
          <input type="checkbox" data-program="${program}" id="checkbox${index + 1}">
          <label class="checkbox-label" for="checkbox${index + 1}">${program}</label>
        </div>
      `;
    }).join('');

    // Добавляем кнопку Close
    const closeBtn = '<button class="btn_close" onclick="closeCheckboxList()">X</button>';

    checkboxList.innerHTML = checkboxes + closeBtn;

    const checkboxesElements = checkboxList.querySelectorAll('input[type="checkbox"]');
    checkboxesElements.forEach(checkbox => {
      const programName = checkbox.getAttribute('data-program');
      checkbox.checked = checkedPrograms.includes(programName);

      checkbox.addEventListener('change', function() {
        handleCheckboxChange(this);
      });
    });

    // Append the current selections to checkedPrograms
    checkedPrograms = checkedPrograms.concat(Array.from(checkboxesElements)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.getAttribute('data-program')));

    // Ensure unique elements in checkedPrograms
    checkedPrograms = [...new Set(checkedPrograms)];

    if (checkboxList.style.display === 'none' || checkboxList.style.display === '') {
      checkboxList.style.display = 'block';
    } else {
      checkboxList.style.display = 'none';
    }
  } catch (error) {
    console.error('Error getting programs for category:', error);
  }
}

let checkedPrograms = []; // Объявляем переменную в глобальной области видимости

async function toggleCartWindow() {
  const cartWindow = document.getElementById('cartWindow');

  console.log("checkedPrograms: ", checkedPrograms);

  // Fetch programs if not already fetched
  if (!programs) {
    try {
      const fetchedPrograms = await getProgramsForCategory('Dev & Coding');
      programs = fetchedPrograms;
      // Run the custom installer directly
      await runCustomInstaller(checkedPrograms, programs); // Add 'await' here
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  } else {
    // Run the custom installer directly
    await runCustomInstaller(checkedPrograms, programs); // Add 'await' here
  }
}

function getProgramsForCategory(category) {
  return new Promise((resolve, reject) => {
    let categoryPrograms;

  switch (category) {
    case 'Social media':
      categoryPrograms = {
        'Telegram': 'https://telegram.org/dl/desktop/win64',
      };
      break;

    case 'Dev & Coding':
      categoryPrograms = {
        'Visual Studio Code': 'https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user',
        'Atom': 'https://browser.mail.ru/download/?arf=1&autorun=1&attr=0chsg&rfr=530000',
        "Sublime Text": "https://download.sublimetext.com/Sublime%20Text%20Build%203211%20x64%20Setup.exe",
      };
      break;
       
      case 'Start':
        categoryPrograms = {
          'Steam': 'https://cdn.cloudflare.steamstatic.com/client/installer/SteamSetup.exe',
          'Discord': 'https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x86',
          'Telegram': 'https://telegram.org/dl/desktop/win64',
          'Chrome': 'https://github.com/Colony42/file/raw/main/ChromeSetup%20(1).exe',
          'Yandex Browser': 'https://browser.yandex.ru/download?banerid=6302000000&statpromo=true&partner_id=default',
          'Kaspersky Free': 'https://github.com/Colony42/file/raw/main/kaspersky4win202121.15.8.493ru_45357.exe',
          'LibreOffice': 'https://download.documentfoundation.org/libreoffice/stable/7.6.4/win/x86_64/LibreOffice_7.6.4_Win_x86-64.msi',
          'Torrent Classic': 'https://github.com/Colony42/file/raw/main/utorrent_installer%20(2).exe',
          'Planet VPN': 'https://cdn.freevpnplanet.com/win/planetvpn.exe',

        }; 
        break;

      case 'Custom':
        categoryPrograms = {
          
          
        };
        break;

      case 'Creation':
        categoryPrograms = {
          'Blender': 'https://ftp.halifax.rwth-aachen.de/blender/release/Blender4.0/blender-4.0.2-windows-x64.msi',
          'Flowframes': 'https://github.com/Colony42/file/raw/main/FlowframesInstaller1.36.0.exe',
        };
        break;

      case 'Business':
        categoryPrograms = {
          'Notepad++': 'https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.6.2/npp.8.6.2.Installer.x64.exe',
          'Notion': 'https://www.notion.so/desktop/windows/download',
          'DeepL': 'https://github.com/Colony42/file/raw/main/DeepLSetup%20(1).exe',
        };
        break;

      case 'Useful utilities':
        categoryPrograms = {
          'WizTree': 'https://diskanalyzer.com/files/wiztree_4_17_setup.exe',
          'QTTabBar': 'https://github.com/Colony42/file/raw/main/QTTabBar_Setup.exe',
          'DNS Benchmark': 'https://github.com/Colony42/file/raw/main/DNSBench.exe',
          'ASIO4ALL': 'https://github.com/Colony42/file/raw/main/ASIO4ALL_2_15_Russian.exe',
          'Dual Monitors Tools': 'https://github.com/Colony42/file/raw/main/DualMonitorTools-2.10.msi', 
          'TCP Optimizer': 'https://github.com/Colony42/file/raw/main/TCPOptimizer.exe',
          'VCL Media Player': 'https://mirror.yandex.ru/mirrors/ftp.videolan.org/vlc/3.0.20/win64/vlc-3.0.20-win64.exe',
          'Google Picasa': 'https://picasa3.ru/wp-content/uploads/soft/picasa39-setup.exe',
        };
        break;

       case 'Game':
        categoryPrograms = {
          'Steam': 'https://cdn.cloudflare.steamstatic.com/client/installer/SteamSetup.exe',
          'Discord': 'https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x86',
          'Epic Launcher': 'https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi?trackingId=6d576e7fe2ba49eb935e6a87c8e1d17d',
        };
        break;

       default:
        categoryPrograms = {}; // Set programs to an empty object for unknown categories
        break;
   }

    // Update the values in the global programs object
  programs = { ...programs, ...categoryPrograms };

  resolve(Object.keys(categoryPrograms));
  });
}

 function handleCheckboxChange(checkbox) {
  const programName = checkbox.getAttribute('data-program');

  // Check if the program is already in the list
  const index = checkedPrograms.indexOf(programName);

  if (checkbox.checked && index === -1) {
    // If checkbox is checked and program is not in the list, add it
    checkedPrograms.push(programName);
  } else if (!checkbox.checked && index !== -1) {
    // If checkbox is unchecked and program is in the list, remove it
    checkedPrograms.splice(index, 1);
  }

  // Update the cart window
  updateCartWindow();
}

function updateCartWindow() {
  const cartWindow = document.getElementById('cartWindow');
  const cartItemsHTML = checkedPrograms.map(program => `<div class="cart-window-item">${program}</div>`).join('');
  cartWindow.innerHTML = cartItemsHTML;
}



function showCartContent() {
  const cartWindow = document.getElementById('cartWindow');
  const downloadButton = '<button class="downloaded" onclick="toggleCartWindow()">Download</button>';

  // Toggle the display of cart window
  if (cartWindow.style.display === 'block') {
    cartWindow.style.display = 'none';
  } else {
    // Update the cart window with current selections and display it
    updateCartWindow();
    cartWindow.innerHTML += downloadButton;
    cartWindow.style.display = 'block';
  }
}



function closeCheckboxList() {
  const checkboxList = document.getElementById('checkboxList');
  checkboxList.style.display = 'none';
}


function runCustomInstaller(selectedPrograms, programs) {

  console.log('Selected Programs:', selectedPrograms);
  console.log('All Programs:', programs);

  const installPath = prompt("Enter installation path:", 'D:\\test');
  if (!installPath) {
    return;
  }

  // Construct the PowerShell script command
  const scriptCommand = `
    $installPath = "${installPath}"
    $scriptPath = "D:\\Prog\\customInstaller.ps1"
    
    # Define programs and their download URLs
    $programs = @{
      ${selectedPrograms.map(program => `"${program}" = "${programs[program]}"`).join(';')}
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
  `;

  // Send the script content directly as a string
  fetch('http://localhost:3000/runScript', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ script: scriptCommand }),
  })
  .then(response => response.text())
  .then(output => console.log(output))
  .catch(error => console.error('Error running script:', error));
}

let programsDownloaded = 0;

// Добавляем новую функцию для отображения прогресса
function updateProgress(programsDownloaded, totalPrograms) {
  // Вычисляем прогресс в процентах
  const progress = (programsDownloaded / totalPrograms) * 100;

  // Обновляем элемент прогресса в HTML
  const progressBar = document.getElementById('downloadProgress');
  if (progressBar) {
    progressBar.value = progress;
  }
}


// Добавляем новую функцию для выполнения установки с прогрессом
async function runInstallation(program, installPath) {
  const installerPath = programs[program];
  const installerFilePath = `${installPath}\\${program}.exe`;

  // Обновляем прогресс перед каждой установкой
  updateProgress(programsDownloaded, checkedPrograms.length);

  // Download the installer
  await fetch(installerPath)
    .then(response => response.blob())
    .then(blob => {
      // Обрабатываем байты блоба, если необходимо
      // (например, выводим количество скачанных байтов)
      const byteArray = new Uint8Array(blob);
      console.log(`Downloaded ${byteArray.length} bytes for ${program}`);
      return byteArray;
    });

  // Увеличиваем счетчик установленных программ
  programsDownloaded++;

  // Install the program
  // ...

  // Remove the installer
  // ...
}
