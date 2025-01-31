
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', () => {
        
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return;

            const tabId = tabs[0].id;

            
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: toggleTheme
            });
        });
    });
});


function toggleTheme() {
    const darkThemeClass = 'dark-theme-extension';
    const body = document.body;

    if (body.classList.contains(darkThemeClass)) {
        body.classList.remove(darkThemeClass);
        console.log('Theme toggled to Light');
    } else {
        body.classList.add(darkThemeClass);
        console.log('Theme toggled to Dark');
    }

   
    const style = document.createElement('style');
    style.id = 'dark-theme-styles';
    style.textContent = `
        .dark-theme-extension {
            background-color: #121212 !important;
            color: #ffffff !important;
        }
        .dark-theme-extension a {
            color: #bb86fc !important;
        }
    `;

    
    const existingStyles = document.getElementById('dark-theme-styles');
    if (existingStyles) {
        existingStyles.remove();
    }

   
    if (body.classList.contains(darkThemeClass)) {
        document.head.appendChild(style);
    }
}